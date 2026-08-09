import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  IsBoolean,
  IsFunction,
  IsIntersect,
  IsLiteral,
  IsNumber,
  IsObject,
  IsRef,
  IsString,
  IsUnion,
  IsVoid,
  type TObject,
  type TSchema,
} from "typebox";
import { aliases, elements, interfaces } from "../schema/html.ts";

/** What a schema node reads as, in TypeScript. */
function type(node: TSchema): string {
  // A `$ref` is a name, whether the document declares it or the boundary
  // supplies it — `JsxElement` is the second kind, and reads no differently.
  if (IsRef(node)) {
    return node.$ref;
  }
  if (IsLiteral(node)) {
    return JSON.stringify(node.const);
  }
  if (IsUnion(node)) {
    return node.anyOf.map(type).join(" | ");
  }
  // An intersection standing where a value goes is written as one. The schema
  // says `string & {}` where it means TypeScript's open-enum idiom, so this
  // translates rather than recognising it — there is nothing here that knows
  // what the shape was for.
  if (IsIntersect(node)) {
    return `(${node.allOf.map(type).join(" & ")})`;
  }
  // A function the schema did not name keeps its own signature, parameters and
  // all — the case `core`'s `onLayout(width, height)` needs.
  if (IsFunction(node)) {
    const params = node.parameters.map((one, at) => {
      const named = one as TSchema & { readonly name?: string };
      return `${named.name ?? `arg${at}`}: ${type(one)}`;
    });
    return `(${params.join(", ")}) => ${type(node.returnType)}`;
  }
  if (IsObject(node)) {
    const members = Object.entries(node.properties).map(
      ([name, child]) => `${name}: ${type(child)}`,
    );
    return members.length === 0 ? "{}" : `{ ${members.join("; ")} }`;
  }
  if (IsString(node)) {
    return "string";
  }
  if (IsNumber(node)) {
    return "number";
  }
  if (IsBoolean(node)) {
    return "boolean";
  }
  if (IsVoid(node)) {
    return "void";
  }
  throw new Error(`unhandled node: ${JSON.stringify(node).slice(0, 60)}`);
}

/** What an interface extends, and the one object of its own. */
function parts(node: TSchema): {
  bases: string[];
  own: TObject | null;
} {
  // An interface that extends nothing is the object itself: there is nothing
  // for an `allOf` of one to say.
  if (IsObject(node)) {
    return { bases: [], own: node };
  }
  const members = IsIntersect(node) ? node.allOf : [];
  return {
    bases: members.filter(IsRef).map((one) => one.$ref),
    own: members.find(IsObject) ?? null,
  };
}

/** The properties an object holds, and whether each was written required. */
function members(
  own: TObject | null,
): { name: string; node: TSchema; required: boolean }[] {
  if (own === null) {
    return [];
  }
  const required = own.required ?? [];
  return Object.entries(own.properties).map(([name, node]) => ({
    name,
    node,
    required: required.includes(name),
  }));
}

/** A name TypeScript can read bare, or one it needs quoted. */
const key = (name: string) =>
  /^[A-Za-z_$][\w$]*$/.test(name) ? name : JSON.stringify(name);

/** What a property admits, which is where the boundary is drawn. */
function property(name: string, node: TSchema, required: boolean): string {
  const optional = required ? "" : "?";
  // Which prop holds what is written inside a tag is JSX's own rule — the one
  // `JSX.ElementChildrenAttribute` names — so the *wrapper* is decided here and
  // what it wraps comes from the schema.
  let written: string;
  if (name === "children") {
    written = `Children<${type(node)}>`;
  } else if (IsFunction(node)) {
    written = `Client<${type(node)}>`;
  } else {
    written = `Prop<${type(node)}>`;
  }
  return `  ${key(name)}${optional}: ${written};`;
}

const lines: string[] = [];
lines.push(
  "// Generated from `schema/html.ts` by `pnpm generate`. Do not edit.",
);
lines.push("");
lines.push(`import type {`);
lines.push(`  Children,`);
lines.push(`  Client,`);
lines.push(`  JsxElement,`);
lines.push(`  Prop,`);
lines.push(`} from "@backtickjs/cs-runtime";`);
if ("FragmentProps" in interfaces) {
  lines.push(`import { createFragment } from "@backtickjs/cs-runtime";`);
}
lines.push("");

for (const [name, node] of Object.entries(aliases)) {
  lines.push(`export type ${name} = ${type(node)};`);
  lines.push("");
}

for (const [name, node] of Object.entries(interfaces)) {
  const { bases, own } = parts(node);
  const extend = bases.length > 0 ? ` extends ${bases.join(", ")}` : "";
  lines.push(`export interface ${name}${extend} {`);
  for (const one of members(own)) {
    lines.push(property(one.name, one.node, one.required));
  }
  lines.push(`}`);
  lines.push("");
}

// `Fragment` is the one value emitted here, and its name is not the schema's
// to choose: it is what the JSX transform imports for `<>…</>`. Its props are
// an interface like any other, generated above. `createFragment` answers with
// `Fragment<P>`, so an annotation would only repeat itself — and repeating it
// is what would need the type imported.
if ("FragmentProps" in interfaces) {
  lines.push(`export const Fragment = createFragment<FragmentProps>();`);
  lines.push("");
}

lines.push(`export interface IntrinsicElements {`);
for (const [tag, name] of Object.entries(elements)) {
  lines.push(`  ${key(tag)}: ${name};`);
}
lines.push(`}`);
lines.push("");

// Relative to this file rather than to the working directory, so it writes the
// same file wherever it is run from.
const out = fileURLToPath(
  new URL("../src/jsx-runtime/elements.ts", import.meta.url),
);
writeFileSync(out, lines.join("\n"));
console.log(`elements.ts: ${lines.length} lines`);
