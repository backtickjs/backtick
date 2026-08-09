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
import type { Schema } from "./Schema.js";

// A schema to the `jsx-runtime` an app writes against.
//
// Named for what it makes and not the language it makes it in: a client's
// stubs would be TypeScript too, and those are a different artifact. One of
// these per artifact, each reading the same schema.
//
// This is the one an app typechecks against, so it is also where the
// host/client boundary is put back — `Prop<T>` and `Client<T>` are policy the
// schema does not carry, because a native client drops them entirely.

/** The `jsx-runtime` a target ships: its tags, their props, and the namespace
 * TypeScript reads them through. */
export function emitJsx(schema: Schema): string {
  const { aliases, elements, interfaces } = schema;

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
  lines.push(`  JsxElementType,`);
  lines.push(`  Prop,`);
  lines.push(`} from "@backtickjs/cs-runtime";`);
  lines.push(`import {`);
  if ("FragmentProps" in interfaces) {
    lines.push(`  createFragment,`);
  }
  lines.push(`  createJsxElement,`);
  lines.push(`} from "@backtickjs/cs-runtime";`);
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

  lines.push(`export declare namespace JSX {`);
  lines.push(`  export interface Element extends JsxElement {}`);
  // The tags an app writes bare. TypeScript looks a lowercase name up here and
  // nowhere else, so a name this target does not declare is a type error rather
  // than something that quietly renders.
  lines.push(`  export interface IntrinsicElements {`);
  for (const [tag, name] of Object.entries(elements)) {
    lines.push(`    ${key(tag)}: ${name};`);
  }
  lines.push(`  }`);
  // What may stand as a tag, which is `cs-runtime`'s to say and not a target's:
  // a tag name, a component the app wrote, or one of the two the bundler
  // recognises. Naming the tags again here would say nothing — TypeScript looks
  // a lowercase name up in `IntrinsicElements` whatever this admits, so a name
  // this target does not declare is a type error either way.
  lines.push(`  export type ElementType = JsxElementType;`);
  lines.push(`  export interface ElementChildrenAttribute {`);
  lines.push(`    children: unknown;`);
  lines.push(`  }`);
  lines.push(`}`);
  lines.push("");

  // A tag is its own id, so nothing stands for one: `<div>` reaches the bundler
  // as `"div"`, which is the string the wire carries and the one a client
  // script's element already writes.
  lines.push(`export function jsx(`);
  lines.push(`  type: JSX.ElementType,`);
  lines.push(`  props: { [key: string]: unknown },`);
  lines.push(`): JSX.Element {`);
  lines.push(`  return createJsxElement(type, props);`);
  lines.push(`}`);
  lines.push("");
  lines.push(`export const jsxs = jsx;`);
  lines.push("");

  return lines.join("\n");
}
