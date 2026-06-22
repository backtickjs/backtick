import type ts from "typescript";
import type { Splice } from "./parseFile.js";
import { call } from "./nodeFactory.js";

export interface CompilerState {
  splices: { [placeholder: string]: Splice };
  mappings: Map<ts.Node, CompiledNode>;
  errors: Map<ts.Node, string>;
  declaredVars: Set<string>;
  freeVars: Set<string>;
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
  state.mappings.set(node, compiled);
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

  const flagError = (message: string) => {
    state.errors.set(node, message);
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
      state.declaredVars.add(name);
      return {
        virtual: ts.factory.createVariableStatement(
          undefined,
          ts.factory.createVariableDeclarationList(
            [
              ts.factory.createVariableDeclaration(
                `$0var_${name}`,
                undefined,
                undefined,
                initializer.virtual as ts.Expression,
              ),
            ],
            node.declarationList.flags,
          ),
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
        virtual: call(ts, "cs", "lower", [splice.node.expression]),
        runtime: call(ts, "v", "splice", [
          ts.factory.createNull(),
          ts.factory.createStringLiteral(node.text),
          ts.factory.createIdentifier(node.text),
        ]),
      };
    }

    if (!state.declaredVars.has(node.text)) {
      state.freeVars.add(node.text);
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
      flagError("Unsupported object property");
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

  if (ts.isNumericLiteral(node)) {
    return {
      virtual: ts.factory.createNumericLiteral(node.text),
      runtime: call(ts, "v", "number", [
        ts.factory.createNull(),
        ts.factory.createNumericLiteral(node.text),
      ]),
    };
  }

  flagError("Unsupported syntax");
  return unchanged;
}
