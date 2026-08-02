import { NodeKind, NodeField } from "@backtickjs/core";
import type {
  Bundle,
  BundleBody,
  BundleElement,
  BundleExpr,
  BundleExpressionNode,
  BundleSpreadElementNode,
  BundleStatementNode,
} from "@backtickjs/core";

// Renders a bundle as a human-readable debug view: each `functions` entry as
// pseudo-JS, each `trees` entry as pseudo-JSX, and the root as the
// expression that evaluates it. This is a reading aid for the `*.bundle`
// snapshots, not a wire format — nothing parses it back.
export function renderBundleDebug(bundle: Bundle): string {
  const sections: string[] = [];
  for (const [label, arrow] of Object.entries(bundle.functions)) {
    sections.push(`${fnLabel(label)} = ${renderNode(arrow, "")}`);
  }
  for (const [label, tree] of Object.entries(bundle.trees)) {
    // The entry's cells read as a header on its label — storage it allocates
    // per instance, before the content renders.
    const cells = Object.entries(tree[NodeField.state] ?? {})
      .map(([name, initial]) => `${name} = ${renderExpr(initial, "")}`)
      .join(", ");
    const named = treeLabel(label);
    const header = cells === "" ? named : `${named} state { ${cells} }`;
    sections.push(`${header} = ${renderExpr(tree[NodeField.content], "")}`);
  }
  sections.push(`root = ${renderExpr(bundle.root, "")}`);
  return `${sections.join("\n\n")}\n`;
}

// A label as this view names it. The node kind says which table on the wire,
// but a debug file is read without one in hand, so the two are spelled apart
// here. These snapshots use `functionLabels: "index"`, so a label is already
// short and stands for itself.
const fnLabel = (label: string): string => `#f${label}`;
const treeLabel = (label: string): string => `#t${label}`;

// A `#`-discriminated node, as opposed to plain JSON carrying itself.
function isNode(
  node: BundleStatementNode | BundleExpr,
): node is Extract<BundleStatementNode | BundleExpr, { "#": NodeKind }> {
  return (
    typeof node === "object" &&
    node !== null &&
    !Array.isArray(node) &&
    "#" in node
  );
}

// Body grammar, as pseudo-JS.
// `...xs`, which stands where an element or an argument stands rather than
// where a statement does — so it is read before the statement kinds are.
function isSpread(
  node: BundleStatementNode | BundleSpreadElementNode,
): node is BundleSpreadElementNode {
  return (
    typeof node === "object" &&
    node !== null &&
    !Array.isArray(node) &&
    "#" in node &&
    node["#"] === NodeKind.SpreadElement
  );
}

function renderNode(
  node: BundleStatementNode | BundleSpreadElementNode,
  indent: string,
): string {
  if (isSpread(node)) {
    return `...${renderNode(node[NodeField.expression], indent)}`;
  }
  if (!isNode(node)) {
    return renderData(node, indent, renderNode);
  }
  const inner = `${indent}  `;
  switch (node["#"]) {
    case NodeKind.Identifier:
      return node[NodeField.text];
    case NodeKind.GetFunction:
      return fnLabel(node[NodeField.label]);
    case NodeKind.GetTree:
      return treeLabel(node[NodeField.label]);
    // A global the format names and the host answers.
    case NodeKind.Builtin:
      return node[NodeField.name];
    // Same notation as in tree position: a body applies an entry when the
    // instance it makes is named, and calls one when it isn't.
    case NodeKind.ApplyTree: {
      const args = (node[NodeField.arguments] ?? []).map((arg) =>
        renderNode(arg, indent),
      );
      const applied = node[NodeField.key];
      const key =
        applied === undefined ? "" : ` key=${renderNode(applied, indent)}`;
      return `${treeLabel(node[NodeField.label])}(${args.join(", ")})${key}`;
    }
    case NodeKind.CallExpression: {
      const args = (node[NodeField.arguments] ?? []).map((arg) =>
        renderNode(arg, indent),
      );
      const calleeNode = node[NodeField.expression];
      const callee = renderNode(calleeNode, indent);
      // An arrow callee (an expansion applied to its arguments) binds
      // looser than the call — parenthesize so the text reads as it runs.
      const target =
        isNode(calleeNode) && calleeNode["#"] === NodeKind.ArrowFunction
          ? `(${callee})`
          : callee;
      return `${target}${node[NodeField.questionDotToken] ? "?." : ""}(${args.join(", ")})`;
    }
    case NodeKind.PropertyAccessExpression:
      return `${renderNode(node[NodeField.expression], indent)}${node[NodeField.questionDotToken] ? "?." : "."}${node[NodeField.name]}`;
    case NodeKind.ElementAccessExpression:
      return `${renderNode(node[NodeField.expression], indent)}[${renderNode(node[NodeField.argumentExpression], indent)}]`;
    case NodeKind.BinaryExpression:
      return `${renderNode(node[NodeField.left], indent)} ${node[NodeField.operatorToken]} ${renderNode(
        node[NodeField.right],
        indent,
      )}`;
    case NodeKind.PrefixUnaryExpression: {
      // `!` binds tighter than any binary operator, so an operand that is one
      // reads as the wrong tree without parentheses.
      const operand = node[NodeField.operand];
      const text = renderNode(operand, indent);
      const looser =
        isNode(operand) &&
        (operand["#"] === NodeKind.BinaryExpression ||
          operand["#"] === NodeKind.ConditionalExpression);
      return `${node[NodeField.operator]}${looser ? `(${text})` : text}`;
    }
    case NodeKind.ConditionalExpression:
      return `${renderNode(node[NodeField.condition], indent)} ? ${renderNode(
        node[NodeField.whenTrue],
        indent,
      )} : ${renderNode(node[NodeField.whenFalse], indent)}`;
    case NodeKind.ArrowFunction:
      return `(${(node[NodeField.parameters] ?? [])
        .map((param) => param[NodeField.name])
        .join(", ")}) => ${renderBody(node[NodeField.body], indent)}`;
    case NodeKind.Block: {
      const statements = (node[NodeField.statements] ?? []).map(
        (statement) => `${inner}${renderStatement(statement, inner)}`,
      );
      return `{\n${statements.join("\n")}\n${indent}}`;
    }
    case NodeKind.VariableDeclaration:
      return `${node[NodeField.keyword]} ${node[NodeField.name]} = ${renderNode(
        node[NodeField.initializer],
        indent,
      )}`;
    case NodeKind.IfStatement: {
      const consequent = renderStatement(node[NodeField.thenStatement], indent);
      const alternate =
        node[NodeField.elseStatement] === null
          ? ""
          : ` else ${renderStatement(node[NodeField.elseStatement], indent)}`;
      return `if (${renderNode(node[NodeField.expression], indent)}) ${consequent}${alternate}`;
    }
    case NodeKind.WhileStatement:
      return `while (${renderNode(node[NodeField.expression], indent)}) ${renderStatement(
        node[NodeField.statement],
        indent,
      )}`;
    case NodeKind.ForStatement: {
      const init = node[NodeField.initializer];
      const condition = node[NodeField.condition];
      const update = node[NodeField.incrementor];
      const parts = [
        init === null ? "" : renderNode(init, indent),
        condition === null ? "" : renderNode(condition, indent),
        update === null ? "" : renderNode(update, indent),
      ];
      const header = parts.every((part) => part === "")
        ? ";;"
        : parts.join("; ");
      return `for (${header}) ${renderStatement(node[NodeField.statement], indent)}`;
    }
    case NodeKind.BreakStatement:
      return "break";
    case NodeKind.ContinueStatement:
      return "continue";
    case NodeKind.ReturnStatement:
      return `return ${renderNode(node[NodeField.expression], indent)}`;
    case NodeKind.ThrowStatement:
      return `throw ${renderNode(node[NodeField.expression], indent)}`;
    case NodeKind.TryStatement: {
      const clause = node[NodeField.catchClause];
      const bound = clause[NodeField.variableDeclaration];
      const param = bound === null ? "" : ` (${bound})`;
      return `try ${renderNode(node[NodeField.tryBlock], indent)} catch${param} ${renderNode(
        clause[NodeField.block],
        indent,
      )}`;
    }
  }
}

// A body statement reads as pseudo-JS with a terminating `;` unless it ends
// with a block of its own.
function renderStatement(node: BundleStatementNode, indent: string): string {
  const text = renderNode(node, indent);
  return isNode(node) &&
    (node["#"] === NodeKind.Block ||
      node["#"] === NodeKind.IfStatement ||
      node["#"] === NodeKind.WhileStatement ||
      node["#"] === NodeKind.ForStatement ||
      node["#"] === NodeKind.TryStatement)
    ? text
    : `${text};`;
}

// An arrow body: a block, or an expression implicitly returned.
function renderBody(body: BundleBody, indent: string): string {
  if (isNode(body) && body["#"] === NodeKind.Block) {
    return renderNode(body, indent);
  }
  return renderNode(body as BundleExpressionNode, indent);
}

// Tree grammar, as pseudo-JS with elements as pseudo-JSX.
function renderExpr(expr: BundleExpr, indent: string): string {
  if (!isNode(expr)) {
    return renderData(expr, indent, renderExpr);
  }
  switch (expr["#"]) {
    case NodeKind.GetSlot:
      return `slots[${expr[NodeField.index]}]`;
    case NodeKind.GetState:
      return `cells.${expr[NodeField.name]}`;
    case NodeKind.GetFunction:
      return fnLabel(expr[NodeField.label]);
    case NodeKind.ApplyFunction: {
      const args = (expr[NodeField.arguments] ?? []).map((arg) =>
        renderExpr(arg, indent),
      );
      return `${fnLabel(expr[NodeField.label])}(${args.join(", ")})`;
    }
    case NodeKind.ApplyTree: {
      const args = (expr[NodeField.arguments] ?? []).map((arg) =>
        renderExpr(arg, indent),
      );
      // A keyed instantiation reads as a suffix, since the key identifies the
      // instance rather than being one of the entry's arguments.
      const applyKey = expr[NodeField.key];
      const key =
        applyKey === undefined ? "" : ` key=${renderExpr(applyKey, indent)}`;
      return `${treeLabel(expr[NodeField.label])}(${args.join(", ")})${key}`;
    }
    case NodeKind.Thunk: {
      const params = (expr[NodeField.parameters] ?? []).map(
        (param) => param[NodeField.name],
      );
      return `(${params.join(", ")}) => ${renderExpr(expr[NodeField.expression], indent)}`;
    }
    case NodeKind.Identifier:
      return expr[NodeField.text];
    case NodeKind.Element:
      return renderJsx(expr, indent);
  }
}

// A JSX-like view of an element: props as attributes — each on its own
// line — and `children` as the body, one child per line.
function renderJsx(element: BundleElement, indent: string): string {
  const inner = `${indent}  `;
  const attributes: string[] = [];
  const elementKey = element[NodeField.key];
  if (elementKey !== undefined) {
    attributes.push(`${inner}key={${renderExpr(elementKey, inner)}}`);
  }
  let children: BundleExpr[] = [];
  for (const [prop, value] of Object.entries(element[NodeField.props] ?? {})) {
    if (prop === "children") {
      children = Array.isArray(value) ? value : [value];
      continue;
    }
    attributes.push(`${inner}${prop}={${renderExpr(value, inner)}}`);
  }
  const opening =
    attributes.length === 0
      ? `<${element[NodeField.id]}`
      : `<${element[NodeField.id]}\n${attributes.join("\n")}\n${indent}`;
  if (children.length === 0) {
    return `${opening}${attributes.length === 0 ? " " : ""}/>`;
  }
  const body = children
    .map((child) => `${inner}{${renderExpr(child, inner)}}`)
    .join("\n");
  return `${opening}>\n${body}\n${indent}</${element[NodeField.id]}>`;
}

// A container stays on one line while it fits the column budget; a large one
// breaks with one item per line, so nesting reads like formatted source.
const columns = 80;

// Plain JSON carrying itself, in either grammar: containers recurse with the
// grammar's own renderer.
function renderData<T>(
  value: T & (null | boolean | number | string | T[] | object),
  indent: string,
  render: (child: never, indent: string) => string,
): string {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }
  const inner = `${indent}  `;
  if (Array.isArray(value)) {
    const items = value.map((item) => render(item as never, inner));
    const inline = `[${items.join(", ")}]`;
    if (!inline.includes("\n") && indent.length + inline.length <= columns) {
      return inline;
    }
    return `[\n${items.map((item) => inner + item).join(",\n")}\n${indent}]`;
  }
  const entries = Object.entries(value).map(
    ([key, item]) => `${JSON.stringify(key)}: ${render(item as never, inner)}`,
  );
  if (entries.length === 0) {
    return "{}";
  }
  const inline = `{ ${entries.join(", ")} }`;
  if (!inline.includes("\n") && indent.length + inline.length <= columns) {
    return inline;
  }
  return `{\n${entries.map((entry) => inner + entry).join(",\n")}\n${indent}}`;
}
