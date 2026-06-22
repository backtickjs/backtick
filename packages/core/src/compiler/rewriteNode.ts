import type ts from "typescript";
import type { Splice } from "./parseFile.js";

export interface RewriteState {
  splices: { [placeholder: string]: Splice };
  mappings: Map<ts.Node, RewrittenNode>;
  errors: Map<ts.Node, string>;
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
  const rewritten = process(ts, state, node);
  state.mappings.set(node, rewritten);
  return rewritten;
}

function process(
  ts: typeof import("typescript"),
  state: RewriteState,
  node: ts.Node,
): RewrittenNode {
  const unchanged = {
    virtual: node,
    runtime: node,
  };

  const flagError = (message: string) => {
    state.errors.set(node, message);
  };

  if (ts.isIdentifier(node)) {
    const splice = state.splices[node.text];
    if (splice != null) {
      return {
        virtual: call(ts, "cs", "lower", [splice.node.expression]),
        runtime: call(ts, "v", "visitSplice", [
          ts.factory.createNull(),
          ts.factory.createStringLiteral(node.text),
          ts.factory.createIdentifier(node.text),
        ]),
      };
    }
  }

  if (ts.isNumericLiteral(node)) {
    return {
      virtual: ts.factory.createNumericLiteral(node.text),
      runtime: call(ts, "v", "visitNumber", [
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
