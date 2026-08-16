import { IsApply } from "../nodes/Apply.js";
import { IsFunction } from "../nodes/Function.js";
import { IsGeneric } from "../nodes/Generic.js";
import { IsInterface } from "../nodes/Interface.js";
import { IsObject } from "../nodes/Object.js";
import { IsRef } from "../nodes/Ref.js";
import { flatten } from "../flatten.js";
import {
  documentation,
  interfaceLines,
  key,
  member,
  type,
} from "./typescript.js";
import type { Schema } from "../Schema.js";
import type { TNode } from "../TNode.js";

// A schema to the names it declares, as the host language declares them.
//
// Everything a schema says, in one file: the types, the tags, and the contract
// a client owes. It declares and nothing else — `jsx`, `jsxs` and `Fragment`
// are a runtime, and a runtime is written by hand where a target decides what
// it draws with.

/** What a schema declares: its types, its tags, and what a client answers for. */
export function declarations(schema: Schema, into = ""): string {
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
  Object.values(schema.types).forEach((node) => declares(node, new Set()));
  Object.values(schema.builtins).forEach((node) => declares(node, new Set()));
  Object.values(schema.tags).forEach((node) => declares(node, new Set()));

  const lines: string[] = [];

  // This schema's own and in the order it declares them. What a name stands
  // for decides how it is written: an interface where the node is one, and a
  // named type everywhere else.
  for (const [name, node] of Object.entries(schema.types)) {
    lines.push(
      ...(IsInterface(node) || IsGeneric(node)
        ? interfaceLines(name, node, undefined, props.has(name))
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
  const owed = Object.entries(schema.builtins);
  if (owed.length > 0) {
    lines.push(
      "/** What a client must answer with, for every name in scope. */",
    );
    lines.push(`export interface Builtins {`);
    for (const [name, node] of owed) {
      // A name standing for a type it declares is a member holding one;
      // anything else is written as the signature it declares.
      lines.push(
        ...(IsRef(node)
          ? [`  ${key(name)}: ${node.$ref};`]
          : member(name, node)),
      );
    }
    lines.push(`}`);
    lines.push("");
  }

  // What a kind is called on this host, and what a prop may hold once a script
  // may stand where a value would: names the framework declares and no schema
  // does, so which of them are named is read off what was written. A base's
  // names come the same way — writing one again would be a name two packages
  // both export.
  const framework = ["ClientElement", "Children", "Client", "Prop"].filter(
    (name) => lines.some((line) => new RegExp(`\\b${name}\\b`).test(line)),
  );
  const inherited = [...reached].filter((name) => !(name in schema.types));

  const head = ["// Generated by `pnpm generate`. Do not edit.", ""];
  // The package that declares them reaches them beside it; everyone else by
  // name. Its own file cannot import itself — on a clean tree there is no
  // `dist` for it to resolve to.
  if (into === FRAMEWORK) {
    for (const name of framework.sort()) {
      head.push(`import type { ${name} } from "./${name}.js";`);
    }
  } else if (framework.length > 0 || inherited.length > 0) {
    head.push(`import type {`);
    for (const name of [...framework, ...inherited].sort()) {
      head.push(`  ${name},`);
    }
    head.push(`} from "${FRAMEWORK}";`);
  }
  if (head.length > 2) {
    head.push("");
  }

  return [...head, ...lines].join("\n");
}

/** The package that declares what a schema's names are written in terms of. */
const FRAMEWORK = "@backtickjs/core-schema";

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
