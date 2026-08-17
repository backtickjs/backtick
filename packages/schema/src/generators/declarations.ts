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
import type { TNode } from "../TNode.js";

// A schema to the names it declares, as the host language declares them.
//
// Everything a schema says, in one file: the types, the tags, and the contract
// a client owes. It declares and nothing else — `jsx`, `jsxs` and `Fragment`
// are a runtime, and a runtime is written by hand where a target decides what
// it draws with.

/** What a schema declares: its types, its tags, and what a client answers for. */
export function declarations(schema: Schema): string {
  // Names are everything in scope, inherited included: what reads these is
  // asking what a script may reach, and a script reaches what its whole schema
  // declares.
  const all = flatten(schema);

  /**
   * The interfaces a tag accepts, which are the ones whose members a script
   * may stand in.
   *
   * Reached from a tag and through what such an interface extends, and no
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
    Object.values(all.tags).forEach((element) => follow(element.props));
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
      if (all.types[node.$ref] === undefined) {
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
  const owed = Object.entries(schema.builtins);
  const holds = (node: TNode): node is TGeneric =>
    IsGeneric(node) && !IsFunction(node.expression);
  const carried = new Map<string, TGenericParameter>();
  for (const [, node] of owed) {
    if (holds(node)) {
      node.parameters.forEach((one) => carried.set(one.name, one));
    }
  }

  Object.values(schema.types).forEach((node) => declares(node, new Set()));
  // Every builtin is written inside the one interface that holds them all, so
  // what that interface carries is a name each of them may reach — `state`
  // bounds what it stores by the domain `Array` brought in.
  Object.values(schema.builtins).forEach((node) =>
    declares(node, new Set(carried.keys())),
  );
  Object.values(schema.tags).forEach((node) => declares(node, new Set()));

  const lines: string[] = [];

  // This schema's own and in the order it declares them. What a name stands
  // for decides how it is written: an interface where the node is one, and a
  // named type everywhere else.
  for (const [name, node] of Object.entries(schema.types)) {
    lines.push(
      ...(IsInterface(node) || IsGeneric(node)
        ? interfaceLines(name, node, branded.has(name), props.has(name))
        : [...documentation(node, ""), `export type ${name} = ${type(node)};`]),
    );
    lines.push("");
  }

  // The tags an app writes bare, for this schema alone: a target's runtime
  // extends the interfaces its bases generated, so each tag is declared by the
  // schema that has it and by nothing else.
  const tags = Object.entries(schema.tags);
  if (tags.length > 0) {
    lines.push("/** The tags this schema declares, and what each accepts. */");
    lines.push(`export interface IntrinsicElements {`);
    for (const [tag, element] of tags) {
      lines.push(...documentation(element as unknown as TNode, "  "));
      lines.push(`  ${key(tag)}: ${elementProps(element.props)};`);
    }
    lines.push(`}`);
    lines.push("");
  }

  // What a client owes: one interface, because a client answers for these the
  // same way whether the host's lib declares the name or the framework does.
  // This schema's own names, not the flattened ones — a base's are answered by
  // the client that declared them, and a target's client composes.
  if (owed.length > 0) {
    lines.push(
      "/** What a client must answer with, for every name in scope. */",
    );
    const parameters =
      carried.size === 0
        ? ""
        : `<${[...carried.values()].map((one) => typeParameter(one)).join(", ")}>`;
    lines.push(`export interface Builtins${parameters} {`);
    for (const [name, node] of owed) {
      // A name standing for a type it declares is a member holding one;
      // anything else is written as the signature it declares.
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
  }

  // What each base offers, which is everything its own chain declares — a base
  // re-exports what it inherited, so a name is reached from the schema built on
  // it and never from two schemas down. The first also offers what the chain
  // under it publishes by hand: no schema declares those, and every file writes
  // at least one.
  const bases = schema.extends.map(
    (base, at) =>
      [
        base.package,
        [
          ...Object.keys(flatten(base).types),
          ...(at === 0 ? published(base) : []),
        ],
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
    const offering = bases.find(([, names]) => names.includes(held));
    if (offering === undefined) {
      throw new Error(`no schema this one extends offers \`${held}\``);
    }
    name(held, offering[0]);
  }
  // A published name is found by reading this file back, because no `$ref`
  // names one: what a schema says about `Prop` is that it wrapped something in
  // it, and the wrapping is the generator's own.
  //
  // What a declaration writes, and not what it says about itself: a description
  // naming `Children` is prose, and an import written because a comment spelled
  // a name is an import nothing reads.
  const written = lines.filter((line) => !/^\s*(\/\*|\*)/.test(line));
  for (const held of [
    ...schema.publishes,
    ...schema.extends.flatMap(published),
  ]) {
    if (!written.some((line) => new RegExp(`\\b${held}\\b`).test(line))) {
      continue;
    }
    // Beside this file where this package is what publishes it, and from the
    // schema this one is built on otherwise: a name is handed on the whole way
    // up, so a target reaches it without depending on where it was written.
    name(
      held,
      schema.publishes.includes(held)
        ? schema.package
        : (bases[0]?.[0] ?? schema.package),
    );
  }

  const head = ["// Generated by `pnpm generate`. Do not edit.", ""];
  // Grouped by where they come from, and written relative where that is this
  // file's own package: on a clean tree a package has no `dist` of its own to
  // import itself through.
  const packages = [...new Set(from.values())].sort();
  for (const held of packages) {
    const names = [...from]
      .filter(([, where]) => where === held)
      .map(([one]) => one)
      .sort();
    if (held === schema.package) {
      for (const one of names) {
        head.push(`import type { ${one} } from "./${one}.js";`);
      }
      continue;
    }
    head.push(`import type {`);
    for (const one of names) {
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
 * Every name the chain under a schema publishes by hand, its own included.
 *
 * A published name is written beside an artifact rather than declared in one —
 * `Prop<T>` is a union over a type parameter, which a schema has no node for —
 * so where it comes from is the schema's to say and not this generator's to
 * know. Read through the chain because a schema hands on what it inherited: the
 * layer that publishes a name may be several below the one writing it.
 */
function published(of: Schema): string[] {
  return [...of.publishes, ...of.extends.flatMap(published)];
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
 * What a tag accepts: the name it is given, or the properties written inline.
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
  // Which prop holds what is written inside a tag is JSX's own rule — the one
  // `JSX.ElementChildrenAttribute` names — so the *wrapper* is decided here and
  // what it wraps comes from the schema.
  const written =
    name === "children"
      ? `Children<${type(node)}>`
      : IsFunction(node)
        ? `Client<${type(node)}>`
        : `Prop<${type(node)}>`;
  return `  ${key(name)}${optional}: ${written};`;
}
