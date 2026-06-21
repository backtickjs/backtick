import type ts from "typescript";
import type { Splice } from "./parseFile.js";

export interface RewriteState {
  clientScript: ts.SourceFile;
  splices: { [placeholder: string]: Splice };
  mappings: { [start: number]: RewrittenNode };
  errors: { [start: number]: string };
}

interface RewrittenNode {
  virtual: ts.Expression;
  runtime: ts.Expression;
}

export function rewriteNode(
  ts: typeof import("typescript"),
  state: RewriteState,
  node: ts.Expression,
): RewrittenNode {
  const rewritten = process(ts, state, node);
  const start = node.getStart(state.clientScript);
  state.mappings[start] = rewritten;
  return rewritten;
}

function process(
  ts: typeof import("typescript"),
  state: RewriteState,
  node: ts.Expression,
): RewrittenNode {
  const unchanged = {
    virtual: node,
    runtime: node,
  };

  const flagError = (message: string) => {
    const start = node.getStart(state.clientScript);
    state.errors[start] = message;
  };

  if (ts.isNumericLiteral(node)) {
    return {
      virtual: ts.factory.createNumericLiteral(node.text),
      runtime: callV(ts, "visitNumber", [
        ts.factory.createNull(),
        ts.factory.createNumericLiteral(node.text),
      ]),
    };
  }

  flagError("Unsupported syntax");
  return unchanged;
}

function callV(
  ts: typeof import("typescript"),
  method: string,
  args: ts.Expression[],
): ts.Expression {
  return ts.factory.createCallExpression(
    ts.factory.createPropertyAccessExpression(
      ts.factory.createIdentifier("v"),
      method,
    ),
    undefined,
    args,
  );
}
