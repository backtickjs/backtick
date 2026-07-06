import type { SourceLocation } from "../../cs-runtime/index.js";
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
import { IrArray } from "../ir/nodes/IrArray.js";
import { IrBoolean } from "../ir/nodes/IrBoolean.js";
import { IrCall } from "../ir/nodes/IrCall.js";
import { IrNull } from "../ir/nodes/IrNull.js";
import { IrNumber } from "../ir/nodes/IrNumber.js";
import { IrObject } from "../ir/nodes/IrObject.js";
import { IrString } from "../ir/nodes/IrString.js";
import type { IrValue } from "../ir/nodes/IrValue.js";
import type { IrPayload } from "../ir/Payload.js";

// Fills a splice hole in a script body with the value passed for that position.
type RenderSplice = (index: number) => string;

// A free variable a body closes over, resolved to the entry that lexically binds
// it. `binder` is that entry's table index, or -1 when the variable is not bound
// by any enclosing script and so resolves at the bundle's runtime scope. Two
// captures with the same `binder` and `name` are the same binding, keyed by
// `identityKey`.
interface Capture {
  binder: number;
  name: string;
}

const RUNTIME_SCOPE = -1;

function identityKey(binder: number, name: string): string {
  return `${binder} ${name}`;
}

// Serializes a payload to a JSON envelope `{ functions, root }`. `functions`
// maps each label (`#fi`) to its source as an arrow `(captures) => body`, where
// every splice hole is inlined in place — a nested-script argument as a call
// `#fj(...)`, a runtime-value argument as a literal.
//
// A captured variable is threaded, not resolved by name at the splice site: a
// fragment written in one script but spliced (via host code) into another still
// refers to the binding it was written under. Each entry receives its live
// captures as parameters, and a reference to an entry passes those captures from
// the enclosing scope — flowing the binder's own value down through every
// intermediate entry to the fragment that reads it. Channel parameters are
// renamed away from any binding they pass through, so an intermediate entry that
// happens to declare the same name does not shadow the threaded value.
//
// Because splice arguments are inlined into the callee's body, an entry is
// rendered with the arguments from the first call that reaches it; this assumes
// a shared entry is always called with the same arguments (true whenever a
// distinct script's splices are constant, as with the compiler's output today).
export function serializePayload(payload: IrPayload): string {
  const fns = payload.functions;

  // Names declared inside each entry's body (variable declarations and arrow
  // parameters, at any depth). Used both to find the entry that binds a free
  // variable and to keep a threaded channel from colliding with a binding it is
  // passed through.
  const binds = fns.map((fn) => boundNames(fn.body));

  // The splice arguments each entry is called with, taken from the first call
  // that reaches it (see the shared-entry note above). Also delimits the set of
  // reachable entries.
  const argsOf = new Map<number, readonly IrValue[]>();
  const collectArgs = (call: IrCall): void => {
    if (argsOf.has(call.target)) {
      return;
    }
    argsOf.set(call.target, call.args);
    for (const child of nestedCalls(call.args)) {
      collectArgs(child);
    }
  };
  collectArgs(payload.root);

  const info = new Map<string, Capture>();

  // The innermost other entry whose source range contains entry `i` and that
  // declares `name` in a scope enclosing `i` — the script `name` was lexically
  // written under. Requiring the declaration to be in an *enclosing* block (not
  // merely somewhere in the entry) rules out a same-named binding in a sibling
  // scope. -1 when no enclosing script binds it, so it resolves at the bundle's
  // runtime scope.
  const binderOf = (i: number, name: string): number => {
    let best = -1;
    for (let j = 0; j < fns.length; j++) {
      if (j === i || !contains(fns[j].loc, fns[i].loc)) {
        continue;
      }
      if (!bindsInScopeOf(fns[j].body, name, fns[i].loc)) {
        continue;
      }
      if (best === RUNTIME_SCOPE || contains(fns[best].loc, fns[j].loc)) {
        best = j;
      }
    }
    return best;
  };

  // The captures an entry must receive as parameters: its own free variables
  // plus every capture its spliced-in children need, minus the ones it binds
  // itself (those it supplies rather than receives). Returned as identity keys
  // in a stable order; memoized, with a cycle guard for self-referential scripts.
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
    for (const name of fns[i].captures) {
      const binder = binderOf(i, name);
      const key = identityKey(binder, name);
      info.set(key, { binder, name });
      add(key);
    }
    for (const child of nestedCalls(argsOf.get(i) ?? [])) {
      for (const key of need(child.target)) {
        add(key);
      }
    }
    const result = order.filter((key) => info.get(key)?.binder !== i);
    needStack.delete(i);
    needCache.set(i, result);
    return result;
  };

  const reachable = [...argsOf.keys()];
  for (const i of reachable) {
    need(i);
  }
  const needSets = new Map<number, Set<string>>(
    reachable.map((i) => [i, new Set(need(i))]),
  );

  // Assigns each capture a channel variable name — its own name where that is
  // free of collisions, otherwise suffixed (`name$0`, `name$1`, …). A channel
  // must not clash with a binding in, or another channel already passed through,
  // any entry that receives it as a parameter.
  const channel = new Map<string, string>();
  const usedInFn = new Map<number, Set<string>>(
    reachable.map((i) => [i, new Set<string>()]),
  );
  for (const i of reachable) {
    for (const key of need(i)) {
      if (channel.has(key)) {
        continue;
      }
      const { name } = info.get(key) as Capture;
      const receivers = reachable.filter((f) => needSets.get(f)?.has(key));
      const collides = (candidate: string): boolean =>
        receivers.some(
          (f) => binds[f].has(candidate) || usedInFn.get(f)?.has(candidate),
        );
      let candidate = name;
      for (let n = 0; collides(candidate); n++) {
        candidate = `${name}$${n}`;
      }
      channel.set(key, candidate);
      for (const f of receivers) {
        usedInFn.get(f)?.add(candidate);
      }
    }
  }

  const bodies = new Map<number, string>();

  // Renders a reference to an entry as `#ftarget(channels)`, materializing the
  // target's inlined body into `bodies` the first time it is reached. Each
  // capture is passed from `scope` (the entry the reference appears in): by the
  // binder's own name when `scope` is that binder, otherwise by the channel
  // parameter `scope` received it through.
  const renderCall = (target: number, scope: number): string => {
    if (!bodies.has(target)) {
      bodies.set(target, ""); // reserve the slot to break reference cycles
      const params = need(target).map((key) => channel.get(key) as string);
      const rename = new Map<string, string>();
      for (const name of fns[target].captures) {
        rename.set(
          name,
          channel.get(identityKey(binderOf(target, name), name)) as string,
        );
      }
      const args = argsOf.get(target) ?? [];
      const body = serializeScript(
        fns[target].body,
        (index) => renderValue(args[index], target),
        rename,
      );
      bodies.set(target, `(${params.join(", ")}) => ${body}`);
    }
    const passed = need(target).map((key) => {
      const capture = info.get(key) as Capture;
      return capture.binder === scope
        ? capture.name
        : (channel.get(key) as string);
    });
    return `#f${target}(${passed.join(", ")})`;
  };

  // Renders an IR value as a JavaScript expression: a call becomes
  // `#ftarget(...)`, every other value its literal form.
  const renderValue = (value: IrValue, scope: number): string => {
    if (value instanceof IrCall) {
      return renderCall(value.target, scope);
    }
    if (value instanceof IrArray) {
      return `[${value.elements.map((e) => renderValue(e, scope)).join(", ")}]`;
    }
    if (value instanceof IrObject) {
      const entries = Object.entries(value.entries).map(
        ([key, entry]) => `${key}: ${renderValue(entry, scope)}`,
      );
      return entries.length === 0 ? "{}" : `{ ${entries.join(", ")} }`;
    }
    if (value instanceof IrNumber) {
      return value.value.toString();
    }
    if (value instanceof IrString) {
      return JSON.stringify(value.value);
    }
    if (value instanceof IrBoolean) {
      return value.value ? "true" : "false";
    }
    if (value instanceof IrNull) {
      return "null";
    }
    const unhandled: never = value;
    throw new Error(`Unhandled IR node: ${JSON.stringify(unhandled)}`);
  };

  const root = renderCall(payload.root.target, RUNTIME_SCOPE);
  const functions: Record<string, string> = {};
  for (const index of [...bodies.keys()].sort((a, b) => a - b)) {
    functions[`#f${index}`] = bodies.get(index) ?? "";
  }
  return JSON.stringify({ functions, root }, null, 2);
}

// Collects every IR call reachable inside a list of splice arguments, descending
// into array and object values (a nested script may be spliced anywhere).
function nestedCalls(values: readonly IrValue[]): IrCall[] {
  const calls: IrCall[] = [];
  const visit = (value: IrValue): void => {
    if (value instanceof IrCall) {
      calls.push(value);
    } else if (value instanceof IrArray) {
      value.elements.forEach(visit);
    } else if (value instanceof IrObject) {
      Object.values(value.entries).forEach(visit);
    }
  };
  values.forEach(visit);
  return calls;
}

// Every variable name a script body declares — variable declarations and arrow
// parameters, at any depth. Splice holes are not descended into; a spliced-in
// nested script is a separate entry with its own scope.
function boundNames(node: AstNode): Set<string> {
  const names = new Set<string>();
  const visit = (current: AstNode): void => {
    if (current instanceof SourceVariableDeclaration) {
      if (current.name instanceof SourceIdentifier) {
        names.add(current.name.name);
      }
      visit(current.expression);
    } else if (current instanceof SourceArrow) {
      for (const param of current.params) {
        names.add(param);
      }
      visit(current.body);
    } else if (current instanceof SourceBlock) {
      current.statements.forEach(visit);
    } else if (current instanceof SourceArray) {
      current.elements.forEach(visit);
    } else if (current instanceof SourceObject) {
      Object.values(current.entries).forEach(visit);
    } else if (current instanceof SourceCall) {
      visit(current.callee);
      current.args.forEach(visit);
    } else if (current instanceof SourceBinop) {
      visit(current.lhs);
      visit(current.rhs);
    } else if (current instanceof SourceAssignment) {
      visit(current.name);
      visit(current.expression);
    } else if (current instanceof SourceIf) {
      visit(current.condition);
      visit(current.consequent);
      if (current.alternate) {
        visit(current.alternate);
      }
    } else if (current instanceof SourceReturn) {
      visit(current.expression);
    } else if (current instanceof SourcePropertyAccess) {
      visit(current.expression);
    }
    // Identifiers, literals, splices, and nested client scripts declare nothing.
  };
  visit(node);
  return names;
}

// True when a script body declares `name` in a lexical scope that encloses
// `target` — a variable declaration in, or arrow parameter of, some block/arrow
// whose source range contains `target`. Declarations hoist over their whole
// block, matching the compiler's free-variable analysis; a binding in a sibling
// block (one that does not contain `target`) does not count.
function bindsInScopeOf(
  body: AstNode,
  name: string,
  target: SourceLocation,
): boolean {
  let found = false;
  const walk = (node: AstNode): void => {
    if (found) {
      return;
    }
    if (node instanceof SourceBlock) {
      if (!contains(node.loc, target)) {
        return; // a sibling block: nothing it declares is in scope at `target`
      }
      for (const statement of node.statements) {
        if (
          statement instanceof SourceVariableDeclaration &&
          statement.name instanceof SourceIdentifier &&
          statement.name.name === name
        ) {
          found = true;
          return;
        }
      }
      node.statements.forEach(walk);
      return;
    }
    if (node instanceof SourceArrow) {
      if (!contains(node.loc, target)) {
        return;
      }
      if (node.params.includes(name)) {
        found = true;
        return;
      }
      walk(node.body);
      return;
    }
    forEachChild(node, walk);
  };
  walk(body);
  return found;
}

// Visits the direct child AST nodes of a source node. Splice holes and nested
// client scripts have no children reachable here (a spliced-in script is a
// separate entry with its own scope), and leaves have none.
function forEachChild(node: AstNode, visit: (child: AstNode) => void): void {
  if (node instanceof SourceArray) {
    node.elements.forEach(visit);
  } else if (node instanceof SourceArrow) {
    visit(node.body);
  } else if (node instanceof SourceAssignment) {
    visit(node.name);
    visit(node.expression);
  } else if (node instanceof SourceBinop) {
    visit(node.lhs);
    visit(node.rhs);
  } else if (node instanceof SourceBlock) {
    node.statements.forEach(visit);
  } else if (node instanceof SourceCall) {
    visit(node.callee);
    node.args.forEach(visit);
  } else if (node instanceof SourceIf) {
    visit(node.condition);
    visit(node.consequent);
    if (node.alternate) {
      visit(node.alternate);
    }
  } else if (node instanceof SourceObject) {
    Object.values(node.entries).forEach(visit);
  } else if (node instanceof SourcePropertyAccess) {
    visit(node.expression);
  } else if (node instanceof SourceReturn) {
    visit(node.expression);
  } else if (node instanceof SourceVariableDeclaration) {
    visit(node.name);
    visit(node.expression);
  }
}

// True when `outer`'s source range lexically contains `inner`'s: same file, and
// `inner` starts no earlier and ends no later than `outer`.
function contains(outer: SourceLocation, inner: SourceLocation): boolean {
  return (
    outer.path === inner.path &&
    !after(outer.start, inner.start) &&
    !after(inner.end, outer.end)
  );
}

function after(
  a: { line: number; character: number },
  b: { line: number; character: number },
): boolean {
  return a.line > b.line || (a.line === b.line && a.character > b.character);
}

// Renders a client script's AST body to a single-line JavaScript expression.
// Mirrors `printAst`, but formats for embedding: blocks stay on one line and
// splice holes are filled by `renderSplice` (with the arguments passed to the
// script) rather than shown as `${...}` placeholders. `rename` maps a free
// variable to the channel parameter carrying its captured value; a reference is
// renamed only where an inner binding does not shadow it.
export function serializeScript(
  node: AstNode,
  renderSplice: RenderSplice,
  rename: ReadonlyMap<string, string> = new Map(),
  shadowed: ReadonlySet<string> = new Set(),
): string {
  const s = (child: AstNode): string =>
    serializeScript(child, renderSplice, rename, shadowed);
  if (node instanceof SourceArray) {
    return `[${node.elements.map(s).join(", ")}]`;
  }
  if (node instanceof SourceArrow) {
    const inner = new Set([...shadowed, ...node.params]);
    return `(${node.params.join(", ")}) => ${serializeScript(node.body, renderSplice, rename, inner)}`;
  }
  if (node instanceof SourceAssignment) {
    return `${s(node.name)} = ${s(node.expression)};`;
  }
  if (node instanceof SourceBinop) {
    return `${s(node.lhs)} ${node.operator} ${s(node.rhs)}`;
  }
  if (node instanceof SourceBlock) {
    return serializeBlock(node.statements, renderSplice, rename, shadowed);
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
    const renamed = rename.get(node.name);
    return renamed !== undefined && !shadowed.has(node.name)
      ? renamed
      : node.name;
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
// terminators, so they are simply joined by spaces. Names the block declares
// shadow any channel rename within it (hoisted, matching the free-variable
// analysis), so a local binding is never mistaken for a captured value.
function serializeBlock(
  statements: readonly AstNode[],
  renderSplice: RenderSplice,
  rename: ReadonlyMap<string, string>,
  shadowed: ReadonlySet<string>,
): string {
  if (statements.length === 0) {
    return "{}";
  }
  const declared = new Set(shadowed);
  for (const statement of statements) {
    if (
      statement instanceof SourceVariableDeclaration &&
      statement.name instanceof SourceIdentifier
    ) {
      declared.add(statement.name.name);
    }
  }
  const body = statements
    .map((statement) =>
      serializeScript(statement, renderSplice, rename, declared),
    )
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
