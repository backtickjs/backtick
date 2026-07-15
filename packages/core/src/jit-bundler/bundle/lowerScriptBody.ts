import type {
  AstScriptBlock,
  AstScriptBody,
  AstScriptExpression,
  AstScriptIdentifier,
  AstScriptStatement,
} from "../ast/Ast.js";
import type {
  BundleBlockNode,
  BundleBody,
  BundleExpressionNode,
  BundleStatementNode,
} from "./Bundle.js";

// Fills a splice hole in a script body with the node for its key. A hole
// sits in expression position, so what fills it must be an expression.
export type RenderSplice = (key: string) => BundleExpressionNode;

// Maps a binding key to the name it is printed under (see `displayName` in
// `buildBundle`).
export type Mangle = (key: string) => string;

// Lowers a script's AST body to its wire `BundleBody`: splice holes are
// filled by `renderSplice` (with the arguments passed to the script), and
// every binding key is printed under its `mangle`d display name — the source
// name, disambiguated only where needed — so a captured variable's reference
// and the parameter that receives it still line up. The mapping mirrors the
// grammar: expressions lower to expressions, statements to statements.
export function lowerScriptBody(
  node: AstScriptBody,
  renderSplice: RenderSplice,
  mangle: Mangle,
): BundleBody {
  if (node.kind === "AstScriptBlock") {
    return buildBlock(node, renderSplice, mangle);
  }
  return buildExpression(node, renderSplice, mangle);
}

function buildBlock(
  node: AstScriptBlock,
  renderSplice: RenderSplice,
  mangle: Mangle,
): BundleBlockNode {
  return {
    "#": "block",
    statements: node.statements.map((statement) =>
      buildStatement(statement, renderSplice, mangle),
    ),
  };
}

function buildStatement(
  node: AstScriptStatement,
  renderSplice: RenderSplice,
  mangle: Mangle,
): BundleStatementNode {
  switch (node.kind) {
    case "AstScriptAssignment":
      return {
        "#": "assignment",
        name: targetName(node.name, mangle),
        expression: buildExpression(node.expression, renderSplice, mangle),
      };
    case "AstScriptBlock":
      return buildBlock(node, renderSplice, mangle);
    case "AstScriptIf":
      return {
        "#": "if",
        condition: buildExpression(node.condition, renderSplice, mangle),
        consequent: buildStatement(node.consequent, renderSplice, mangle),
        alternate:
          node.alternate === null
            ? null
            : buildStatement(node.alternate, renderSplice, mangle),
      };
    case "AstScriptReturn":
      return {
        "#": "return",
        expression: buildExpression(node.expression, renderSplice, mangle),
      };
    case "AstScriptThrow":
      return {
        "#": "throw",
        expression: buildExpression(node.expression, renderSplice, mangle),
      };
    case "AstScriptTry":
      return {
        "#": "try",
        block: buildBlock(node.block, renderSplice, mangle),
        param: node.param === null ? null : mangle(node.param.bindingKey),
        handler: buildBlock(node.handler, renderSplice, mangle),
      };
    case "AstScriptVariableDeclaration":
      return {
        "#": "declaration",
        keyword: node.keyword,
        name: targetName(node.name, mangle),
        expression: buildExpression(node.expression, renderSplice, mangle),
      };
    default:
      // Every remaining kind is an expression, evaluated for its effect.
      return buildExpression(node, renderSplice, mangle);
  }
}

function buildExpression(
  node: AstScriptExpression,
  renderSplice: RenderSplice,
  mangle: Mangle,
): BundleExpressionNode {
  const e = (child: AstScriptExpression): BundleExpressionNode =>
    buildExpression(child, renderSplice, mangle);
  switch (node.kind) {
    case "AstScriptArray":
      return node.elements.map(e);
    case "AstScriptArrow":
      return {
        "#": "arrow",
        params: node.params.map((param) => mangle(param.bindingKey)),
        body: lowerScriptBody(node.body, renderSplice, mangle),
      };
    case "AstScriptBinop":
      return {
        "#": "binop",
        operator: node.operator,
        left: e(node.lhs),
        right: e(node.rhs),
      };
    case "AstScriptBoolean":
      return node.value;
    case "AstScriptCall":
      return { "#": "call", callee: e(node.callee), args: node.args.map(e) };
    case "AstScriptIdentifier":
      return { "#": "identifier", name: mangle(node.bindingKey) };
    case "AstScriptNew":
      // A construction's callee slot holds its expansion (see
      // `expandConstructions`), so it reads as an ordinary call of that slot.
      return {
        "#": "call",
        callee: renderSplice(node.callee.key),
        args: node.args.map(e),
      };
    case "AstScriptNull":
      return null;
    case "AstScriptNumber":
      return node.value;
    case "AstScriptObject": {
      // An object literal serializes as the plain object it spells, so `#` —
      // the bundle's one reserved key — would read as a node.
      if ("#" in node.entries) {
        throw new Error("Can't bundle this object: the `#` key is reserved.");
      }
      const entries: { [key: string]: BundleExpressionNode } = {};
      for (const [key, value] of Object.entries(node.entries)) {
        entries[key] = e(value);
      }
      return entries;
    }
    case "AstScriptPropertyAccess":
      return { "#": "property", object: e(node.expression), name: node.name };
    case "AstScriptSplice":
      return renderSplice(node.key);
    case "AstScriptString":
      return node.value;
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
