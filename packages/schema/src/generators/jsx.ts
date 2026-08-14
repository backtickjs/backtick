import { IsApply } from "../nodes/Apply.js";
import { IsArray } from "../nodes/Array.js";
import { IsBoolean } from "../nodes/Boolean.js";
import { IsClass } from "../nodes/Class.js";
import { IsFunction } from "../nodes/Function.js";
import { IsGeneric } from "../nodes/Generic.js";
import { IsInterface } from "../nodes/Interface.js";
import { IsNull } from "../nodes/Null.js";
import { IsNumber } from "../nodes/Number.js";
import { IsObject } from "../nodes/Object.js";
import { IsOptional } from "../nodes/Optional.js";
import { IsRef } from "../nodes/Ref.js";
import { IsRest } from "../nodes/Rest.js";
import { IsString } from "../nodes/String.js";
import { IsUnion } from "../nodes/Union.js";
import { IsUnknown } from "../nodes/Unknown.js";
import { IsVoid } from "../nodes/Void.js";
import { IsFunctionParameter } from "../nodes/FunctionParameter.js";
import type { TGenericParameter } from "../nodes/GenericParameter.js";
import { flatten } from "../flatten.js";
import type { ClientSchema } from "../ClientSchema.js";
import type { TNode } from "../TNode.js";

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
export function jsx(schema: ClientSchema): string {
  // What this client can do is what it declares and what it inherited.
  const { types, elements } = flatten(schema);

  /**
   * The names this file declares: every one the target wrote, and the
   * inherited ones something it writes reaches.
   *
   * A base is a schema of its own and its names are its own to declare — a core
   * class a value autoboxes to belongs to the package that implements it, and
   * writing it here would be a second declaration of a name this target does
   * not own. What an element reaches is different: a prop typed by an inherited
   * name needs that name in scope beside the prop.
   *
   * Everything the target declared is kept whether anything reaches it or not,
   * because a target may publish a name for its own reasons — `FragmentProps`
   * is reached by no element and is what `createFragment` is given.
   */
  function namesToEmit(): ReadonlySet<string> {
    // `schema.types` before flattening is what this target wrote; anything else
    // in `types` came from a base.
    const names = new Set(Object.keys(schema.types));

    // Tracked apart from the answer: a name already being emitted still has to
    // be read, or a base's name reached only through one of the target's own
    // types would be left undeclared.
    const walked = new Set<string>();

    // Every `$ref` under here is a name that has to be in scope, and what it
    // points at may name more. Walked without a case per kind on purpose: a ref
    // is a ref wherever it sits, and a kind added later is followed without
    // this having to learn about it.
    const follow = (node: unknown): void => {
      if (typeof node !== "object" || node === null) {
        return;
      }
      if (Array.isArray(node)) {
        node.forEach(follow);
        return;
      }
      if (IsRef(node)) {
        names.add(node.$ref);
        if (!walked.has(node.$ref)) {
          walked.add(node.$ref);
          follow(types[node.$ref]);
        }
      }
      Object.values(node).forEach(follow);
    };

    // From what the target draws and from what it declares: both are written
    // into this file, so both may name something that has to be.
    Object.values(elements).forEach(follow);
    Object.values(schema.types).forEach(follow);
    return names;
  }

  const emitted = namesToEmit();

  /** What a schema node reads as, in TypeScript. */
  function type(node: TNode): string {
    // A `$ref` is a name, whether the document declares it or the boundary
    // supplies it — `JsxElement` is the second kind, and reads no differently.
    if (IsRef(node)) {
      return node.$ref;
    }
    if (IsUnion(node)) {
      return node.anyOf.map((one) => type(one)).join(" | ");
    }
    if (IsInterface(node)) {
      throw new Error("an interface may only stand as a declaration");
    }
    if (IsClass(node)) {
      throw new Error("a class may only stand as a declaration");
    }
    if (IsFunction(node)) {
      const params = node.parameters.map((one, at) => parameter(one, at));
      return `(${params.join(", ")}) => ${type(node.returnType)}`;
    }
    if (IsGeneric(node)) {
      const declared = node.parameters.map(typeParameter);
      return `<${declared.join(", ")}>${type(node.expression)}`;
    }
    if (IsApply(node)) {
      const args = node.arguments.map(type);
      return `${type(node.target)}<${args.join(", ")}>`;
    }
    if (IsRest(node)) {
      throw new Error("a rest may only stand in a parameter list");
    }
    if (IsFunctionParameter(node)) {
      throw new Error(
        "a function parameter may only stand in a parameter list",
      );
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
    // Exhaustive: a kind added to `TNode` without a case above fails
    // here, where it is read, rather than at the throw below.
    const unread: never = node;
    throw new Error(`unhandled node: ${JSON.stringify(unread).slice(0, 60)}`);
  }

  /**
   * One entry in a parameter list.
   *
   * Named where the schema named it, and after where it stands otherwise —
   * TypeScript needs something written, and a parameter is a type until a
   * `FunctionParameter` gives it a name.
   */
  function parameter(node: TNode, at: number): string {
    if (IsRest(node)) {
      const items = node.items;
      return IsFunctionParameter(items)
        ? `...${items.name}: ${type(items.holds)}[]`
        : `...args: ${type(items)}[]`;
    }
    // `Optional` marks the node, and in a parameter list that is the caller's
    // choice to leave it out rather than a property that may be absent.
    const omittable = IsOptional(node) ? "?" : "";
    if (IsFunctionParameter(node)) {
      return `${node.name}${omittable}: ${type(node.holds)}`;
    }
    return `arg${at}${omittable}: ${type(node)}`;
  }

  /** One type parameter, with the constraint and default it was given. */
  function typeParameter(node: TGenericParameter): string {
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
  function bases(node: TNode): readonly string[] {
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
  function baseName(base: TNode): string {
    if (IsRef(base)) {
      return base.$ref;
    }
    const named = Object.entries(types).find(([, one]) => one === base);
    if (named === undefined) {
      throw new Error("an interface may only extend one the schema declares");
    }
    return named[0];
  }

  /** The properties a node holds, and whether each was written required. */
  function members(
    node: TNode,
  ): { name: string; node: TNode; required: boolean }[] {
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

  /**
   * One member of a class, as TypeScript writes it.
   *
   * A method where the member holds a function, so a generated surface reads
   * as the hand-written ones do, and a value it holds otherwise — `PI` is not
   * something a client answers when called.
   */
  function member(name: string, node: TNode): string {
    if (IsFunction(node)) {
      const params = node.parameters.map((one, at) => parameter(one, at));
      return `  ${key(name)}(${params.join(", ")}): ${type(node.returnType)};`;
    }
    return `  readonly ${key(name)}: ${type(node)};`;
  }

  /** A name TypeScript can read bare, or one it needs quoted. */
  const key = (name: string) =>
    /^[A-Za-z_$][\w$]*$/.test(name) ? name : JSON.stringify(name);

  /** What a property admits, which is where the boundary is drawn. */
  function property(name: string, node: TNode, required: boolean): string {
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
  function elementProps(node: TNode): string {
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
  if ("FragmentProps" in types) {
    lines.push(`  createFragment,`);
  }
  lines.push(`  createJsxElement,`);
  lines.push(`} from "@backtickjs/cs-runtime";`);
  lines.push("");

  // How a name is written follows from what it stands for: an interface where
  // the node is one, and a named type everywhere else. Written in the order
  // the schema declares them, which TypeScript does not mind — a type is in
  // scope wherever it is named, however late it is said.
  for (const [name, node] of Object.entries(types)) {
    // A name this target neither declared nor reaches belongs to a base, and
    // the package that declared it is where it is written.
    if (!emitted.has(name)) {
      continue;
    }
    if (IsInterface(node)) {
      const inherited = bases(node);
      const extend =
        inherited.length > 0 ? ` extends ${inherited.join(", ")}` : "";
      lines.push(`export interface ${name}${extend} {`);
      for (const one of members(node)) {
        lines.push(property(one.name, one.node, one.required));
      }
      lines.push(`}`);
    } else if (IsClass(node)) {
      lines.push(`export interface ${name} {`);
      for (const [member_, held] of Object.entries(node.members)) {
        lines.push(member(member_, held));
      }
      lines.push(`}`);
    } else if (IsGeneric(node) && IsClass(node.expression)) {
      const declared = node.parameters.map(typeParameter);
      lines.push(`export interface ${name}<${declared.join(", ")}> {`);
      for (const [member_, held] of Object.entries(node.expression.members)) {
        lines.push(member(member_, held));
      }
      lines.push(`}`);
    } else if (IsGeneric(node)) {
      const declared = node.parameters.map(typeParameter);
      lines.push(
        `export type ${name}<${declared.join(", ")}> = ${type(node.expression)};`,
      );
    } else {
      lines.push(`export type ${name} = ${type(node)};`);
    }
    lines.push("");
  }

  // `Fragment` is the one value emitted here, and its name is not the schema's
  // to choose: it is what the JSX transform imports for `<>…</>`. Its props are
  // an interface like any other, generated above. `createFragment` answers with
  // `Fragment<P>`, so an annotation would only repeat itself — and repeating it
  // is what would need the type imported.
  if ("FragmentProps" in types) {
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
