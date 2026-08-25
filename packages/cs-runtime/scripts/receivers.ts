#!/usr/bin/env -S node --experimental-strip-types
import { writeFileSync } from "node:fs";
import { format } from "prettier";
import { Type, flatten, typescript } from "@backtickjs/schema";
import type { TNode } from "@backtickjs/schema";
import { schema } from "@backtickjs/language-schema/schema";

// The language's flat builtins, as the interfaces a typechecker reads them
// through.
//
// The table says `string.charAt(self, pos)` and a script writes `s.charAt(0)`,
// so something has to read the whole names back as members. It is here and not
// beside the schema because only the language's own names are read this way —
// another schema's builtins reach a script as client scripts it splices in —
// and because which value is reached through which interface is this
// package's own decision, already written in `Autoboxed` and `ClientGlobal`.
// This is the third statement of that decision and the one that has to agree
// with the schema, so it is derived from it rather than written again.

/** A type parameter, which a generic node holds and `TNode` does not name. */
type Parameter = Extract<TNode, { type: "generic" }>["parameters"][number];

/**
 * The values a member access boxes, and what each one's view is called.
 *
 * The prefix is the schema's, written as the value is; the name is the one
 * `Autoboxed` hands back. A member of a value carries its receiver first, so
 * the view takes it off again.
 *
 * What a value is reached by `[]` is written here and not in the schema. `s[0]`
 * is element access, which this client runs as one rule over every value — an
 * array and a string by whole numbers in range, an object by the names it holds
 * — rather than a member it looks up, so there is no name for a client to
 * answer and nothing for a capability list to negotiate. It reaches the view
 * because a typechecker still has to answer what `s[0]` is.
 */
const boxed: Record<string, { as: string; indexed?: TNode }> = {
  boolean: { as: "Boolean" },
  number: { as: "Number" },
  string: { as: "String", indexed: Type.String() },
  array: { as: "Array", indexed: Type.Ref("T") },
};

/**
 * The globals a script reaches by name, and what each one's view is called.
 *
 * What stands before the dot is a name rather than a value, so a member of one
 * is written as it is declared and nothing comes off. `Array` and `array` are
 * two prefixes with two views, which is the pun one namespace ended.
 */
const named: Record<string, { as: string }> = {
  Math: { as: "Math" },
  Array: { as: "ArrayConstructor" },
  Number: { as: "NumberConstructor" },
  String: { as: "StringConstructor" },
};

/** Everything in scope, inherited included — for this schema, its own. */
const all = flatten(schema);

/** Whether a node mentions a name, however deep. */
function mentions(name: string, node: unknown): boolean {
  if (node === null || typeof node !== "object") {
    return false;
  }
  const held = node as { type?: string; $ref?: string };
  if (held.type === "ref" && held.$ref === name) {
    return true;
  }
  return Object.values(node).some((one) => mentions(name, one));
}

/** Every name a node reaches for, so the file can import the ones it needs. */
function refs(node: unknown, found: Set<string>): Set<string> {
  if (node === null || typeof node !== "object") {
    return found;
  }
  const held = node as { type?: string; $ref?: string };
  if (held.type === "ref" && held.$ref !== undefined) {
    found.add(held.$ref);
  }
  Object.values(node).forEach((one) => refs(one, found));
  return found;
}

/** Every name a node binds for itself, which is a name it does not import. */
function bound(node: unknown, found: Set<string>): Set<string> {
  if (node === null || typeof node !== "object") {
    return found;
  }
  const held = node as { type?: string; name?: string };
  if (held.type === "genericParameter" && held.name !== undefined) {
    found.add(held.name);
  }
  Object.values(node).forEach((one) => bound(one, found));
  return found;
}

/** The names written under one prefix, as the members they are read as. */
function members(prefix: string): [string, TNode][] {
  return Object.entries(all.builtins)
    .filter(([name]) => name.startsWith(`${prefix}.`))
    .map(([name, node]) => [name.slice(prefix.length + 1), node]);
}

/**
 * One member of a value, with the receiver taken back off.
 *
 * The parameters that stood in the receiver's type are the view's to bind —
 * `array.map<T, U>(self: T[], …)` is `Array<T>`'s `map<U>` — and the rest stay
 * on the member. Read off the receiver rather than counted, so nothing here
 * has to know what the schema carried.
 */
function unbound(node: TNode): { member: TNode; carried: Parameter[] } {
  const declared = node.type === "generic" ? node.parameters : [];
  const written = node.type === "generic" ? node.expression : node;
  if (written.type !== "function") {
    return { member: node, carried: [] };
  }
  const [self, ...rest] = written.parameters;
  // A getter: what the view shows is the value it answers with, and the
  // receiver it took to get there is the prefix's, not the member's.
  // `string.length` is the number a string has.
  const got = typescript.getter(node);
  if (got !== undefined) {
    return {
      // What it says about itself is the member's, not the return type's: the
      // node answering is an anonymous `number` until the two are put back
      // together here.
      member: { ...got, description: node.description, readOnly: true },
      carried: declared.filter((one) => mentions(one.name, self)),
    };
  }
  const carried = declared.filter((one) => mentions(one.name, self));
  const own = declared.filter((one) => !carried.includes(one));
  const options = { description: node.description };
  const signature = Type.Function(rest, written.returnType, options);
  return {
    member:
      own.length === 0 ? signature : Type.Generic(own, signature, options),
    carried,
  };
}

/** One view: the names under a prefix, as the interface they are read through. */
function view(
  prefix: string,
  value: boolean,
  indexed: TNode | undefined,
): TNode {
  const parameters: Parameter[] = [];
  const properties: Record<string, TNode> = {};
  for (const [called, node] of members(prefix)) {
    const { member, carried } = value
      ? unbound(node)
      : { member: node, carried: [] as Parameter[] };
    properties[called] = member;
    for (const one of carried) {
      if (!parameters.some((held) => held.name === one.name)) {
        parameters.push(one);
      }
    }
  }
  const held = Type.Interface([], {
    ...properties,
    // Last, and under no name of its own: what stands where a name would go is
    // the operator a script writes there.
    ...(indexed === undefined
      ? {}
      : {
          index: Type.Index("index", Type.Number(), indexed, {
            readOnly: true,
          }),
        }),
  });
  return parameters.length === 0 ? held : Type.Generic(parameters, held);
}

const views = [
  ...Object.entries(boxed).map(([prefix, { as, indexed }]) => [
    as,
    view(prefix, true, indexed),
  ]),
  ...Object.entries(named).map(([prefix, { as }]) => [
    as,
    view(prefix, false, undefined),
  ]),
] as [string, TNode][];

// A name a view reaches for and no view declares is the language schema's, and
// is imported rather than written again: `Array.from` takes an `ArrayLike<T>`,
// which is a shape a signature mentions and so a type the schema keeps.
const own = views.reduce(
  (found, [, node]) => bound(node, found),
  new Set(views.map(([name]) => name)),
);
const wanted = [
  ...views.reduce((found, [, node]) => refs(node, found), new Set<string>()),
]
  .filter((name) => !own.has(name))
  .sort();

const lines = [
  "// Generated by `pnpm generate`. Do not edit.",
  "",
  ...(wanted.length === 0
    ? []
    : [
        `import type { ${wanted.join(", ")} } from "@backtickjs/language-schema";`,
        "",
      ]),
  ...views.flatMap(([name, node]) => [
    ...typescript.interfaceLines(name, node),
    "",
  ]),
];

const file = new URL("../src/receivers.generated.ts", import.meta.url);
writeFileSync(
  file,
  await format(lines.join("\n"), { filepath: file.pathname }),
);
console.log(`src/receivers.generated.ts: ${lines.length} lines`);
