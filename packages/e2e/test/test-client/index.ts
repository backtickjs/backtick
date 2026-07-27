import type {
  Bundle,
  BundleApply,
  BundleBinaryOperator,
  BundleCell,
  BundleElement,
  BundleExpr,
  BundleExpressionNode,
  BundleIdentifierNode,
  BundleSlot,
  BundleStatementNode,
  BundleThunk,
  BundleTree,
  FunctionLabel,
  TreeLabel,
} from "@backtickjs/core";

// A reference client: the interpreter the bundle wire format is specified
// against (see `jit-bundler/bundle/Bundle.ts`). It evaluates a bundle's
// `root` against its `functions` and `trees` tables and returns the resulting
// JavaScript value, so tests can execute a bundled payload and observe its
// runtime behavior instead of only snapshotting its shape.

// What a `BundleElement` evaluates to: the element with its props reduced to
// runtime values (a script prop becomes a callable function). `renderMarkup`
// turns it into markup with those scripts evaluated.
export class TestElement {
  readonly id: string;
  // Mutable because an instance re-renders in place when one of its cells is
  // written: the element a holder has is the instance, so it observes the new
  // render rather than a detached copy.
  key: string | number | null;
  props: { [prop: string]: unknown };

  constructor(
    id: string,
    key: string | number | null,
    props: { [prop: string]: unknown },
  ) {
    this.id = id;
    this.key = key;
    this.props = props;
  }
}

export function evaluate(bundle: Bundle): unknown {
  return evaluateExpr(bundle, bundle.root, []);
}

// A tree instance: what persists on the client. `cells` is the storage the
// entry's `state` declares, allocated fresh per instance, and `children` keys
// nested instances by the `apply` node that created them — the node is the
// child's position, so a re-render reuses the instance instead of resetting its
// cells.
interface Instance {
  readonly bundle: Bundle;
  readonly tree: BundleTree;
  slots: unknown[];
  readonly cells: Map<string, unknown>;
  readonly children: Map<BundleApply, Instance>;
  element: TestElement | null;
}

function instantiate(
  bundle: Bundle,
  tree: BundleTree,
  slots: unknown[],
): Instance {
  const instance: Instance = {
    bundle,
    tree,
    slots,
    cells: new Map(),
    children: new Map(),
    element: null,
  };
  // A cell's initial is evaluated in no instance: it can't read a slot or
  // another cell, so nothing is in scope for it.
  for (const [name, initial] of Object.entries(tree.state ?? {})) {
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
function render(instance: Instance): TestElement | null {
  const rendered = evaluateExpr(
    instance.bundle,
    instance.tree.content,
    instance.slots,
    null,
    instance,
  ) as TestElement | null;
  const existing = instance.element;
  if (existing === null || rendered === null || existing === rendered) {
    instance.element = rendered;
    return rendered;
  }
  existing.key = rendered.key;
  existing.props = rendered.props;
  return existing;
}

// A cell's handle, as a script reads it. `read` observes the instance's current
// storage; `write` replaces it and re-renders — the two rules per-instance state
// adds. A handle a handler captured keeps working across re-renders because it
// resolves the cell by name at call time.
function cellHandle(instance: Instance, name: string): unknown {
  const storage = (): Map<string, unknown> => {
    if (!instance.cells.has(name)) {
      throw new Error(`unknown state cell ${name}`);
    }
    return instance.cells;
  };
  const write = (value: unknown): void => {
    storage().set(name, value);
    render(instance);
  };
  return {
    read: () => storage().get(name),
    write,
    // A write derived from the current value: one write, so one re-render.
    update: (updater: (value: unknown) => unknown) =>
      write(updater(storage().get(name))),
  };
}

// Renders an evaluated element as JSX-like markup: `children` renders as the
// element's body, the other props render as attributes. The element's client
// scripts were already evaluated when the tree was instantiated, so a script
// prop holds the script's value — a handler stays a function and renders as
// `[function]`; rendering never invokes it.
export function renderMarkup(element: TestElement, indent = ""): string {
  const attributes: string[] = [];
  if (element.key !== null) {
    attributes.push(` key=${renderAttribute(element.key, indent)}`);
  }
  let children: unknown[] = [];
  for (const [prop, value] of Object.entries(element.props)) {
    if (prop === "children") {
      children = Array.isArray(value) ? value.flat(Infinity) : [value];
      continue;
    }
    attributes.push(` ${prop}=${renderAttribute(value, indent)}`);
  }
  const opening = `<${element.id}${attributes.join("")}`;
  if (children.length === 0) {
    return `${opening} />`;
  }
  const inner = `${indent}  `;
  const body = children
    .map((child) => `${inner}${renderChild(child, inner)}`)
    .join("\n");
  return `${opening}>\n${body}\n${indent}</${element.id}>`;
}

function renderAttribute(value: unknown, indent: string): string {
  if (typeof value === "string") {
    return JSON.stringify(value);
  }
  if (value instanceof TestElement) {
    return `{${renderMarkup(value, indent)}}`;
  }
  return `{${renderInline(value)}}`;
}

function renderChild(child: unknown, indent: string): string {
  if (child instanceof TestElement) {
    return renderMarkup(child, indent);
  }
  return `{${renderInline(child)}}`;
}

function renderInline(value: unknown): string {
  if (value === undefined) {
    return "undefined";
  }
  if (value === null) {
    return "null";
  }
  if (typeof value === "string") {
    return JSON.stringify(value);
  }
  if (typeof value === "function") {
    return "[function]";
  }
  if (Array.isArray(value)) {
    return `[${value.map(renderInline).join(", ")}]`;
  }
  if (value instanceof TestElement) {
    return renderMarkup(value);
  }
  if (typeof value === "object") {
    const entries = Object.entries(value).map(
      ([key, item]) => `${JSON.stringify(key)}: ${renderInline(item)}`,
    );
    return `{ ${entries.join(", ")} }`;
  }
  return String(value);
}

// One frame per arrow application or block. Names are pre-resolved by the
// bundler and there are no globals: a name no frame binds is a malformed
// bundle.
interface Scope {
  parent: Scope | null;
  bindings: Map<string, unknown>;
}

function lookup(scope: Scope | null, name: string): Scope | null {
  for (let frame = scope; frame !== null; frame = frame.parent) {
    if (frame.bindings.has(name)) {
      return frame;
    }
  }
  return null;
}

// Applies a `functions` or `trees` entry as a function: a function entry is
// its arrow evaluated at the top level; a tree entry takes its slot values
// and instantiates the element.
function entryFunction(
  bundle: Bundle,
  label: FunctionLabel | TreeLabel,
): (...args: unknown[]) => unknown {
  if (label.startsWith("#f")) {
    const arrow = bundle.functions[label as FunctionLabel];
    if (arrow === undefined) {
      throw new Error(`unknown function entry ${label}`);
    }
    return evaluateNode(bundle, arrow, null) as (...args: unknown[]) => unknown;
  }
  const tree = bundle.trees[label as TreeLabel];
  if (tree === undefined) {
    throw new Error(`unknown tree entry ${label}`);
  }
  return (...slots: unknown[]) => instantiate(bundle, tree, slots).element;
}

// An inline element renders in its enclosing instance: it is part of that entry,
// so it reads the same slots and the same cells.
function evaluateElement(
  bundle: Bundle,
  element: BundleElement,
  slots: unknown[],
  instance: Instance | null = null,
): TestElement {
  // An absent key is no key, exactly as a null one was — the wire omits it
  // rather than spelling it out.
  const key =
    element.key === undefined
      ? null
      : (evaluateExpr(bundle, element.key, slots, null, instance) as
          | string
          | number
          | null);
  const props: { [prop: string]: unknown } = {};
  for (const [prop, expr] of Object.entries(element.props)) {
    props[prop] = evaluateExpr(bundle, expr, slots, null, instance);
  }
  return new TestElement(element.id, key, props);
}

// A tree expression (also the root): plain JSON carries itself; the
// `#`-discriminated nodes compose. Bundling rejects plain data carrying
// `#` — the bundle's one reserved key — so the node reading is
// unambiguous.
function evaluateExpr(
  bundle: Bundle,
  expr: BundleExpr,
  slots: unknown[],
  env: Scope | null = null,
  // The enclosing instance, when there is one: what `cell` resolves against, and
  // what a nested `apply` keys its child instance under.
  instance: Instance | null = null,
): unknown {
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
      | BundleSlot
      | BundleCell
      | BundleIdentifierNode
      | BundleApply
      | BundleThunk
      | BundleElement;
    switch (form["#"]) {
      case "slot": {
        return slots[form.index];
      }
      case "cell": {
        // A cell is declared by the enclosing entry, so it is only meaningful
        // inside an instance of it.
        if (instance === null) {
          throw new Error(`no instance to resolve state cell ${form.name}`);
        }
        return cellHandle(instance, form.name);
      }
      case "identifier": {
        // A parameter of an enclosing thunk.
        const frame = lookup(env, form.name);
        if (frame === null) {
          throw new Error(`unknown identifier ${form.name}`);
        }
        return frame.bindings.get(form.name);
      }
      case "apply": {
        const args = form.args.map((arg) =>
          evaluateExpr(bundle, arg, slots, env, instance),
        );
        // A nested instance persists across the parent's re-renders, keyed by
        // this node — its position in the parent.
        if (instance !== null && form.label.startsWith("#t")) {
          const tree = bundle.trees[form.label as TreeLabel];
          if (tree === undefined) {
            throw new Error(`unknown tree entry ${form.label}`);
          }
          const child = instance.children.get(form);
          if (child !== undefined) {
            child.slots = args;
            return render(child);
          }
          const created = instantiate(bundle, tree, args);
          instance.children.set(form, created);
          return created.element;
        }
        return entryFunction(bundle, form.label)(...args);
      }
      case "thunk": {
        const params = form.params;
        if (!params || params.length === 0) {
          return () =>
            evaluateExpr(bundle, form.expression, slots, env, instance);
        }
        // The hole call supplies the entry-scoped bindings the splice
        // captures, one value per parameter, over the enclosing frame.
        return (...args: unknown[]) => {
          const frame: Scope = { parent: env, bindings: new Map() };
          params.forEach((param, index) => {
            frame.bindings.set(param, args[index]);
          });
          return evaluateExpr(bundle, form.expression, slots, frame, instance);
        };
      }
      case "element": {
        return evaluateElement(bundle, form, slots, instance);
      }
    }
  }
  const object: { [key: string]: unknown } = {};
  for (const [key, value] of Object.entries(expr)) {
    object[key] = evaluateExpr(bundle, value, slots, env, instance);
  }
  return object;
}

// A `#`-discriminated node, as opposed to plain JSON carrying itself.
// Bundling rejects plain data carrying `#` — the bundle's one reserved key —
// so the node reading is unambiguous.
function isNode(
  node: BundleStatementNode,
): node is Extract<BundleStatementNode, { "#": string }> {
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
  value: unknown;
}

const advanced: Completion = { returned: false, value: undefined };

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
    case "block": {
      const frame: Scope = { parent: scope, bindings: new Map() };
      // Declarations hoist to the block: a use before its declaration
      // resolves to the local (with value `undefined`), never outward.
      for (const statement of node.statements) {
        if (isNode(statement) && statement["#"] === "declaration") {
          frame.bindings.set(statement.name, undefined);
        }
      }
      for (const statement of node.statements) {
        const completion = executeStatement(bundle, statement, frame);
        if (completion.returned) {
          return completion;
        }
      }
      return advanced;
    }
    case "declaration": {
      scope.bindings.set(
        node.name,
        evaluateNode(bundle, node.expression, scope),
      );
      return advanced;
    }
    case "assignment": {
      const value = evaluateNode(bundle, node.expression, scope);
      const frame = lookup(scope, node.name);
      if (frame === null) {
        throw new Error(`unknown assignment target ${node.name}`);
      }
      frame.bindings.set(node.name, value);
      return advanced;
    }
    case "if": {
      if (evaluateNode(bundle, node.condition, scope)) {
        return executeStatement(bundle, node.consequent, scope);
      }
      if (node.alternate !== null) {
        return executeStatement(bundle, node.alternate, scope);
      }
      return advanced;
    }
    case "return": {
      return {
        returned: true,
        value: evaluateNode(bundle, node.expression, scope),
      };
    }
    case "throw": {
      throw evaluateNode(bundle, node.expression, scope);
    }
    case "try": {
      try {
        return executeStatement(bundle, node.block, scope);
      } catch (thrown) {
        // The catch binding scopes over the handler only, like an arrow
        // parameter over its body.
        const frame: Scope = { parent: scope, bindings: new Map() };
        if (node.param !== null) {
          frame.bindings.set(node.param, thrown);
        }
        return executeStatement(bundle, node.handler, frame);
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
): unknown {
  if (!isNode(node)) {
    if (node === null || typeof node !== "object") {
      return node;
    }
    if (Array.isArray(node)) {
      return node.map((element) => evaluateNode(bundle, element, scope));
    }
    const object: { [key: string]: unknown } = {};
    for (const [key, value] of Object.entries(node)) {
      object[key] = evaluateNode(bundle, value, scope);
    }
    return object;
  }
  switch (node["#"]) {
    case "identifier": {
      const frame = lookup(scope, node.name);
      if (frame === null) {
        throw new Error(`unknown identifier ${node.name}`);
      }
      return frame.bindings.get(node.name);
    }
    case "entry": {
      return entryFunction(bundle, node.label);
    }
    case "call": {
      // A method call binds its receiver, so `s.concat(y)` sees `this === s`.
      // The receiver evaluates before the arguments; an optional receiver
      // (`a?.b(…)`) short-circuits a null object to null, arguments
      // unevaluated.
      if (isNode(node.callee) && node.callee["#"] === "property") {
        const object = evaluateNode(bundle, node.callee.object, scope) as {
          [name: string]: unknown;
        };
        if (node.callee.optional && object === null) {
          return null;
        }
        const method = object[node.callee.name];
        // An optional call (`a.b?.(…)`) short-circuits a null method the
        // same way, arguments unevaluated.
        if (node.optional && method === null) {
          return null;
        }
        if (typeof method !== "function") {
          throw new Error(`${node.callee.name} is not a function`);
        }
        const args = node.args.map((arg) => evaluateNode(bundle, arg, scope));
        return method.apply(object, args);
      }
      // The callee evaluates before the arguments; an optional call
      // (`cb?.(…)`) short-circuits a null callee to null, arguments
      // unevaluated.
      const callee = evaluateNode(bundle, node.callee, scope);
      if (node.optional && callee === null) {
        return null;
      }
      if (typeof callee !== "function") {
        throw new Error("callee is not a function");
      }
      const args = node.args.map((arg) => evaluateNode(bundle, arg, scope));
      return callee(...args);
    }
    case "property": {
      const object = evaluateNode(bundle, node.object, scope) as {
        [name: string]: unknown;
      };
      if (node.optional && object === null) {
        return null;
      }
      // An absent member reads as null — the language's absent value;
      // `undefined` never arises.
      return object[node.name] ?? null;
    }
    case "binop": {
      return evaluateBinop(bundle, node.operator, node.left, node.right, scope);
    }
    case "ternary": {
      // The condition is boolean by construction — no ToBoolean rules —
      // and only the taken branch evaluates.
      return evaluateNode(bundle, node.condition, scope)
        ? evaluateNode(bundle, node.consequent, scope)
        : evaluateNode(bundle, node.alternate, scope);
    }
    case "arrow": {
      return (...args: unknown[]) => {
        const frame: Scope = { parent: scope, bindings: new Map() };
        // A missing argument binds as null — the language's absent value;
        // `undefined` never arises (an omitted optional parameter reads
        // as null).
        node.params.forEach((param, index) => {
          frame.bindings.set(param, index < args.length ? args[index] : null);
        });
        const body = node.body;
        if (isNode(body) && body["#"] === "block") {
          const completion = executeStatement(bundle, body, frame);
          return completion.returned ? completion.value : null;
        }
        // A non-block body is an expression, implicitly returned.
        return evaluateNode(bundle, body as BundleExpressionNode, frame);
      };
    }
  }
}

function evaluateBinop(
  bundle: Bundle,
  operator: BundleBinaryOperator,
  leftNode: BundleExpressionNode,
  rightNode: BundleExpressionNode,
  scope: Scope | null,
): unknown {
  const left = evaluateNode(bundle, leftNode, scope);
  // The logical operators evaluate their right operand lazily.
  switch (operator) {
    case "&&":
      return left && evaluateNode(bundle, rightNode, scope);
    case "||":
      return left || evaluateNode(bundle, rightNode, scope);
    case "??":
      return left ?? evaluateNode(bundle, rightNode, scope);
    default:
      break;
  }
  const right = evaluateNode(bundle, rightNode, scope);
  switch (operator) {
    case "+":
      return (left as number) + (right as number);
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
    default: {
      operator satisfies never;
      throw new Error(`unsupported binary operator ${operator}`);
    }
  }
}
