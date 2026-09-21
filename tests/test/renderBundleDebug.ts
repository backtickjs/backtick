import type { ClientUnknown } from "@backtickjs/core";
import type {
  Bundle,
  BundleArrayElement,
  BundleBody,
  BundleElement,
  BundleExpression,
  BundleSpreadElement,
  BundleStatement,
} from "@backtickjs/bundler";

// Renders a bundle as a human-readable debug view: each `functions` entry as
// pseudo-JS, each `trees` entry as pseudo-JSX, and the root as the
// expression that evaluates it. This is a reading aid for the `*.bundle`
// snapshots, not a wire format — nothing parses it back.
export function renderBundleDebug(bundle: Bundle<ClientUnknown>): string {
  const sections: string[] = [];
  for (const [label, entry] of Object.entries(bundle.functions)) {
    sections.push(`${fnLabel(label)} = ${renderNode(entry, "")}`);
  }
  sections.push(`root = ${renderNode(bundle.root, "")}`);
  return `${sections.join("\n\n")}\n`;
}

// A label as this view names it. One table, so one sigil — a drawing entry's
// label already says which it is (`t0`). These snapshots use
// `run` rather than located labels, so a label is already short and stands
// for itself.
const fnLabel = (label: string): string => `#f${label}`;

// A node, as opposed to plain JSON carrying itself: every node is an array,
// and an array of data travels as one too (`ArrayLiteralExpression`).
function isNode(
  node: BundleStatement | BundleExpression,
): node is Extract<BundleStatement | BundleExpression, unknown[]> {
  return Array.isArray(node);
}

// The fifteen operator kinds, which bind looser than a prefix `!` or `-`.
const binary = new Set<string>([
  "=",
  "&&",
  "||",
  "??",
  "+",
  "-",
  "*",
  "/",
  "%",
  "===",
  "!==",
  "<",
  "<=",
  ">",
  ">=",
]);
const isBinary = (kind: unknown): boolean =>
  typeof kind === "string" && binary.has(kind);

// Body grammar, as pseudo-JS.
// `...xs`, which stands where an element or an argument stands rather than
// where a statement does — so it is read before the statement kinds are.
function isSpread(
  node: BundleStatement | BundleSpreadElement,
): node is BundleSpreadElement {
  return Array.isArray(node) && node[0] === "...";
}

function renderNode(
  node: BundleStatement | BundleSpreadElement,
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
    case "arr":
      return renderData<BundleArrayElement[]>(node[1], indent, renderNode);
    case "id":
      return node[1];
    case "fn":
      return fnLabel(node[1]);
    // What a tree entry's body yields, `for` included: a list is an element,
    // so it reads as the one it is written as.
    case "el":
      return renderJsx(node, indent);
    // A component call, as the tag JSX would call it with: a name as itself,
    // and any other callee braced, since it is an expression and not a name.
    case "comp": {
      const callee = node[1];
      const tag =
        isNode(callee) && callee[0] === "id"
          ? callee[1]
          : `{${renderNode(callee, indent)}}`;
      return renderJsx(["el", tag, node[2], node[3]], indent);
    }
    // A global the format names and the host answers.
    case "bltn":
      return node[1];
    case "undef":
      return "undefined";
    case "()":
    case "?.()": {
      const args = node[2].map((arg) => renderNode(arg, indent));
      const calleeNode = node[1];
      const callee = renderNode(calleeNode, indent);
      // An arrow callee (an expansion applied to its arguments) binds
      // looser than the call — parenthesize so the text reads as it runs.
      const target =
        isNode(calleeNode) && calleeNode[0] === "=>" ? `(${callee})` : callee;
      const optional = node[0] === "?.()";
      return `${target}${optional ? "?." : ""}(${args.join(", ")})`;
    }
    case ".":
      return `${renderNode(node[1], indent)}.${node[2]}`;
    case "?.":
      return `${renderNode(node[1], indent)}?.${node[2]}`;
    case "[]":
      return `${renderNode(node[1], indent)}[${renderNode(node[2], indent)}]`;
    case "=":
    case "+=":
    case "-=":
    case "*=":
    case "/=":
    case "%=":
    case "&&":
    case "||":
    case "??":
    case "+":
    case "-":
    case "*":
    case "/":
    case "%":
    case "===":
    case "!==":
    case "<":
    case "<=":
    case ">":
    case ">=":
      return `${renderNode(node[1], indent)} ${node[0]} ${renderNode(
        node[2],
        indent,
      )}`;
    case "!":
    case "-x": {
      // A prefix operator binds tighter than any binary one, so an operand
      // that is one reads as the wrong tree without parentheses.
      const operand = node[1];
      const text = renderNode(operand, indent);
      const looser =
        isNode(operand) && (isBinary(operand[0]) || operand[0] === "?:");
      return `${node[0] === "!" ? "!" : "-"}${looser ? `(${text})` : text}`;
    }
    case "typeof":
      return `typeof ${renderNode(node[1], indent)}`;
    case "++x":
      return `++${renderNode(node[1], indent)}`;
    case "--x":
      return `--${renderNode(node[1], indent)}`;
    case "x++":
      return `${renderNode(node[1], indent)}++`;
    case "x--":
      return `${renderNode(node[1], indent)}--`;
    case "?:":
      return `${renderNode(node[1], indent)} ? ${renderNode(
        node[2],
        indent,
      )} : ${renderNode(node[3], indent)}`;
    case "=>":
      return `(${node[1]
        .map((param) => param[1])
        .join(", ")}) => ${renderBody(node[2], indent)}`;
    case "{}": {
      const statements = node[1].map(
        (statement) => `${inner}${renderStatement(statement, inner)}`,
      );
      return `{\n${statements.join("\n")}\n${indent}}`;
    }
    case "const":
    case "let":
      return `${node[0]} ${node[1]} = ${renderNode(node[2], indent)}`;
    case "if": {
      const consequent = renderStatement(node[2], indent);
      const branch = node[3];
      const alternate =
        branch === null ? "" : ` else ${renderStatement(branch, indent)}`;
      return `if (${renderNode(node[1], indent)}) ${consequent}${alternate}`;
    }
    case "while":
      return `while (${renderNode(node[1], indent)}) ${renderStatement(
        node[2],
        indent,
      )}`;
    case "for": {
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
    case "break":
      return "break";
    case "continue":
      return "continue";
    case "return":
      return `return ${renderNode(node[1], indent)}`;
    case "throw":
      return `throw ${renderNode(node[1], indent)}`;
    case "try": {
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
function renderStatement(node: BundleStatement, indent: string): string {
  const text = renderNode(node, indent);
  return isNode(node) &&
    (node[0] === "{}" ||
      node[0] === "if" ||
      node[0] === "while" ||
      node[0] === "for" ||
      node[0] === "try")
    ? text
    : `${text};`;
}

// An arrow body: a block, or an expression implicitly returned.
function renderBody(body: BundleBody, indent: string): string {
  if (isNode(body) && body[0] === "{}") {
    return renderNode(body, indent);
  }
  return renderNode(body as BundleExpression, indent);
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
      : Array.isArray(held) && held[0] === "arr"
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
