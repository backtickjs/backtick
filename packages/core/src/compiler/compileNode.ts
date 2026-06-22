import type ts from "typescript";
import type { Splice } from "./parseFile.js";

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

export function compileNode(
  ts: typeof import("typescript"),
  state: CompilerState,
  node: ts.Node,
): CompiledNode {
  const compiled = process(ts, state, node);
  state.mappings.set(node, compiled);
  return compiled;
}

function process(
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
      compileNode(ts, state, statement),
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
      const initializer = compileNode(ts, state, declaration.initializer);
      state.declaredVars.add(name);
      return {
        virtual: ts.factory.createVariableStatement(
          undefined,
          ts.factory.createVariableDeclarationList(
            [
              ts.factory.createVariableDeclaration(
                name,
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

  if (ts.isReturnStatement(node) && node.expression) {
    const expression = compileNode(ts, state, node.expression);
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
      virtual: ts.factory.createIdentifier(node.text),
      runtime: call(ts, "v", "identifier", [
        ts.factory.createNull(),
        ts.factory.createStringLiteral(node.text),
      ]),
    };
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

function call(
  ts: typeof import("typescript"),
  receiver: string,
  method: string,
  args: ts.Expression[],
): ts.Expression {
  return ts.factory.createCallExpression(
    ts.factory.createPropertyAccessExpression(
      ts.factory.createIdentifier(receiver),
      method,
    ),
    undefined,
    args,
  );
}
