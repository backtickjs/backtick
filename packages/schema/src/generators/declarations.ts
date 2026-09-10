import { IsApply } from "../nodes/Apply.js";
import { IsFunction } from "../nodes/Function.js";
import { IsGeneric } from "../nodes/Generic.js";
import { IsInterface } from "../nodes/Interface.js";
import { IsObject } from "../nodes/Object.js";
import { IsRef } from "../nodes/Ref.js";
import type { TRef } from "../nodes/Ref.js";
import type { TInterface } from "../nodes/Interface.js";
import { flatten } from "../flatten.js";
import {
  documentation,
  interfaceLines,
  key,
  member,
  type,
  typeParameter,
} from "./typescript.js";
import type { TGeneric } from "../nodes/Generic.js";
import type { TGenericParameter } from "../nodes/GenericParameter.js";
import type { Schema } from "../Schema.js";
import { format } from "./format.js";

// What this generator writes around a declaration of its own accord: a prop
// takes a value or a script standing in for one, and saying so is the
// generator's job rather than something a schema asks for. No `$ref` names
// either, so neither is a hole in the document a schema produces.
const wrapping: ReadonlySet<string> = new Set(["Client", "Prop"]);
import type { TNode } from "../TNode.js";

// A schema to the names it declares, as the host language declares them.
//
// Everything a schema says, in one file: the types, the elements, and the
// contract a client owes. It declares and nothing else — `jsx`, `jsxs` and
// `Fragment` are a runtime, and a runtime is written by hand where a target
// decides what it draws with.

/** What a schema declares: its types, its elements, and what a client answers for. */
export function declarations(schema: Schema): string {
  // Names are everything in scope, inherited included: what reads these is
  // asking what a script may reach, and a script reaches what its whole schema
  // declares.
  const all = flatten(schema);

  /**
   * The interfaces an element accepts, which are the ones whose members a
   * script may stand in.
   *
   * Reached from an element and through what such an interface extends, and no
   * further: `ForProps` is props where the `ReadonlyState<number>` inside its
   * child's signature is not, so one is wrapped and the other is the plain
   * type a client answers with.
   */
  const propsOf = (): ReadonlySet<string> => {
    const names = new Set<string>();
    const follow = (node: TNode | undefined): void => {
      const named = IsApply(node as TNode) ? (node as never)["target"] : node;
      if (!IsRef(named as TNode)) {
        return;
      }
      const $ref = (named as { $ref: string }).$ref;
      if (names.has($ref)) {
        return;
      }
      names.add($ref);
      const held = all.types[$ref];
      const inner = IsGeneric(held as TNode)
        ? (held as never)["expression"]
        : held;
      if (IsInterface(inner as TNode)) {
        (inner as { extends: readonly TNode[] }).extends.forEach(follow);
      }
    };
    Object.values(all.elements).forEach(follow);
    return names;
  };
  const props = propsOf();

  /**
   * The types that carry a brand: `ClientHandle` and everything that reaches
   * it through what it extends, however deep.
   *
   * A brand is how TypeScript says a value came from the client, since who
   * made one is not in its shape. Each carries its own rather than only its
   * base's — `State` and `ReadonlyState` are two types, and an interface
   * holding just the brand it inherited would be every other one that did.
   */
  const brandedOf = (): ReadonlySet<string> => {
    const face = (node: TNode): TInterface | undefined => {
      const inner = IsGeneric(node) ? node.expression : node;
      return IsInterface(inner) ? inner : undefined;
    };
    // What a heritage entry names, through the arguments it was applied to.
    const bases = (node: TNode): string[] =>
      (face(node)?.extends ?? [])
        .map((one) => (IsApply(one) ? one.target : one))
        .filter((one): one is TRef => IsRef(one))
        .map((one) => one.$ref);
    const names = new Set<string>([HANDLE]);
    for (let grew = true; grew; ) {
      grew = false;
      for (const [name, node] of Object.entries(all.types)) {
        if (!names.has(name) && bases(node).some((one) => names.has(one))) {
          names.add(name);
          grew = true;
        }
      }
    }
    return names;
  };
  const branded = brandedOf();

  // Every name a declaration reaches has to be one the schema declares. A
  // generated file cannot import what a document does not name, and a schema
  // that leans on a type from the package it is generated into is not a
  // document another language can read.
  const reached = new Set<string>();
  const declares = (node: unknown, bound: ReadonlySet<string>): void => {
    if (typeof node !== "object" || node === null) {
      return;
    }
    if (Array.isArray(node)) {
      node.forEach((one) => declares(one, bound));
      return;
    }
    // A parameter is a name too — `ReadonlyState<T>` refs its own `T` — and it
    // is in scope only inside what declared it, so an enclosing generic's
    // parameters are carried down and a ref to one is not a name to find.
    const held = IsGeneric(node)
      ? new Set([...bound, ...node.parameters.map((one) => one.name)])
      : bound;
    if (IsRef(node) && !held.has(node.$ref)) {
      if (all.types[node.$ref] === undefined && !format.has(node.$ref)) {
        throw new Error(
          `the schema names \`${node.$ref}\` and does not declare it`,
        );
      }
      reached.add(node.$ref);
    }
    Object.values(node).forEach((one) => declares(one, held));
  };
  // A builtin holding a name rather than a signature cannot carry a type
  // parameter of its own — there is no generic property — so what it declares
  // is carried by the interface that holds it. That is what a client says by
  // naming `Builtins`: which values it answers with.
  //
  // Read through the chain, because the interface is: a layer passes what a
  // base carries down to it, so a parameter declared once is in scope wherever
  // the name is extended.
  const owed = Object.entries(schema.builtins);
  const holds = (node: TNode): node is TGeneric =>
    IsGeneric(node) && !IsFunction(node.expression);
  const carriedBy = (of: Schema): Map<string, TGenericParameter> => {
    const held = new Map<string, TGenericParameter>();
    of.extends.forEach((base) =>
      carriedBy(base).forEach((one, name) => held.set(name, one)),
    );
    for (const node of Object.values(of.builtins)) {
      if (holds(node)) {
        node.parameters.forEach((one) => held.set(one.name, one));
      }
    }
    return held;
  };
  const carried = carriedBy(schema);

  Object.values(schema.types).forEach((node) => declares(node, new Set()));
  // Every builtin is written inside the one interface that holds them all, so
  // what that interface carries is a name each of them may reach — `state`
  // bounds what it stores by the domain `Array` brought in.
  Object.values(schema.builtins).forEach((node) =>
    declares(node, new Set(carried.keys())),
  );
  Object.values(schema.elements).forEach((node) => declares(node, new Set()));

  // What each base's two chained names are called in this file, which declares
  // both itself: the base's package read as a word, so a heritage says where it
  // came from at the point it is written.
  const heritage = schema.extends.map((base) => ({
    package: base.package,
    ...named(base.namespace),
  }));
  const collision = schema.extends.find(
    (base, at) =>
      schema.extends.findIndex((held) => held.namespace === base.namespace) !==
      at,
  );
  if (collision !== undefined) {
    throw new Error(
      `two schemas this one extends are both called \`${collision.namespace}\``,
    );
  }

  const lines: string[] = [];

  // This schema's own and in the order it declares them. What a name stands
  // for decides how it is written: an interface where the node is one, and a
  // named type everywhere else.
  for (const [name, node] of Object.entries(schema.types)) {
    // Declared by the schema and written by the boundary. What a document owes
    // a reader is a definition — so the schema declares these and the JSON
    // carries them. What a TypeScript file owes one is a single identity, and
    // the boundary is where these are written: a second declaration is a second
    // `unique symbol` and a type nothing else recognises.
    if (format.has(name)) {
      continue;
    }
    lines.push(
      ...(IsInterface(node) || IsGeneric(node)
        ? interfaceLines(name, node, branded.has(name), props.has(name))
        : [...documentation(node, ""), `export type ${name} = ${type(node)};`]),
    );
    lines.push("");
  }

  // The elements an app writes bare, and what a client owes: two names a
  // schema always writes, each extending what every base wrote under it.
  //
  // Members are this schema's own — an element is declared by the schema that
  // has it and by nothing else — and the chain is what gathers them, so a file
  // reaches every element and every builtin beneath it by naming one interface.
  // Written even where a schema adds none, because a layer that skipped the
  // name is a chain that stops there: the one above has nothing to extend, and
  // what a base declares stops arriving without either end being told.
  const extending = (
    named: readonly string[],
    args: readonly string[] = [],
  ) => {
    const applied = args.length === 0 ? "" : `<${args.join(", ")}>`;
    return named.length === 0
      ? ""
      : ` extends ${named.map((one) => `${one}${applied}`).join(", ")}`;
  };

  // Two interfaces, for the same reason the two below are two: what this schema
  // draws is one question and what may be drawn at all is another. A target
  // answering for its own tags reaches the first; a tag written in a document
  // is checked against the second.
  const ownElements = named(schema.namespace).elements;
  lines.push(
    "/** The elements this schema declares, and what each accepts. */",
  );
  lines.push(`export interface ${ownElements} {`);
  for (const [element, props] of Object.entries(schema.elements)) {
    lines.push(...documentation(props, "  "));
    lines.push(`  ${key(element)}: ${elementProps(props)};`);
  }
  lines.push(`}`);
  lines.push("");

  lines.push(
    "/** Every element in scope, this schema's own and its bases'. */",
  );
  lines.push(
    `export interface Elements${extending([
      ...heritage.map((one) => one.elements),
      ownElements,
    ])} {}`,
  );
  lines.push("");

  const parameters =
    carried.size === 0
      ? ""
      : `<${[...carried.values()].map((one) => typeParameter(one)).join(", ")}>`;
  // A base's parameters are this schema's too — `carriedBy` read the chain — so
  // the arguments are the names, handed straight back up.
  const passed = [
    ...new Set(schema.extends.flatMap((base) => [...carriedBy(base).keys()])),
  ];
  const carriedNames = [...carried.keys()];

  // Two interfaces rather than one, because two questions are asked of this.
  //
  // A client implementing a target answers for the names that target adds, and
  // nothing else: the layers under it have their own clients. Writing that as a
  // type means a name added to the schema is a client that stops compiling
  // until it answers, which is the only thing that keeps the two in step.
  //
  // A script, meanwhile, reaches any name in scope, whichever layer declared
  // it. That is `Builtins`, and it is the two put together.
  // Named after the package that declares it, by the same rule a base's is
  // named by: a heritage says where every half came from at the point it is
  // written, and there is one place that decides what a half is called.
  const own = named(schema.namespace).builtins;
  lines.push(
    "/** What this schema declares, which is what its own client answers for. */",
  );
  lines.push(`export interface ${own}${parameters} {`);
  for (const [name, node] of owed) {
    // A name standing for a type it declares is a member holding one; anything
    // else is written as the signature it declares.
    lines.push(
      ...(IsRef(node)
        ? [`  ${key(name)}: ${node.$ref};`]
        : holds(node)
          ? [`  ${key(name)}: ${type(node.expression)};`]
          : member(name, node)),
    );
  }
  lines.push(`}`);
  lines.push("");

  lines.push("/** What a client must answer with, for every name in scope. */");
  // Written out rather than through `extending`, because the two halves take
  // different arguments: a base is handed what that base carries, and
  // `OwnBuiltins` is handed this schema's own.
  const inherited = heritage.map(
    (one) =>
      `${one.builtins}${passed.length === 0 ? "" : `<${passed.join(", ")}>`}`,
  );
  const mine = `${own}${carriedNames.length === 0 ? "" : `<${carriedNames.join(", ")}>`}`;
  lines.push(
    `export interface Builtins${parameters} extends ${[...inherited, mine].join(", ")} {}`,
  );
  lines.push("");

  // What each base offers, which is everything its own chain declares — a base
  // re-exports what it inherited, so a name is reached from the schema built on
  // it and never from two schemas down.
  //
  // Less what no package emits: a name in `format` is declared for a reader of
  // the document and written by the boundary, so no base has one to hand on.
  const bases = schema.extends.map(
    (base) =>
      [
        base.package,
        Object.keys(flatten(base).types).filter((one) => !format.has(one)),
      ] as const,
  );

  // Where each name this file writes but does not declare comes from: the base
  // that offers it, and the framework's own names from the schema everything
  // extends.
  const from = new Map<string, string>();
  const name = (of: string, where: string): void => {
    const held = from.get(of);
    if (held !== undefined && held !== where) {
      throw new Error(`\`${of}\` is declared by ${held} and by ${where}`);
    }
    from.set(of, where);
  };
  for (const held of [...reached].filter((one) => !(one in schema.types))) {
    if (format.has(held)) {
      name(held, "@backtickjs/boundary");
      continue;
    }
    const offering = bases.find(([, names]) => names.includes(held));
    if (offering === undefined) {
      throw new Error(`no schema this one extends offers \`${held}\``);
    }
    name(held, offering[0]);
  }
  // The boundary's own are found by reading this file back, because no `$ref`
  // names one: what a schema says about `Prop` is that it wrapped something in
  // it, and the wrapping is the generator's own — which is why `wrapping` is
  // here rather than in `format.ts`, where every name is one a schema wrote.
  //
  // `format` is read here too, because a name a schema refs is written into the
  // file as well, and one import is one import however it got there.
  //
  // What a declaration writes, and not what it says about itself: a description
  // naming `BacktickNode` is prose, and an import written because a comment spelled
  // a name is an import nothing reads.
  const written = lines.filter((line) => !/^\s*(\/\*|\*)/.test(line));
  for (const held of [...wrapping, ...format]) {
    if (written.some((line) => new RegExp(`\\b${held}\\b`).test(line))) {
      name(held, "@backtickjs/boundary");
    }
  }

  const head = ["// Generated by `pnpm generate`. Do not edit.", ""];
  // Grouped by where they come from, and written relative where that is this
  // file's own package: on a clean tree a package has no `dist` of its own to
  // import itself through.
  // The two names this file extends, aliased: it declares both itself, so what
  // a base wrote is written under the base rather than shadowed by it.
  const aliased = new Map<string, readonly string[]>(
    heritage.map((one) => [
      one.package,
      [`Builtins as ${one.builtins}`, `Elements as ${one.elements}`],
    ]),
  );
  const packages = [...new Set([...from.values(), ...aliased.keys()])].sort();
  for (const held of packages) {
    const names = [...from]
      .filter(([, where]) => where === held)
      .map(([one]) => one);
    if (held === schema.package) {
      for (const one of names.sort()) {
        head.push(`import type { ${one} } from "./${one}.js";`);
      }
      continue;
    }
    head.push(`import type {`);
    for (const one of [...names, ...(aliased.get(held) ?? [])].sort()) {
      head.push(`  ${one},`);
    }
    head.push(`} from "${held}";`);
  }
  if (head.length > 2) {
    head.push("");
  }

  // Everything the schemas under this one declare, handed on. A file written
  // against this schema names one thing to reach the whole chain, and what a
  // base adds arrives without anyone here being told about it.
  for (const [where, names] of bases) {
    if (names.length === 0) {
      continue;
    }
    head.push(`export type {`);
    for (const one of [...names].sort()) {
      head.push(`  ${one},`);
    }
    head.push(`} from "${where}";`);
    head.push("");
  }

  return [...head, ...lines].join("\n");
}

/**
 * What a schema's two chained types are called, wherever they are written.
 *
 * One place, because these names are written from both sides: a schema names
 * its own here and names every base's here too, and two rules that agreed today
 * would be a heritage that stopped resolving the day one changed.
 */
function named(of: string): { elements: string; builtins: string } {
  return { elements: `${of}Elements`, builtins: `${of}Builtins` };
}

/**
 * The name a schema extends to say a client made the value.
 *
 * Known here rather than declared as a flag: what a schema writes is an
 * ordinary heritage relation, and turning that into a brand is this
 * generator's business because another language says it another way.
 */
const HANDLE = "ClientHandle";

/**
 * What an element accepts: the name it is given, or the properties written
 * inline.
 *
 * Inline props are wrapped like every other prop — the wrapping is JSX's rule
 * about props and not a rule about interfaces — and a named one is wrapped
 * where it is declared.
 */
function elementProps(node: TNode): string {
  if (IsRef(node) || IsApply(node)) {
    return type(node);
  }
  if (!IsObject(node) && !IsInterface(node)) {
    throw new Error(
      "an element's props are an interface it names, the properties " +
        `themselves, or both — this is a ${JSON.stringify(node).slice(0, 40)}`,
    );
  }
  const required = node.required ?? [];
  const written = Object.entries(node.properties).map(([name, held]) =>
    prop(name, held, required.includes(name)).trim(),
  );
  const inline = written.length === 0 ? "{}" : `{ ${written.join(" ")} }`;
  const bases = IsInterface(node) ? node.extends.map((one) => type(one)) : [];
  return [...bases, inline].join(" & ");
}

/** What a property admits, which is where the boundary is drawn. */
export function prop(name: string, node: TNode, required: boolean): string {
  const optional = required ? "" : "?";
  // Which prop holds what is written inside an element is JSX's own rule — the one
  // `JSX.ElementChildrenAttribute` names — so the *wrapper* is decided here and
  // what it wraps comes from the schema.
  //
  // A function is a script wherever it stands, the children position included:
  // `<for>` holds one that makes drawings rather than a drawing, and a bare
  // node type would admit a host function and a list of them beside it. So what
  // the node is decides first, and where it stands only after that.
  //
  // Nothing wraps the rest: what may stand inside an element is already a whole
  // children position — `BacktickNode` is one or several or none — so a wrapper
  // here would be saying it twice.
  const written =
    name === "children"
      ? IsFunction(node)
        ? `Client<${type(node)}>`
        : type(node)
      : `Prop<${type(node)}>`;
  return `  ${key(name)}${optional}: ${written};`;
}
