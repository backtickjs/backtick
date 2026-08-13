import { IsArray } from "../types/Array.js";
import { IsBoolean } from "../types/Boolean.js";
import { IsFunction } from "../types/Function.js";
import { IsGeneric } from "../types/Generic.js";
import { IsInterface } from "../types/Interface.js";
import { IsNull } from "../types/Null.js";
import { IsNumber } from "../types/Number.js";
import { IsObject } from "../types/Object.js";
import { IsRef } from "../types/Ref.js";
import { IsRest } from "../types/Rest.js";
import { IsString } from "../types/String.js";
import { IsUnion } from "../types/Union.js";
import { IsUnknown } from "../types/Unknown.js";
import { IsVoid } from "../types/Void.js";
import type { TParameter } from "../types/Parameter.js";
import type { Schema, SchemaNode } from "../Schema.js";

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
export function jsx(schema: Schema): string {
  const { aliases, elements, interfaces } = schema;

  /** What a schema node reads as, in TypeScript. */
  function type(node: SchemaNode): string {
    // A `$ref` is a name, whether the document declares it or the boundary
    // supplies it — `JsxElement` is the second kind, and reads no differently.
    if (IsRef(node)) {
      return node.$ref;
    }
    if (IsUnion(node)) {
      return node.anyOf.map((one) => type(one)).join(" | ");
    }
    if (IsInterface(node)) {
      throw new Error("an interface may only stand in `interfaces`");
    }
    // A function the schema did not name keeps its own signature, parameters and
    // all — the case `core`'s `onLayout(width, height)` needs.
    if (IsFunction(node)) {
      const params = node.parameters.map((one, at) => parameter(one, at));
      return `(${params.join(", ")}) => ${type(node.returnType)}`;
    }
    if (IsGeneric(node)) {
      const declared = node.parameters.map(typeParameter);
      return `<${declared.join(", ")}>${type(node.expression)}`;
    }
    if (IsRest(node)) {
      throw new Error("a rest may only stand in a parameter list");
    }
    if (IsObject(node)) {
      const members = Object.entries(node.properties).map(
        ([name, child]) => `${name}: ${type(child)}`,
      );
      return members.length === 0 ? "{}" : `{ ${members.join("; ")} }`;
    }
    if (IsArray(node)) {
      const items = node.items;
      const written = type(items);
      return IsUnion(items) || IsFunction(items) || IsGeneric(items)
        ? `(${written})[]`
        : `${written}[]`;
    }
    if (IsString(node)) {
      if ("const" in node) {
        return JSON.stringify(node.const);
      }
      return "string";
    }
    if (IsNumber(node)) {
      if ("const" in node) {
        return JSON.stringify(node.const);
      }
      return "number";
    }
    if (IsBoolean(node)) {
      if ("const" in node) {
        return JSON.stringify(node.const);
      }
      return "boolean";
    }
    if (IsVoid(node)) {
      return "void";
    }
    if (IsNull(node)) {
      return "null";
    }
    if (IsUnknown(node)) {
      throw new Error("an unknown may only stand as a type parameter's bound");
    }
    // Exhaustive: a kind added to `SchemaNode` without a case above fails
    // here, where it is read, rather than at the throw below.
    const unread: never = node;
    throw new Error(`unhandled node: ${JSON.stringify(unread).slice(0, 60)}`);
  }

  /**
   * One entry in a parameter list, called after where it stands.
   *
   * A parameter is a type and nothing else, so the name is this generator's to
   * invent — TypeScript needs one written and the schema has none to give. A
   * schema that comes to have something to say about a parameter says it with
   * a node for the purpose.
   */
  function parameter(node: SchemaNode, at: number): string {
    if (IsRest(node)) {
      return `...args: ${type(node.items)}[]`;
    }
    return `arg${at}: ${type(node)}`;
  }

  /** One type parameter, with the constraint and default it was given. */
  function typeParameter(node: TParameter): string {
    const constrained = !IsUnknown(node.extends);
    const constraint = constrained ? ` extends ${type(node.extends)}` : "";
    // `Parameter(name, extends)` fills the default in with the constraint, so a
    // default worth printing is one that differs from it.
    const fallback =
      !IsUnknown(node.equals) &&
      JSON.stringify(node.equals) !== JSON.stringify(node.extends)
        ? ` = ${type(node.equals)}`
        : "";
    return `${node.name}${constraint}${fallback}`;
  }

  /** What an interface extends, which an object never does. */
  function bases(node: SchemaNode): readonly string[] {
    return IsInterface(node) ? node.extends.map(baseName) : [];
  }

  /**
   * What a base is called, whichever way it was written.
   *
   * A base is a name here — `extends GlobalAttributes`, never the properties
   * spelled again — so an interface passed as itself has to be found among the
   * ones the schema declares. Identity, not shape: two interfaces holding the
   * same properties are still two names.
   */
  function baseName(base: SchemaNode): string {
    if (IsRef(base)) {
      return base.$ref;
    }
    const named = Object.entries(interfaces).find(([, one]) => one === base);
    if (named === undefined) {
      throw new Error("an interface may only extend one the schema declares");
    }
    return named[0];
  }

  /** The properties a node holds, and whether each was written required. */
  function members(
    node: SchemaNode,
  ): { name: string; node: SchemaNode; required: boolean }[] {
    if (!IsInterface(node) && !IsObject(node)) {
      return [];
    }
    const required = node.required ?? [];
    return Object.entries(node.properties).map(([name, child]) => ({
      name,
      node: child,
      required: required.includes(name),
    }));
  }

  /** A name TypeScript can read bare, or one it needs quoted. */
  const key = (name: string) =>
    /^[A-Za-z_$][\w$]*$/.test(name) ? name : JSON.stringify(name);

  /** What a property admits, which is where the boundary is drawn. */
  function property(name: string, node: SchemaNode, required: boolean): string {
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

  /**
   * What a tag accepts, as TypeScript reads it: the interface a `$ref` names,
   * or the properties written inline. Inline props go through `property` like
   * every other prop — the `Prop<T>`/`Client<T>`/`Children<T>` wrapping is JSX's
   * rule about props, not a rule about interfaces.
   */
  function elementProps(node: SchemaNode): string {
    if (IsRef(node)) {
      return node.$ref;
    }
    if (!IsObject(node) && !IsInterface(node)) {
      throw new Error(
        "an element's props are an interface it names, the properties " +
          `themselves, or both — this is a ${JSON.stringify(node).slice(0, 40)}`,
      );
    }
    const written = members(node).map((one) =>
      property(one.name, one.node, one.required).trim(),
    );
    const inline = written.length === 0 ? "{}" : `{ ${written.join(" ")} }`;
    return [...bases(node), inline].join(" & ");
  }

  const lines: string[] = [];
  lines.push("// Generated by `pnpm generate`. Do not edit.");
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
    const inherited = bases(node);
    const extend =
      inherited.length > 0 ? ` extends ${inherited.join(", ")}` : "";
    lines.push(`export interface ${name}${extend} {`);
    for (const one of members(node)) {
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
  for (const [tag, element] of Object.entries(elements)) {
    lines.push(`    ${key(tag)}: ${elementProps(element.props)};`);
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
