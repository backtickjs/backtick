import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { aliases, elements, interfaces } from "../schema/html.ts";

type Node = Record<string, any>;

/** What a schema node reads as, in TypeScript. */
function type(node: Node): string {
  // A `$ref` is a name, whether the document declares it or the boundary
  // supplies it — `JsxElement` is the second kind, and reads no differently.
  if (typeof node.$ref === "string") {
    return node.$ref;
  }
  if (node.const !== undefined) {
    return JSON.stringify(node.const);
  }
  if (Array.isArray(node.anyOf)) {
    return node.anyOf.map(type).join(" | ");
  }
  // An intersection standing where a value goes is written as one. The schema
  // says `string & {}` where it means TypeScript's open-enum idiom, so this
  // translates rather than recognising it — there is nothing here that knows
  // what the shape was for.
  if (Array.isArray(node.allOf)) {
    return `(${node.allOf.map(type).join(" & ")})`;
  }
  switch (node.type) {
    // A function the schema did not name keeps its own signature, parameters
    // and all — the case `core`'s `onLayout(width, height)` needs.
    case "function": {
      const params = (node.parameters ?? []).map(
        (one: Node, at: number) => `${one.name ?? `arg${at}`}: ${type(one)}`,
      );
      return `(${params.join(", ")}) => ${type(node.returnType)}`;
    }
    case "void":
      return "void";
    case "object": {
      const members = Object.entries(node.properties ?? {}).map(
        ([name, child]) => `${name}: ${type(child as Node)}`,
      );
      if (members.length === 0) {
        return "{}";
      }
      return `{ ${members.join("; ")} }`;
    }
    case "string":
      return "string";
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    default:
      throw new Error(`unhandled node: ${JSON.stringify(node).slice(0, 60)}`);
  }
}

/** An `allOf` split into what it extends and the one object of its own. */
const parts = (node: Node) => ({
  bases: (node.allOf ?? [])
    .filter((one: Node) => typeof one.$ref === "string")
    .map((one: Node) => one.$ref as string),
  own: (node.allOf ?? []).find((one: Node) => one.type === "object") ?? {},
});

/** What a property admits, which is where the boundary is drawn. */
function property(name: string, node: Node, required: boolean): string {
  const optional = required ? "" : "?";
  // Which prop holds what is written inside a tag is JSX's own rule — the one
  // `JSX.ElementChildrenAttribute` names — so the *wrapper* is decided here and
  // what it wraps comes from the schema.
  let written: string;
  if (name === "children") {
    written = `Children<${type(node)}>`;
  } else if (node.type === "function") {
    written = `Client<${type(node)}>`;
  } else {
    written = `Prop<${type(node)}>`;
  }
  const key = /^[A-Za-z_$][\w$]*$/.test(name) ? name : JSON.stringify(name);
  return `  ${key}${optional}: ${written};`;
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
lines.push("");

for (const [name, node] of Object.entries(aliases as Record<string, Node>)) {
  lines.push(`export type ${name} = ${type(node)};`);
  lines.push("");
}

for (const [name, node] of Object.entries(interfaces as Record<string, Node>)) {
  const { bases, own } = parts(node);
  const required: string[] = own.required ?? [];
  const extend = bases.length > 0 ? ` extends ${bases.join(", ")}` : "";
  lines.push(`export interface ${name}${extend} {`);
  for (const [key, child] of Object.entries(
    (own.properties ?? {}) as Record<string, Node>,
  )) {
    lines.push(property(key, child, required.includes(key)));
  }
  lines.push(`}`);
  lines.push("");
}

lines.push(`export interface IntrinsicElements {`);
for (const [tag, name] of Object.entries(elements as Record<string, string>)) {
  const key = /^[A-Za-z_$][\w$]*$/.test(tag) ? tag : JSON.stringify(tag);
  lines.push(`  ${key}: ${name};`);
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
