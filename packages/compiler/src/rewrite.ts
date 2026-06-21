import type ts from "typescript";
import type { Splice } from "./parseFile.js";

interface RewriteState {
  sourceFile: ts.SourceFile;
  splices: { [placeholder: string]: Splice };
  mappings: NodeMapping[];
}

interface NodeMapping {
  sourceOffset: number;
  sourceLength: number;
  virtual: ts.Expression;
}

interface RewrittenNode {
  virtual: ts.Expression;
  runtime: ts.Expression;
}

export function rewrite(
  ts: typeof import("typescript"),
  state: RewriteState,
  node: ts.Expression,
): RewrittenNode {
  const rewritten = process(ts, state, node);

  const sourceOffset = node.getStart(state.sourceFile);
  state.mappings.push({
    sourceOffset,
    sourceLength: node.getEnd() - sourceOffset,
    virtual: rewritten.virtual,
  });

  return rewritten;
}

function process(
  ts: typeof import("typescript"),
  _state: RewriteState,
  node: ts.Expression,
): RewrittenNode {
  if (ts.isNumericLiteral(node)) {
    return {
      virtual: ts.factory.createNumericLiteral(node.text),
      runtime: callV(ts, "visitNumber", [
        ts.factory.createNull(),
        ts.factory.createNumericLiteral(node.text),
      ]),
    };
  }

  throw "Unexpected syntax";
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
