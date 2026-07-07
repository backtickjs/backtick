import type { AstNode } from "../ast/nodes/AstNode.js";
import { RuntimeArray } from "../ast/nodes/RuntimeArray.js";
import { RuntimeBoolean } from "../ast/nodes/RuntimeBoolean.js";
import { RuntimeNull } from "../ast/nodes/RuntimeNull.js";
import { RuntimeNumber } from "../ast/nodes/RuntimeNumber.js";
import { RuntimeObject } from "../ast/nodes/RuntimeObject.js";
import { RuntimeString } from "../ast/nodes/RuntimeString.js";
import { SourceArray } from "../ast/nodes/SourceArray.js";
import { SourceArrow } from "../ast/nodes/SourceArrow.js";
import { SourceAssignment } from "../ast/nodes/SourceAssignment.js";
import { SourceBinop } from "../ast/nodes/SourceBinop.js";
import { SourceBlock } from "../ast/nodes/SourceBlock.js";
import { SourceBoolean } from "../ast/nodes/SourceBoolean.js";
import { SourceCall } from "../ast/nodes/SourceCall.js";
import { SourceClientScript } from "../ast/nodes/SourceClientScript.js";
import { SourceIdentifier } from "../ast/nodes/SourceIdentifier.js";
import { SourceIf } from "../ast/nodes/SourceIf.js";
import { SourceNull } from "../ast/nodes/SourceNull.js";
import { SourceNumber } from "../ast/nodes/SourceNumber.js";
import { SourceObject } from "../ast/nodes/SourceObject.js";
import { SourcePropertyAccess } from "../ast/nodes/SourcePropertyAccess.js";
import { SourceReturn } from "../ast/nodes/SourceReturn.js";
import { SourceSplice } from "../ast/nodes/SourceSplice.js";
import { SourceString } from "../ast/nodes/SourceString.js";
import { SourceVariableDeclaration } from "../ast/nodes/SourceVariableDeclaration.js";
import type { Bundle } from "../bundle/Bundle.js";
import type { Argument } from "../bundle/nodes/Argument.js";
import { ConstArray } from "../bundle/nodes/ConstArray.js";
import { ConstBoolean } from "../bundle/nodes/ConstBoolean.js";
import { ConstNull } from "../bundle/nodes/ConstNull.js";
import { ConstNumber } from "../bundle/nodes/ConstNumber.js";
import { ConstObject } from "../bundle/nodes/ConstObject.js";
import { ConstString } from "../bundle/nodes/ConstString.js";
import { ScriptRef } from "../bundle/nodes/ScriptRef.js";

// Fills a splice hole in a script body with the value passed for that position.
type RenderSplice = (index: number) => string;

// Maps a binding key to the name it is printed under (see `displayName`).
type Mangle = (key: string) => string;

// Recovers the source name from a binding key `<name>$<salt>$<n>` by dropping
// the salt/counter suffix the compiler appends for global uniqueness. A free
// host reference carries no such suffix and is returned unchanged.
function sourceName(key: string): string {
  return key.replace(/\$[0-9a-z]+\$\d+$/, "");
}

// Serializes a bundle to a JSON envelope `{ functions, root }`. `functions`
// maps each label (`#fi`) to its source as an arrow `(captures) => body`, where
// every splice hole is inlined in place — a nested-script argument as a call
// `#fj(...)`, a runtime-value argument as a literal.
//
// A captured variable is threaded, not resolved by name at the splice site: a
// fragment written in one script but spliced (via host code) into another still
// refers to the binding it was written under. Each entry receives its live
// captures as parameters, and a reference to an entry passes those captures from
// the enclosing scope. Because the compiler gives every binding a globally
// unique name, a capture is threaded under that one name the whole way down — an
// intermediate entry that binds a same-looking variable has a different unique
// name, so there is nothing to disambiguate and nothing to rename.
//
// Because splice arguments are inlined into the callee's body, an entry is
// rendered with the arguments from the first call that reaches it; this assumes
// a shared entry is always called with the same arguments (true whenever a
// distinct script's splices are constant, as with the compiler's output today).
export function serializeBundle(bundle: Bundle): string {
  const fns = bundle.scripts;

  // Maps each binding key to a readable display name — its source name with the
  // uniqueness suffix (`$<salt>$<n>`) dropped — so the bundle reads like the
  // script it came from rather than exposing internal keys. A numeric suffix is
  // reattached only when distinct bindings share a source name (a shadowed or
  // threaded variable). The mapping is a bijection: the same key always renders
  // identically (so threaded captures still line up between a call site and its
  // parameter) and two different bindings never collapse onto one name (so no
  // accidental shadowing). Free host references carry no suffix and pass through
  // unchanged.
  const displayNames = new Map<string, string>();
  const usedNames = new Set<string>();
  const displayName = (key: string): string => {
    const existing = displayNames.get(key);
    if (existing !== undefined) {
      return existing;
    }
    const base = sourceName(key);
    let name = base;
    for (let n = 2; usedNames.has(name); n++) {
      name = `${base}${n}`;
    }
    usedNames.add(name);
    displayNames.set(key, name);
    return name;
  };

  // Names each entry's body declares (variable declarations and arrow
  // parameters, at any depth), computed once by the compiler and carried on the
  // entry. A capture an entry binds itself is supplied by that entry, not
  // received as a parameter.
  const declaredKeys = fns.map((fn) => new Set(fn.declarations));

  // The splice arguments each entry is called with, taken from the first call
  // that reaches it (see the shared-entry note above). Also delimits the set of
  // reachable entries.
  const argsOf = new Map<number, readonly Argument[]>();
  const collectArgs = (ref: ScriptRef): void => {
    if (argsOf.has(ref.target)) {
      return;
    }
    argsOf.set(ref.target, ref.args);
    for (const child of nestedRefs(ref.args)) {
      collectArgs(child);
    }
  };
  collectArgs(bundle.root);

  // The captures an entry must receive as parameters: its own free variables
  // plus every capture its spliced-in children need, minus the ones it binds
  // itself (those it supplies rather than receives). Binding keys are globally
  // unique, so a capture is identified by key alone. Returned in a stable order
  // (own captures first, then children's); memoized, with a cycle guard for
  // self-referential scripts.
  const needCache = new Map<number, string[]>();
  const needStack = new Set<number>();
  const need = (i: number): string[] => {
    const cached = needCache.get(i);
    if (cached) {
      return cached;
    }
    if (needStack.has(i)) {
      return [];
    }
    needStack.add(i);
    const order: string[] = [];
    const seen = new Set<string>();
    const add = (key: string): void => {
      if (!seen.has(key)) {
        seen.add(key);
        order.push(key);
      }
    };
    for (const key of fns[i].captures) {
      add(key);
    }
    for (const child of nestedRefs(argsOf.get(i) ?? [])) {
      for (const key of need(child.target)) {
        add(key);
      }
    }
    const result = order.filter((key) => !declaredKeys[i].has(key));
    needStack.delete(i);
    needCache.set(i, result);
    return result;
  };

  const bodies = new Map<number, string>();

  // Renders a reference to an entry as `#ftarget(captures)`, materializing the
  // target's inlined body into `bodies` the first time it is reached. Each
  // capture is passed by its unique name — a binding in the calling scope, or a
  // parameter the caller itself received under that same name.
  const renderRef = (target: number): string => {
    if (!bodies.has(target)) {
      bodies.set(target, ""); // reserve the slot to break reference cycles
      const params = need(target).map(displayName);
      const args = argsOf.get(target) ?? [];
      const body = serializeScript(
        fns[target].body,
        (index) => renderArgument(args[index]),
        displayName,
      );
      bodies.set(target, `(${params.join(", ")}) => ${body}`);
    }
    return `#f${target}(${need(target).map(displayName).join(", ")})`;
  };

  // Renders a bundle argument as a JavaScript expression: a script reference
  // becomes `#ftarget(...)`, every other value its literal form.
  const renderArgument = (value: Argument): string => {
    if (value instanceof ScriptRef) {
      return renderRef(value.target);
    }
    if (value instanceof ConstArray) {
      return `[${value.elements.map(renderArgument).join(", ")}]`;
    }
    if (value instanceof ConstObject) {
      const entries = Object.entries(value.entries).map(
        ([key, entry]) => `${key}: ${renderArgument(entry)}`,
      );
      return entries.length === 0 ? "{}" : `{ ${entries.join(", ")} }`;
    }
    if (value instanceof ConstNumber) {
      return value.value.toString();
    }
    if (value instanceof ConstString) {
      return JSON.stringify(value.value);
    }
    if (value instanceof ConstBoolean) {
      return value.value ? "true" : "false";
    }
    if (value instanceof ConstNull) {
      return "null";
    }
    const unhandled: never = value;
    throw new Error(`Unhandled bundle argument: ${JSON.stringify(unhandled)}`);
  };

  const root = renderRef(bundle.root.target);
  const functions: Record<string, string> = {};
  for (const index of [...bodies.keys()].sort((a, b) => a - b)) {
    functions[`#f${index}`] = bodies.get(index) ?? "";
  }
  return JSON.stringify({ functions, root }, null, 2);
}

// Collects every script reference reachable inside a list of splice arguments,
// descending into array and object values (a nested script may be spliced
// anywhere).
function nestedRefs(values: readonly Argument[]): ScriptRef[] {
  const refs: ScriptRef[] = [];
  const visit = (value: Argument): void => {
    if (value instanceof ScriptRef) {
      refs.push(value);
    } else if (value instanceof ConstArray) {
      value.elements.forEach(visit);
    } else if (value instanceof ConstObject) {
      Object.values(value.entries).forEach(visit);
    }
  };
  values.forEach(visit);
  return refs;
}

// Renders a client script's AST body to a single-line JavaScript expression.
// Mirrors `printAst`, but formats for embedding: blocks stay on one line and
// splice holes are filled by `renderSplice` (with the arguments passed to the
// script) rather than shown as `${...}` placeholders. Every binding key is
// printed under its `mangle`d display name — the source name, disambiguated only
// where needed — and a captured variable is received as a parameter under that
// same name, so the reference and its parameter still line up.
export function serializeScript(
  node: AstNode,
  renderSplice: RenderSplice,
  mangle: Mangle,
): string {
  const s = (child: AstNode): string =>
    serializeScript(child, renderSplice, mangle);
  if (node instanceof SourceArray) {
    return `[${node.elements.map(s).join(", ")}]`;
  }
  if (node instanceof SourceArrow) {
    const params = node.params
      .map((param) => mangle(param.bindingKey))
      .join(", ");
    return `(${params}) => ${s(node.body)}`;
  }
  if (node instanceof SourceAssignment) {
    return `${s(node.name)} = ${s(node.expression)};`;
  }
  if (node instanceof SourceBinop) {
    return `${s(node.lhs)} ${node.operator} ${s(node.rhs)}`;
  }
  if (node instanceof SourceBlock) {
    return serializeBlock(node.statements, renderSplice, mangle);
  }
  if (node instanceof SourceBoolean) {
    return node.value ? "true" : "false";
  }
  if (node instanceof SourceCall) {
    return `${s(node.callee)}(${node.args.map(s).join(", ")})`;
  }
  if (node instanceof SourceClientScript) {
    return `cs\`${s(node.expression)}\``;
  }
  if (node instanceof SourceIdentifier) {
    return mangle(node.bindingKey);
  }
  if (node instanceof SourceIf) {
    const head = `if (${s(node.condition)}) ${s(node.consequent)}`;
    return node.alternate === null ? head : `${head} else ${s(node.alternate)}`;
  }
  if (node instanceof SourceNull) {
    return "null";
  }
  if (node instanceof SourceNumber) {
    return node.value.toString();
  }
  if (node instanceof SourceObject) {
    return serializeObject(node.entries, s);
  }
  if (node instanceof SourcePropertyAccess) {
    return `${s(node.expression)}.${node.name}`;
  }
  if (node instanceof SourceReturn) {
    return `return ${s(node.expression)};`;
  }
  if (node instanceof SourceSplice) {
    return renderSplice(node.index);
  }
  if (node instanceof SourceString) {
    return `"${node.value}"`;
  }
  if (node instanceof SourceVariableDeclaration) {
    return `${node.keyword} ${s(node.name)} = ${s(node.expression)};`;
  }
  if (node instanceof RuntimeNull) {
    return "null";
  }
  if (node instanceof RuntimeNumber) {
    return node.value.toString();
  }
  if (node instanceof RuntimeBoolean) {
    return node.value ? "true" : "false";
  }
  if (node instanceof RuntimeString) {
    return `"${node.value}"`;
  }
  if (node instanceof RuntimeArray) {
    return `[${node.elements.map(s).join(", ")}]`;
  }
  if (node instanceof RuntimeObject) {
    return serializeObject(node.entries, s);
  }
  const unhandled: never = node;
  throw new Error(`Unhandled AST node: ${JSON.stringify(unhandled)}`);
}

// A block on a single line: `{ a; b; }`. Statements already carry their own
// terminators, so they are simply joined by spaces.
function serializeBlock(
  statements: readonly AstNode[],
  renderSplice: RenderSplice,
  mangle: Mangle,
): string {
  if (statements.length === 0) {
    return "{}";
  }
  const body = statements
    .map((statement) => serializeScript(statement, renderSplice, mangle))
    .join(" ");
  return `{ ${body} }`;
}

// An object literal wrapped in parentheses so it reads as an expression.
function serializeObject(
  entries: Readonly<Record<string, AstNode>>,
  s: (node: AstNode) => string,
): string {
  const body = Object.entries(entries)
    .map(([key, value]) => `${key}: ${s(value)}`)
    .join(", ");
  return `({${body}})`;
}
