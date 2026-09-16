// Types only, and nothing of the bundler's at all: a kind is written here as
// the number the format fixes it to, the way a client that never saw this
// repository would have to write it. That is the point of a reference client —
// what it needs from the format is the format, not a package.
import type { ClientUnknown, ClientValue } from "@backtickjs/core";
import type {
  BundleArrayElement,
  BundleArrowFunction,
  BundleSpreadElement,
  BundleStatement,
  BundleFunctionLabel,
} from "@backtickjs/platform-sdk";
import { builtinOf, getters } from "./builtinOf.js";
import type { Instance } from "./Instance.js";
import { compileComponentCall } from "./compileComponentCall.js";
import { compileElement } from "./compileElement.js";

// A reference client: the interpreter the bundle wire format is specified
// against (see `language/src/schema.ts`). It evaluates a bundle's `root`
// against its `functions` table and yields the resulting
// JavaScript value, so a host can draw it and tests can observe runtime
// behavior rather than only snapshotting shape.
//
// This half is evaluation alone. What a drawing function builds — and what
// keeps it current afterwards — is `compileElement.ts`, which is the only part
// that knows a host exists.

// Everything the compiler reads. A tree expression and a body node are one
// grammar with two ends: the shared middle is literals, containers, names and
// functions, the tree end adds applications and elements, and the
// body end adds the statements and operators a script is written in. Compiling
// them together is what makes the middle exist once.
type Source = BundleArrayElement | BundleStatement;

// One frame per arrow application or block. Names are pre-resolved by the
// bundler and there are no globals: a name no frame binds is a malformed
// bundle.
export interface Scope {
  parent: Scope | null;
  // Own properties only, which is why every read goes through `hasOwn`: a
  // binding named `toString` must not find `Object.prototype`'s.
  bindings: { [name: string]: ClientValue };
}

// A frame lives as long as what closes over it — every handler a row writes
// keeps its row's — so an app with a thousand rows holds a thousand of these. A
// `Map` allocates its table before it holds anything; an object holding two
// bindings is the two bindings.
export function scopeOf(parent: Scope | null): Scope {
  return { parent, bindings: {} };
}

function bind(scope: Scope, name: string, value: ClientValue): void {
  scope.bindings[name] = value;
}

function read(scope: Scope, name: string): ClientValue {
  return scope.bindings[name];
}

// The frame a call binds its arguments in. A missing argument binds as
// `undefined`, which is what an omitted optional parameter reads as.
function applied(
  scope: Scope | null,
  parameters: readonly string[],
  args: readonly ClientValue[],
): Scope {
  const frame = scopeOf(scope);
  for (let at = 0; at < parameters.length; at++) {
    bind(frame, parameters[at], at < args.length ? args[at] : undefined);
  }
  return frame;
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
// Compiled where it is first referred to rather than where it is first applied,
// which nothing needs yet: what will is the question a reference asks about a
// function, answered by compiling its body. One still being compiled stands in
// the table as itself, so a body reaching back finds it rather than compiling
// it again.
//
// What the table holds is the closure the entry evaluated to and not the node
// that made it: an entry is an arrow, so what it evaluates to is a function,
// and it closes over nothing — so it is discharged here, once, against no
// scope.
function compileFunction(
  instance: Instance,
  label: BundleFunctionLabel,
): (...args: ClientValue[]) => ClientUnknown {
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
  const arrow = compileArrow(instance, declared);
  // In no scope rather than an empty one: a function reaches what encloses it
  // through its own parameters, so a frame binding nothing would only be one
  // more to walk past at the end of every name it fails to find.
  const closure = arrow(null);
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

// A client function as this client applies one. `ClientFunction` says which
// values are functions — its parameters are `never`, so that every function is
// one — and not how to call one, so applying is this client's own knowledge.
export type Applied = (...args: ClientValue[]) => ClientValue;

// The names `Object.prototype` and `Function.prototype` answer for, which a
// plain object only reaches as its own member — see `memberOf`.
const MACHINERY = new Set([
  ...Object.getOwnPropertyNames(Object.prototype),
  ...Object.getOwnPropertyNames(Function.prototype),
]);

function isMachinery(name: string): boolean {
  return MACHINERY.has(name);
}

// A member access on a primitive is answered by the language's switch by the
// whole name rather than by the host's prototypes: a member the schema left out
// stays left out, where `value[member]` would hand back whatever JavaScript
// happens to have.
//
// The language's and not the instance's, so what a string is remains one thing
// wherever a bundle runs. A target adds whole names a script splices; what may
// be read off a value is the language's alone, and grouping what a target
// offers is done by the value a name holds rather than by adding a member to a
// kind of value.
//
// Which name a value is reached under is this client's own decision, and the
// four are named here as the schema writes them.
function memberOf(
  instance: Instance,
  object: ClientValue,
  name: string,
): ClientValue {
  const boxed =
    typeof object === "string"
      ? "string"
      : typeof object === "number"
        ? "number"
        : typeof object === "boolean"
          ? "boolean"
          : Array.isArray(object)
            ? "array"
            : null;
  if (boxed === null) {
    // A plain object is reached by the names it holds, and one it does not
    // hold reads as `undefined`.
    //
    // The cast reads through a brand: a handle's type says opaque, and a cell
    // being `{ read, write, update }` underneath is this client's knowledge.
    //
    // Except the ambient machinery: `constructor`, `__proto__`, `toString` and
    // the rest live on `Object.prototype` and `Function.prototype`, and none of
    // it is the language's. It is also the way out — `({}).constructor` is
    // `Object`, whose `.constructor` is `Function`, which runs arbitrary code —
    // so reading a member inherited from either prototype throws. What a host
    // puts on its own prototypes (a DOM event's `preventDefault`) is not on
    // these two and is read as before; an own member always wins, so a data
    // object whose own key happens to be `constructor` still answers with it.
    if (isMachinery(name) && !Object.hasOwn(object as object, name)) {
      throw new Error(`an object has no \`${name}\` in this language`);
    }
    const held = (object as { readonly [name: string]: ClientValue })[name];
    // Bound, because some of these objects are the host's own. A cell's members
    // are closures and do not care, but an event's are methods that read the
    // event through `this` — and `preventDefault` reached off one and called
    // without it throws rather than answering.
    return typeof held === "function"
      ? (held.bind(object) as ClientValue)
      : held;
  }
  const whole = `${boxed}.${name}`;
  // Answered, or refused there: a member a kind of value does not have throws.
  const found = builtinOf(instance, whole);
  // Every member takes its receiver first, because a client with no `this`
  // reads the same document and answers the same way. A getter is applied
  // here, where its name is read, because that is where the language puts the
  // call a script does not write.
  if (Object.hasOwn(getters, whole)) {
    return (found as Applied)(object);
  }
  // The rest are bound and not called: binding here rather than at the call is
  // what makes one rule cover a member called now, a member called later and a
  // member passed on — at a closure per access, which is what a receiver costs
  // when it is not carried by the language.
  return typeof found === "function"
    ? (...args: ClientValue[]) => (found as Applied)(object, ...args)
    : found;
}

// A literal carries itself. Past that, what is left has a shape to read: an
// object of data, or a node. A node is an array and nothing else in a value
// slot is — an array of data travels under an `arr` node — so `Array.isArray`
// is the whole test, here and everywhere below.
export function compile(
  instance: Instance,
  source: Source,
): (scope: Scope | null) => ClientValue {
  if (source === null || typeof source !== "object") {
    const literal = source;
    return () => literal;
  }
  if (!Array.isArray(source)) {
    const data = source;
    const keys = Object.keys(data);
    const parts = keys.map((key) => compile(instance, data[key]));
    return (scope) => {
      const object: { [key: string]: ClientValue } = {};
      for (let at = 0; at < keys.length; at++) {
        object[keys[at]] = parts[at](scope);
      }
      return object;
    };
  }
  const node = source;
  switch (node[0]) {
    case "arr": {
      const members = compileArrayElements(instance, node[1]);
      return (scope) => members(scope);
    }
    // An object literal a spread runs through. A literal without one is data
    // and never reaches here — this is only for the case the format has no key
    // to say, which is "and every key of that one".
    case "obj": {
      // A spread carries only what to merge; a property carries its name too.
      const entries = node[1].map((entry) =>
        entry[0] === ":"
          ? { name: entry[1], part: compile(instance, entry[2]) }
          : { name: null, part: compile(instance, entry[1]) },
      );
      return (scope) => {
        const object: { [key: string]: ClientValue } = {};
        for (const { name, part } of entries) {
          const held = part(scope);
          if (name !== null) {
            object[name] = held;
            continue;
          }
          // Later keys win, the way they do in the source — so the object is
          // built in the order it was written and nothing is merged twice.
          for (const [key, one] of Object.entries(
            held as { [key: string]: ClientValue },
          )) {
            object[key] = one;
          }
        }
        return object;
      };
    }
    // Storage, made where this stands: evaluating it twice is two storages,
    // which is why it is a kind and not a call of a name. Never settled — the
    // whole point of a cell is that what it holds moves.
    // The absent value. A node because JSON has no form for it — every other
    // literal in this format is answered by `compile` as the value it is.
    case "undef": {
      return () => undefined;
    }
    case "id": {
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
    case "fn": {
      const label = node[1];
      // Looked up once, here: the table holds one closure per label, and every
      // reference is handed that one.
      const named = compileFunction(instance, label);
      return () => named;
    }
    // Including a list, which draws no node of its own: what `for` means is
    // answered where an id is read, not by a kind of its own.
    case "el": {
      return compileElement(instance, node);
    }
    case "comp": {
      return compileComponentCall(instance, node);
    }
    // A whole name the format carries and this client answers: the language's
    // own first, then what this target added beside them — because the format
    // has one node for a name it carries, and where a name came from is not
    // something a bundle says.
    //
    // Never the host's own objects, and never a target's answer for a name the
    // language answers: those are read first, so a target naming one is never
    // reached. A curated list is what keeps every member meaning the same thing
    // everywhere, and a target may lengthen it but not edit it.
    case "bltn": {
      const name = node[1];
      const value = builtinOf(instance, name);
      if (value === undefined) {
        throw new Error(`unknown builtin ${name}`);
      }
      return () => value;
    }
    case "()":
    case "?.()": {
      // A method call binds its receiver, so `s.concat(y)` sees `this === s`.
      // Which of the two this is, is a property of the callee, so it is
      // decided here rather than on every call.
      const callee = node[1];
      const optionalCall = node[0] === "?.()";
      const args = compileArrayElements(instance, node[2]);
      if (Array.isArray(callee) && (callee[0] === "." || callee[0] === "?.")) {
        const receiver = compile(instance, callee[1]);
        const optionalReceiver = callee[0] === "?.";
        const name = callee[2];
        return (scope) => {
          // The receiver evaluates before the arguments; an optional receiver
          // (`a?.b(…)`) short-circuits a nullish object to `undefined`,
          // arguments unevaluated.
          const object = receiver(scope);
          if (optionalReceiver && object == null) {
            return undefined;
          }
          const method = memberOf(instance, object, name);
          // An optional call (`a.b?.(…)`) short-circuits a nullish method the
          // same way, arguments unevaluated.
          if (optionalCall && method == null) {
            return undefined;
          }
          if (typeof method !== "function") {
            throw new Error(`${name} is not a function`);
          }
          // The receiver is already bound: `memberOf` closed over it, so a
          // method reached by `.` and one passed on are the same value.
          return (method as Applied)(...args(scope));
        };
      }
      const target = compile(instance, callee);
      return (scope) => {
        // The callee evaluates before the arguments; an optional call
        // (`cb?.(…)`) short-circuits a nullish callee to `undefined`,
        // arguments unevaluated.
        const value = target(scope);
        if (optionalCall && value == null) {
          return undefined;
        }
        if (typeof value !== "function") {
          throw new Error("callee is not a function");
        }
        return (value as Applied)(...args(scope));
      };
    }
    case ".":
    case "?.": {
      const target = compile(instance, node[1]);
      const optional = node[0] === "?.";
      const member = node[2];
      return (scope) => {
        const object = target(scope);
        if (optional && object == null) {
          return undefined;
        }
        // An absent member reads as `undefined`.
        return memberOf(instance, object, member);
      };
    }
    case "[]": {
      const target = compile(instance, node[1]);
      const argument = compile(instance, node[2]);
      return (scope) => {
        const reached = target(scope);
        const key = argument(scope);
        // A key of the wrong type is not a place the value has nothing — it
        // is a read this language has no meaning for, so it stops here rather
        // than answering. JavaScript would coerce `["0"]` to `[0]`; nothing
        // does that here, which is why saying so out loud matters.
        if (Array.isArray(reached)) {
          if (typeof key !== "number") {
            throw new Error(
              "an array is read by a number: this bundle produced " +
                `${JSON.stringify(key) ?? typeof key}.`,
            );
          }
          // In range or not is the data's business, and a place the array has
          // nothing reads as `undefined`.
          return Number.isInteger(key) && key >= 0 && key < reached.length
            ? reached[key]
            : undefined;
        }
        // A string is read by whole numbers too, which is what its class
        // declares an index signature for.
        if (typeof reached === "string") {
          if (typeof key !== "number") {
            throw new Error(
              "a string is read by a number: this bundle produced " +
                `${JSON.stringify(key) ?? typeof key}.`,
            );
          }
          return Number.isInteger(key) && key >= 0 && key < reached.length
            ? reached[key]
            : undefined;
        }
        // An object is reached by the names it holds itself: an inherited one
        // (`toString`) is not a member of the value, so it reads as absent
        // rather than handing back something from the host's prototypes.
        if (reached !== null && typeof reached === "object") {
          if (typeof key !== "string") {
            throw new Error(
              "an object is read by a string: this bundle produced " +
                `${JSON.stringify(key) ?? typeof key}.`,
            );
          }
          return Object.prototype.hasOwnProperty.call(reached, key)
            ? (reached as { readonly [name: string]: ClientValue })[key]
            : undefined;
        }
        throw new Error(
          "only an array, a string or an object can be read by key: this " +
            `bundle produced ${JSON.stringify(reached) ?? typeof reached}.`,
        );
      };
    }
    // Assignment binds its left rather than evaluating it, which is why it is
    // the one whose left operand is not compiled.
    case "=": {
      const target = node[1];
      // Only a variable can be assigned to, which the compiler enforces; a
      // bundle saying otherwise was not written by it.
      if (!Array.isArray(target) || target[0] !== "id") {
        throw new Error("an assignment target must be an identifier");
      }
      const name = target[1];
      const right = compile(instance, node[2]);
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
    case "&&": {
      const left = compile(instance, node[1]);
      const right = compile(instance, node[2]);
      return (scope) =>
        condition(left(scope), "the left operand of `&&`")
          ? condition(right(scope), "the right operand of `&&`")
          : false;
    }
    case "||": {
      const left = compile(instance, node[1]);
      const right = compile(instance, node[2]);
      return (scope) =>
        condition(left(scope), "the left operand of `||`")
          ? true
          : condition(right(scope), "the right operand of `||`");
    }
    // `??` asks whether a value is absent, not whether it is false, so either
    // side may be any value.
    case "??": {
      const left = compile(instance, node[1]);
      const right = compile(instance, node[2]);
      return (scope) => {
        const value = left(scope);
        return value != null ? value : right(scope);
      };
    }
    // Two numbers add; a string on either side concatenates. Written out
    // because the cast the other arithmetic uses would be a lie here: it
    // erases, and JavaScript's `+` then does whichever the operands imply. A
    // client not written in JavaScript has to make the same choice, so the
    // choice belongs in the open.
    case "+": {
      const left = compile(instance, node[1]);
      const right = compile(instance, node[2]);
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
    }
    case "-": {
      const left = compile(instance, node[1]);
      const right = compile(instance, node[2]);
      return (scope) => (left(scope) as number) - (right(scope) as number);
    }
    case "*": {
      const left = compile(instance, node[1]);
      const right = compile(instance, node[2]);
      return (scope) => (left(scope) as number) * (right(scope) as number);
    }
    case "/": {
      const left = compile(instance, node[1]);
      const right = compile(instance, node[2]);
      return (scope) => (left(scope) as number) / (right(scope) as number);
    }
    case "%": {
      const left = compile(instance, node[1]);
      const right = compile(instance, node[2]);
      return (scope) => (left(scope) as number) % (right(scope) as number);
    }
    // Identity: the same primitive or the same object, never a deep walk.
    case "===": {
      const left = compile(instance, node[1]);
      const right = compile(instance, node[2]);
      return (scope) => left(scope) === right(scope);
    }
    case "!==": {
      const left = compile(instance, node[1]);
      const right = compile(instance, node[2]);
      return (scope) => left(scope) !== right(scope);
    }
    // The four comparisons cast to number and then do not act on the cast:
    // TypeScript erases it, so two strings compare as text, which is what a
    // client with types at runtime has to be told in as many words.
    case "<": {
      const left = compile(instance, node[1]);
      const right = compile(instance, node[2]);
      return (scope) => (left(scope) as number) < (right(scope) as number);
    }
    case "<=": {
      const left = compile(instance, node[1]);
      const right = compile(instance, node[2]);
      return (scope) => (left(scope) as number) <= (right(scope) as number);
    }
    case ">": {
      const left = compile(instance, node[1]);
      const right = compile(instance, node[2]);
      return (scope) => (left(scope) as number) > (right(scope) as number);
    }
    case ">=": {
      const left = compile(instance, node[1]);
      const right = compile(instance, node[2]);
      return (scope) => (left(scope) as number) >= (right(scope) as number);
    }
    // A `!` operand is boolean, as a tested position always is, so this negates
    // rather than deciding what counts as true.
    case "!": {
      const operand = compile(instance, node[1]);
      return (scope) => !condition(operand(scope), "the operand of `!`");
    }
    // A `-x` operand is a number, checked by the compiler as arithmetic
    // everywhere else is.
    case "-x": {
      const operand = compile(instance, node[1]);
      return (scope) => -(operand(scope) as number);
    }
    case "?:": {
      const test = compile(instance, node[1]);
      const whenTrue = compile(instance, node[2]);
      const whenFalse = compile(instance, node[3]);
      // Only the taken branch evaluates.
      return (scope) =>
        condition(test(scope), "a ternary condition")
          ? whenTrue(scope)
          : whenFalse(scope);
    }
    case "=>": {
      return compileArrow(instance, node);
    }
    default: {
      // Every remaining kind is a statement, which is not a value. A bundle
      // that puts one where a value is expected was not written by the
      // compiler.
      throw new Error(`\`${String(node[0])}\` is not an expression`);
    }
  }
}

// An arrow, which is the one node whose value is known by its kind: what it
// evaluates to is a function, so this says so where `compile` can only say
// `ClientValue`. A `functions` entry is one of these and nothing else, which is
// what lets it be discharged without asking what it became.
function compileArrow(
  instance: Instance,
  node: BundleArrowFunction,
): (scope: Scope | null) => Applied {
  const parameters = node[1].map((param) => param[1]);
  const body = node[2];
  // A block runs its statements; anything else is an expression, which is
  // implicitly returned. Which of the two decides what a call does with what
  // the body answered, so it is decided here rather than per call.
  const block = Array.isArray(body) && body[0] === "{}" ? body : null;
  if (block === null) {
    const expression = compile(instance, body);
    // Nothing to bind: the body reads the enclosing frame, so making one of its
    // own would be an allocation per call for a scope that holds nothing. Every
    // splice argument is one of these.
    if (parameters.length === 0) {
      return (scope) => () => expression(scope);
    }
    return (scope) =>
      (...args) =>
        expression(applied(scope, parameters, args));
  }
  const statements = compileStatement(instance, block);
  return (scope) =>
    (...args) => {
      const completion = statements(applied(scope, parameters, args));
      if (completion.kind === "break" || completion.kind === "continue") {
        // The compiler rejects a jump with no loop to catch it, so one reaching
        // here means the bundle was not written by it.
        throw new Error(
          `A \`${completion.kind}\` in this bundle escaped its loop.`,
        );
      }
      return completion.kind === "returned" ? completion.value : undefined;
    };
}

// The statement outcome of a block or one of its statements. `advanced` fell
// through to the next one; the rest are jumps, and every container passes one
// outward until something catches it: a loop catches `break` and `continue`,
// an arrow catches `returned` and answers with `value`.
interface Completion {
  kind: "advanced" | "returned" | "break" | "continue";
  value: ClientValue;
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

function compileStatement(
  instance: Instance,
  node: BundleStatement,
): (scope: Scope | null) => Completion {
  if (node === null || typeof node !== "object") {
    return () => advanced;
  }
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
    case "{}": {
      const statements = node[1];
      // Declarations hoist to the block: a use before its declaration
      // resolves to the local (with value `null`), never outward. Which names
      // those are is a property of the block, so it is found once.
      const declared = statements.flatMap((statement) =>
        Array.isArray(statement) &&
        (statement[0] === "const" || statement[0] === "let")
          ? [statement[1]]
          : [],
      );
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
    case "const":
    case "let": {
      const name = node[1];
      const initializer = compile(instance, node[2]);
      return (scope) => {
        // A declaration only ever runs inside the block that hoisted it, so
        // there is always a frame to bind into. Said rather than asserted: a
        // bundle putting one anywhere else was not written by the compiler.
        if (scope === null) {
          throw new Error(`\`${name}\` was declared outside a block`);
        }
        bind(scope, name, initializer(scope));
        return advanced;
      };
    }
    case "if": {
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
    case "while": {
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
    case "for": {
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
    case "break": {
      return () => broke;
    }
    case "continue": {
      return () => continued;
    }
    case "return": {
      const value = compile(instance, node[1]);
      return (scope) => ({ kind: "returned", value: value(scope) });
    }
    case "throw": {
      const thrown = compile(instance, node[1]);
      return (scope) => {
        throw thrown(scope);
      };
    }
    case "try": {
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
            bind(frame, caught, thrown as ClientValue);
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
function isSpread(element: BundleArrayElement): element is BundleSpreadElement {
  return Array.isArray(element) && element[0] === "...";
}

// A list that may hold `...xs`: each member answers with one value or with the
// members of an array, and the list is what they add up to. A list with no
// spread in it compiles to a plain map — the flattening is a cost only where
// something is actually spread.
function compileArrayElements(
  instance: Instance,
  elements: readonly BundleArrayElement[],
): (scope: Scope | null) => ClientValue[] {
  if (!elements.some(isSpread)) {
    const parts = elements.map((element) => compile(instance, element));
    return (scope) => parts.map((part) => part(scope));
  }
  const parts = elements.map((element) =>
    isSpread(element)
      ? { spread: true, read: compile(instance, element[1]) }
      : { spread: false, read: compile(instance, element) },
  );
  return (scope) => {
    const out: ClientValue[] = [];
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
function condition(value: ClientValue, what: string): boolean {
  if (value === true || value === false) {
    return value;
  }
  throw new Error(
    `${what} must be \`true\` or \`false\`: this language has no truthiness, ` +
      `and this bundle produced ${JSON.stringify(value) ?? typeof value}.`,
  );
}
