// The wire tags only. `@backtickjs/core` re-exports these, but reaching them
// that way pulls the bundler and `node:async_hooks` into the graph, which a
// browser cannot load. This subpath is the format module alone, and it
// imports nothing.
import { NodeKind, NodeField } from "@backtickjs/jit-bundler/format";
import type {
  Bundle,
  BundleApply,
  BundleGetFunction,
  BundleApplyTree,
  BundleBinaryOperator,
  BundleElement,
  BundleExpr,
  BundleExpressionNode,
  BundleIdentifierNode,
  BundleStatementNode,
  BundleThunk,
  BundleTree,
  BundleGetState,
  BundleGetSlot,
  FunctionLabel,
  TreeLabel,
} from "@backtickjs/core";
import { Element } from "./Element.js";
import type { Value } from "./Value.js";

// A reference client: the interpreter the bundle wire format is specified
// against (see `jit-bundler/bundle/Bundle.ts`). It evaluates a bundle's
// `root` against its `functions` and `trees` tables and returns the resulting
// JavaScript value — an `Element` tree for a JSX client — so a host can render
// it, and tests can observe runtime behavior rather than only snapshotting
// shape.

// Who to notify after a write has re-rendered — set while an evaluation or a
// re-render is in flight, and captured by each instance created during it, so
// two mounts in one process notify their own hosts rather than the last one to
// start. Ambient rather than threaded because every instance is created deep
// inside the evaluation, and only this one thing needs to reach them.
let notifying: (() => void) | null = null;

function whileNotifying<T>(notify: (() => void) | null, run: () => T): T {
  const previous = notifying;
  notifying = notify;
  try {
    return run();
  } finally {
    notifying = previous;
  }
}

export function evaluate(bundle: Bundle, onChange?: () => void): Value {
  return whileNotifying(onChange ?? null, () =>
    evaluateExpr(bundle, bundle.root, []),
  );
}

// A tree instance: what persists on the client. `cells` is the storage the
// entry's `state` declares, allocated fresh per instance, and `children` keys
// nested instances by the `apply` node that created them — the node is the
// child's position, so a re-render reuses the instance instead of resetting its
// cells.
interface Instance {
  readonly bundle: Bundle;
  readonly tree: BundleTree;
  slots: Value[];
  readonly cells: Map<string, Value>;
  // Nested instances, per `apply` node and then by how many times that node has
  // been reached in one render — a node inside a loop is reached once per
  // iteration, and each of those is its own instance.
  readonly children: Map<BundleApplyTree, Instance[]>;
  // How many times each `apply` has been reached in the render under way.
  // Cleared when one starts, so the nth evaluation finds the nth instance again.
  readonly visits: Map<BundleApplyTree, number>;
  // The host that mounted this instance, captured when it was created — a
  // child created during a later re-render inherits it the same way.
  readonly notify: (() => void) | null;
  element: Element | null;
}

function instantiate(
  bundle: Bundle,
  tree: BundleTree,
  slots: Value[],
): Instance {
  const instance: Instance = {
    bundle,
    tree,
    slots,
    cells: new Map(),
    children: new Map(),
    visits: new Map(),
    notify: notifying,
    element: null,
  };
  // A cell's initial is evaluated in no instance: it can't read a slot or
  // another cell, so nothing is in scope for it.
  for (const [name, initial] of Object.entries(tree[NodeField.state] ?? {})) {
    instance.cells.set(name, evaluateExpr(bundle, initial, []));
  }
  render(instance);
  return instance;
}

// Renders an instance, refreshing the element in place on a re-render so every
// holder observes the new props. The whole instance re-renders; nested
// instances survive it via `children`.
//
// A pass-through component — one whose content is an apply rather than an
// element — renders no element of its own, so evaluating its content yields its
// child's element and the two alias deliberately. Re-rendering it re-renders
// that child rather than instantiating a new one, which is what keeps the
// child's cells alive. An instance whose content is null renders nothing.
function render(instance: Instance): Element | null {
  // A fresh count for this pass: an `apply` reached n times last render is
  // reached n times again, so the nth evaluation lines up with the nth instance.
  instance.visits.clear();
  // Under this instance's host, so a child instantiated for the first time
  // during a re-render notifies the same one rather than nothing.
  const rendered = whileNotifying(
    instance.notify,
    () =>
      evaluateExpr(
        instance.bundle,
        instance.tree[NodeField.content],
        instance.slots,
        null,
        instance,
      ) as Element | null,
  );
  const existing = instance.element;
  if (existing === null || rendered === null || existing === rendered) {
    instance.element = rendered;
    return rendered;
  }
  existing.key = rendered.key;
  existing.props = rendered.props;
  return existing;
}

// A cell's handle, as a script reads it: an ordinary object of functions, so it
// is a `Value` like anything else the interpreter hands a script. `read`
// observes the instance's current storage; `write` replaces it and re-renders —
// the two rules per-instance state adds. A handle a handler captured keeps
// working across re-renders because it resolves the cell by name at call time.
//
// The writers yield `null` rather than nothing. `void` is not a value this
// language has, and a function that returned one couldn't be passed where a
// value is expected — which a handle's members are.
function cellHandle(instance: Instance, name: string): Value {
  const storage = (): Map<string, Value> => {
    if (!instance.cells.has(name)) {
      throw new Error(`unknown state cell ${name}`);
    }
    return instance.cells;
  };
  const read = () => {
    return storage().get(name) ?? null;
  };
  const write = (value: Value): Value => {
    storage().set(name, value);
    render(instance);
    // The element refreshed in place, so the host re-reads rather than being
    // handed anything: this only says that something moved.
    instance.notify?.();
    return null;
  };
  const update = (updater: (current: Value) => Value): Value => {
    return write(updater(storage().get(name) ?? null));
  };
  return {
    read,
    write,
    update: update as Value,
  };
}

// One frame per arrow application or block. Names are pre-resolved by the
// bundler and there are no globals: a name no frame binds is a malformed
// bundle.
interface Scope {
  parent: Scope | null;
  bindings: Map<string, Value>;
}

function lookup(scope: Scope | null, name: string): Scope | null {
  for (let frame = scope; frame !== null; frame = frame.parent) {
    if (frame.bindings.has(name)) {
      return frame;
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
const treesByBundle = new WeakMap<
  Bundle,
  Map<TreeLabel, (...slots: Value[]) => Value>
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
  const fn = evaluateNode(bundle, arrow, null) as (...args: Value[]) => Value;
  built.set(label, fn);
  return fn;
}

// A `trees` entry as a function: it takes its slot values and instantiates the
// element.
function getTree(
  bundle: Bundle,
  label: TreeLabel,
): (...slots: Value[]) => Value {
  let built = treesByBundle.get(bundle);
  if (built === undefined) {
    built = new Map();
    treesByBundle.set(bundle, built);
  }
  const existing = built.get(label);
  if (existing !== undefined) {
    return existing;
  }
  const tree = bundle.trees[label];
  if (tree === undefined) {
    throw new Error(`unknown tree entry ${label}`);
  }
  // The closure is shared; `instantiate` still runs per call, so each
  // instantiation gets its own instance and its own cells.
  const fn = (...slots: Value[]) => instantiate(bundle, tree, slots).element;
  built.set(label, fn);
  return fn;
}

// An inline element renders in its enclosing instance: it is part of that entry,
// so it reads the same slots and the same cells.
function evaluateElement(
  bundle: Bundle,
  element: BundleElement,
  slots: Value[],
  instance: Instance | null = null,
): Element {
  // An absent key is no key, exactly as a null one was — the wire omits it
  // rather than spelling it out.
  const elementKey = element[NodeField.key];
  const key =
    elementKey === undefined
      ? null
      : (evaluateExpr(bundle, elementKey, slots, null, instance) as
          | string
          | number
          | null);
  const props: { [prop: string]: Value } = {};
  for (const [prop, expr] of Object.entries(element[NodeField.props] ?? {})) {
    props[prop] = evaluateExpr(bundle, expr, slots, null, instance);
  }
  return new Element(element[NodeField.id], key, props);
}

// A tree expression (also the root): plain JSON carries itself; the
// `#`-discriminated nodes compose. Bundling rejects plain data carrying
// `#` — the bundle's one reserved key — so the node reading is
// unambiguous.
function evaluateExpr(
  bundle: Bundle,
  expr: BundleExpr,
  slots: Value[],
  env: Scope | null = null,
  // The enclosing instance, when there is one: what `cell` resolves against, and
  // what a nested `apply` keys its child instance under.
  instance: Instance | null = null,
): Value {
  if (expr === null || typeof expr !== "object") {
    return expr;
  }
  if (Array.isArray(expr)) {
    return expr.map((element) =>
      evaluateExpr(bundle, element, slots, env, instance),
    );
  }
  if ("#" in expr) {
    const form = expr as
      | BundleGetSlot
      | BundleGetState
      | BundleIdentifierNode
      | BundleGetFunction
      | BundleApply
      | BundleThunk
      | BundleElement;
    switch (form["#"]) {
      case NodeKind.GetSlot: {
        return slots[form[NodeField.index]];
      }
      case NodeKind.GetState: {
        // A cell is declared by the enclosing entry, so it is only meaningful
        // inside an instance of it.
        if (instance === null) {
          throw new Error(
            `no instance to resolve state cell ${form[NodeField.name]}`,
          );
        }
        return cellHandle(instance, form[NodeField.name]);
      }
      case NodeKind.Identifier: {
        // A parameter of an enclosing thunk.
        const frame = lookup(env, form[NodeField.name]);
        if (frame === null) {
          throw new Error(`unknown identifier ${form[NodeField.name]}`);
        }
        return frame.bindings.get(form[NodeField.name]) ?? null;
      }
      // An entry named rather than applied: the function it evaluates to, which
      // is what a hole handing over nothing would have called.
      case NodeKind.GetFunction: {
        return getFunction(bundle, form[NodeField.label]);
      }
      case NodeKind.ApplyFunction: {
        const args = (form[NodeField.args] ?? []).map((arg) =>
          evaluateExpr(bundle, arg, slots, env, instance),
        );
        return getFunction(bundle, form[NodeField.label])(...args);
      }
      case NodeKind.ApplyTree: {
        const label = form[NodeField.label];
        const args = (form[NodeField.args] ?? []).map((arg) =>
          evaluateExpr(bundle, arg, slots, env, instance),
        );
        // Outside an instance there is nothing to persist against, so the
        // entry applies as a plain function.
        if (instance === null) {
          return getTree(bundle, label)(...args);
        }
        const tree = bundle.trees[label];
        if (tree === undefined) {
          throw new Error(`unknown tree entry ${label}`);
        }
        // A nested instance persists across the parent's re-renders, named by
        // this node and by which evaluation of it this is. The node alone would
        // do if a node were reached once per render, but a hole inside a loop is
        // reached once per iteration — one name for all of them would hand every
        // iteration the same instance, and each would overwrite the last.
        const seen = instance.visits.get(form) ?? 0;
        instance.visits.set(form, seen + 1);
        let siblings = instance.children.get(form);
        if (siblings === undefined) {
          siblings = [];
          instance.children.set(form, siblings);
        }
        const child = siblings[seen];
        if (child !== undefined) {
          child.slots = args;
          return render(child);
        }
        const created = instantiate(bundle, tree, args);
        siblings[seen] = created;
        return created.element;
      }
      case NodeKind.Thunk: {
        const params = form[NodeField.params];
        if (!params || params.length === 0) {
          return () =>
            evaluateExpr(
              bundle,
              form[NodeField.expression],
              slots,
              env,
              instance,
            );
        }
        // The hole call supplies the entry-scoped bindings the splice
        // captures, one value per parameter, over the enclosing frame.
        return (...args: Value[]) => {
          const frame: Scope = { parent: env, bindings: new Map() };
          params.forEach((param, index) => {
            frame.bindings.set(param, args[index]);
          });
          return evaluateExpr(
            bundle,
            form[NodeField.expression],
            slots,
            frame,
            instance,
          );
        };
      }
      case NodeKind.Element: {
        return evaluateElement(bundle, form, slots, instance);
      }
    }
  }
  const object: { [key: string]: Value } = {};
  for (const [key, value] of Object.entries(expr)) {
    // The index admits `undefined` only so the reserved `#` can be excluded
    // from it (see `BundleData`); parsed JSON never carries one.
    object[key] = evaluateExpr(
      bundle,
      value as BundleExpr,
      slots,
      env,
      instance,
    );
  }
  return object;
}

// A `#`-discriminated node, as opposed to plain JSON carrying itself.
// Bundling rejects plain data carrying `#` — the bundle's one reserved key —
// so the node reading is unambiguous.
function isNode(
  node: BundleStatementNode,
): node is Extract<BundleStatementNode, { "#": NodeKind }> {
  return (
    typeof node === "object" &&
    node !== null &&
    !Array.isArray(node) &&
    "#" in node
  );
}

// The statement outcome of a block or one of its statements: `returned`
// signals that a `return` executed and the enclosing arrow's result is
// `value`.
interface Completion {
  returned: boolean;
  value: Value;
}

const advanced: Completion = { returned: false, value: null };

function executeStatement(
  bundle: Bundle,
  node: BundleStatementNode,
  scope: Scope,
): Completion {
  if (!isNode(node)) {
    // Plain JSON in statement position is an expression evaluated for its
    // effect.
    evaluateNode(bundle, node, scope);
    return advanced;
  }
  switch (node["#"]) {
    case NodeKind.Block: {
      const frame: Scope = { parent: scope, bindings: new Map() };
      // Declarations hoist to the block: a use before its declaration
      // resolves to the local (with value `null`), never outward.
      for (const statement of node[NodeField.statements] ?? []) {
        if (isNode(statement) && statement["#"] === NodeKind.Declaration) {
          frame.bindings.set(statement[NodeField.name], null);
        }
      }
      for (const statement of node[NodeField.statements] ?? []) {
        const completion = executeStatement(bundle, statement, frame);
        if (completion.returned) {
          return completion;
        }
      }
      return advanced;
    }
    case NodeKind.Declaration: {
      scope.bindings.set(
        node[NodeField.name],
        evaluateNode(bundle, node[NodeField.expression], scope),
      );
      return advanced;
    }
    case NodeKind.Assignment: {
      const value = evaluateNode(bundle, node[NodeField.expression], scope);
      const frame = lookup(scope, node[NodeField.name]);
      if (frame === null) {
        throw new Error(`unknown assignment target ${node[NodeField.name]}`);
      }
      frame.bindings.set(node[NodeField.name], value);
      return advanced;
    }
    case NodeKind.If: {
      if (
        condition(
          evaluateNode(bundle, node[NodeField.condition], scope),
          "an `if`",
        )
      ) {
        return executeStatement(bundle, node[NodeField.consequent], scope);
      }
      if (node[NodeField.alternate] !== null) {
        return executeStatement(bundle, node[NodeField.alternate], scope);
      }
      return advanced;
    }
    case NodeKind.Return: {
      return {
        returned: true,
        value: evaluateNode(bundle, node[NodeField.expression], scope),
      };
    }
    case NodeKind.Throw: {
      throw evaluateNode(bundle, node[NodeField.expression], scope);
    }
    case NodeKind.Try: {
      try {
        return executeStatement(bundle, node[NodeField.block], scope);
      } catch (thrown) {
        // The catch binding scopes over the handler only, like an arrow
        // parameter over its body.
        const frame: Scope = { parent: scope, bindings: new Map() };
        const caught = node[NodeField.param];
        if (caught !== null) {
          frame.bindings.set(caught, thrown as Value);
        }
        return executeStatement(bundle, node[NodeField.handler], frame);
      }
    }
    default: {
      // Every remaining kind is an expression, evaluated for its effect.
      evaluateNode(bundle, node, scope);
      return advanced;
    }
  }
}

// A body expression: as in a tree expression, plain JSON carries itself and
// the `#`-discriminated forms compose. Containers recurse as expressions —
// a spliced runtime array can hold entry calls.
function evaluateNode(
  bundle: Bundle,
  node: BundleExpressionNode,
  scope: Scope | null,
): Value {
  if (!isNode(node)) {
    if (node === null || typeof node !== "object") {
      return node;
    }
    if (Array.isArray(node)) {
      return node.map((element) => evaluateNode(bundle, element, scope));
    }
    const object: { [key: string]: Value } = {};
    for (const [key, value] of Object.entries(node)) {
      object[key] = evaluateNode(bundle, value as BundleExpressionNode, scope);
    }
    return object;
  }
  switch (node["#"]) {
    case NodeKind.Identifier: {
      const frame = lookup(scope, node[NodeField.name]);
      if (frame === null) {
        throw new Error(`unknown identifier ${node[NodeField.name]}`);
      }
      return frame.bindings.get(node[NodeField.name]) ?? null;
    }
    case NodeKind.GetFunction: {
      return getFunction(bundle, node[NodeField.label]);
    }
    case NodeKind.GetTree: {
      return getTree(bundle, node[NodeField.label]);
    }
    case NodeKind.Call: {
      // A method call binds its receiver, so `s.concat(y)` sees `this === s`.
      // The receiver evaluates before the arguments; an optional receiver
      // (`a?.b(…)`) short-circuits a null object to null, arguments
      // unevaluated.
      const callee = node[NodeField.callee];
      if (isNode(callee) && callee["#"] === NodeKind.Property) {
        const object = evaluateNode(
          bundle,
          callee[NodeField.object],
          scope,
        ) as {
          [name: string]: Value;
        };
        if (callee[NodeField.optional] && object === null) {
          return null;
        }
        const method = object[callee[NodeField.name]];
        // An optional call (`a.b?.(…)`) short-circuits a null method the
        // same way, arguments unevaluated.
        if (node[NodeField.optional] && method === null) {
          return null;
        }
        if (typeof method !== "function") {
          throw new Error(`${callee[NodeField.name]} is not a function`);
        }
        const args = (node[NodeField.args] ?? []).map((arg) =>
          evaluateNode(bundle, arg, scope),
        );
        return method.apply(object, args);
      }
      // The callee evaluates before the arguments; an optional call
      // (`cb?.(…)`) short-circuits a null callee to null, arguments
      // unevaluated.
      const value = evaluateNode(bundle, callee, scope);
      if (node[NodeField.optional] && value === null) {
        return null;
      }
      if (typeof value !== "function") {
        throw new Error("callee is not a function");
      }
      const args = (node[NodeField.args] ?? []).map((arg) =>
        evaluateNode(bundle, arg, scope),
      );
      return value(...args);
    }
    case NodeKind.Property: {
      const object = evaluateNode(bundle, node[NodeField.object], scope) as {
        [name: string]: Value;
      };
      if (node[NodeField.optional] && object === null) {
        return null;
      }
      // An absent member reads as null — the language's absent value;
      // `undefined` never arises.
      return object[node[NodeField.name]] ?? null;
    }
    case NodeKind.Binop: {
      return evaluateBinop(
        bundle,
        node[NodeField.operator],
        node[NodeField.left],
        node[NodeField.right],
        scope,
      );
    }
    case NodeKind.Ternary: {
      // Only the taken branch evaluates.
      const taken = condition(
        evaluateNode(bundle, node[NodeField.condition], scope),
        "a ternary condition",
      );
      if (taken) {
        return evaluateNode(bundle, node[NodeField.consequent], scope);
      }
      return evaluateNode(bundle, node[NodeField.alternate], scope);
    }
    case NodeKind.Arrow: {
      return (...args: Value[]) => {
        const frame: Scope = { parent: scope, bindings: new Map() };
        // A missing argument binds as null — the language's absent value;
        // `undefined` never arises (an omitted optional parameter reads
        // as null).
        (node[NodeField.params] ?? []).forEach((param, index) => {
          frame.bindings.set(param, index < args.length ? args[index] : null);
        });
        const body = node[NodeField.body];
        if (isNode(body) && body["#"] === NodeKind.Block) {
          const completion = executeStatement(bundle, body, frame);
          return completion.returned ? completion.value : null;
        }
        // A non-block body is an expression, implicitly returned.
        return evaluateNode(bundle, body as BundleExpressionNode, frame);
      };
    }
  }
}

// Reads a value the language guarantees is boolean: a condition, or an operand
// of `&&`/`||`. The compiler rejects anything else — `cs.condition` exists to
// remove truthiness, and `non-boolean-condition`, `non-boolean-operand`,
// `nested-non-boolean-operand` and `ternary-condition` pin it — so this fires
// only on a bundle no toolchain produced.
//
// It is the interpreter's one runtime type check, and the one thing `load`
// could never take over: whether an operand is boolean is a property of what an
// expression evaluated to, not of the bundle's shape. Checking beats borrowing
// JavaScript's falsiness, which would quietly accept `0` and `""` and give a
// reference implementation the wrong rule to port.
function condition(value: Value, what: string): boolean {
  if (value === true || value === false) {
    return value;
  }
  throw new Error(
    `${what} must be \`true\` or \`false\`: this language has no truthiness, ` +
      `and this bundle produced ${JSON.stringify(value) ?? typeof value}.`,
  );
}

function evaluateBinop(
  bundle: Bundle,
  operator: BundleBinaryOperator,
  leftNode: BundleExpressionNode,
  rightNode: BundleExpressionNode,
  scope: Scope | null,
): Value {
  const left = evaluateNode(bundle, leftNode, scope);
  // The logical operators evaluate their right operand lazily, and both
  // operands are boolean — so `&&` and `||` yield one. Checking only the left
  // would still branch correctly and then return whatever the right side was,
  // letting a non-boolean leak out as the result.
  //
  // `??` is the exception at both ends: it asks whether a value is absent, not
  // whether it is false, so either side may be any value.
  switch (operator) {
    case "&&": {
      if (!condition(left, "the left operand of `&&`")) {
        return false;
      }
      const right = evaluateNode(bundle, rightNode, scope);
      return condition(right, "the right operand of `&&`");
    }
    case "||": {
      if (condition(left, "the left operand of `||`")) {
        return true;
      }
      const right = evaluateNode(bundle, rightNode, scope);
      return condition(right, "the right operand of `||`");
    }
    case "??": {
      if (left !== null) {
        return left;
      }
      return evaluateNode(bundle, rightNode, scope);
    }
    default:
      break;
  }
  const right = evaluateNode(bundle, rightNode, scope);
  switch (operator) {
    case "+": {
      // Two numbers add; a string on either side concatenates. Written out
      // because the cast the other arithmetic uses would be a lie here: it
      // erases, and JavaScript's `+` then does whichever the operands imply.
      // A client not written in JavaScript has to make the same choice, so the
      // choice belongs in the open.
      if (typeof left === "number" && typeof right === "number") {
        return left + right;
      }
      if (typeof left === "string" || typeof right === "string") {
        return `${left as string | number}${right as string | number}`;
      }
      throw new Error(
        "`+` adds two numbers or concatenates with a string; this bundle " +
          `produced ${typeof left} + ${typeof right}.`,
      );
    }
    case "-":
      return (left as number) - (right as number);
    case "*":
      return (left as number) * (right as number);
    case "/":
      return (left as number) / (right as number);
    case "%":
      return (left as number) % (right as number);
    case "===":
      return left === right;
    case "!==":
      return left !== right;
    case "<":
      return (left as number) < (right as number);
    case "<=":
      return (left as number) <= (right as number);
    case ">":
      return (left as number) > (right as number);
    case ">=":
      return (left as number) >= (right as number);
  }
  // No `default`: the switch covers `BundleBinaryOperator`, so adding an
  // operator to the format is a compile error here rather than a throw at
  // evaluation.
  operator satisfies never;
}
