import type { CodeMapping } from "@volar/language-core";
import type * as ts from "typescript";

const FULL_DATA = {
  completion: true,
  format: true,
  navigation: true,
  semantic: true,
  structure: true,
  verification: true,
};

export interface RewriteError {
  start: number;
  length: number;
  message: string;
}

export interface RewriteResult {
  virtual: ts.Node;
}

export interface CompileResult {
  virtualCode: string;
  errors: RewriteError[];
  mappings: CodeMapping[];
}

/**
 * Rewrites a parsed backtick expression into its vritual and runtime
 * forms in a single traversal.
 */
class Rewriter {
  private readonly ts: typeof import("typescript");
  private readonly context: ts.TransformationContext;
  readonly errors: RewriteError[] = [];

  constructor(ts: typeof import("typescript")) {
    this.ts = ts;

    let captured: ts.TransformationContext | undefined;
    const dummy = ts.createSourceFile("ctx.ts", "", ts.ScriptTarget.Latest);
    ts.transform(dummy, [
      (context) => {
        captured = context;
        return (node) => node;
      },
    ]).dispose();
    this.context = captured!;
  }

  rewriteExpr(node: ts.Node): RewriteResult {
    if (this.ts.isNumericLiteral(node) && node.text === "1") {
      return {
        virtual: this.iife(this.ts.factory.createNumericLiteral(node.text)),
      };
    }

    return this.rewriteChildren(node);
  }

  private rewriteChildren(node: ts.Node): RewriteResult {
    const { ts, context } = this;

    const virtual = ts.visitEachChild(
      node,
      (child) => this.rewriteExpr(child).virtual,
      context,
    );

    return { virtual };
  }

  private iife(expr: ts.Expression): ts.Expression {
    const arrow = this.ts.factory.createArrowFunction(
      undefined,
      undefined,
      [],
      undefined,
      undefined,
      expr,
    );
    return this.ts.factory.createCallExpression(
      this.ts.factory.createParenthesizedExpression(arrow),
      undefined,
      [],
    );
  }
}

export function compile(
  ts: typeof import("typescript"),
  sourceFile: ts.SourceFile,
): CompileResult {
  const source = sourceFile.text;
  const rewriter = new Rewriter(ts);
  const printer = ts.createPrinter();
  const mappings: CodeMapping[] = [];

  let virtualCode = "";

  let cursor = 0;

  let expressionSourceFile = ts.createSourceFile(
    "expression.tsx",
    "",
    ts.ScriptTarget.Latest,
    true, // keep parent pointers so node.getStart()/getSourceFile() work
    ts.ScriptKind.TSX,
  );

  const passThrough = (sourceStart: number, sourceEnd: number) => {
    if (sourceEnd <= sourceStart) return;
    mappings.push({
      sourceOffsets: [sourceStart],
      generatedOffsets: [virtualCode.length],
      lengths: [sourceEnd - sourceStart],
      data: FULL_DATA,
    });
    const text = source.slice(sourceStart, sourceEnd);
    virtualCode += text;
  };

  const parseExpression = (
    template: ts.TemplateExpression | ts.NoSubstitutionTemplateLiteral,
  ): ts.Expression | undefined => {
    const content = template.getText(sourceFile).slice(1, -1);
    expressionSourceFile = ts.updateSourceFile(
      expressionSourceFile,
      content,
      ts.createTextChangeRange(
        ts.createTextSpan(0, expressionSourceFile.text.length),
        content.length,
      ),
    );

    const [statement] = expressionSourceFile.statements;
    if (
      expressionSourceFile.statements.length !== 1 ||
      !ts.isExpressionStatement(statement)
    ) {
      return undefined;
    }
    return statement.expression;
  };

  const print = (node: ts.Node) =>
    printer.printNode(ts.EmitHint.Unspecified, node, expressionSourceFile);

  const emitTemplate = (
    template: ts.TemplateExpression | ts.NoSubstitutionTemplateLiteral,
  ) => {
    const expression = parseExpression(template);

    if (!expression) return;

    const templateStart = template.getStart(sourceFile);
    const templateEnd = template.end;

    passThrough(cursor, templateStart);
    cursor = templateEnd;

    const { virtual } = rewriter.rewriteExpr(expression);

    const virtualText = print(virtual);
    mappings.push({
      sourceOffsets: [templateStart],
      generatedOffsets: [virtualCode.length],
      lengths: [templateEnd - templateStart],
      generatedLengths: [virtualText.length],
      data: FULL_DATA,
    });
    virtualCode += virtualText;
  };

  const walk = (node: ts.Node) => {
    if (
      ts.isNoSubstitutionTemplateLiteral(node) ||
      ts.isTemplateExpression(node)
    ) {
      emitTemplate(node);
      return;
    }
    node.forEachChild(walk);
  };
  walk(sourceFile);

  passThrough(cursor, source.length);

  return {
    virtualCode,
    mappings,
    errors: rewriter.errors,
  };
}
