import type {
  Bundle,
  BundleElement,
  BundleExpr,
  BundleNode,
  FunctionLabel,
  TreeLabel,
} from "../jit-bundler/index.js";

// A reference client: the interpreter the bundle wire format is specified
// against (see `jit-bundler/bundle/nodes/Bundle.ts`). It evaluates a bundle's
// `root` against its `functions` and `trees` tables and returns the resulting
// JavaScript value, so tests can execute a bundled payload and observe its
// runtime behavior instead of only snapshotting its shape.

// What a `BundleElement` evaluates to: the element with its props reduced to
// runtime values (a script prop becomes a callable function). `renderMarkup`
// turns it into markup with those scripts evaluated.
export class TestElement {
  readonly type: string;
  readonly key: string | number | null;
  readonly props: { [prop: string]: unknown };

  constructor(
    type: string,
    key: string | number | null,
    props: { [prop: string]: unknown },
  ) {
    this.type = type;
    this.key = key;
    this.props = props;
  }
}

export function evaluate(bundle: Bundle): unknown {
  return evaluateExpr(bundle, bundle.root, []);
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
  const opening = `<${element.type}${attributes.join("")}`;
  if (children.length === 0) {
    return `${opening} />`;
  }
  const inner = `${indent}  `;
  const body = children
    .map((child) => `${inner}${renderChild(child, inner)}`)
    .join("\n");
  return `${opening}>\n${body}\n${indent}</${element.type}>`;
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
// bundler: resolution either finds a binding in the chain or falls through to
// the host global object.
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

function globals(): Record<string, unknown> {
  return globalThis as unknown as Record<string, unknown>;
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
  return (...slots: unknown[]) => evaluateElement(bundle, tree.element, slots);
}

function evaluateElement(
  bundle: Bundle,
  element: BundleElement,
  slots: unknown[],
): TestElement {
  const props: { [prop: string]: unknown } = {};
  for (const [prop, expr] of Object.entries(element.props)) {
    props[prop] = evaluateExpr(bundle, expr, slots);
  }
  return new TestElement(element.type, element.key, props);
}

// A tree expression (also the root): plain JSON carries itself; the tagged
// forms and element nodes compose. Bundling rejects plain data that mimics a
// tag or the element shape, so the tagged reading is unambiguous.
function evaluateExpr(
  bundle: Bundle,
  expr: BundleExpr,
  slots: unknown[],
): unknown {
  if (expr === null || typeof expr !== "object") {
    return expr;
  }
  if (Array.isArray(expr)) {
    return expr.map((element) => evaluateExpr(bundle, element, slots));
  }
  if ("#slot" in expr) {
    return slots[expr["#slot"] as number];
  }
  if ("#global" in expr) {
    return globals()[expr["#global"] as string];
  }
  if ("#call" in expr) {
    const args = (expr.args as BundleExpr[]).map((arg) =>
      evaluateExpr(bundle, arg, slots),
    );
    return entryFunction(
      bundle,
      expr["#call"] as FunctionLabel | TreeLabel,
    )(...args);
  }
  if ("#thunk" in expr) {
    return () => evaluateExpr(bundle, expr["#thunk"] as BundleExpr, slots);
  }
  if (typeof expr.type === "string" && "key" in expr && "props" in expr) {
    return evaluateElement(bundle, expr as unknown as BundleElement, slots);
  }
  const object: { [key: string]: unknown } = {};
  for (const [key, value] of Object.entries(expr)) {
    object[key] = evaluateExpr(bundle, value, slots);
  }
  return object;
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
  node: BundleNode,
  scope: Scope,
): Completion {
  switch (node.kind) {
    case "block": {
      const frame: Scope = { parent: scope, bindings: new Map() };
      // Declarations hoist to the block: a use before its declaration
      // resolves to the local (with value `undefined`), never outward.
      for (const statement of node.statements) {
        if (statement.kind === "declaration") {
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
        globals()[node.name] = value;
      } else {
        frame.bindings.set(node.name, value);
      }
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
    default: {
      evaluateNode(bundle, node, scope);
      return advanced;
    }
  }
}

function evaluateNode(
  bundle: Bundle,
  node: BundleNode,
  scope: Scope | null,
): unknown {
  switch (node.kind) {
    case "value": {
      return node.value;
    }
    case "array": {
      return node.elements.map((element) =>
        evaluateNode(bundle, element, scope),
      );
    }
    case "object": {
      const object: { [key: string]: unknown } = {};
      for (const [key, value] of Object.entries(node.entries)) {
        object[key] = evaluateNode(bundle, value, scope);
      }
      return object;
    }
    case "identifier": {
      const frame = lookup(scope, node.name);
      if (frame === null) {
        return globals()[node.name];
      }
      return frame.bindings.get(node.name);
    }
    case "entry": {
      return entryFunction(bundle, node.label);
    }
    case "call": {
      const args = node.args.map((arg) => evaluateNode(bundle, arg, scope));
      // A method call binds its receiver, so `s.concat(y)` sees `this === s`.
      if (node.callee.kind === "property") {
        const object = evaluateNode(bundle, node.callee.object, scope) as {
          [name: string]: unknown;
        };
        const method = object[node.callee.name];
        if (typeof method !== "function") {
          throw new Error(`${node.callee.name} is not a function`);
        }
        return method.apply(object, args);
      }
      const callee = evaluateNode(bundle, node.callee, scope);
      if (typeof callee !== "function") {
        throw new Error("callee is not a function");
      }
      return callee(...args);
    }
    case "property": {
      const object = evaluateNode(bundle, node.object, scope) as {
        [name: string]: unknown;
      };
      return object[node.name];
    }
    case "binop": {
      return evaluateBinop(bundle, node.operator, node.left, node.right, scope);
    }
    case "arrow": {
      return (...args: unknown[]) => {
        const frame: Scope = { parent: scope, bindings: new Map() };
        node.params.forEach((param, index) => {
          frame.bindings.set(param, args[index]);
        });
        if (node.body.kind === "block") {
          return executeStatement(bundle, node.body, frame).value;
        }
        return evaluateNode(bundle, node.body, frame);
      };
    }
    default: {
      throw new Error(`unexpected ${node.kind} node in expression position`);
    }
  }
}

function evaluateBinop(
  bundle: Bundle,
  operator: string,
  leftNode: BundleNode,
  rightNode: BundleNode,
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
    default:
      throw new Error(`unsupported binary operator ${operator}`);
  }
}
