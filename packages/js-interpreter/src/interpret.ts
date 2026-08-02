// The wire tags only. `@backtickjs/core` re-exports these, but reaching them
// that way pulls the bundler and `node:async_hooks` into the graph, which a
// browser cannot load. This subpath is the format module alone, and it
// imports nothing.
import { NodeKind, NodeField } from "@backtickjs/jit-bundler/format";
import type {
  Bundle,
  BundleArrayElement,
  BundleSpreadElementNode,
  BundleBinaryOperator,
  BundleBinaryExpressionNode,
  BundleExpr,
  BundleStatementNode,
  FunctionLabel,
  TreeLabel,
} from "@backtickjs/core";
import { compileElement, instanceOf } from "./view.js";
import type { Instance } from "./view.js";
import type { AppliedTree, Key, Value } from "./Value.js";

// A reference client: the interpreter the bundle wire format is specified
// against (see `jit-bundler/bundle/Bundle.ts`). It evaluates a bundle's `root`
// against its `functions` and `trees` tables and yields the resulting
// JavaScript value, so a host can draw it and tests can observe runtime
// behavior rather than only snapshotting shape.
//
// This half is evaluation alone. What a tree entry builds — and what keeps it
// current afterwards — is `view.ts`, which is the only part that knows a host
// exists.

// Everything the compiler reads. A tree expression and a body node are one
// grammar with two ends: the shared middle is literals, containers, names and
// entries, the tree end adds slots, cells, applications and elements, and the
// body end adds the statements and operators a script is written in. Compiling
// them together is what makes the middle exist once.
type Source = BundleExpr | BundleStatementNode;

// One frame per arrow application or block. Names are pre-resolved by the
// bundler and there are no globals: a name no frame binds is a malformed
// bundle.
//
// Names and values side by side rather than a `Map`. A frame binds one or two
// names — an arrow's parameters, a block's declarations — and a linear scan of
// that beats hashing it, where allocating the `Map` is what a call was mostly
// paying for.
export interface Scope {
  parent: Scope | null;
  names: string[];
  values: Value[];
  // What a slot and a cell resolve against, carried down every frame so a
  // thunk nested inside an element still knows whose slots it is reading.
  // Null in a `functions` entry, which resolves against its parameters alone:
  // a cell reaches one as an ordinary argument, and a slot never does.
  instance: Instance | null;
}

export function scopeOf(
  parent: Scope | null,
  instance: Instance | null = parent?.instance ?? null,
): Scope {
  return { parent, names: [], values: [], instance };
}

function bind(scope: Scope, name: string, value: Value): void {
  const at = scope.names.indexOf(name);
  if (at === -1) {
    scope.names.push(name);
    scope.values.push(value);
    return;
  }
  scope.values[at] = value;
}

function read(scope: Scope, name: string): Value {
  return scope.values[scope.names.indexOf(name)] ?? null;
}

function lookup(scope: Scope | null, name: string): Scope | null {
  for (let at = scope; at !== null; at = at.parent) {
    if (at.names.indexOf(name) !== -1) {
      return at;
    }
  }
  return null;
}

// An entry's function is a pure function of the bundle and the label — the
// tables never change, and an entry closes over nothing else, since its
// captures arrive as its own parameters. So it is built once per bundle rather
// than per reference: a reference reached inside a loop would otherwise
// allocate a closure per iteration. Every invocation still gets its own frame,
// so sharing the closure shares no state.
//
// Keyed weakly, so the table goes when the bundle does.
const functionsByBundle = new WeakMap<
  Bundle,
  Map<FunctionLabel, (...args: Value[]) => Value>
>();

// A `functions` entry as a function: its arrow, evaluated at the top level.
function getFunction(
  bundle: Bundle,
  label: FunctionLabel,
): (...args: Value[]) => Value {
  let built = functionsByBundle.get(bundle);
  if (built === undefined) {
    built = new Map();
    functionsByBundle.set(bundle, built);
  }
  const existing = built.get(label);
  if (existing !== undefined) {
    return existing;
  }
  const arrow = bundle.functions[label];
  if (arrow === undefined) {
    throw new Error(`unknown function entry ${label}`);
  }
  // Evaluated with no enclosing scope: an entry resolves only against its own
  // parameters, so there is nothing for it to close over.
  const fn = evaluate(bundle, arrow, null) as (...args: Value[]) => Value;
  built.set(label, fn);
  return fn;
}

// A `trees` entry as a function: it takes its slot values and applies the
// entry. Applying, not building — what a hole hands back is the application,
// and whoever holds it decides whether it is the row they already have.
function getTree(
  bundle: Bundle,
  label: TreeLabel,
): (...slots: Value[]) => Value {
  return (...slots: Value[]) => applied(bundle, label, slots, null);
}

function applied(
  bundle: Bundle,
  label: TreeLabel,
  slots: Value[],
  key: Key | null,
): AppliedTree {
  const tree = bundle.trees[label];
  if (tree === undefined) {
    throw new Error(`unknown tree entry ${label}`);
  }
  return { "@backtickjs": "AppliedTree", tree, key, slots };
}

// A node is compiled once into the closure that evaluates it, and that closure
// is what runs from then on. Deciding what kind of node this is happens per
// node instead of per evaluation — the same walk of the same tree, without
// re-reading a shape that has not changed since the bundle was parsed.
export type Compiled = (scope: Scope | null) => Value;
type Executed = (scope: Scope) => Completion;

const compiledNodes = new WeakMap<object, Compiled>();
const compiledStatements = new WeakMap<object, Executed>();

export function compile(bundle: Bundle, node: Source): Compiled {
  if (node === null || typeof node !== "object") {
    const literal = node as Value;
    return () => literal;
  }
  const already = compiledNodes.get(node);
  if (already !== undefined) {
    return already;
  }
  const made = buildNode(bundle, node);
  compiledNodes.set(node, made);
  return made;
}

export function evaluate(
  bundle: Bundle,
  node: Source,
  scope: Scope | null,
): Value {
  return compile(bundle, node)(scope);
}

function compileStatement(bundle: Bundle, node: BundleStatementNode): Executed {
  if (node === null || typeof node !== "object") {
    return () => advanced;
  }
  const already = compiledStatements.get(node);
  if (already !== undefined) {
    return already;
  }
  const made = buildStatement(bundle, node);
  compiledStatements.set(node, made);
  return made;
}

// A `#`-discriminated node, as opposed to plain JSON carrying itself.
// Bundling rejects plain data carrying `#` — the bundle's one reserved key —
// so the node reading is unambiguous.
function isNode(node: Source): node is Extract<Source, { "#": NodeKind }> {
  return (
    typeof node === "object" &&
    node !== null &&
    !Array.isArray(node) &&
    "#" in node
  );
}

function buildNode(bundle: Bundle, source: Source): Compiled {
  if (!isNode(source)) {
    if (Array.isArray(source)) {
      const members = compileElements(bundle, source);
      return (scope) => members(scope);
    }
    const data = source as { [key: string]: Source };
    const keys = Object.keys(data);
    const parts = keys.map((key) => compile(bundle, data[key]));
    return (scope) => {
      const object: { [key: string]: Value } = {};
      for (let at = 0; at < keys.length; at++) {
        object[keys[at]] = parts[at](scope);
      }
      return object;
    };
  }
  const node = source;
  switch (node["#"]) {
    // The enclosing entry's n-th argument. Read through the instance's
    // accessor, so whoever is reading depends on it: hand a row new slots and
    // exactly the props that read one run again.
    case NodeKind.GetSlot: {
      const index = node[NodeField.index];
      return (scope) => instanceOf(scope).slots()[index] ?? null;
    }
    case NodeKind.GetState: {
      const name = node[NodeField.name];
      return (scope) => {
        const handle = instanceOf(scope).handles?.get(name);
        if (handle === undefined) {
          throw new Error(`unknown state cell ${name}`);
        }
        return handle;
      };
    }
    case NodeKind.Identifier: {
      const name = node[NodeField.text];
      return (scope) => {
        const frame = lookup(scope, name);
        if (frame === null) {
          throw new Error(`unknown identifier ${name}`);
        }
        return read(frame, name);
      };
    }
    // An entry named rather than applied: the function it evaluates to, which
    // is what a hole handing over nothing would have called.
    case NodeKind.GetFunction: {
      const label = node[NodeField.label];
      return () => getFunction(bundle, label);
    }
    case NodeKind.GetTree: {
      const label = node[NodeField.label];
      return () => getTree(bundle, label);
    }
    case NodeKind.ApplyFunction: {
      const label = node[NodeField.label];
      const args = (node[NodeField.arguments] ?? []).map((arg) =>
        compile(bundle, arg),
      );
      return (scope) => {
        const supplied = args.map((arg) => arg(scope));
        return getFunction(bundle, label)(...supplied);
      };
    }
    // An entry applied, in a tree position or in a script alike: which entry,
    // with which arguments, and which of its siblings this one is. Nothing is
    // built here — whoever holds the application decides that, and for a list
    // that means deciding it against the list before.
    case NodeKind.ApplyTree: {
      const label = node[NodeField.label];
      const args = (node[NodeField.arguments] ?? []).map((arg) =>
        compile(bundle, arg),
      );
      const named = node[NodeField.key];
      const key = named === undefined ? null : compile(bundle, named);
      return (scope) =>
        applied(
          bundle,
          label,
          args.map((arg) => arg(scope)),
          key === null ? null : (key(scope) as Key | null),
        );
    }
    case NodeKind.Thunk: {
      const params = node[NodeField.parameters];
      const body = compile(bundle, node[NodeField.expression]);
      if (!params || params.length === 0) {
        return (scope) => () => body(scope);
      }
      // The hole call supplies the entry-scoped bindings the splice captures,
      // one value per parameter, over the enclosing frame.
      const names = params.map((param) => param[NodeField.name]);
      return (scope) =>
        (...args: Value[]) => {
          const frame = scopeOf(scope);
          for (let at = 0; at < names.length; at++) {
            bind(frame, names[at], args[at]);
          }
          return body(frame);
        };
    }
    case NodeKind.Element: {
      return compileElement(bundle, node);
    }
    // A global the format names and the host answers. This host is
    // JavaScript, so these are JavaScript's — which is what the curation is
    // for: every member here means the same thing everywhere.
    case NodeKind.Builtin: {
      const name = node[NodeField.name];
      const value = builtins[name];
      if (value === undefined) {
        throw new Error(`unknown builtin ${name}`);
      }
      return () => value;
    }
    case NodeKind.CallExpression: {
      // A method call binds its receiver, so `s.concat(y)` sees `this === s`.
      // Which of the two this is, is a property of the callee, so it is
      // decided here rather than on every call.
      const callee = node[NodeField.expression];
      const optionalCall = node[NodeField.questionDotToken];
      const args = compileElements(bundle, node[NodeField.arguments] ?? []);
      if (isNode(callee) && callee["#"] === NodeKind.PropertyAccessExpression) {
        const receiver = compile(bundle, callee[NodeField.expression]);
        const member = callee[NodeField.name];
        const optionalReceiver = callee[NodeField.questionDotToken];
        return (scope) => {
          // The receiver evaluates before the arguments; an optional receiver
          // (`a?.b(…)`) short-circuits a null object to null, arguments
          // unevaluated.
          const object = receiver(scope) as { [name: string]: Value };
          if (optionalReceiver && object === null) {
            return null;
          }
          const method = object[member];
          // An optional call (`a.b?.(…)`) short-circuits a null method the
          // same way, arguments unevaluated.
          if (optionalCall && method === null) {
            return null;
          }
          if (typeof method !== "function") {
            throw new Error(`${member} is not a function`);
          }
          return method.apply(object, args(scope));
        };
      }
      const target = compile(bundle, callee);
      return (scope) => {
        // The callee evaluates before the arguments; an optional call
        // (`cb?.(…)`) short-circuits a null callee to null, arguments
        // unevaluated.
        const value = target(scope);
        if (optionalCall && value === null) {
          return null;
        }
        if (typeof value !== "function") {
          throw new Error("callee is not a function");
        }
        return value(...args(scope));
      };
    }
    case NodeKind.PropertyAccessExpression: {
      const target = compile(bundle, node[NodeField.expression]);
      const member = node[NodeField.name];
      const optional = node[NodeField.questionDotToken];
      return (scope) => {
        const object = target(scope) as { [name: string]: Value };
        if (optional && object === null) {
          return null;
        }
        // An absent member reads as null — the language's absent value;
        // `undefined` never arises.
        return object[member] ?? null;
      };
    }
    case NodeKind.ElementAccessExpression: {
      const target = compile(bundle, node[NodeField.expression]);
      const argument = compile(bundle, node[NodeField.argumentExpression]);
      return (scope) => {
        const reached = target(scope);
        const key = argument(scope);
        if (Array.isArray(reached)) {
          // An array is reached by whole numbers in range; everything else
          // about it — a fractional key, a string one, one past either end —
          // is a place the array has nothing, which reads as null.
          return typeof key === "number" &&
            Number.isInteger(key) &&
            key >= 0 &&
            key < reached.length
            ? (reached[key] ?? null)
            : null;
        }
        // An object is reached by the names it holds itself: an inherited one
        // (`toString`) is not a member of the value, so it reads as absent
        // rather than handing back something from the host's prototypes.
        if (reached !== null && typeof reached === "object") {
          return typeof key === "string" &&
            Object.prototype.hasOwnProperty.call(reached, key)
            ? ((reached as { [name: string]: Value })[key] ?? null)
            : null;
        }
        return null;
      };
    }
    case NodeKind.BinaryExpression: {
      if (isAssignment(node)) {
        // An assignment, which is a binary expression here as it is in
        // TypeScript. The left is a name to bind, never a value to read, so it
        // is the one operand that isn't evaluated.
        const name = node[NodeField.left][NodeField.text];
        const right = compile(bundle, node[NodeField.right]);
        return (scope) => {
          const value = right(scope);
          const frame = lookup(scope, name);
          if (frame === null) {
            throw new Error(`unknown assignment target ${name}`);
          }
          bind(frame, name, value);
          // An assignment evaluates to the value assigned, as in JavaScript; in
          // statement position nothing reads it.
          return value;
        };
      }
      return compileBinop(
        node[NodeField.operatorToken],
        compile(bundle, node[NodeField.left]),
        compile(bundle, node[NodeField.right]),
      );
    }
    case NodeKind.PrefixUnaryExpression: {
      const operand = compile(bundle, node[NodeField.operand]);
      // A `!` operand is boolean, as a tested position always is, so this
      // negates rather than deciding what counts as true. A `-` operand is a
      // number, checked by the compiler as arithmetic everywhere else is.
      if (node[NodeField.operator] === "-") {
        return (scope) => -(operand(scope) as number);
      }
      return (scope) => !condition(operand(scope), "the operand of `!`");
    }
    case NodeKind.ConditionalExpression: {
      const test = compile(bundle, node[NodeField.condition]);
      const whenTrue = compile(bundle, node[NodeField.whenTrue]);
      const whenFalse = compile(bundle, node[NodeField.whenFalse]);
      // Only the taken branch evaluates.
      return (scope) =>
        condition(test(scope), "a ternary condition")
          ? whenTrue(scope)
          : whenFalse(scope);
    }
    case NodeKind.ArrowFunction: {
      const parameters = (node[NodeField.parameters] ?? []).map(
        (param) => param[NodeField.name],
      );
      const body = node[NodeField.body];
      const block =
        isNode(body) && body["#"] === NodeKind.Block
          ? compileStatement(bundle, body)
          : null;
      // A non-block body is an expression, implicitly returned.
      const expression = block === null ? compile(bundle, body) : null;
      return (scope) =>
        (...args: Value[]) => {
          const frame = scopeOf(scope);
          // A missing argument binds as null — the language's absent value;
          // `undefined` never arises (an omitted optional parameter reads
          // as null).
          for (let at = 0; at < parameters.length; at++) {
            bind(frame, parameters[at], at < args.length ? args[at] : null);
          }
          if (block === null) {
            return (expression as Compiled)(frame);
          }
          const completion = block(frame);
          if (completion.kind === "break" || completion.kind === "continue") {
            // The compiler rejects a jump with no loop to catch it, so one
            // reaching here means the bundle was not written by it.
            throw new Error(
              `A \`${completion.kind}\` in this bundle escaped its loop.`,
            );
          }
          return completion.kind === "returned" ? completion.value : null;
        };
    }
    default: {
      // Every remaining kind is a statement, which is not a value. A bundle
      // that puts one where a value is expected was not written by the
      // compiler.
      throw new Error(`\`${node["#"] as number}\` is not an expression`);
    }
  }
}

// The statement outcome of a block or one of its statements. `advanced` fell
// through to the next one; the rest are jumps, and every container passes one
// outward until something catches it: a loop catches `break` and `continue`,
// an arrow catches `returned` and answers with `value`.
interface Completion {
  kind: "advanced" | "returned" | "break" | "continue";
  value: Value;
}

const advanced: Completion = { kind: "advanced", value: null };
const broke: Completion = { kind: "break", value: null };
const continued: Completion = { kind: "continue", value: null };

// A bundle is data from elsewhere, and a loop that never ends is the one way it
// can hang the client rather than merely be wrong.
function guardTurns(turns: number, keyword: string): void {
  if (turns > 1_000_000) {
    throw new Error(`A \`${keyword}\` in this bundle ran a million times.`);
  }
}

function buildStatement(bundle: Bundle, node: BundleStatementNode): Executed {
  if (!isNode(node)) {
    // Plain JSON in statement position is an expression evaluated for its
    // effect.
    const run = compile(bundle, node);
    return (scope) => {
      run(scope);
      return advanced;
    };
  }
  switch (node["#"]) {
    case NodeKind.Block: {
      const statements = node[NodeField.statements] ?? [];
      // Declarations hoist to the block: a use before its declaration
      // resolves to the local (with value `null`), never outward. Which names
      // those are is a property of the block, so it is found once.
      const declared = statements
        .filter(
          (statement) =>
            isNode(statement) &&
            statement["#"] === NodeKind.VariableDeclaration,
        )
        .map((statement) => (statement as { e: string })[NodeField.name]);
      const body = statements.map((statement) =>
        compileStatement(bundle, statement),
      );
      return (scope) => {
        const frame = scopeOf(scope);
        for (const name of declared) {
          bind(frame, name, null);
        }
        for (const run of body) {
          const completion = run(frame);
          // A jump of any kind leaves the block; what catches it is further out.
          if (completion.kind !== "advanced") {
            return completion;
          }
        }
        return advanced;
      };
    }
    case NodeKind.VariableDeclaration: {
      const name = node[NodeField.name];
      const initializer = compile(bundle, node[NodeField.initializer]);
      return (scope) => {
        bind(scope, name, initializer(scope));
        return advanced;
      };
    }
    case NodeKind.IfStatement: {
      const test = compile(bundle, node[NodeField.expression]);
      const then = compileStatement(bundle, node[NodeField.thenStatement]);
      const otherwise =
        node[NodeField.elseStatement] === null
          ? null
          : compileStatement(bundle, node[NodeField.elseStatement]);
      return (scope) => {
        if (condition(test(scope), "an `if`")) {
          return then(scope);
        }
        return otherwise === null ? advanced : otherwise(scope);
      };
    }
    case NodeKind.WhileStatement: {
      const test = compile(bundle, node[NodeField.expression]);
      const body = compileStatement(bundle, node[NodeField.statement]);
      return (scope) => {
        let turns = 0;
        while (condition(test(scope), "a `while`")) {
          const completion = body(scope);
          if (completion.kind === "returned") {
            return completion;
          }
          if (completion.kind === "break") {
            return advanced;
          }
          // `continue` arrives here too, having nothing left to skip.
          guardTurns((turns += 1), "while");
        }
        return advanced;
      };
    }
    case NodeKind.ForStatement: {
      const init =
        node[NodeField.initializer] === null
          ? null
          : compileStatement(bundle, node[NodeField.initializer]);
      const test =
        node[NodeField.condition] === null
          ? null
          : compile(bundle, node[NodeField.condition]);
      const body = compileStatement(bundle, node[NodeField.statement]);
      const update =
        node[NodeField.incrementor] === null
          ? null
          : compileStatement(bundle, node[NodeField.incrementor]);
      return (scope) => {
        // The header binding lives in a scope of the loop's own, so it is gone
        // once the loop is.
        let frame = scopeOf(scope);
        if (init !== null) {
          init(frame);
        }
        let turns = 0;
        for (;;) {
          if (test !== null && !condition(test(frame), "a `for`")) {
            return advanced;
          }
          const completion = body(frame);
          if (completion.kind === "returned") {
            return completion;
          }
          if (completion.kind === "break") {
            return advanced;
          }
          // `continue` lands here, where falling off the end of the body lands:
          // the update runs either way.
          //
          // Each turn gets its own copy of the header scope, taken before the
          // update: an arrow built in one turn keeps that turn's values instead
          // of the ones the loop stopped at.
          frame = {
            parent: scope,
            names: frame.names.slice(),
            values: frame.values.slice(),
            instance: frame.instance,
          };
          if (update !== null) {
            update(frame);
          }
          guardTurns((turns += 1), "for");
        }
      };
    }
    case NodeKind.BreakStatement: {
      return () => broke;
    }
    case NodeKind.ContinueStatement: {
      return () => continued;
    }
    case NodeKind.ReturnStatement: {
      const value = compile(bundle, node[NodeField.expression]);
      return (scope) => ({ kind: "returned", value: value(scope) });
    }
    case NodeKind.ThrowStatement: {
      const thrown = compile(bundle, node[NodeField.expression]);
      return (scope) => {
        throw thrown(scope);
      };
    }
    case NodeKind.TryStatement: {
      const attempted = compileStatement(bundle, node[NodeField.tryBlock]);
      const clause = node[NodeField.catchClause];
      const caught = clause[NodeField.variableDeclaration];
      const handler = compileStatement(bundle, clause[NodeField.block]);
      return (scope) => {
        try {
          return attempted(scope);
        } catch (thrown) {
          // The catch binding scopes over the clause's block only, like an
          // arrow parameter over its body.
          const frame = scopeOf(scope);
          if (caught !== null) {
            bind(frame, caught, thrown as Value);
          }
          return handler(frame);
        }
      };
    }
    default: {
      // Every remaining kind is an expression, evaluated for its effect.
      const run = compile(bundle, node);
      return (scope) => {
        run(scope);
        return advanced;
      };
    }
  }
}

// Whether a list member is `...xs` rather than a value of its own.
function isSpread(
  element: BundleArrayElement,
): element is BundleSpreadElementNode {
  return (
    typeof element === "object" &&
    element !== null &&
    !Array.isArray(element) &&
    "#" in element &&
    element["#"] === NodeKind.SpreadElement
  );
}

// A list that may hold `...xs`: each member answers with one value or with the
// members of an array, and the list is what they add up to. A list with no
// spread in it compiles to a plain map — the flattening is a cost only where
// something is actually spread.
function compileElements(
  bundle: Bundle,
  elements: readonly (BundleArrayElement | BundleExpr)[],
): (scope: Scope | null) => Value[] {
  if (!elements.some((element) => isSpread(element as BundleArrayElement))) {
    const parts = elements.map((element) => compile(bundle, element as Source));
    return (scope) => parts.map((part) => part(scope));
  }
  const parts = elements.map((element) =>
    isSpread(element as BundleArrayElement)
      ? {
          spread: true,
          read: compile(
            bundle,
            (element as BundleSpreadElementNode)[NodeField.expression],
          ),
        }
      : { spread: false, read: compile(bundle, element as Source) },
  );
  return (scope) => {
    const out: Value[] = [];
    for (const part of parts) {
      const value = part.read(scope);
      if (!part.spread) {
        out.push(value);
        continue;
      }
      if (!Array.isArray(value)) {
        throw new Error("only an array can be spread");
      }
      for (const member of value) {
        out.push(member);
      }
    }
    return out;
  };
}

// The globals a script may reach, as `ClientMath` and `ClientArrayStatics` fix
// them. Written out rather than handed the host's own objects, so what a bundle
// can reach is a list somebody chose and a member left out stays left out —
// which is what keeps this client, the one the format is specified against,
// from accepting more than the format defines.
const builtins: { [name: string]: Value } = {
  Array: {
    // Not the host's `Array.from`: the mapper is required where the standard
    // library's is optional, and its first argument is `null` where the
    // standard library passes `undefined`.
    from: (source: Value, map: Value) => {
      const length =
        typeof source === "object" && source !== null && !Array.isArray(source)
          ? (source as { length?: Value }).length
          : null;
      if (typeof length !== "number") {
        throw new Error("`Array.from` builds from `{ length }`");
      }
      if (typeof map !== "function") {
        throw new Error("`Array.from` needs a mapper");
      }
      // Grown rather than sized. `new Array(n)` hands back an array the host
      // marks holey for the rest of its life, and everything derived from it
      // inherits that — the rows, the children, and whoever walks them.
      const made: Value[] = [];
      for (let at = 0; at < length; at++) {
        made.push(map(null, at));
      }
      return made;
    },
  },
  Math: {
    PI: Math.PI,
    E: Math.E,
    abs: (x: Value) => Math.abs(x as number),
    ceil: (x: Value) => Math.ceil(x as number),
    floor: (x: Value) => Math.floor(x as number),
    fround: (x: Value) => Math.fround(x as number),
    max: (...values: Value[]) => Math.max(...(values as number[])),
    min: (...values: Value[]) => Math.min(...(values as number[])),
    random: () => Math.random(),
    round: (x: Value) => Math.round(x as number),
    sign: (x: Value) => Math.sign(x as number),
    sqrt: (x: Value) => Math.sqrt(x as number),
    trunc: (x: Value) => Math.trunc(x as number),
  },
};

// Reads a value the language guarantees is boolean: a condition, or an operand
// of `&&`/`||`. The compiler rejects anything else — `cs.condition` exists to
// remove truthiness, and `non-boolean-condition`, `non-boolean-operand`,
// `nested-non-boolean-operand` and `ternary-condition` pin it — so this fires
// only on a bundle no toolchain produced.
//
// It is the interpreter's one runtime type check: whether an operand is boolean
// is a property of what an expression evaluated to, not of the bundle's shape.
// Checking beats borrowing JavaScript's falsiness, which would quietly accept
// `0` and `""` and give a reference implementation the wrong rule to port.
function condition(value: Value, what: string): boolean {
  if (value === true || value === false) {
    return value;
  }
  throw new Error(
    `${what} must be \`true\` or \`false\`: this language has no truthiness, ` +
      `and this bundle produced ${JSON.stringify(value) ?? typeof value}.`,
  );
}

// The `=` half of `BundleBinaryExpressionNode`, whose left is an identifier. A
// predicate rather than a comparison at the use site: the field is reached by a
// computed key, which TypeScript won't narrow a union through on its own.
function isAssignment(
  node: BundleBinaryExpressionNode,
): node is Extract<
  BundleBinaryExpressionNode,
  { [NodeField.operatorToken]: "=" }
> {
  return node[NodeField.operatorToken] === "=";
}

function compileBinop(
  // Every operator but `=`, which assigns rather than combining two values and
  // is answered where the node is read.
  operator: Exclude<BundleBinaryOperator, "=">,
  left: Compiled,
  right: Compiled,
): Compiled {
  // The logical operators evaluate their right operand lazily, and both
  // operands are boolean — so `&&` and `||` yield one. Checking only the left
  // would still branch correctly and then return whatever the right side was,
  // letting a non-boolean leak out as the result.
  //
  // `??` is the exception at both ends: it asks whether a value is absent, not
  // whether it is false, so either side may be any value.
  switch (operator) {
    case "&&":
      return (scope) =>
        condition(left(scope), "the left operand of `&&`")
          ? condition(right(scope), "the right operand of `&&`")
          : false;
    case "||":
      return (scope) =>
        condition(left(scope), "the left operand of `||`")
          ? true
          : condition(right(scope), "the right operand of `||`");
    case "??":
      return (scope) => {
        const value = left(scope);
        return value !== null ? value : right(scope);
      };
    case "+":
      // Two numbers add; a string on either side concatenates. Written out
      // because the cast the other arithmetic uses would be a lie here: it
      // erases, and JavaScript's `+` then does whichever the operands imply.
      // A client not written in JavaScript has to make the same choice, so the
      // choice belongs in the open.
      return (scope) => {
        const a = left(scope);
        const b = right(scope);
        if (typeof a === "number" && typeof b === "number") {
          return a + b;
        }
        if (typeof a === "string" || typeof b === "string") {
          return `${a as string | number}${b as string | number}`;
        }
        throw new Error(
          "`+` adds two numbers or concatenates with a string; this bundle " +
            `produced ${typeof a} + ${typeof b}.`,
        );
      };
    case "-":
      return (scope) => (left(scope) as number) - (right(scope) as number);
    case "*":
      return (scope) => (left(scope) as number) * (right(scope) as number);
    case "/":
      return (scope) => (left(scope) as number) / (right(scope) as number);
    case "%":
      return (scope) => (left(scope) as number) % (right(scope) as number);
    case "===":
      return (scope) => left(scope) === right(scope);
    case "!==":
      return (scope) => left(scope) !== right(scope);
    case "<":
      return (scope) => (left(scope) as number) < (right(scope) as number);
    case "<=":
      return (scope) => (left(scope) as number) <= (right(scope) as number);
    case ">":
      return (scope) => (left(scope) as number) > (right(scope) as number);
    case ">=":
      return (scope) => (left(scope) as number) >= (right(scope) as number);
  }
  // No `default`: the switch covers `BundleBinaryOperator`, so adding an
  // operator to the format is a compile error here rather than a throw at
  // evaluation.
  operator satisfies never;
  throw new Error(`unknown operator ${operator as string}`);
}
