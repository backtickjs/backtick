import type {
  Bundle,
  BundleBody,
  BundleElement,
  BundleExpr,
  BundleExpressionNode,
  BundleStatementNode,
} from "@backtickjs/core";

// Renders a bundle as a human-readable debug view: each `functions` entry as
// pseudo-JS, each `trees` entry as pseudo-JSX, and the root as the
// expression that evaluates it. This is a reading aid for the `*.bundle`
// snapshots, not a wire format — nothing parses it back.
export function renderBundleDebug(bundle: Bundle): string {
  const sections: string[] = [];
  for (const [label, arrow] of Object.entries(bundle.functions)) {
    sections.push(`${label} = ${renderNode(arrow, "")}`);
  }
  for (const [label, tree] of Object.entries(bundle.trees)) {
    sections.push(`${label} = ${renderExpr(tree.element, "")}`);
  }
  sections.push(`root = ${renderExpr(bundle.root, "")}`);
  return `${sections.join("\n\n")}\n`;
}

// A `#`-discriminated node, as opposed to plain JSON carrying itself.
function isNode(
  node: BundleStatementNode | BundleExpr,
): node is Extract<BundleStatementNode | BundleExpr, { "#": string }> {
  return (
    typeof node === "object" &&
    node !== null &&
    !Array.isArray(node) &&
    "#" in node
  );
}

// Body grammar, as pseudo-JS.
function renderNode(node: BundleStatementNode, indent: string): string {
  if (!isNode(node)) {
    return renderData(node, indent, renderNode);
  }
  const inner = `${indent}  `;
  switch (node["#"]) {
    case "identifier":
      return node.name;
    case "entry":
      return node.label;
    case "call": {
      const args = node.args.map((arg) => renderNode(arg, indent));
      const callee = renderNode(node.callee, indent);
      // An arrow callee (an expansion applied to its arguments) binds
      // looser than the call — parenthesize so the text reads as it runs.
      const target =
        isNode(node.callee) && node.callee["#"] === "arrow"
          ? `(${callee})`
          : callee;
      return `${target}(${args.join(", ")})`;
    }
    case "property":
      return `${renderNode(node.object, indent)}.${node.name}`;
    case "binop":
      return `${renderNode(node.left, indent)} ${node.operator} ${renderNode(
        node.right,
        indent,
      )}`;
    case "arrow":
      return `(${node.params.join(", ")}) => ${renderBody(node.body, indent)}`;
    case "block": {
      const statements = node.statements.map(
        (statement) => `${inner}${renderStatement(statement, inner)}`,
      );
      return `{\n${statements.join("\n")}\n${indent}}`;
    }
    case "declaration":
      return `${node.keyword} ${node.name} = ${renderNode(
        node.expression,
        indent,
      )}`;
    case "assignment":
      return `${node.name} = ${renderNode(node.expression, indent)}`;
    case "if": {
      const consequent = renderStatement(node.consequent, indent);
      const alternate =
        node.alternate === null
          ? ""
          : ` else ${renderStatement(node.alternate, indent)}`;
      return `if (${renderNode(node.condition, indent)}) ${consequent}${alternate}`;
    }
    case "return":
      return `return ${renderNode(node.expression, indent)}`;
    case "throw":
      return `throw ${renderNode(node.expression, indent)}`;
    case "try": {
      const param = node.param === null ? "" : ` (${node.param})`;
      return `try ${renderNode(node.block, indent)} catch${param} ${renderNode(
        node.handler,
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
    (node["#"] === "block" || node["#"] === "if" || node["#"] === "try")
    ? text
    : `${text};`;
}

// An arrow body: a block, or an expression implicitly returned.
function renderBody(body: BundleBody, indent: string): string {
  if (isNode(body) && body["#"] === "block") {
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
    case "slot":
      return `slots[${expr.index}]`;
    case "global":
      return expr.name;
    case "apply": {
      const args = expr.args.map((arg) => renderExpr(arg, indent));
      return `${expr.label}(${args.join(", ")})`;
    }
    case "thunk": {
      const params = expr.params ?? [];
      return `(${params.join(", ")}) => ${renderExpr(expr.expression, indent)}`;
    }
    case "identifier":
      return expr.name;
    case "element":
      return renderJsx(expr, indent);
  }
}

// A JSX-like view of an element: props as attributes — each on its own
// line — and `children` as the body, one child per line.
function renderJsx(element: BundleElement, indent: string): string {
  const inner = `${indent}  `;
  const attributes: string[] = [];
  if (element.key !== null) {
    attributes.push(`${inner}key={${JSON.stringify(element.key)}}`);
  }
  let children: BundleExpr[] = [];
  for (const [prop, value] of Object.entries(element.props)) {
    if (prop === "children") {
      children = Array.isArray(value) ? value : [value];
      continue;
    }
    attributes.push(`${inner}${prop}={${renderExpr(value, inner)}}`);
  }
  const opening =
    attributes.length === 0
      ? `<${element.type}`
      : `<${element.type}\n${attributes.join("\n")}\n${indent}`;
  if (children.length === 0) {
    return `${opening}${attributes.length === 0 ? " " : ""}/>`;
  }
  const body = children
    .map((child) => `${inner}{${renderExpr(child, inner)}}`)
    .join("\n");
  return `${opening}>\n${body}\n${indent}</${element.type}>`;
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
