import { NodeKind, NodeField } from "@backtickjs/core";
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
    // The entry's cells read as a header on its label — storage it allocates
    // per instance, before the content renders.
    const cells = Object.entries(tree[NodeField.state] ?? {})
      .map(([name, initial]) => `${name} = ${renderExpr(initial, "")}`)
      .join(", ");
    const header = cells === "" ? label : `${label} state { ${cells} }`;
    sections.push(`${header} = ${renderExpr(tree[NodeField.content], "")}`);
  }
  sections.push(`root = ${renderExpr(bundle.root, "")}`);
  return `${sections.join("\n\n")}\n`;
}

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
function renderNode(node: BundleStatementNode, indent: string): string {
  if (!isNode(node)) {
    return renderData(node, indent, renderNode);
  }
  const inner = `${indent}  `;
  switch (node["#"]) {
    case NodeKind.Identifier:
      return node[NodeField.name];
    case NodeKind.Entry:
      return node[NodeField.label];
    case NodeKind.Call: {
      const args = (node[NodeField.args] ?? []).map((arg) =>
        renderNode(arg, indent),
      );
      const calleeNode = node[NodeField.callee];
      const callee = renderNode(calleeNode, indent);
      // An arrow callee (an expansion applied to its arguments) binds
      // looser than the call — parenthesize so the text reads as it runs.
      const target =
        isNode(calleeNode) && calleeNode["#"] === NodeKind.Arrow
          ? `(${callee})`
          : callee;
      return `${target}${node[NodeField.optional] ? "?." : ""}(${args.join(", ")})`;
    }
    case NodeKind.Property:
      return `${renderNode(node[NodeField.object], indent)}${node[NodeField.optional] ? "?." : "."}${node[NodeField.name]}`;
    case NodeKind.Binop:
      return `${renderNode(node[NodeField.left], indent)} ${node[NodeField.operator]} ${renderNode(
        node[NodeField.right],
        indent,
      )}`;
    case NodeKind.Ternary:
      return `${renderNode(node[NodeField.condition], indent)} ? ${renderNode(
        node[NodeField.consequent],
        indent,
      )} : ${renderNode(node[NodeField.alternate], indent)}`;
    case NodeKind.Arrow:
      return `(${(node[NodeField.params] ?? []).join(", ")}) => ${renderBody(node[NodeField.body], indent)}`;
    case NodeKind.Block: {
      const statements = (node[NodeField.statements] ?? []).map(
        (statement) => `${inner}${renderStatement(statement, inner)}`,
      );
      return `{\n${statements.join("\n")}\n${indent}}`;
    }
    case NodeKind.Declaration:
      return `${node[NodeField.keyword]} ${node[NodeField.name]} = ${renderNode(
        node[NodeField.expression],
        indent,
      )}`;
    case NodeKind.Assignment:
      return `${node[NodeField.name]} = ${renderNode(node[NodeField.expression], indent)}`;
    case NodeKind.If: {
      const consequent = renderStatement(node[NodeField.consequent], indent);
      const alternate =
        node[NodeField.alternate] === null
          ? ""
          : ` else ${renderStatement(node[NodeField.alternate], indent)}`;
      return `if (${renderNode(node[NodeField.condition], indent)}) ${consequent}${alternate}`;
    }
    case NodeKind.Return:
      return `return ${renderNode(node[NodeField.expression], indent)}`;
    case NodeKind.Throw:
      return `throw ${renderNode(node[NodeField.expression], indent)}`;
    case NodeKind.Try: {
      const param =
        node[NodeField.param] === null ? "" : ` (${node[NodeField.param]})`;
      return `try ${renderNode(node[NodeField.block], indent)} catch${param} ${renderNode(
        node[NodeField.handler],
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
      node["#"] === NodeKind.If ||
      node["#"] === NodeKind.Try)
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
    case NodeKind.Slot:
      return `slots[${expr[NodeField.index]}]`;
    case NodeKind.Cell:
      return `cells.${expr[NodeField.name]}`;
    case NodeKind.Apply: {
      const args = (expr[NodeField.args] ?? []).map((arg) =>
        renderExpr(arg, indent),
      );
      // A keyed instantiation reads as a suffix, since the key identifies the
      // instance rather than being one of the entry's arguments.
      const applyKey = expr[NodeField.key];
      const key =
        applyKey === undefined ? "" : ` key=${renderExpr(applyKey, indent)}`;
      return `${expr[NodeField.label]}(${args.join(", ")})${key}`;
    }
    case NodeKind.Thunk: {
      const params = expr[NodeField.params] ?? [];
      return `(${params.join(", ")}) => ${renderExpr(expr[NodeField.expression], indent)}`;
    }
    case NodeKind.Identifier:
      return expr[NodeField.name];
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
