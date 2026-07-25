import type {
  Bundle,
  BundleApply,
  BundleBinaryOperator,
  BundleElement,
  BundleExpr,
  BundleExpressionNode,
  BundleIdentifierNode,
  BundleSlot,
  BundleStatementNode,
  BundleThunk,
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
  readonly key: string | number | null;
  readonly props: { [prop: string]: unknown };

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
  return (...slots: unknown[]) => evaluateElement(bundle, tree.element, slots);
}

function evaluateElement(
  bundle: Bundle,
  element: BundleElement,
  slots: unknown[],
): TestElement {
  const key = evaluateExpr(bundle, element.key, slots) as
    | string
    | number
    | null;
  const props: { [prop: string]: unknown } = {};
  for (const [prop, expr] of Object.entries(element.props)) {
    props[prop] = evaluateExpr(bundle, expr, slots);
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
): unknown {
  if (expr === null || typeof expr !== "object") {
    return expr;
  }
  if (Array.isArray(expr)) {
    return expr.map((element) => evaluateExpr(bundle, element, slots, env));
  }
  if ("#" in expr) {
    const form = expr as
      | BundleSlot
      | BundleIdentifierNode
      | BundleApply
      | BundleThunk
      | BundleElement;
    switch (form["#"]) {
      case "slot": {
        return slots[form.index];
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
          evaluateExpr(bundle, arg, slots, env),
        );
        return entryFunction(bundle, form.label)(...args);
      }
      case "thunk": {
        const params = form.params;
        if (!params || params.length === 0) {
          return () => evaluateExpr(bundle, form.expression, slots, env);
        }
        // The hole call supplies the entry-scoped bindings the splice
        // captures, one value per parameter, over the enclosing frame.
        return (...args: unknown[]) => {
          const frame: Scope = { parent: env, bindings: new Map() };
          params.forEach((param, index) => {
            frame.bindings.set(param, args[index]);
          });
          return evaluateExpr(bundle, form.expression, slots, frame);
        };
      }
      case "element": {
        return evaluateElement(bundle, form, slots);
      }
    }
  }
  const object: { [key: string]: unknown } = {};
  for (const [key, value] of Object.entries(expr)) {
    object[key] = evaluateExpr(bundle, value, slots, env);
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
