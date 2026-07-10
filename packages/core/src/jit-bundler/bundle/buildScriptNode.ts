import type { AstScriptIdentifier, AstScriptNode } from "../ast/Ast.js";
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
  node: AstScriptNode,
  renderSplice: RenderSplice,
  mangle: Mangle,
): BundleNode {
  const s = (child: AstScriptNode): BundleNode =>
    buildScriptNode(child, renderSplice, mangle);
  switch (node.kind) {
    case "AstScriptArray":
      return { "#": "array", elements: node.elements.map(s) };
    case "AstScriptArrow":
      return {
        "#": "arrow",
        params: node.params.map((param) => mangle(param.bindingKey)),
        body: s(node.body),
      };
    case "AstScriptAssignment":
      return {
        "#": "assignment",
        name: targetName(node.name, mangle),
        expression: s(node.expression),
      };
    case "AstScriptBinop":
      return {
        "#": "binop",
        operator: node.operator,
        left: s(node.lhs),
        right: s(node.rhs),
      };
    case "AstScriptBlock":
      return { "#": "block", statements: node.statements.map(s) };
    case "AstScriptBoolean":
      return { "#": "value", value: node.value };
    case "AstScriptCall":
      return {
        "#": "call",
        callee: s(node.callee),
        args: node.args.map(s),
      };
    case "AstScriptIdentifier":
      return { "#": "identifier", name: mangle(node.bindingKey) };
    case "AstScriptIf":
      return {
        "#": "if",
        condition: s(node.condition),
        consequent: s(node.consequent),
        alternate: node.alternate === null ? null : s(node.alternate),
      };
    case "AstScriptNull":
      return { "#": "value", value: null };
    case "AstScriptNumber":
      return { "#": "value", value: node.value };
    case "AstScriptObject": {
      const entries: { [key: string]: BundleNode } = {};
      for (const [key, value] of Object.entries(node.entries)) {
        entries[key] = s(value);
      }
      return { "#": "object", entries };
    }
    case "AstScriptPropertyAccess":
      return {
        "#": "property",
        object: s(node.expression),
        name: node.name,
      };
    case "AstScriptReturn":
      return { "#": "return", expression: s(node.expression) };
    case "AstScriptSplice":
      return renderSplice(node.index);
    case "AstScriptString":
      return { "#": "value", value: node.value };
    case "AstScriptVariableDeclaration":
      return {
        "#": "declaration",
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
function targetName(node: AstScriptIdentifier, mangle: Mangle): string {
  return mangle(node.bindingKey);
}
