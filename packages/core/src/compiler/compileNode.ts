import type ts from "typescript";
import { call, sourceLoc, varDecl } from "./nodeFactory.js";
import type { ClientScript } from "./parseFile.js";

export interface CompilerState {
  script: ClientScript;
  errors: Map<ts.Node, string>; // script node -> message
}

export interface CompiledNode {
  virtual: ts.Node;
  runtime: ts.Node;
}

export function compileNode(
  ts: typeof import("typescript"),
  state: CompilerState,
  node: ts.Node,
): CompiledNode {
  const unchanged = {
    virtual: node,
    runtime: node,
  };

  const loc = (target: ts.Node): ts.Expression =>
    sourceLoc(ts, state.script.toSourceLocation(target));

  // For hover types, code completion, etc.
  const setSourceMap = <T extends ts.Node>(virtual: T, target: ts.Node): T => {
    const range = state.script.toSourceRange(target);
    ts.setSourceMapRange(virtual, { pos: range.start, end: range.end });
    return virtual;
  };

  if (ts.isBlock(node)) {
    const statements = node.statements.map((statement) =>
      compileNode(ts, state, statement),
    );
    return {
      virtual: ts.factory.createBlock(
        statements.map((statement) => statement.virtual as ts.Statement),
        true,
      ),
      runtime: call(ts, "v", "block", [
        loc(node),
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
      const name = declaration.name;
      const initializer = compileNode(ts, state, declaration.initializer);
      return {
        virtual: varDecl(
          ts,
          node.declarationList.flags,
          setSourceMap(ts.factory.createIdentifier(`$0var_${name.text}`), name),
          initializer.virtual as ts.Expression,
        ),
        runtime: call(ts, "v", "assignment", [
          loc(node),
          call(ts, "v", "identifier", [
            loc(declaration.name),
            ts.factory.createStringLiteral(name.text),
          ]),
          initializer.runtime as ts.Expression,
        ]),
      };
    }
  }

  if (ts.isIfStatement(node)) {
    const condition = compileNode(ts, state, node.expression);
    const consequent = compileNode(ts, state, node.thenStatement);
    const alternate = node.elseStatement
      ? compileNode(ts, state, node.elseStatement)
      : null;
    return {
      virtual: ts.factory.createIfStatement(
        condition.virtual as ts.Expression,
        consequent.virtual as ts.Statement,
        alternate ? (alternate.virtual as ts.Statement) : undefined,
      ),
      runtime: call(ts, "v", "if", [
        loc(node),
        condition.runtime as ts.Expression,
        consequent.runtime as ts.Expression,
        alternate
          ? (alternate.runtime as ts.Expression)
          : ts.factory.createNull(),
      ]),
    };
  }

  if (ts.isExpressionStatement(node)) {
    const expression = compileNode(ts, state, node.expression);
    return {
      virtual: ts.factory.createExpressionStatement(
        expression.virtual as ts.Expression,
      ),
      runtime: expression.runtime,
    };
  }

  if (ts.isParenthesizedExpression(node)) {
    return compileNode(ts, state, node.expression);
  }

  if (ts.isReturnStatement(node) && node.expression) {
    const expression = compileNode(ts, state, node.expression);
    return {
      virtual: ts.factory.createReturnStatement(
        expression.virtual as ts.Expression,
      ),
      runtime: call(ts, "v", "return", [
        loc(node),
        expression.runtime as ts.Expression,
      ]),
    };
  }

  if (ts.isIdentifier(node)) {
    const splice = state.script.splices[node.text];
    if (splice != null) {
      // Keep the `$0splice<n>` placeholder; the assembler replaces it with the
      // host expression's verbatim source text (mapped 1:1), recursing into any
      // nested `cs` scripts it contains.
      return {
        virtual: call(ts, "cs", "lower", [
          ts.factory.createIdentifier(node.text),
        ]),
        runtime: call(ts, "v", "splice", [
          loc(node),
          ts.factory.createStringLiteral(node.text),
          ts.factory.createIdentifier(node.text),
        ]),
      };
    }

    return {
      virtual: setSourceMap(
        ts.factory.createIdentifier(`$0var_${node.text}`),
        node,
      ),
      runtime: call(ts, "v", "identifier", [
        loc(node),
        ts.factory.createStringLiteral(node.text),
      ]),
    };
  }

  if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.name)) {
    const expression = compileNode(ts, state, node.expression);
    const name = node.name.text;
    return {
      virtual: ts.factory.createPropertyAccessExpression(
        expression.virtual as ts.Expression,
        name,
      ),
      runtime: call(ts, "v", "propertyAccess", [
        loc(node),
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
          value: compileNode(ts, state, property.initializer),
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
          loc(node),
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
    const lhs = compileNode(ts, state, node.left);
    const rhs = compileNode(ts, state, node.right);

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
          loc(node),
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
          loc(node),
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
        loc(node),
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
      runtime: call(ts, "v", "boolean", [loc(node), literal]),
    };
  }

  state.errors.set(node, "Unsupported syntax");
  return unchanged;
}
