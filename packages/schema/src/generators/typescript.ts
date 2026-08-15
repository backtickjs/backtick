import { IsApply } from "../nodes/Apply.js";
import { IsArray } from "../nodes/Array.js";
import { IsBoolean } from "../nodes/Boolean.js";
import { IsClass } from "../nodes/Class.js";
import { IsFunction } from "../nodes/Function.js";
import { IsFunctionParameter } from "../nodes/FunctionParameter.js";
import { IsGeneric } from "../nodes/Generic.js";
import { IsIndex } from "../nodes/Index.js";
import { IsInterface } from "../nodes/Interface.js";
import type { TInterface } from "../nodes/Interface.js";
import { IsNull } from "../nodes/Null.js";
import { IsNumber } from "../nodes/Number.js";
import { IsObject } from "../nodes/Object.js";
import { IsOptional } from "../nodes/Optional.js";
import { IsRecord } from "../nodes/Record.js";
import { IsRef } from "../nodes/Ref.js";
import { IsRest } from "../nodes/Rest.js";
import { IsString } from "../nodes/String.js";
import { IsUnion } from "../nodes/Union.js";
import { IsUnknown } from "../nodes/Unknown.js";
import { IsVoid } from "../nodes/Void.js";
import type { TGenericParameter } from "../nodes/GenericParameter.js";
import type { TNode } from "../TNode.js";

// Schema nodes to TypeScript, for the generators that write it.
//
// What a node reads as in the language, and nothing about the file it is going
// into: `jsx` wraps a target's props in `Prop<T>` and this does not, because
// that is JSX's rule rather than TypeScript's.

/** What a schema node reads as, in TypeScript. */
export function type(node: TNode): string {
  // A `$ref` is a name, whether the document declares it or the boundary
  // supplies it — `JsxElement` is the second kind, and reads no differently.
  if (IsRef(node)) {
    return node.$ref;
  }
  if (IsUnion(node)) {
    // A function type is parenthesized where it stands beside others: without
    // it, `=>` swallows the arms to its right.
    return node.anyOf
      .map((one) => (IsFunction(one) ? `(${type(one)})` : type(one)))
      .join(" | ");
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
    const declared = node.parameters.map((one) => typeParameter(one));
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
    throw new Error("a function parameter may only stand in a parameter list");
  }
  if (IsObject(node)) {
    const members = Object.entries(node.properties).map(
      ([name, child]) =>
        `${child.readOnly === true ? "readonly " : ""}${name}: ${type(child)}`,
    );
    return members.length === 0 ? "{}" : `{ ${members.join("; ")} }`;
  }
  // `| undefined` because that is what an index signature means in this
  // language: a key nobody wrote reads as absent. The schema says only that
  // the keys are open, and another target writes its own way of saying it.
  if (IsRecord(node)) {
    // `| undefined` because that is what reading a key it does not hold answers
    // with — TypeScript's reading of an index signature, not a value the
    // language has. A readonly record is written without it: nothing may add a
    // key, so what a reader finds is what the schema said.
    const written = node.readOnly === true ? "readonly " : "";
    const absent = node.readOnly === true ? "" : " | undefined";
    return `{ ${written}[key: string]: ${type(node.values)}${absent} }`;
  }
  if (IsArray(node)) {
    const items = node.items;
    const immutable = node.readOnly === true ? "readonly " : "";
    const written = type(items);
    return IsUnion(items) || IsFunction(items) || IsGeneric(items)
      ? `${immutable}(${written})[]`
      : `${immutable}${written}[]`;
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
  if (IsIndex(node)) {
    throw new Error("an index signature is a member, not a type");
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
export function parameter(node: TNode, at: number): string {
  if (IsRest(node)) {
    const items = node.items;
    // A union or a function is parenthesized before the `[]`, or the bracket
    // binds to its last arm: `(T | readonly T[])[]`, never `T | readonly T[][]`.
    const held = (of: TNode): string => {
      const written = type(of);
      return IsUnion(of) || IsFunction(of) ? `(${written})[]` : `${written}[]`;
    };
    return IsFunctionParameter(items)
      ? `...${items.name}: ${held(items.holds)}`
      : `...args: ${held(items)}`;
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
export function typeParameter(node: TGenericParameter, bound?: string): string {
  const constrained = !IsUnknown(node.extends);
  const constraint = constrained
    ? ` extends ${type(node.extends)}`
    : bound === undefined
      ? ""
      : ` extends ${bound}`;
  // `Parameter(name, extends)` fills the default in with the constraint, so a
  // default worth printing is one that differs from it.
  const fallback =
    !IsUnknown(node.equals) &&
    JSON.stringify(node.equals) !== JSON.stringify(node.extends)
      ? ` = ${type(node.equals)}`
      : "";
  return `${node.name}${constraint}${fallback}`;
}

/**
 * One member of a class, as TypeScript writes it.
 *
 * A method where the member holds a function, so a generated surface reads
 * as the hand-written ones do, and a value it holds otherwise — `PI` is not
 * something a client answers when called.
 */
export function member(name: string, node: TNode, bound?: string): string[] {
  const said = documentation(node, "  ", tags(node));
  // Not a member with a name: what stands where a name would is the key it is
  // reached by, and the name the schema gave it says what that key means.
  if (IsIndex(node)) {
    const written = node.readOnly === true ? "readonly " : "";
    return [
      ...said,
      `  ${written}[${node.name}: ${type(node.key)}]: ${type(node.value)};`,
    ];
  }
  // A method of its own — `from<T>(…)` — rather than a member holding a
  // generic function, which is what `type()` would write.
  if (IsGeneric(node) && IsFunction(node.expression)) {
    const declared = node.parameters.map((one) => typeParameter(one, bound));
    const params = node.expression.parameters.map((one, at) =>
      parameter(one, at),
    );
    return [
      ...said,
      `  ${key(name)}<${declared.join(", ")}>(${params.join(", ")}): ${type(
        node.expression.returnType,
      )};`,
    ];
  }
  if (IsFunction(node)) {
    const params = node.parameters.map((one, at) => parameter(one, at));
    return [
      ...said,
      `  ${key(name)}(${params.join(", ")}): ${type(node.returnType)};`,
    ];
  }
  return [...said, `  readonly ${key(name)}: ${type(node)};`];
}

/**
 * What a node says about itself, as the comment a reader of the generated
 * file gets.
 *
 * The prose is the specification — why `Math.round` ties up, why `sin` is
 * absent — so a generated surface that dropped it would be a worse file than
 * the hand-written one it replaces. Paragraphs are kept, and each is wrapped
 * to what is left of the line after the indent.
 */
export function documentation(
  node: TNode,
  indent: string,
  after: readonly string[] = [],
): string[] {
  const said = node.description;
  if (said === undefined && after.length === 0) {
    return [];
  }
  const width = 76 - indent.length;
  const lines: string[] = [];
  const wrap = (text: string): void => {
    let line = "";
    for (const word of text.split(/\s+/).filter(Boolean)) {
      if (line !== "" && `${line} ${word}`.length > width) {
        lines.push(`${indent} * ${line}`);
        line = word;
      } else {
        line = line === "" ? word : `${line} ${word}`;
      }
    }
    if (line !== "") {
      lines.push(`${indent} * ${line}`);
    }
  };

  for (const paragraph of (said ?? "").split("\n\n").filter(Boolean)) {
    if (lines.length > 0) {
      lines.push(`${indent} *`);
    }
    wrap(paragraph);
  }

  // Tags run together under one break, the way a hand-written block puts
  // them: they are a list about the signature rather than more prose.
  if (after.length > 0) {
    if (lines.length > 0) {
      lines.push(`${indent} *`);
    }
    after.forEach(wrap);
  }
  return [`${indent}/**`, ...lines, `${indent} */`];
}

/**
 * What a function's parameters say about themselves, as `@param` tags.
 *
 * A parameter carries a description like any other node, and a tag is where
 * TypeScript puts one — beside the signature rather than inside it.
 */
export function tags(node: TNode): string[] {
  const signature = IsGeneric(node) ? node.expression : node;
  if (!IsFunction(signature)) {
    return [];
  }
  const said: string[] = [];
  for (const one of signature.parameters) {
    const held = IsRest(one) ? one.items : one;
    if (IsFunctionParameter(held) && held.description !== undefined) {
      said.push(`@param ${held.name} ${held.description}`);
    }
  }
  return said;
}

/** A name TypeScript can read bare, or one it needs quoted. */
export const key = (name: string) =>
  /^[A-Za-z_$][\w$]*$/.test(name) ? name : JSON.stringify(name);

/** A named interface, as a reader of the generated file sees it. */
export function interfaceLines(
  name: string,
  node: TNode,
  bound?: string,
): string[] {
  const held = (of: TInterface): string[] =>
    Object.entries(of.properties).flatMap(([called, what]) =>
      member(called, what, bound),
    );
  // The type's own parameters carry no bound: `State<T>` is one declaration
  // that both ends name, and which values may reach it is said where they come
  // in — on the member that takes one.
  const parameters = (of: readonly TGenericParameter[]): string =>
    of.map((one) => typeParameter(one)).join(", ");
  // What it extends, written as the names it extends them by — a base is a
  // name here, never its properties spelled again.
  const heritage = (of: TInterface): string =>
    of.extends.length === 0
      ? ""
      : ` extends ${of.extends.map((one) => type(one)).join(", ")}`;
  if (IsGeneric(node) && IsInterface(node.expression)) {
    return [
      ...documentation(node, ""),
      `export interface ${name}<${parameters(node.parameters)}>${heritage(
        node.expression,
      )} {`,
      ...held(node.expression),
      "}",
    ];
  }
  if (!IsInterface(node)) {
    throw new Error(`${name} is not an interface`);
  }
  return [
    ...documentation(node, ""),
    `export interface ${name}${heritage(node)} {`,
    ...held(node),
    "}",
  ];
}

/** A class, as the interface a client implements. */
export function classLines(
  name: string,
  node: TNode,
): string[] {
  const held = (of: { members: Record<string, TNode> }): string[] =>
    Object.entries(of.members).flatMap(([called, what]) =>
      member(called, what),
    );
  if (IsGeneric(node) && IsClass(node.expression)) {
    const declared = node.parameters.map((one) => typeParameter(one));
    return [
      ...documentation(node, ""),
      `export interface ${name}<${declared.join(", ")}> {`,
      ...held(node.expression),
      "}",
    ];
  }
  if (!IsClass(node)) {
    throw new Error(`${name} is not a class`);
  }
  return [
    ...documentation(node, ""),
    `export interface ${name} {`,
    ...held(node),
    "}",
  ];
}