import type ts from "typescript";
import type { Splice } from "./parseFile.js";
import { call, varDecl } from "./nodeFactory.js";

export interface CompilerState {
  splices: { [placeholder: string]: Splice };
  origins: Map<ts.Node, ts.Node>; // virtual node -> script node
  errors: Map<ts.Node, string>; // script node -> message
}

export interface CompiledNode {
  virtual: ts.Node;
  runtime: ts.Node;
}

export function compileScriptNode(
  ts: typeof import("typescript"),
  state: CompilerState,
  node: ts.Node,
): CompiledNode {
  const compiled = _compileScriptNode(ts, state, node);
  state.origins.set(compiled.virtual, node);
  return compiled;
}

function _compileScriptNode(
  ts: typeof import("typescript"),
  state: CompilerState,
  node: ts.Node,
): CompiledNode {
  const unchanged = {
    virtual: node,
    runtime: node,
  };

  if (ts.isBlock(node)) {
    const statements = node.statements.map((statement) =>
      compileScriptNode(ts, state, statement),
    );
    return {
      virtual: ts.factory.createBlock(
        statements.map((statement) => statement.virtual as ts.Statement),
        true,
      ),
      runtime: call(ts, "v", "block", [
        ts.factory.createNull(),
        ts.factory.createArrayLiteralExpression(
          statements.map((statement) => statement.runtime as ts.Expression),
          false,
        ),
      ]),
    };
  }

  if (ts.isVariableStatement(node)) {
    const [declaration] = node.declarationList.declarations;
    if (
      declaration &&
      ts.isIdentifier(declaration.name) &&
      declaration.initializer
    ) {
      const name = declaration.name.text;
      const initializer = compileScriptNode(ts, state, declaration.initializer);
      return {
        virtual: varDecl(
          ts,
          node.declarationList.flags,
          `$0var_${name}`,
          initializer.virtual as ts.Expression,
        ),
        runtime: call(ts, "v", "assignment", [
          ts.factory.createNull(),
          call(ts, "v", "identifier", [
            ts.factory.createNull(),
            ts.factory.createStringLiteral(name),
          ]),
          initializer.runtime as ts.Expression,
        ]),
      };
    }
  }

  if (ts.isIfStatement(node)) {
    const condition = compileScriptNode(ts, state, node.expression);
    const consequent = compileScriptNode(ts, state, node.thenStatement);
    const alternate = node.elseStatement
      ? compileScriptNode(ts, state, node.elseStatement)
      : null;
    return {
      virtual: ts.factory.createIfStatement(
        condition.virtual as ts.Expression,
        consequent.virtual as ts.Statement,
        alternate ? (alternate.virtual as ts.Statement) : undefined,
      ),
      runtime: call(ts, "v", "if", [
        ts.factory.createNull(),
        condition.runtime as ts.Expression,
        consequent.runtime as ts.Expression,
        alternate
          ? (alternate.runtime as ts.Expression)
          : ts.factory.createNull(),
      ]),
    };
  }

  if (ts.isExpressionStatement(node)) {
    const expression = compileScriptNode(ts, state, node.expression);
    return {
      virtual: ts.factory.createExpressionStatement(
        expression.virtual as ts.Expression,
      ),
      runtime: expression.runtime,
    };
  }

  if (ts.isParenthesizedExpression(node)) {
    return compileScriptNode(ts, state, node.expression);
  }

  if (ts.isReturnStatement(node) && node.expression) {
    const expression = compileScriptNode(ts, state, node.expression);
    return {
      virtual: ts.factory.createReturnStatement(
        expression.virtual as ts.Expression,
      ),
      runtime: call(ts, "v", "return", [
        ts.factory.createNull(),
        expression.runtime as ts.Expression,
      ]),
    };
  }

  if (ts.isIdentifier(node)) {
    const splice = state.splices[node.text];
    if (splice != null) {
      return {
        virtual: call(ts, "cs", "lower", [splice.sourceNode.expression]),
        runtime: call(ts, "v", "splice", [
          ts.factory.createNull(),
          ts.factory.createStringLiteral(node.text),
          ts.factory.createIdentifier(node.text),
        ]),
      };
    }

    return {
      virtual: ts.factory.createIdentifier(`$0var_${node.text}`),
      runtime: call(ts, "v", "identifier", [
        ts.factory.createNull(),
        ts.factory.createStringLiteral(node.text),
      ]),
    };
  }

  if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.name)) {
    const expression = compileScriptNode(ts, state, node.expression);
    const name = node.name.text;
    return {
      virtual: ts.factory.createPropertyAccessExpression(
        expression.virtual as ts.Expression,
        name,
      ),
      runtime: call(ts, "v", "propertyAccess", [
        ts.factory.createNull(),
        expression.runtime as ts.Expression,
        ts.factory.createStringLiteral(name),
      ]),
    };
  }

  if (ts.isObjectLiteralExpression(node)) {
    const properties = node.properties.map((property) => {
      if (
        ts.isPropertyAssignment(property) &&
        (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name))
      ) {
        return {
          name: property.name.text,
          value: compileScriptNode(ts, state, property.initializer),
        };
      }
      state.errors.set(node, "Unsupported object property");
      return null;
    });

    if (properties.every((property) => property != null)) {
      return {
        virtual: ts.factory.createObjectLiteralExpression(
          properties.map((property) =>
            ts.factory.createPropertyAssignment(
              property.name,
              property.value.virtual as ts.Expression,
            ),
          ),
          false,
        ),
        runtime: call(ts, "v", "object", [
          ts.factory.createNull(),
          ts.factory.createObjectLiteralExpression(
            properties.map((property) =>
              ts.factory.createPropertyAssignment(
                property.name,
                property.value.runtime as ts.Expression,
              ),
            ),
            false,
          ),
        ]),
      };
    }
  }

  if (ts.isBinaryExpression(node)) {
    const lhs = compileScriptNode(ts, state, node.left);
    const rhs = compileScriptNode(ts, state, node.right);

    if (
      node.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
      ts.isIdentifier(node.left)
    ) {
      return {
        virtual: ts.factory.createBinaryExpression(
          lhs.virtual as ts.Expression,
          ts.SyntaxKind.EqualsToken,
          rhs.virtual as ts.Expression,
        ),
        runtime: call(ts, "v", "assignment", [
          ts.factory.createNull(),
          lhs.runtime as ts.Expression,
          rhs.runtime as ts.Expression,
        ]),
      };
    }

    const operator = ts.tokenToString(node.operatorToken.kind);
    if (operator != null) {
      return {
        virtual: ts.factory.createBinaryExpression(
          lhs.virtual as ts.Expression,
          node.operatorToken.kind,
          rhs.virtual as ts.Expression,
        ),
        runtime: call(ts, "v", "binop", [
          ts.factory.createNull(),
          lhs.runtime as ts.Expression,
          ts.factory.createStringLiteral(operator),
          rhs.runtime as ts.Expression,
        ]),
      };
    }
    state.errors.set(node, "Unsupported operator");
  }

  if (ts.isNumericLiteral(node)) {
    return {
      virtual: ts.factory.createNumericLiteral(node.text),
      runtime: call(ts, "v", "number", [
        ts.factory.createNull(),
        ts.factory.createNumericLiteral(node.text),
      ]),
    };
  }

  if (
    node.kind === ts.SyntaxKind.TrueKeyword ||
    node.kind === ts.SyntaxKind.FalseKeyword
  ) {
    const value = node.kind === ts.SyntaxKind.TrueKeyword;
    const literal = value ? ts.factory.createTrue() : ts.factory.createFalse();
    return {
      virtual: literal,
      runtime: call(ts, "v", "boolean", [ts.factory.createNull(), literal]),
    };
  }

  state.errors.set(node, "Unsupported syntax");
  return unchanged;
}
