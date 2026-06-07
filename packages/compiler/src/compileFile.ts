import type * as ts from "typescript";

export interface CompilerResult {
  original: ts.Node;
  virtual: ts.Node;
  runtime: ts.Node;
}

export default function compileFile(
  ts: typeof import("typescript"),
  sourceFile: ts.SourceFile,
): CompilerResult {
  return walk(ts, sourceFile, sourceFile);
}

function walk(
  ts: typeof import("typescript"),
  node: ts.Node,
  sourceFile: ts.SourceFile,
): CompilerResult {
  const child = (node: ts.Node): CompilerResult => {
    if (ts.isNoSubstitutionTemplateLiteral(node)) {
      return compileTemplate(ts, node, sourceFile);
    }
    return walk(ts, node, sourceFile);
  };

  return {
    virtual: ts.visitEachChild(node, (n) => child(n).virtual, undefined),
    runtime: ts.visitEachChild(node, (n) => child(n).runtime, undefined),
    original: ts.visitEachChild(node, (n) => child(n).original, undefined),
  };
}

function compileTemplate(
  ts: typeof import("typescript"),
  template: ts.NoSubstitutionTemplateLiteral,
  sourceFile: ts.SourceFile,
): CompilerResult {
  const parsed = ts.createSourceFile(
    sourceFile.fileName,
    template.text,
    ts.ScriptTarget.Latest,
    true,
  );

  const [statement] = parsed.statements;
  if (parsed.statements.length !== 1 || !ts.isExpressionStatement(statement)) {
    throw "Expected syntax";
  }

  // The parsed template starts at offset 0; shift it to sit just past the
  // template's opening backtick so the original-tree nodes keep real source
  // coordinates for the source map.
  rebase(ts, statement.expression, template.getStart(sourceFile) + 1);

  return compile(ts, statement.expression);
}

/** Shifts a parsed template's positions into the original file's coordinates. */
function rebase(
  ts: typeof import("typescript"),
  node: ts.Node,
  offset: number,
): void {
  ts.setTextRange(node, { pos: node.pos + offset, end: node.end + offset });
  node.forEachChild((child) => rebase(ts, child, offset));
}

function compile(
  ts: typeof import("typescript"),
  node: ts.Node,
): CompilerResult {
  if (ts.isNumericLiteral(node)) {
    return {
      original: node,
      virtual: node,
      runtime: v(ts, "visitNumber", [
        ts.factory.createNull(),
        ts.factory.createNumericLiteral(node.text),
      ]),
    };
  }

  throw "Expected syntax";
}

/** Builds a synthetic `v.<method>(...args)` visitor call. */
function v(
  ts: typeof import("typescript"),
  method: string,
  args: ts.Expression[],
): ts.Expression {
  const f = ts.factory;
  return f.createCallExpression(
    f.createPropertyAccessExpression(f.createIdentifier("v"), method),
    undefined,
    args,
  );
}
