import type ts from "typescript";
import { call, sourceLoc, varDecl } from "./nodeFactory.js";
import type { ClientScript } from "./parseFile.js";
import type { BindingResolution } from "./resolveBindings.js";
import { mangle } from "./unmangle.js";

export interface RewriteState {
  script: ClientScript;
  bindings: BindingResolution;
  errors: Map<ts.Node, string>;
  mappings: Map<ts.Node, ts.Node>;
}

// The globally unique binding key the resolver assigned this identifier. Only
// bound variables get a key; a free host capture is absent from the map and
// keeps its original text, which is how the runtime scope provides it.
function bindingKey(state: RewriteState, identifier: ts.Identifier): string {
  return state.bindings.get(identifier) ?? identifier.text;
}

export interface RewrittenNode {
  virtual: ts.Node;
  runtime: ts.Node;
}

export function rewriteNode(
  ts: typeof import("typescript"),
  state: RewriteState,
  node: ts.Node,
): RewrittenNode {
  const rewritten = rewriteNodeImpl(ts, state, node);
  if (rewritten.virtual.pos < 0) {
    state.mappings.set(node, rewritten.virtual);
  }
  return rewritten;
}

function rewriteNodeImpl(
  ts: typeof import("typescript"),
  state: RewriteState,
  node: ts.Node,
): RewrittenNode {
  const unsupported = (): RewrittenNode => ({
    virtual: node,
    runtime: call(ts, "v", "null", [loc(node)]),
  });

  const loc = (target: ts.Node): ts.Expression =>
    sourceLoc(ts, state.script.toSourceLocation(target));

  if (ts.isBlock(node)) {
    const statements = node.statements.map((statement) =>
      rewriteNode(ts, state, statement),
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
    const flags = node.declarationList.flags;
    if (flags !== ts.NodeFlags.Const && flags !== ts.NodeFlags.Let) {
      state.errors.set(
        node,
        "`var` isn't supported in a client script; use `const` or `let`.",
      );
      return unsupported();
    }
    const keyword = flags === ts.NodeFlags.Const ? "const" : "let";
    const declarations = node.declarationList.declarations;
    if (declarations.length !== 1) {
      state.errors.set(
        node,
        "A client script variable declaration must declare a single variable.",
      );
      return unsupported();
    }
    const [declaration] = declarations;
    if (declaration && ts.isIdentifier(declaration.name)) {
      if (!declaration.initializer) {
        state.errors.set(
          node,
          "A client script variable declaration must have an initializer.",
        );
        return unsupported();
      }
      const name = declaration.name;
      const initializer = rewriteNode(ts, state, declaration.initializer);
      const identifier = ts.factory.createIdentifier(mangle(name.text));
      state.mappings.set(name, identifier);
      return {
        virtual: varDecl(
          ts,
          node.declarationList.flags,
          identifier,
          initializer.virtual as ts.Expression,
        ),
        runtime: call(ts, "v", "variableDeclaration", [
          loc(node),
          ts.factory.createStringLiteral(keyword),
          call(ts, "v", "identifier", [
            loc(declaration.name),
            ts.factory.createStringLiteral(name.text),
            ts.factory.createStringLiteral(bindingKey(state, name)),
          ]),
          initializer.runtime as ts.Expression,
        ]),
      };
    }
  }

  if (ts.isIfStatement(node)) {
    const condition = rewriteNode(ts, state, node.expression);
    const consequent = rewriteNode(ts, state, node.thenStatement);
    const alternate = node.elseStatement
      ? rewriteNode(ts, state, node.elseStatement)
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
    const expression = rewriteNode(ts, state, node.expression);
    return {
      virtual: ts.factory.createExpressionStatement(
        expression.virtual as ts.Expression,
      ),
      runtime: expression.runtime,
    };
  }

  if (ts.isParenthesizedExpression(node)) {
    return rewriteNode(ts, state, node.expression);
  }

  if (ts.isReturnStatement(node) && node.expression) {
    const expression = rewriteNode(ts, state, node.expression);
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
          ts.factory.createNumericLiteral(splice.index),
        ]),
      };
    }

    return {
      virtual: ts.factory.createIdentifier(mangle(node.text)),
      runtime: call(ts, "v", "identifier", [
        loc(node),
        ts.factory.createStringLiteral(node.text),
        ts.factory.createStringLiteral(bindingKey(state, node)),
      ]),
    };
  }

  if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.name)) {
    const name = node.name.text;

    const expression = rewriteNode(ts, state, node.expression);
    return {
      virtual: ts.factory.createPropertyAccessExpression(
        expression.virtual as ts.Expression,
        ts.factory.createIdentifier(name),
      ),
      runtime: call(ts, "v", "propertyAccess", [
        loc(node),
        expression.runtime as ts.Expression,
        ts.factory.createStringLiteral(name),
      ]),
    };
  }

  if (ts.isCallExpression(node)) {
    const args = node.arguments.map((arg) => rewriteNode(ts, state, arg));
    const virtualArgs = ts.factory.createArrayLiteralExpression(
      args.map((arg) => arg.virtual as ts.Expression),
      false,
    );
    const runtimeArgs = ts.factory.createArrayLiteralExpression(
      args.map((arg) => arg.runtime as ts.Expression),
      false,
    );

    if (
      ts.isPropertyAccessExpression(node.expression) &&
      ts.isIdentifier(node.expression.name)
    ) {
      const access = node.expression;
      const receiver = rewriteNode(ts, state, access.expression);
      const name = access.name.text;
      const propertyName = ts.factory.createIdentifier(name);
      state.mappings.set(access.name, propertyName);

      return {
        virtual: ts.factory.createCallExpression(
          ts.factory.createPropertyAccessExpression(
            receiver.virtual as ts.Expression,
            propertyName,
          ),
          undefined,
          args.map((arg) => arg.virtual as ts.Expression),
        ),
        runtime: call(ts, "v", "call", [
          loc(node),
          call(ts, "v", "propertyAccess", [
            loc(access),
            receiver.runtime as ts.Expression,
            ts.factory.createStringLiteral(name),
          ]),
          runtimeArgs,
        ]),
      };
    }

    const callee = rewriteNode(ts, state, node.expression);
    return {
      virtual: call(ts, "cs", "call", [
        callee.virtual as ts.Expression,
        virtualArgs,
      ]),
      runtime: call(ts, "v", "call", [
        loc(node),
        callee.runtime as ts.Expression,
        runtimeArgs,
      ]),
    };
  }

  if (ts.isArrowFunction(node)) {
    const params = node.parameters.map((param) => {
      if (ts.isIdentifier(param.name)) {
        return { name: param.name, type: param.type };
      }
      state.errors.set(
        param,
        "This parameter isn't supported in a `cs` client script.",
      );
      return null;
    });

    if (params.every((param) => param != null)) {
      const virtualParams = params.map((param) => {
        const identifier = ts.factory.createIdentifier(mangle(param.name.text));
        state.mappings.set(param.name, identifier);
        return ts.factory.createParameterDeclaration(
          undefined,
          undefined,
          identifier,
          undefined,
          param.type,
        );
      });
      const body = rewriteNode(ts, state, node.body);
      return {
        virtual: ts.factory.createArrowFunction(
          undefined,
          undefined,
          virtualParams,
          undefined,
          ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
          body.virtual as ts.ConciseBody,
        ),
        runtime: call(ts, "v", "arrow", [
          loc(node),
          ts.factory.createArrayLiteralExpression(
            params.map((param) =>
              call(ts, "v", "identifier", [
                loc(param.name),
                ts.factory.createStringLiteral(param.name.text),
                ts.factory.createStringLiteral(bindingKey(state, param.name)),
              ]),
            ),
            false,
          ),
          body.runtime as ts.Expression,
        ]),
      };
    }

    return unsupported();
  }

  if (ts.isObjectLiteralExpression(node)) {
    const properties = node.properties.map((property) => {
      if (
        ts.isPropertyAssignment(property) &&
        (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name))
      ) {
        const name = ts.isIdentifier(property.name)
          ? ts.factory.createIdentifier(property.name.text)
          : ts.factory.createStringLiteral(property.name.text);
        state.mappings.set(property.name, name);
        return {
          name,
          value: rewriteNode(ts, state, property.initializer),
        };
      }
      state.errors.set(
        property,
        "This object property isn't supported in a `cs` client script.",
      );
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
                property.name.text,
                property.value.runtime as ts.Expression,
              ),
            ),
            false,
          ),
        ]),
      };
    }

    return unsupported();
  }

  if (ts.isBinaryExpression(node)) {
    const lhs = rewriteNode(ts, state, node.left);
    const rhs = rewriteNode(ts, state, node.right);

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
    state.errors.set(
      node,
      "This operator isn't supported in a `cs` client script.",
    );
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

  if (ts.isStringLiteral(node)) {
    return {
      virtual: ts.factory.createStringLiteral(node.text),
      runtime: call(ts, "v", "string", [
        loc(node),
        ts.factory.createStringLiteral(node.text),
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

  state.errors.set(
    node,
    "This syntax isn't supported in a `cs` client script.",
  );
  return unsupported();
}
