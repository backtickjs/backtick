import { SyntaxKind } from "@backtickjs/cs-runtime";
import type {
  ClientScriptArrayElement,
  ClientScriptBlock,
  ClientScriptBody,
  ClientScriptExpression,
  ClientScriptStatement,
  ClientScriptVariableDeclarationList,
} from "@backtickjs/cs-runtime";
import type { IrScriptEntry } from "../ir/Ir.js";
import { sourceName } from "./bindingKey.js";
import { NodeKind } from "./Bundle.js";
import type {
  BundleArrayElement,
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
  return names.map((name) => [NodeKind.Parameter, name]);
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
    return [NodeKind.Identifier, at === undefined ? sourceName(key) : `$${at}`];
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
    return [
      NodeKind.CallExpression,
      [NodeKind.Identifier, `$${index}`],
      false,
      args,
    ];
  };

  const buildBody = (node: ClientScriptBody): BundleBody =>
    node.kind === SyntaxKind.Block ? buildBlock(node) : buildExpression(node);

  function buildBlock(node: ClientScriptBlock): BundleBlockNode {
    const statements = node.statements.map((statement) =>
      buildStatement(statement),
    );
    return [NodeKind.Block, statements];
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
    return [
      NodeKind.VariableDeclaration,
      sourceName(declaration.name.bindingKey),
      buildExpression(declaration.initializer),
      list.keyword,
    ];
  }

  function buildStatement(node: ClientScriptStatement): BundleStatementNode {
    switch (node.kind) {
      case SyntaxKind.Block:
        return buildBlock(node);
      case SyntaxKind.IfStatement: {
        return [
          NodeKind.IfStatement,
          buildExpression(node.expression),
          buildStatement(node.thenStatement),
          node.elseStatement === null
            ? null
            : buildStatement(node.elseStatement),
        ];
      }
      case SyntaxKind.WhileStatement:
        return [
          NodeKind.WhileStatement,
          buildExpression(node.expression),
          buildStatement(node.statement),
        ];
      case SyntaxKind.ForStatement:
        return [
          NodeKind.ForStatement,
          node.initializer === null
            ? null
            : node.initializer.kind === SyntaxKind.VariableDeclarationList
              ? buildDeclarationList(node.initializer)
              : buildStatement(node.initializer),
          node.condition === null ? null : buildExpression(node.condition),
          node.incrementor === null ? null : buildStatement(node.incrementor),
          buildStatement(node.statement),
        ];
      case SyntaxKind.BreakStatement:
        return [NodeKind.BreakStatement];
      case SyntaxKind.ContinueStatement:
        return [NodeKind.ContinueStatement];
      case SyntaxKind.ReturnStatement:
        return [NodeKind.ReturnStatement, buildExpression(node.expression)];
      case SyntaxKind.ThrowStatement:
        return [NodeKind.ThrowStatement, buildExpression(node.expression)];
      case SyntaxKind.TryStatement: {
        const clause = node.catchClause;
        return [
          NodeKind.TryStatement,
          buildBlock(node.tryBlock),
          [
            NodeKind.CatchClause,
            clause.variableDeclaration === null
              ? null
              : sourceName(clause.variableDeclaration.bindingKey),
            buildBlock(clause.block),
          ],
        ];
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
    // Where a list admits `...xs` as well as a value.
    const element = (child: ClientScriptArrayElement): BundleArrayElement =>
      child.kind === SyntaxKind.SpreadElement
        ? [NodeKind.SpreadElement, buildExpression(child.expression)]
        : buildExpression(child);
    switch (node.kind) {
      case SyntaxKind.ArrayLiteralExpression:
        // Data, and a node is an array too, so it says which it is.
        return [NodeKind.DataArray, node.elements.map(element)];
      case SyntaxKind.ArrowFunction: {
        const params = node.parameters.map((param) =>
          sourceName(param.name.bindingKey),
        );
        return [
          NodeKind.ArrowFunction,
          parameterNodes(params),
          buildBody(node.body),
        ];
      }
      case SyntaxKind.BinaryExpression: {
        if (node.operatorToken === "=") {
          // Only a variable can be assigned to, which the compiler enforces
          // and the wire type states; this is where the two meet.
          if (node.left.kind !== SyntaxKind.Identifier) {
            throw new Error("An assignment target must be an identifier.");
          }
          return [
            NodeKind.BinaryExpression,
            "=",
            [NodeKind.Identifier, sourceName(node.left.bindingKey)],
            e(node.right),
          ];
        }
        return [
          NodeKind.BinaryExpression,
          node.operatorToken,
          e(node.left),
          e(node.right),
        ];
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
        return [NodeKind.PrefixUnaryExpression, node.operator, e(node.operand)];
      case SyntaxKind.ConditionalExpression:
        return [
          NodeKind.ConditionalExpression,
          e(node.condition),
          e(node.whenTrue),
          e(node.whenFalse),
        ];
      case SyntaxKind.TrueKeyword:
        return true;
      case SyntaxKind.FalseKeyword:
        return false;
      case SyntaxKind.CallExpression: {
        // The callee is built before the arguments, because building one can
        // mint a `functions` entry and the labels run in the order they are
        // taken. Binding them here keeps that order explicit.
        const callee = e(node.expression);
        const args = node.arguments.map(element);
        return [NodeKind.CallExpression, callee, node.questionDotToken, args];
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
        return [NodeKind.CallExpression, callee, false, args];
      }
      case SyntaxKind.NullKeyword:
        return null;
      case SyntaxKind.NumericLiteral:
        return node.value;
      case SyntaxKind.ObjectLiteralExpression: {
        // An object literal serializes as the plain object it spells. Its
        // property assignments are the source's shape, not the wire's: what
        // ships is data, which is what lets a spliced object pass through
        // untouched — every key of it, the format reserving none.
        const entries: { [key: string]: BundleExpressionNode } = {};
        for (const property of node.properties) {
          entries[property.name] = e(property.initializer);
        }
        return entries;
      }
      case SyntaxKind.PropertyAccessExpression: {
        return [
          NodeKind.PropertyAccessExpression,
          e(node.expression),
          node.questionDotToken,
          node.name,
        ];
      }
      case SyntaxKind.ElementAccessExpression:
        return [
          NodeKind.ElementAccessExpression,
          e(node.expression),
          e(node.argumentExpression),
        ];
      case SyntaxKind.Builtin:
        return [NodeKind.Builtin, node.name];
      case SyntaxKind.State:
        return [NodeKind.State, e(node.initial)];
      case SyntaxKind.JsxElement:
        throw new Error("An element in a client script is not lowered yet.");
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
