// Types only, and nothing of the bundler's at all: a kind is written here as
// the number the format fixes it to, the way a client that never saw this
// repository would have to write it. That is the point of a reference client —
// what it needs from the format is the format, not a package.
import type {
  BundleArrayElement,
  BundleSpreadElementNode,
  BundleBinaryOperator,
  BundleExpressionNode,
  BundleStatementNode,
  FunctionLabel,
} from "@backtickjs/core";
import { builtins } from "./builtins.js";
import { globals } from "./globals.js";
import type { Instance } from "./Instance.js";
import { compileElement, compileFor } from "./view.js";
import type { Value } from "@backtickjs/cs-runtime";

// A reference client: the interpreter the bundle wire format is specified
// against (see `jit-bundler/bundle/Bundle.ts`). It evaluates a bundle's `root`
// against its `functions` table and yields the resulting
// JavaScript value, so a host can draw it and tests can observe runtime
// behavior rather than only snapshotting shape.
//
// This half is evaluation alone. What a drawing function builds — and what
// keeps it current afterwards — is `view.ts`, which is the only part that knows
// a host exists.

// Everything the compiler reads. A tree expression and a body node are one
// grammar with two ends: the shared middle is literals, containers, names and
// functions, the tree end adds applications and elements, and the
// body end adds the statements and operators a script is written in. Compiling
// them together is what makes the middle exist once.
type Source = BundleArrayElement | BundleStatementNode;

// One frame per arrow application or block. Names are pre-resolved by the
// bundler and there are no globals: a name no frame binds is a malformed
// bundle.
export interface Scope {
  parent: Scope | null;
  // Own properties only, which is why every read goes through `hasOwn`: a
  // binding named `toString` must not find `Object.prototype`'s.
  bindings: { [name: string]: Value };
}

// A frame lives as long as what closes over it — every handler a row writes
// keeps its row's — so an app with a thousand rows holds a thousand of these. A
// `Map` allocates its table before it holds anything; an object holding two
// bindings is the two bindings.
export function scopeOf(parent: Scope | null): Scope {
  return { parent, bindings: {} };
}

function bind(scope: Scope, name: string, value: Value): void {
  scope.bindings[name] = value;
}

function read(scope: Scope, name: string): Value {
  return scope.bindings[name] ?? null;
}

function lookup(scope: Scope | null, name: string): Scope | null {
  for (let at = scope; at !== null; at = at.parent) {
    if (Object.hasOwn(at.bindings, name)) {
      return at;
    }
  }
  return null;
}

// A `functions` label, compiled once per mount: in the mount's scope, so an
// element in its body has a host to build with, and once so that every
// reference is handed the same closure — a fresh one would be a fresh identity,
// and a prop holding it would be set again every time its position is read.
//
// ((scope: Scope | null) => Value) where it is first referred to rather than where it is first applied,
// which nothing needs yet: what will is the question a reference asks about a
// function, answered by compiling its body. One still being compiled stands in
// the table as itself, so a body reaching back finds it rather than compiling
// it again.
function compileFunction(
  instance: Instance,
  label: FunctionLabel,
): (...args: Value[]) => Value {
  const existing = instance.functions.get(label);
  if (existing !== undefined) {
    return existing;
  }
  const declared = instance.bundle.functions[label];
  if (declared === undefined) {
    throw new Error(`unknown function ${label}`);
  }
  instance.functions.set(label, () => {
    throw new Error(`\`${label}\` was applied while it was compiling`);
  });
  // An arrow and nothing else, which is what `BundleFunction` declares.
  const arrow = compile(instance, declared[0]);
  // In no scope rather than an empty one: a function reaches what encloses it
  // through its own parameters, so a frame binding nothing would only be one
  // more to walk past at the end of every name it fails to find.
  const closure = arrow(null) as (...args: Value[]) => Value;
  instance.functions.set(label, closure);
  return closure;
}

// A node is compiled once into the closure that evaluates it, and that closure
// is what runs from then on. Deciding what kind of node this is happens per
// node instead of per evaluation — the same walk of the same tree, without
// re-reading a shape that has not changed since the bundle was parsed.
//
// Once, and nothing here remembers that it was: a bundle is a tree, and a body
// is compiled where its parent is, so the walk reaches a node exactly once. A
// cache of compiled nodes would never be read — it would earn its place the day
// compilation goes lazy, a node compiled when it is first evaluated rather than
// when its parent is.
// What a compiled node is, and all it is: the closure that evaluates it. What
// evaluating yields is the only thing that differs between them — a value, a
// statement's completion, a list's members — so that is the return type and
// nothing else is.
// `Globals` describes this table from the authoring end, where `Value` is the
// same domain seen from the running end — the two representations `Value` names
// — so it is widened once, here, to be read by name.
const table = { ...globals, ...builtins } as unknown as Readonly<
  Record<string, Value>
>;

export function compile(
  instance: Instance,
  node: Source,
): (scope: Scope | null) => Value {
  if (node === null || typeof node !== "object") {
    const literal = node as Value;
    return () => literal;
  }
  return buildNode(instance, node);
}

export function evaluate(
  instance: Instance,
  node: Source,
  scope: Scope | null,
): Value {
  return compile(instance, node)(scope);
}

function compileStatement(
  instance: Instance,
  node: BundleStatementNode,
): (scope: Scope | null) => Completion {
  if (node === null || typeof node !== "object") {
    return () => advanced;
  }
  return buildStatement(instance, node);
}

// A node is an array and nothing else in a value slot is — an array of data
// travels under a `DataArray` node — so `Array.isArray` is the whole test, here
// and everywhere below.
function buildNode(
  instance: Instance,
  source: Source,
): (scope: Scope | null) => Value {
  if (!Array.isArray(source)) {
    const data = source as { [key: string]: Source };
    const keys = Object.keys(data);
    const parts = keys.map((key) => compile(instance, data[key]));
    return (scope) => {
      const object: { [key: string]: Value } = {};
      for (let at = 0; at < keys.length; at++) {
        object[keys[at]] = parts[at](scope);
      }
      return object;
    };
  }
  const node = source;
  switch (node[0]) {
    case 4: /* DataArray */ {
      const members = compileElements(instance, node[1]);
      return (scope) => members(scope);
    }
    // Storage, made where this stands: evaluating it twice is two storages,
    // which is why it is a kind and not a call of a name. Never settled — the
    // whole point of a cell is that what it holds moves.
    case 1000: /* Identifier */ {
      const name = node[1];
      return (scope) => {
        const frame = lookup(scope, name);
        if (frame === null) {
          throw new Error(`unknown identifier ${name}`);
        }
        return read(frame, name);
      };
    }
    // A function named rather than applied: what it evaluates to, which is what
    // a hole handing over nothing would have called.
    case 1: /* GetFunction */ {
      const label = node[1];
      // Looked up once, here: the table holds one closure per label, and every
      // reference is handed that one.
      const named = compileFunction(instance, label);
      return () => named;
    }
    // A function applied. The format spells this as one node because applying
    // is most of what a bundle does (see `BundleApplyFunction`), but it is
    // shorthand for a call of a `get` and must stay equivalent to one — so it
    // is expanded into exactly that and compiled as a call. Running a function
    // has one path here, so there is one place to answer what it costs and no
    // second place for that answer to drift.
    case 2: /* ApplyFunction */ {
      const [, label, args] = node;
      return compile(instance, [
        1001 /* CallExpression */,
        [1 /* GetFunction */, label],
        false,
        args,
      ]);
    }
    case 0: /* Element */ {
      return compileElement(instance, node);
    }
    // A list draws no node of its own, so it is a kind rather than an element
    // a reader has to know the id of.
    case 6: /* For */ {
      return compileFor(instance, node);
    }
    // A global the format names and this interpreter answers. Not the host's
    // own objects and not a table handed in from outside: the curated list is
    // what keeps every member meaning the same thing everywhere.
    case 3: /* Builtin */ {
      const name = node[1];
      const value = table[name];
      if (value === undefined) {
        throw new Error(`unknown builtin ${name}`);
      }
      return () => value;
    }
    case 1001: /* CallExpression */ {
      // A method call binds its receiver, so `s.concat(y)` sees `this === s`.
      // Which of the two this is, is a property of the callee, so it is
      // decided here rather than on every call.
      const callee = node[1];
      const optionalCall = node[2];
      const args = compileElements(instance, node[3]);
      if (
        Array.isArray(callee) &&
        callee[0] === 1002 /* PropertyAccessExpression */
      ) {
        const receiver = compile(instance, callee[1]);
        const optionalReceiver = callee[2];
        const member = callee[3];
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
      const target = compile(instance, callee);
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
    case 1002: /* PropertyAccessExpression */ {
      const target = compile(instance, node[1]);
      const optional = node[2];
      const member = node[3];
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
    case 1016: /* ElementAccessExpression */ {
      const target = compile(instance, node[1]);
      const argument = compile(instance, node[2]);
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
    case 1003: /* BinaryExpression */ {
      if (node[1] === "=") {
        // An assignment, which is a binary expression here as it is in
        // TypeScript. The left is a name to bind, never a value to read, so it
        // is the one operand that isn't evaluated.
        const target = node[2];
        // Only a variable can be assigned to, which the compiler enforces; a
        // bundle saying otherwise was not written by it.
        if (!Array.isArray(target) || target[0] !== 1000 /* Identifier */) {
          throw new Error("an assignment target must be an identifier");
        }
        const name = target[1];
        const right = compile(instance, node[3]);
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
      const left = compile(instance, node[2]);
      const right = compile(instance, node[3]);
      return compileBinop(node[1], left, right);
    }
    case 1019: /* PrefixUnaryExpression */ {
      const operand = compile(instance, node[2]);
      // A `!` operand is boolean, as a tested position always is, so this
      // negates rather than deciding what counts as true. A `-` operand is a
      // number, checked by the compiler as arithmetic everywhere else is.
      if (node[1] === "-") {
        return (scope) => -(operand(scope) as number);
      }
      return (scope) => !condition(operand(scope), "the operand of `!`");
    }
    case 1004: /* ConditionalExpression */ {
      const test = compile(instance, node[1]);
      const whenTrue = compile(instance, node[2]);
      const whenFalse = compile(instance, node[3]);
      // Only the taken branch evaluates.
      return (scope) =>
        condition(test(scope), "a ternary condition")
          ? whenTrue(scope)
          : whenFalse(scope);
    }
    case 1005: /* ArrowFunction */ {
      const parameters = node[1].map((param) => param[1]);
      const body = node[2];
      // A block runs its statements; anything else is an expression, which is
      // implicitly returned.
      const isBlock = Array.isArray(body) && body[0] === 1006; /* Block */
      const compiled = isBlock
        ? compileStatement(instance, body)
        : compile(instance, body);
      // Nothing to bind and nothing to declare: the body reads the enclosing
      // frame, so making one of its own would be an allocation per call for a
      // scope that holds nothing. Every splice argument is one of these.
      if (parameters.length === 0 && !isBlock) {
        const expression = compiled as (scope: Scope | null) => Value;
        return (scope) => () => expression(scope);
      }
      return (scope) =>
        (...args: Value[]) => {
          const frame = scopeOf(scope);
          // A missing argument binds as null — the language's absent value;
          // `undefined` never arises (an omitted optional parameter reads
          // as null).
          for (let at = 0; at < parameters.length; at++) {
            bind(frame, parameters[at], at < args.length ? args[at] : null);
          }
          if (!isBlock) {
            return (compiled as (scope: Scope | null) => Value)(frame);
          }
          const completion = (compiled as (scope: Scope | null) => Completion)(
            frame,
          );
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
      throw new Error(`\`${node[0] as number}\` is not an expression`);
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

function buildStatement(
  instance: Instance,
  node: BundleStatementNode,
): (scope: Scope | null) => Completion {
  if (!Array.isArray(node)) {
    // Plain JSON in statement position is an expression evaluated for its
    // effect.
    const run = compile(instance, node);
    return (scope) => {
      run(scope);
      return advanced;
    };
  }
  switch (node[0]) {
    case 1006: /* Block */ {
      const statements = node[1];
      // Declarations hoist to the block: a use before its declaration
      // resolves to the local (with value `null`), never outward. Which names
      // those are is a property of the block, so it is found once.
      const declared = statements
        .filter(
          (statement) =>
            Array.isArray(statement) &&
            statement[0] === 1007 /* VariableDeclaration */,
        )
        .map((statement) => (statement as unknown as [number, string])[1]);
      const body = statements.map((statement) =>
        compileStatement(instance, statement),
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
    case 1007: /* VariableDeclaration */ {
      const name = node[1];
      const initializer = compile(instance, node[2]);
      return (scope) => {
        // A declaration only ever runs inside the block that hoisted it, so
        // there is always a frame to bind into.
        bind(scope as Scope, name, initializer(scope));
        return advanced;
      };
    }
    case 1008: /* IfStatement */ {
      const test = compile(instance, node[1]);
      const then = compileStatement(instance, node[2]);
      const branch = node[3];
      const otherwise =
        branch === null ? null : compileStatement(instance, branch);
      return (scope) => {
        if (condition(test(scope), "an `if`")) {
          return then(scope);
        }
        return otherwise === null ? advanced : otherwise(scope);
      };
    }
    case 1012: /* WhileStatement */ {
      const test = compile(instance, node[1]);
      const body = compileStatement(instance, node[2]);
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
    case 1013: /* ForStatement */ {
      const initializer = node[1];
      const condition_ = node[2];
      const incrementor = node[3];
      const init =
        initializer === null ? null : compileStatement(instance, initializer);
      const test = condition_ === null ? null : compile(instance, condition_);
      const body = compileStatement(instance, node[4]);
      const update =
        incrementor === null ? null : compileStatement(instance, incrementor);
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
            bindings: { ...frame.bindings },
          };
          if (update !== null) {
            update(frame);
          }
          guardTurns((turns += 1), "for");
        }
      };
    }
    case 1014: /* BreakStatement */ {
      return () => broke;
    }
    case 1015: /* ContinueStatement */ {
      return () => continued;
    }
    case 1009: /* ReturnStatement */ {
      const value = compile(instance, node[1]);
      return (scope) => ({ kind: "returned", value: value(scope) });
    }
    case 1010: /* ThrowStatement */ {
      const thrown = compile(instance, node[1]);
      return (scope) => {
        throw thrown(scope);
      };
    }
    case 1011: /* TryStatement */ {
      const attempted = compileStatement(instance, node[1]);
      const clause = node[2];
      const caught = clause[1];
      const handler = compileStatement(instance, clause[2]);
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
      const run = compile(instance, node);
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
  return Array.isArray(element) && element[0] === 1020 /* SpreadElement */;
}

// A list that may hold `...xs`: each member answers with one value or with the
// members of an array, and the list is what they add up to. A list with no
// spread in it compiles to a plain map — the flattening is a cost only where
// something is actually spread.
function compileElements(
  instance: Instance,
  elements: readonly (BundleArrayElement | BundleExpressionNode)[],
): (scope: Scope | null) => Value[] {
  if (!elements.some((element) => isSpread(element as BundleArrayElement))) {
    const parts = elements.map((element) =>
      compile(instance, element as Source),
    );
    return (scope) => parts.map((part) => part(scope));
  }
  const parts = elements.map((element) =>
    isSpread(element as BundleArrayElement)
      ? {
          spread: true,
          read: compile(instance, (element as BundleSpreadElementNode)[1]),
        }
      : { spread: false, read: compile(instance, element as Source) },
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

function compileBinop(
  // Every operator but `=`, which assigns rather than combining two values and
  // is answered where the node is read.
  operator: Exclude<BundleBinaryOperator, "=">,
  left: (scope: Scope | null) => Value,
  right: (scope: Scope | null) => Value,
): (scope: Scope | null) => Value {
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
