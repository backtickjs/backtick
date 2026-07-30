import { SyntaxKind } from "@backtickjs/cs-runtime";
import type {
  ClientScriptBlock,
  ClientScriptBody,
  ClientScriptExpression,
  ClientScriptStatement,
  ClientScriptVariableDeclarationList,
} from "@backtickjs/cs-runtime";
import type { IrScriptEntry } from "../ir/Ir.js";
import { sourceName } from "./bindingKey.js";
import { NodeKind, NodeField } from "./Bundle.js";
import type {
  BundleBlockNode,
  BundleBody,
  BundleExpressionNode,
  BundleParameterNode,
  BundleStatementNode,
} from "./Bundle.js";

// A parameter list as the wire carries it: one node per name. Shared with
// `buildBundle`, which builds entries and thunks the same way.
export function parameterNodes(
  names: readonly string[],
): BundleParameterNode[] {
  return names.map((name) => ({
    "#": NodeKind.Parameter,
    [NodeField.name]: name,
  }));
}

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

  const buildBody = (node: ClientScriptBody): BundleBody =>
    node.kind === SyntaxKind.Block ? buildBlock(node) : buildExpression(node);

  function buildBlock(node: ClientScriptBlock): BundleBlockNode {
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

  // The wire keeps a declaration flat: TypeScript's three nodes say where the
  // `const` sits and that a list could hold several, neither of which this
  // language has a second case for.
  function buildDeclarationList(
    list: ClientScriptVariableDeclarationList,
  ): BundleStatementNode {
    const [declaration] = list.declarations;
    if (declaration === undefined) {
      throw new Error("A declaration list must declare a variable.");
    }
    return {
      "#": NodeKind.VariableDeclaration,
      [NodeField.name]: sourceName(declaration.name.bindingKey),
      [NodeField.initializer]: buildExpression(declaration.initializer),
      [NodeField.keyword]: list.keyword,
    };
  }

  function buildStatement(node: ClientScriptStatement): BundleStatementNode {
    switch (node.kind) {
      case SyntaxKind.Block:
        return buildBlock(node);
      case SyntaxKind.IfStatement:
        return {
          "#": NodeKind.IfStatement,
          [NodeField.expression]: buildExpression(node.expression),
          [NodeField.thenStatement]: buildStatement(node.thenStatement),
          [NodeField.elseStatement]:
            node.elseStatement === null
              ? null
              : buildStatement(node.elseStatement),
        };
      case SyntaxKind.WhileStatement:
        return {
          "#": NodeKind.WhileStatement,
          [NodeField.expression]: buildExpression(node.expression),
          [NodeField.statement]: buildStatement(node.statement),
        };
      case SyntaxKind.ForStatement:
        return {
          "#": NodeKind.ForStatement,
          [NodeField.initializer]:
            node.initializer === null
              ? null
              : node.initializer.kind === SyntaxKind.VariableDeclarationList
                ? buildDeclarationList(node.initializer)
                : buildStatement(node.initializer),
          [NodeField.condition]:
            node.condition === null ? null : buildExpression(node.condition),
          [NodeField.incrementor]:
            node.incrementor === null ? null : buildStatement(node.incrementor),
          [NodeField.statement]: buildStatement(node.statement),
        };
      case SyntaxKind.BreakStatement:
        return { "#": NodeKind.BreakStatement };
      case SyntaxKind.ContinueStatement:
        return { "#": NodeKind.ContinueStatement };
      case SyntaxKind.ReturnStatement:
        return {
          "#": NodeKind.ReturnStatement,
          [NodeField.expression]: buildExpression(node.expression),
        };
      case SyntaxKind.ThrowStatement:
        return {
          "#": NodeKind.ThrowStatement,
          [NodeField.expression]: buildExpression(node.expression),
        };
      case SyntaxKind.TryStatement: {
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
      case SyntaxKind.VariableStatement:
        return buildDeclarationList(node.declarationList);
      default:
        // Every remaining kind is an expression, evaluated for its effect.
        return buildExpression(node);
    }
  }

  function buildExpression(node: ClientScriptExpression): BundleExpressionNode {
    const e = (child: ClientScriptExpression): BundleExpressionNode =>
      buildExpression(child);
    switch (node.kind) {
      case SyntaxKind.ArrayLiteralExpression:
        return node.elements.map(e);
      case SyntaxKind.ArrowFunction: {
        const params = node.parameters.map((param) =>
          sourceName(param.name.bindingKey),
        );
        return {
          "#": NodeKind.ArrowFunction,
          ...(params.length === 0
            ? {}
            : { [NodeField.parameters]: parameterNodes(params) }),
          [NodeField.body]: buildBody(node.body),
        };
      }
      case SyntaxKind.BinaryExpression: {
        if (node.operatorToken === "=") {
          // Only a variable can be assigned to, which the compiler enforces
          // and the wire type states; this is where the two meet.
          if (node.left.kind !== SyntaxKind.Identifier) {
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
      case SyntaxKind.PrefixUnaryExpression:
        // A negative literal carries itself, like every other literal here: the
        // node is TypeScript's way of writing one, not something to evaluate.
        if (
          node.operator === "-" &&
          node.operand.kind === SyntaxKind.NumericLiteral
        ) {
          return -node.operand.value;
        }
        return {
          "#": NodeKind.PrefixUnaryExpression,
          [NodeField.operator]: node.operator,
          [NodeField.operand]: e(node.operand),
        };
      case SyntaxKind.ConditionalExpression:
        return {
          "#": NodeKind.ConditionalExpression,
          [NodeField.condition]: e(node.condition),
          [NodeField.whenTrue]: e(node.whenTrue),
          [NodeField.whenFalse]: e(node.whenFalse),
        };
      case SyntaxKind.TrueKeyword:
        return true;
      case SyntaxKind.FalseKeyword:
        return false;
      case SyntaxKind.CallExpression: {
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
      case SyntaxKind.Identifier:
        return read(node.bindingKey);
      case SyntaxKind.NewExpression: {
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
      case SyntaxKind.NullKeyword:
        return null;
      case SyntaxKind.NumericLiteral:
        return node.value;
      case SyntaxKind.ObjectLiteralExpression: {
        // An object literal serializes as the plain object it spells, so `#` —
        // the bundle's one reserved key — would read as a node. Its property
        // assignments are the source's shape, not the wire's: what ships is
        // data, which is what lets a spliced object pass through untouched.
        const entries: { [key: string]: BundleExpressionNode } = {};
        for (const property of node.properties) {
          if (property.name === "#") {
            throw new Error(
              "Can't bundle this object: the `#` key is reserved.",
            );
          }
          entries[property.name] = e(property.initializer);
        }
        return entries;
      }
      case SyntaxKind.PropertyAccessExpression: {
        return {
          "#": NodeKind.PropertyAccessExpression,
          [NodeField.expression]: e(node.expression),
          [NodeField.name]: node.name,
          [NodeField.questionDotToken]: node.questionDotToken
            ? true
            : undefined,
        };
      }
      case SyntaxKind.ElementAccessExpression:
        return {
          "#": NodeKind.ElementAccessExpression,
          [NodeField.expression]: e(node.expression),
          [NodeField.argumentExpression]: e(node.argumentExpression),
        };
      case SyntaxKind.Splice:
        return renderSplice(node.key);
      case SyntaxKind.StringLiteral:
        return node.text;
      default: {
        const unhandled: never = node;
        throw new Error(`Unhandled AST node: ${JSON.stringify(unhandled)}`);
      }
    }
  }

  return buildBody(script.body);
}
