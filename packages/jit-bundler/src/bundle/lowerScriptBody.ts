import type {
  AstScriptBlock,
  AstScriptBody,
  AstScriptExpression,
  AstScriptStatement,
} from "../ast/Ast.js";
import type { IrScriptEntry } from "../ir/Ir.js";
import { sourceName } from "./bindingKey.js";
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
  // An entry's parameters are one numbered sequence: a thunk per splice hole
  // the script writes, then a value per binding it captures. Both lists come
  // from the script, so the arity and the order are its own.
  //
  // A capture reads as its number rather than its source name, which is what
  // keeps it out of the way: `$` cannot start a source name, so a capture can
  // never be shadowed by a local, and neither ever needs renaming to avoid the
  // other. A binding the script declares still reads as itself, since that is
  // what the source says.
  const captureIndex = new Map(
    script.captures.map((key, at) => [key, script.splices.length + at]),
  );
  const read = (key: string): BundleExpressionNode => {
    const at = captureIndex.get(key);
    return {
      "#": NodeKind.Identifier,
      [NodeField.text]: at === undefined ? sourceName(key) : `$${at}`,
    };
  };

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
    // What a fragment landing here could want: the bindings bound at this hole,
    // then everything this script captured — which, captures being transitive,
    // already covers what a fragment nested here needs. Positional, in an order
    // the script fixes, so a call site reading the same metadata can line its
    // thunk up without either side knowing the other.
    const args = [...(script.spliceParams[key] ?? []), ...script.captures].map(
      (bound) => read(bound),
    );
    return {
      "#": NodeKind.CallExpression,
      [NodeField.expression]: {
        "#": NodeKind.Identifier,
        [NodeField.text]: `$${index}`,
      },
      ...(args.length === 0 ? {} : { [NodeField.arguments]: args }),
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
      case "AstScriptBlock":
        return buildBlock(node);
      case "AstScriptIfStatement":
        return {
          "#": NodeKind.IfStatement,
          [NodeField.expression]: buildExpression(node.expression),
          [NodeField.thenStatement]: buildStatement(node.thenStatement),
          [NodeField.elseStatement]:
            node.elseStatement === null
              ? null
              : buildStatement(node.elseStatement),
        };
      case "AstScriptWhileStatement":
        return {
          "#": NodeKind.WhileStatement,
          [NodeField.expression]: buildExpression(node.expression),
          [NodeField.statement]: buildStatement(node.statement),
        };
      case "AstScriptForStatement":
        return {
          "#": NodeKind.ForStatement,
          [NodeField.initializer]:
            node.initializer === null ? null : buildStatement(node.initializer),
          [NodeField.condition]:
            node.condition === null ? null : buildExpression(node.condition),
          [NodeField.incrementor]:
            node.incrementor === null ? null : buildStatement(node.incrementor),
          [NodeField.statement]: buildStatement(node.statement),
        };
      case "AstScriptBreakStatement":
        return { "#": NodeKind.BreakStatement };
      case "AstScriptContinueStatement":
        return { "#": NodeKind.ContinueStatement };
      case "AstScriptReturnStatement":
        return {
          "#": NodeKind.ReturnStatement,
          [NodeField.expression]: buildExpression(node.expression),
        };
      case "AstScriptThrowStatement":
        return {
          "#": NodeKind.ThrowStatement,
          [NodeField.expression]: buildExpression(node.expression),
        };
      case "AstScriptTryStatement": {
        const clause = node.catchClause;
        return {
          "#": NodeKind.TryStatement,
          [NodeField.tryBlock]: buildBlock(node.tryBlock),
          [NodeField.catchClause]: {
            "#": NodeKind.CatchClause,
            [NodeField.variableDeclaration]:
              clause.variableDeclaration === null
                ? null
                : sourceName(clause.variableDeclaration.bindingKey),
            [NodeField.block]: buildBlock(clause.block),
          },
        };
      }
      case "AstScriptVariableDeclaration":
        return {
          "#": NodeKind.VariableDeclaration,
          [NodeField.name]: sourceName(node.name.bindingKey),
          [NodeField.initializer]: buildExpression(node.initializer),
          [NodeField.keyword]: node.keyword,
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
      case "AstScriptArrayLiteralExpression":
        return node.elements.map(e);
      case "AstScriptArrowFunction": {
        const params = node.parameters.map((param) =>
          sourceName(param.bindingKey),
        );
        return {
          "#": NodeKind.ArrowFunction,
          ...(params.length === 0 ? {} : { [NodeField.parameters]: params }),
          [NodeField.body]: buildBody(node.body),
        };
      }
      case "AstScriptBinaryExpression": {
        if (node.operatorToken === "=") {
          // Only a variable can be assigned to, which the compiler enforces
          // and the wire type states; this is where the two meet.
          if (node.left.kind !== "AstScriptIdentifier") {
            throw new Error("An assignment target must be an identifier.");
          }
          return {
            "#": NodeKind.BinaryExpression,
            [NodeField.operatorToken]: "=",
            [NodeField.left]: {
              "#": NodeKind.Identifier,
              [NodeField.text]: sourceName(node.left.bindingKey),
            },
            [NodeField.right]: e(node.right),
          };
        }
        return {
          "#": NodeKind.BinaryExpression,
          [NodeField.operatorToken]: node.operatorToken,
          [NodeField.left]: e(node.left),
          [NodeField.right]: e(node.right),
        };
      }
      case "AstScriptConditionalExpression":
        return {
          "#": NodeKind.ConditionalExpression,
          [NodeField.condition]: e(node.condition),
          [NodeField.whenTrue]: e(node.whenTrue),
          [NodeField.whenFalse]: e(node.whenFalse),
        };
      case "AstScriptBooleanLiteral":
        return node.value;
      case "AstScriptCallExpression": {
        // The callee is built before the arguments, because building one can
        // mint a `functions` entry and the labels run in the order they are
        // taken. Binding them here keeps that order explicit.
        const callee = e(node.expression);
        const args = node.arguments.map(e);
        return {
          "#": NodeKind.CallExpression,
          [NodeField.expression]: callee,
          ...(args.length === 0 ? {} : { [NodeField.arguments]: args }),
          [NodeField.questionDotToken]: node.questionDotToken
            ? true
            : undefined,
        };
      }
      case "AstScriptIdentifier":
        return read(node.bindingKey);
      case "AstScriptNewExpression": {
        // Here `new` expands: a spliced class lowers to a function with one
        // hole per constructor parameter (see `lowerSpliceable`), so a
        // construction serializes as an ordinary call of its callee, binding
        // the client's argument values to the holes when it runs.
        const callee = e(node.expression);
        const args = node.arguments.map(e);
        return {
          "#": NodeKind.CallExpression,
          [NodeField.expression]: callee,
          ...(args.length === 0 ? {} : { [NodeField.arguments]: args }),
        };
      }
      case "AstScriptNullLiteral":
        return null;
      case "AstScriptNumericLiteral":
        return node.value;
      case "AstScriptObjectLiteralExpression": {
        // An object literal serializes as the plain object it spells, so `#` —
        // the bundle's one reserved key — would read as a node.
        if ("#" in node.properties) {
          throw new Error("Can't bundle this object: the `#` key is reserved.");
        }
        const entries: { [key: string]: BundleExpressionNode } = {};
        for (const [key, value] of Object.entries(node.properties)) {
          entries[key] = e(value);
        }
        return entries;
      }
      case "AstScriptPropertyAccessExpression": {
        return {
          "#": NodeKind.PropertyAccessExpression,
          [NodeField.expression]: e(node.expression),
          [NodeField.name]: node.name,
          [NodeField.questionDotToken]: node.questionDotToken
            ? true
            : undefined,
        };
      }
      case "AstScriptElementAccessExpression":
        return {
          "#": NodeKind.ElementAccessExpression,
          [NodeField.expression]: e(node.expression),
          [NodeField.argumentExpression]: e(node.argumentExpression),
        };
      case "AstScriptSplice":
        return renderSplice(node.key);
      case "AstScriptStringLiteral":
        return node.text;
      default: {
        const unhandled: never = node;
        throw new Error(`Unhandled AST node: ${JSON.stringify(unhandled)}`);
      }
    }
  }

  return buildBody(script.body);
}
