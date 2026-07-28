import type {
  AstScriptBlock,
  AstScriptBody,
  AstScriptExpression,
  AstScriptIdentifier,
  AstScriptStatement,
} from "../ast/Ast.js";
import type { IrScriptEntry } from "../ir/Ir.js";
import { envKey, envParam, sourceName } from "./bindingKey.js";
import { NodeKind, NodeField } from "./Bundle.js";
import type {
  BundleBlockNode,
  BundleBody,
  BundleExpressionNode,
  BundleStatementNode,
} from "./Bundle.js";

// Lowers a script to its wire `BundleBody`. The mapping mirrors the grammar —
// expressions lower to expressions, statements to statements — with two places
// where the script itself decides what to emit: an identifier, and a splice.
//
// Both are read off the script rather than passed in, so a body follows from
// its own source. Nothing else here needs the script, which is why the builders
// close over them instead of threading them down every branch to reach two
// leaves.
export function lowerScriptBody(script: IrScriptEntry): BundleBody {
  // A binding the script declares reads as itself, under its source name; one
  // it captures reads off the environment, so a read says where its value came
  // from.
  //
  // No disambiguation. Two of a script's bindings share a name only by
  // shadowing, and printing both under it is what the source says — a block
  // frames its own declarations, so the inner shadows the outer as written. The
  // one case that needed telling them apart was a hole reaching a binding an
  // inner scope shadows, and that is refused outright (see `spliceParams`).
  const captured = new Set(script.captures);
  const read = (key: string): BundleExpressionNode =>
    captured.has(key)
      ? {
          "#": NodeKind.Property,
          [NodeField.object]: {
            "#": NodeKind.Identifier,
            [NodeField.name]: envParam,
          },
          [NodeField.name]: envKey(key),
        }
      : { "#": NodeKind.Identifier, [NodeField.name]: sourceName(key) };

  // The body names holes by key; a reference's `args` are positional in the
  // script's `splices` order, so this maps between them. The hole hands its
  // thunk the bindings bound where it sits (see `spliceParams`), since a
  // fragment landing there can only reference what was in scope where it was
  // written.
  const holes = new Map(script.splices.map((key, index) => [key, index]));
  const renderSplice = (key: string): BundleExpressionNode => {
    const index = holes.get(key);
    if (index === undefined) {
      throw new Error(`This script has no \`${key}\` splice.`);
    }
    const args = (script.spliceParams[key] ?? []).map((bound) => ({
      "#": NodeKind.Identifier,
      [NodeField.name]: sourceName(bound),
    }));
    return {
      "#": NodeKind.Call,
      [NodeField.callee]: {
        "#": NodeKind.Identifier,
        [NodeField.name]: `$${index}`,
      },
      ...(args.length === 0 ? {} : { [NodeField.args]: args }),
    };
  };

  const buildBody = (node: AstScriptBody): BundleBody =>
    node.kind === "AstScriptBlock" ? buildBlock(node) : buildExpression(node);

  function buildBlock(node: AstScriptBlock): BundleBlockNode {
    const statements = node.statements.map((statement) =>
      buildStatement(statement),
    );
    return {
      "#": NodeKind.Block,
      // An empty container is left out rather than spelled out (see `Bundle.ts`).
      ...(statements.length === 0
        ? {}
        : { [NodeField.statements]: statements }),
    };
  }

  function buildStatement(node: AstScriptStatement): BundleStatementNode {
    switch (node.kind) {
      case "AstScriptAssignment":
        return {
          "#": NodeKind.Assignment,
          [NodeField.name]: targetName(node.name),
          [NodeField.expression]: buildExpression(node.expression),
        };
      case "AstScriptBlock":
        return buildBlock(node);
      case "AstScriptIf":
        return {
          "#": NodeKind.If,
          [NodeField.condition]: buildExpression(node.condition),
          [NodeField.consequent]: buildStatement(node.consequent),
          [NodeField.alternate]:
            node.alternate === null ? null : buildStatement(node.alternate),
        };
      case "AstScriptReturn":
        return {
          "#": NodeKind.Return,
          [NodeField.expression]: buildExpression(node.expression),
        };
      case "AstScriptThrow":
        return {
          "#": NodeKind.Throw,
          [NodeField.expression]: buildExpression(node.expression),
        };
      case "AstScriptTry":
        return {
          "#": NodeKind.Try,
          [NodeField.block]: buildBlock(node.block),
          [NodeField.param]:
            node.param === null ? null : sourceName(node.param.bindingKey),
          [NodeField.handler]: buildBlock(node.handler),
        };
      case "AstScriptVariableDeclaration":
        return {
          "#": NodeKind.Declaration,
          [NodeField.keyword]: node.keyword,
          [NodeField.name]: targetName(node.name),
          [NodeField.expression]: buildExpression(node.expression),
        };
      default:
        // Every remaining kind is an expression, evaluated for its effect.
        return buildExpression(node);
    }
  }

  function buildExpression(node: AstScriptExpression): BundleExpressionNode {
    const e = (child: AstScriptExpression): BundleExpressionNode =>
      buildExpression(child);
    switch (node.kind) {
      case "AstScriptArray":
        return node.elements.map(e);
      case "AstScriptArrow": {
        const params = node.params.map((param) => sourceName(param.bindingKey));
        return {
          "#": NodeKind.Arrow,
          ...(params.length === 0 ? {} : { [NodeField.params]: params }),
          [NodeField.body]: buildBody(node.body),
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

  // A declaration or assignment target — the compiler only produces
  // identifier targets.
  function targetName(node: AstScriptIdentifier): string {
    return sourceName(node.bindingKey);
  }

  return buildBody(script.body);
}
