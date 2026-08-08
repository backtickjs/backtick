import { NodeKind } from "@backtickjs/core";
import type {
  Bundle,
  BundleArrayElement,
  BundleBody,
  BundleElement,
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
  for (const [label, entry] of Object.entries(bundle.functions)) {
    sections.push(`${fnLabel(label)} = ${renderNode(entry[0], "")}`);
  }
  sections.push(`root = ${renderNode(bundle.root, "")}`);
  return `${sections.join("\n\n")}\n`;
}

// A label as this view names it. One table, so one sigil — a drawing entry's
// label already says which it is (`t0`). These snapshots use
// `functionLabels: "index"`, so a label is already short and stands for itself.
const fnLabel = (label: string): string => `#f${label}`;

// A node, as opposed to plain JSON carrying itself: every node is an array,
// and an array of data travels as one too (`DataArray`).
function isNode(
  node: BundleStatementNode | BundleExpressionNode,
): node is Extract<
  BundleStatementNode | BundleExpressionNode,
  { 0: NodeKind }
> {
  return Array.isArray(node);
}

// Body grammar, as pseudo-JS.
// `...xs`, which stands where an element or an argument stands rather than
// where a statement does — so it is read before the statement kinds are.
function isSpread(
  node: BundleStatementNode | BundleSpreadElementNode,
): node is BundleSpreadElementNode {
  return Array.isArray(node) && node[0] === NodeKind.SpreadElement;
}

function renderNode(
  node: BundleStatementNode | BundleSpreadElementNode,
  indent: string,
): string {
  if (isSpread(node)) {
    return `...${renderNode(node[1], indent)}`;
  }
  if (!isNode(node)) {
    return renderData(node, indent, renderNode);
  }
  const inner = `${indent}  `;
  switch (node[0]) {
    // Data, which a node kind carries only so it is not read as a node.
    case NodeKind.DataArray:
      return renderData<BundleArrayElement[]>(node[1], indent, renderNode);
    case NodeKind.Identifier:
      return node[1];
    case NodeKind.GetFunction:
      return fnLabel(node[1]);
    // What a tree entry's body yields.
    case NodeKind.Element:
      return renderJsx(node, indent);
    // Written as the element it used to be, so a list still reads as one.
    case NodeKind.For:
      return renderJsx(
        [NodeKind.Element, "For", { each: node[1] }, node[2]],
        indent,
      );
    // A global the format names and the host answers.
    case NodeKind.Builtin:
      return node[1];
    // Storage made where it stands, which is why it reads as a declaration
    // rather than a call.
    case NodeKind.State:
      return `state(${renderNode(node[1], indent)})`;
    // Same notation as in tree position: a body applies an entry when the
    // instance it makes is named, and calls one when it isn't.
    case NodeKind.ApplyFunction: {
      const args = node[2].map((arg) => renderNode(arg, indent));
      return `${fnLabel(node[1])}(${args.join(", ")})`;
    }
    case NodeKind.CallExpression: {
      const args = node[3].map((arg) => renderNode(arg, indent));
      const calleeNode = node[1];
      const callee = renderNode(calleeNode, indent);
      // An arrow callee (an expansion applied to its arguments) binds
      // looser than the call — parenthesize so the text reads as it runs.
      const target =
        isNode(calleeNode) && calleeNode[0] === NodeKind.ArrowFunction
          ? `(${callee})`
          : callee;
      return `${target}${node[2] ? "?." : ""}(${args.join(", ")})`;
    }
    case NodeKind.PropertyAccessExpression:
      return `${renderNode(node[1], indent)}${node[2] ? "?." : "."}${node[3]}`;
    case NodeKind.ElementAccessExpression:
      return `${renderNode(node[1], indent)}[${renderNode(node[2], indent)}]`;
    case NodeKind.BinaryExpression:
      return `${renderNode(node[2], indent)} ${node[1]} ${renderNode(
        node[3],
        indent,
      )}`;
    case NodeKind.PrefixUnaryExpression: {
      // `!` binds tighter than any binary operator, so an operand that is one
      // reads as the wrong tree without parentheses.
      const operand = node[2];
      const text = renderNode(operand, indent);
      const looser =
        isNode(operand) &&
        (operand[0] === NodeKind.BinaryExpression ||
          operand[0] === NodeKind.ConditionalExpression);
      return `${node[1]}${looser ? `(${text})` : text}`;
    }
    case NodeKind.ConditionalExpression:
      return `${renderNode(node[1], indent)} ? ${renderNode(
        node[2],
        indent,
      )} : ${renderNode(node[3], indent)}`;
    case NodeKind.ArrowFunction:
      return `(${node[1]
        .map((param) => param[1])
        .join(", ")}) => ${renderBody(node[2], indent)}`;
    case NodeKind.Block: {
      const statements = node[1].map(
        (statement) => `${inner}${renderStatement(statement, inner)}`,
      );
      return `{\n${statements.join("\n")}\n${indent}}`;
    }
    case NodeKind.VariableDeclaration:
      return `${node[3]} ${node[1]} = ${renderNode(node[2], indent)}`;
    case NodeKind.IfStatement: {
      const consequent = renderStatement(node[2], indent);
      const branch = node[3];
      const alternate =
        branch === null ? "" : ` else ${renderStatement(branch, indent)}`;
      return `if (${renderNode(node[1], indent)}) ${consequent}${alternate}`;
    }
    case NodeKind.WhileStatement:
      return `while (${renderNode(node[1], indent)}) ${renderStatement(
        node[2],
        indent,
      )}`;
    case NodeKind.ForStatement: {
      const init = node[1];
      const condition = node[2];
      const update = node[3];
      const parts = [
        init === null ? "" : renderNode(init, indent),
        condition === null ? "" : renderNode(condition, indent),
        update === null ? "" : renderNode(update, indent),
      ];
      const header = parts.every((part) => part === "")
        ? ";;"
        : parts.join("; ");
      return `for (${header}) ${renderStatement(node[4], indent)}`;
    }
    case NodeKind.BreakStatement:
      return "break";
    case NodeKind.ContinueStatement:
      return "continue";
    case NodeKind.ReturnStatement:
      return `return ${renderNode(node[1], indent)}`;
    case NodeKind.ThrowStatement:
      return `throw ${renderNode(node[1], indent)}`;
    case NodeKind.TryStatement: {
      const clause = node[2];
      const bound = clause[1];
      const param = bound === null ? "" : ` (${bound})`;
      return `try ${renderNode(node[1], indent)} catch${param} ${renderNode(
        clause[2],
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
    (node[0] === NodeKind.Block ||
      node[0] === NodeKind.IfStatement ||
      node[0] === NodeKind.WhileStatement ||
      node[0] === NodeKind.ForStatement ||
      node[0] === NodeKind.TryStatement)
    ? text
    : `${text};`;
}

// An arrow body: a block, or an expression implicitly returned.
function renderBody(body: BundleBody, indent: string): string {
  if (isNode(body) && body[0] === NodeKind.Block) {
    return renderNode(body, indent);
  }
  return renderNode(body as BundleExpressionNode, indent);
}

// A JSX-like view of an element: props as attributes — each on its own
// line — and `children` as the body, one child per line.
function renderJsx(element: BundleElement, indent: string): string {
  const inner = `${indent}  `;
  const attributes: string[] = [];
  for (const [prop, value] of Object.entries(element[2])) {
    attributes.push(`${inner}${prop}={${renderNode(value, inner)}}`);
  }
  const held = element[3];
  const children: BundleArrayElement[] =
    held === null
      ? []
      : Array.isArray(held) && held[0] === NodeKind.DataArray
        ? (held[1] as BundleArrayElement[])
        : [held];
  const opening =
    attributes.length === 0
      ? `<${element[1]}`
      : `<${element[1]}\n${attributes.join("\n")}\n${indent}`;
  if (children.length === 0) {
    return `${opening}${attributes.length === 0 ? " " : ""}/>`;
  }
  const body = children
    .map((child) => `${inner}{${renderNode(child, inner)}}`)
    .join("\n");
  return `${opening}>\n${body}\n${indent}</${element[1]}>`;
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
