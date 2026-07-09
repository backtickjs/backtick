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
// maps each label (`#fi`) to its source as an arrow `(params) => body`.
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
// A splice hole is filled one of two ways, chosen per entry:
//
//   - Monomorphic entry — every reference to it passes structurally identical
//     splice arguments. The arguments are inlined directly into the body (a
//     nested-script argument as a call `#fj(...)`, a runtime value as a literal),
//     so the entry takes no splice parameters.
//   - Polymorphic entry — the same body (one source location) is reached with
//     differing splice arguments, as when a host helper builds a fragment from
//     its parameters and is called more than once (see the `splice-sharing`
//     fixture). Its splices can't be baked in, so each becomes a parameter
//     `$i`: the body fills the hole with `$i()` and every reference passes that
//     call's argument as a thunk. This threads splices exactly like captures,
//     just positionally.
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

  // Every reference reaching each entry, grouped by target. Walking from the
  // root's argument tree reaches the whole table, since each nested script is
  // lowered to a reference nested in some entry's splice arguments.
  const refsByTarget = new Map<number, ScriptRef[]>();
  const seenRefs = new Set<ScriptRef>();
  const collectRefs = (ref: ScriptRef): void => {
    const list = refsByTarget.get(ref.target);
    if (list) {
      list.push(ref);
    } else {
      refsByTarget.set(ref.target, [ref]);
    }
    if (seenRefs.has(ref)) {
      return; // a shared reference (a diamond arm) is descended into only once
    }
    seenRefs.add(ref);
    for (const child of nestedRefs(ref.args)) {
      collectRefs(child);
    }
  };
  for (const ref of nestedRefs([bundle.root])) {
    collectRefs(ref);
  }

  // An entry is polymorphic when it is reached by more than one distinct
  // reference: its body (one source location) is shared across call sites that
  // pass different splices, so the splices can't be inlined and must be threaded
  // as parameters instead. `buildBundle` interns one reference per source node,
  // so "more than one reference object" means the entry is reached from more than
  // one splice site — the only way its arguments can vary. Comparing reference
  // identity keeps this O(1) per entry; comparing the arguments structurally
  // would re-expand shared subtrees and cost 2^depth on a diamond.
  const polymorphic = new Set<number>();
  for (const [target, refs] of refsByTarget) {
    if (new Set(refs).size > 1) {
      polymorphic.add(target);
    }
  }

  // A representative splice-argument list for an entry. For a monomorphic entry
  // every reference agrees, so any list stands in for all of them.
  const monoArgs = (target: number): readonly Argument[] =>
    refsByTarget.get(target)?.[0]?.args ?? [];

  // The captures an entry must receive as parameters: its own free variables
  // plus, for a monomorphic entry, the captures free in the arguments it inlines
  // — minus the ones it binds itself. A polymorphic entry inlines nothing (its
  // arguments arrive as thunks bound at the call site), so it needs only its own
  // free variables. Binding keys are globally unique, so a capture is identified
  // by key alone. Returned in a stable order (own captures first); memoized, with
  // a cycle guard for self-referential scripts.
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
    if (!polymorphic.has(i)) {
      for (const arg of monoArgs(i)) {
        for (const key of freeCaps(arg)) {
          add(key);
        }
      }
    }
    const result = order.filter((key) => !declaredKeys[i].has(key));
    needStack.delete(i);
    needCache.set(i, result);
    return result;
  };

  // The captures that the rendered form of a splice argument refers to in the
  // enclosing scope: whatever its target still needs, plus — when the target is
  // polymorphic — the captures of the thunks passed for its splices, since those
  // thunks are written inline at this call site.
  const freeCaps = (value: Argument): string[] => {
    if (value instanceof ScriptRef) {
      const keys = [...need(value.target)];
      if (polymorphic.has(value.target)) {
        for (const arg of value.args) {
          keys.push(...freeCaps(arg));
        }
      }
      return keys;
    }
    if (Array.isArray(value)) {
      return value.flatMap(freeCaps);
    }
    if (value !== null && typeof value === "object") {
      return Object.values(value).flatMap(freeCaps);
    }
    return [];
  };

  const bodies = new Map<number, string>();

  // Materializes an entry's arrow into `bodies` the first time it is reached. A
  // polymorphic entry takes a `$i` parameter per splice (its holes render as
  // `$i()`) ahead of its captures; a monomorphic entry inlines its splice
  // arguments and takes only captures.
  const materialize = (target: number): void => {
    if (bodies.has(target)) {
      return;
    }
    bodies.set(target, ""); // reserve the slot to break reference cycles
    const captureParams = need(target).map(displayName);
    let params: string[];
    let renderSplice: RenderSplice;
    if (polymorphic.has(target)) {
      const arity = monoArgs(target).length;
      const spliceParams = Array.from({ length: arity }, (_, i) => `$${i}`);
      params = [...spliceParams, ...captureParams];
      renderSplice = (index) => `$${index}()`;
    } else {
      params = captureParams;
      const args = monoArgs(target);
      renderSplice = (index) => renderValue(args[index]);
    }
    const body = serializeScript(fns[target].body, renderSplice, displayName);
    bodies.set(target, `(${params.join(", ")}) => ${body}`);
  };

  // The arguments passed when calling an entry: for a polymorphic target, one
  // thunk per splice (bound to this reference's arguments) ahead of its
  // captures; for a monomorphic target, just its captures.
  const callArgs = (ref: ScriptRef): string[] => {
    const parts: string[] = [];
    if (polymorphic.has(ref.target)) {
      for (const arg of ref.args) {
        parts.push(renderThunk(arg));
      }
    }
    for (const key of need(ref.target)) {
      parts.push(displayName(key));
    }
    return parts;
  };

  // Renders a bundle argument in value position — as the value it evaluates to.
  // A script reference becomes a call `#ftarget(...)`; every other value its
  // literal form.
  const renderValue = (value: Argument): string => {
    if (value instanceof ScriptRef) {
      materialize(value.target);
      return `#f${value.target}(${callArgs(value).join(", ")})`;
    }
    if (value === null) {
      return "null";
    }
    if (typeof value === "number") {
      return value.toString();
    }
    if (typeof value === "string") {
      return `"${value}"`;
    }
    if (typeof value === "boolean") {
      return value ? "true" : "false";
    }
    if (Array.isArray(value)) {
      return `[${value.map(renderValue).join(", ")}]`;
    }
    if (typeof value === "object") {
      const entries = Object.entries(value).map(
        ([key, entry]) => `${key}: ${renderValue(entry)}`,
      );
      return entries.length === 0 ? "({})" : `({ ${entries.join(", ")} })`;
    }
    const unhandled: never = value;
    throw new Error(`Unhandled bundle argument: ${JSON.stringify(unhandled)}`);
  };

  // Renders a splice argument in thunk position — as a nullary function that
  // yields the value — so a polymorphic entry evaluates it lazily at the hole,
  // mirroring an inlined splice. A referenced entry that already takes no
  // arguments is a nullary thunk as-is; anything else is wrapped in an arrow.
  const renderThunk = (value: Argument): string => {
    if (value instanceof ScriptRef) {
      materialize(value.target);
      const args = callArgs(value);
      return args.length === 0
        ? `#f${value.target}`
        : `() => #f${value.target}(${args.join(", ")})`;
    }
    return `() => ${renderValue(value)}`;
  };

  const root = renderValue(bundle.root);
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
    } else if (Array.isArray(value)) {
      value.forEach(visit);
    } else if (value !== null && typeof value === "object") {
      Object.values(value).forEach(visit);
    }
  };
  values.forEach(visit);
  return refs;
}

// Renders a client script's AST body to a single-line JavaScript expression,
// formatted for embedding: blocks stay on one line and splice holes are filled
// by `renderSplice` (with the arguments passed to the script). Every binding
// key is printed under its `mangle`d display name — the source name,
// disambiguated only where needed — and a captured variable is received as a
// parameter under that same name, so the reference and its parameter still
// line up.
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
