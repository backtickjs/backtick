import type {
  AstScriptBlock,
  AstScriptBody,
  AstScriptExpression,
  AstScriptIdentifier,
  AstScriptStatement,
} from "../ast/Ast.js";
import { NodeKind, NodeField } from "./Bundle.js";
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
// `buildBundle`). Binding sites only — a declaration, an arrow parameter, a
// catch binding — where what is emitted is a name rather than an expression.
export type Mangle = (key: string) => string;

// Reads a binding key in expression position. A binding the script declares
// itself resolves to a plain identifier; one it captures is a lookup on the
// environment the entry was handed (see `buildBundle`). Separate from `Mangle`
// because only one of the two can be an expression: a capture is a value, never
// a variable, so a binding site is always local and always a name.
export type ReadIdentifier = (key: string) => BundleExpressionNode;

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
  read: ReadIdentifier,
): BundleBody {
  if (node.kind === "AstScriptBlock") {
    return buildBlock(node, renderSplice, mangle, read);
  }
  return buildExpression(node, renderSplice, mangle, read);
}

function buildBlock(
  node: AstScriptBlock,
  renderSplice: RenderSplice,
  mangle: Mangle,
  read: ReadIdentifier,
): BundleBlockNode {
  const statements = node.statements.map((statement) =>
    buildStatement(statement, renderSplice, mangle, read),
  );
  return {
    "#": NodeKind.Block,
    // An empty container is left out rather than spelled out (see `Bundle.ts`).
    ...(statements.length === 0 ? {} : { [NodeField.statements]: statements }),
  };
}

function buildStatement(
  node: AstScriptStatement,
  renderSplice: RenderSplice,
  mangle: Mangle,
  read: ReadIdentifier,
): BundleStatementNode {
  switch (node.kind) {
    case "AstScriptAssignment":
      return {
        "#": NodeKind.Assignment,
        [NodeField.name]: targetName(node.name, mangle),
        [NodeField.expression]: buildExpression(
          node.expression,
          renderSplice,
          mangle,
          read,
        ),
      };
    case "AstScriptBlock":
      return buildBlock(node, renderSplice, mangle, read);
    case "AstScriptIf":
      return {
        "#": NodeKind.If,
        [NodeField.condition]: buildExpression(
          node.condition,
          renderSplice,
          mangle,
          read,
        ),
        [NodeField.consequent]: buildStatement(
          node.consequent,
          renderSplice,
          mangle,
          read,
        ),
        [NodeField.alternate]:
          node.alternate === null
            ? null
            : buildStatement(node.alternate, renderSplice, mangle, read),
      };
    case "AstScriptReturn":
      return {
        "#": NodeKind.Return,
        [NodeField.expression]: buildExpression(
          node.expression,
          renderSplice,
          mangle,
          read,
        ),
      };
    case "AstScriptThrow":
      return {
        "#": NodeKind.Throw,
        [NodeField.expression]: buildExpression(
          node.expression,
          renderSplice,
          mangle,
          read,
        ),
      };
    case "AstScriptTry":
      return {
        "#": NodeKind.Try,
        [NodeField.block]: buildBlock(node.block, renderSplice, mangle, read),
        [NodeField.param]:
          node.param === null ? null : mangle(node.param.bindingKey),
        [NodeField.handler]: buildBlock(
          node.handler,
          renderSplice,
          mangle,
          read,
        ),
      };
    case "AstScriptVariableDeclaration":
      return {
        "#": NodeKind.Declaration,
        [NodeField.keyword]: node.keyword,
        [NodeField.name]: targetName(node.name, mangle),
        [NodeField.expression]: buildExpression(
          node.expression,
          renderSplice,
          mangle,
          read,
        ),
      };
    default:
      // Every remaining kind is an expression, evaluated for its effect.
      return buildExpression(node, renderSplice, mangle, read);
  }
}

function buildExpression(
  node: AstScriptExpression,
  renderSplice: RenderSplice,
  mangle: Mangle,
  read: ReadIdentifier,
): BundleExpressionNode {
  const e = (child: AstScriptExpression): BundleExpressionNode =>
    buildExpression(child, renderSplice, mangle, read);
  switch (node.kind) {
    case "AstScriptArray":
      return node.elements.map(e);
    case "AstScriptArrow": {
      const params = node.params.map((param) => mangle(param.bindingKey));
      return {
        "#": NodeKind.Arrow,
        ...(params.length === 0 ? {} : { [NodeField.params]: params }),
        [NodeField.body]: lowerScriptBody(
          node.body,
          renderSplice,
          mangle,
          read,
        ),
      };
    }
    case "AstScriptBinop":
      return {
        "#": NodeKind.Binop,
        [NodeField.operator]: node.operator,
        [NodeField.left]: e(node.lhs),
        [NodeField.right]: e(node.rhs),
      };
    case "AstScriptTernary":
      return {
        "#": NodeKind.Ternary,
        [NodeField.condition]: e(node.condition),
        [NodeField.consequent]: e(node.consequent),
        [NodeField.alternate]: e(node.alternate),
      };
    case "AstScriptBoolean":
      return node.value;
    case "AstScriptCall": {
      // The callee is built before the arguments, because building one can
      // mint a `functions` entry and the labels run in the order they are
      // taken. Binding them here keeps that order explicit.
      const callee = e(node.callee);
      const args = node.args.map(e);
      return {
        "#": NodeKind.Call,
        [NodeField.callee]: callee,
        ...(args.length === 0 ? {} : { [NodeField.args]: args }),
        [NodeField.optional]: node.optional ? true : undefined,
      };
    }
    case "AstScriptIdentifier":
      return read(node.bindingKey);
    case "AstScriptNew": {
      // Here `new` expands: a spliced class lowers to a function with one
      // hole per constructor parameter (see `lowerSpliceable`), so a
      // construction serializes as an ordinary call of its callee, binding
      // the client's argument values to the holes when it runs.
      const callee = e(node.callee);
      const args = node.args.map(e);
      return {
        "#": NodeKind.Call,
        [NodeField.callee]: callee,
        ...(args.length === 0 ? {} : { [NodeField.args]: args }),
      };
    }
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
    case "AstScriptPropertyAccess": {
      return {
        "#": NodeKind.Property,
        [NodeField.object]: e(node.expression),
        [NodeField.name]: node.name,
        [NodeField.optional]: node.optional ? true : undefined,
      };
    }
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
