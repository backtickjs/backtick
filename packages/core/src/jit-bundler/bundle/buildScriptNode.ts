import type { AstNode } from "../ast/nodes/AstNode.js";
import type { BundleNode } from "./nodes/Bundle.js";

// Fills a splice hole in a script body with the node passed for that position.
export type RenderSplice = (index: number) => BundleNode;

// Maps a binding key to the name it is printed under (see `displayName` in
// `buildBundle`).
export type Mangle = (key: string) => string;

// Lowers a script's AST body to a wire `BundleNode` tree: splice holes are
// filled by `renderSplice` (with the arguments passed to the script), and
// every binding key is printed under its `mangle`d display name — the source
// name, disambiguated only where needed — so a captured variable's reference
// and the parameter that receives it still line up.
export function buildScriptNode(
  node: AstNode,
  renderSplice: RenderSplice,
  mangle: Mangle,
): BundleNode {
  const s = (child: AstNode): BundleNode =>
    buildScriptNode(child, renderSplice, mangle);
  switch (node.kind) {
    case "AstScriptArray":
    case "AstArray":
      return { kind: "array", elements: node.elements.map(s) };
    case "AstScriptArrow":
      return {
        kind: "arrow",
        params: node.params.map((param) => mangle(param.bindingKey)),
        body: s(node.body),
      };
    case "AstScriptAssignment":
      return {
        kind: "assignment",
        name: targetName(node.name, mangle),
        expression: s(node.expression),
      };
    case "AstScriptBinop":
      return {
        kind: "binop",
        operator: node.operator,
        left: s(node.lhs),
        right: s(node.rhs),
      };
    case "AstScriptBlock":
      return { kind: "block", statements: node.statements.map(s) };
    case "AstScriptBoolean":
    case "AstBoolean":
      return { kind: "value", value: node.value };
    case "AstScriptCall":
      return { kind: "call", callee: s(node.callee), args: node.args.map(s) };
    case "AstScript":
      // `buildIr` hoists every nested script into the function table; a script
      // reaches a body only as a splice argument, rendered as an entry call.
      throw new Error("A nested script can't appear in a script body.");
    case "AstScriptIdentifier":
      return { kind: "identifier", name: mangle(node.bindingKey) };
    case "AstElement":
      // An element reaches the bundle as a splice value and lowers into the
      // tree table (see `buildIr`); a parsed script body never contains one.
      throw new Error("A JSX element can't appear in a script body.");
    case "AstScriptIf":
      return {
        kind: "if",
        condition: s(node.condition),
        consequent: s(node.consequent),
        alternate: node.alternate === null ? null : s(node.alternate),
      };
    case "AstScriptNull":
    case "AstNull":
      return { kind: "value", value: null };
    case "AstScriptNumber":
    case "AstNumber":
      return { kind: "value", value: node.value };
    case "AstScriptObject":
    case "AstObject": {
      const entries: { [key: string]: BundleNode } = {};
      for (const [key, value] of Object.entries(node.entries)) {
        entries[key] = s(value);
      }
      return { kind: "object", entries };
    }
    case "AstScriptPropertyAccess":
      return { kind: "property", object: s(node.expression), name: node.name };
    case "AstScriptReturn":
      return { kind: "return", expression: s(node.expression) };
    case "AstScriptSplice":
      return renderSplice(node.index);
    case "AstScriptString":
    case "AstString":
      return { kind: "value", value: node.value };
    case "AstScriptVariableDeclaration":
      return {
        kind: "declaration",
        keyword: node.keyword,
        name: targetName(node.name, mangle),
        expression: s(node.expression),
      };
    default: {
      const unhandled: never = node;
      throw new Error(`Unhandled AST node: ${JSON.stringify(unhandled)}`);
    }
  }
}

// A declaration or assignment target, flattened to its display name — the
// compiler only produces identifier targets.
function targetName(node: AstNode, mangle: Mangle): string {
  if (node.kind === "AstScriptIdentifier") {
    return mangle(node.bindingKey);
  }
  throw new Error("A binding target must be an identifier.");
}
