import type { CodeMapping } from "@volar/language-core";
import type * as ts from "typescript";

export type CompileOptions = {
  filename: string;
};

const FULL_DATA = {
  completion: true,
  format: true,
  navigation: true,
  semantic: true,
  structure: true,
  verification: true,
} as const;

const WRAP_PREFIX = "(() => ";
const WRAP_SUFFIX = ")()";

/**
 * Produces the generated TS by copying the source verbatim and rewriting the
 * contents of each backtick region that parses as a TypeScript expression. The
 * expression is walked recursively; only the numeric literal `1` is rewritten
 * (to `(() => 1)()`) — every other node is emitted verbatim. Pass-through text
 * is identity-mapped so hover, diagnostics, completion, etc. line up with the
 * original `.bt` file.
 */
export function compileToVirtualTSX(
  ts: typeof import("typescript"),
  source: string,
  _options: CompileOptions,
): { code: string; mappings: CodeMapping[] } {
  const mappings: CodeMapping[] = [];
  let code = "";

  // Copy [sourceStart, sourceEnd) of the source into the output verbatim, with
  // an identity mapping.
  const passThrough = (sourceStart: number, sourceEnd: number) => {
    if (sourceEnd <= sourceStart) return;
    mappings.push({
      sourceOffsets: [sourceStart],
      generatedOffsets: [code.length],
      lengths: [sourceEnd - sourceStart],
      data: FULL_DATA,
    });
    code += source.slice(sourceStart, sourceEnd);
  };

  // Parse the whole document once so backtick regions are located by the TS
  // parser itself, which correctly ignores backticks inside strings and
  // comments.
  const documentSourceFile = ts.createSourceFile(
    "source.tsx",
    source,
    ts.ScriptTarget.Latest,
    false, // perf optimization: node.parent left unset
    ts.ScriptKind.TSX,
  );

  // A single source file, re-parsed for each template's contents via
  // incremental update, instead of creating a new source file per template.
  let expressionSourceFile = ts.createSourceFile(
    "expression.tsx",
    "",
    ts.ScriptTarget.Latest,
    false, // perf optimization: node.parent left unset
    ts.ScriptKind.TSX,
  );

  // Parses a template's contents as a standalone TypeScript expression by
  // updating the shared source file in place. Returns the expression node when
  // the contents parse into exactly one expression statement, otherwise
  // `undefined`.
  const parseExpression = (
    template: ts.TemplateExpression | ts.NoSubstitutionTemplateLiteral,
  ): ts.Expression | undefined => {
    // Strip the enclosing backticks to get the raw contents.
    const content = template.getText(documentSourceFile).slice(1, -1);
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

  // Collect the top-level template literals in source order.
  const templates: (
    | ts.TemplateExpression
    | ts.NoSubstitutionTemplateLiteral
  )[] = [];
  const collectTemplates = (node: ts.Node) => {
    if (
      ts.isNoSubstitutionTemplateLiteral(node) ||
      ts.isTemplateExpression(node)
    ) {
      // Treat the whole backtick region as one unit; don't recurse into it.
      templates.push(node);
      return;
    }
    node.forEachChild(collectTemplates);
  };
  collectTemplates(documentSourceFile);

  // Next source offset not yet emitted.
  let cursor = 0;

  for (const template of templates) {
    const expression = parseExpression(template);

    // Leave templates whose contents aren't a single expression untouched; the
    // surrounding pass-through emits them verbatim, backticks included.
    if (!expression) {
      continue;
    }

    const templateStart = template.getStart(documentSourceFile);
    const templateEnd = template.end;
    const contentStart = templateStart + 1;
    const content = source.slice(contentStart, templateEnd - 1);

    // Emit up to the opening backtick, then walk the expression. The backticks
    // are dropped from the output but kept in the mapping below.
    passThrough(cursor, templateStart);
    cursor = templateEnd;

    const regionGenStart = code.length;
    emitExpression(expression, contentStart, content);

    // Map the whole `...` literal — backticks included — onto the whole
    // generated region (source and generated lengths differ).
    mappings.push({
      sourceOffsets: [templateStart],
      generatedOffsets: [regionGenStart],
      lengths: [templateEnd - templateStart],
      generatedLengths: [code.length - regionGenStart],
      data: FULL_DATA,
    });
  }

  // Trailing verbatim text after the last region.
  passThrough(cursor, source.length);

  return { code, mappings };

  /**
   * Recursively walks `node`, emitting its content verbatim except for the
   * numeric literal `1`, which is rewritten to `(() => 1)()`. `contentStart` is
   * the source offset of the parsed content; node offsets are relative to it.
   */
  function emitExpression(
    node: ts.Node,
    contentStart: number,
    content: string,
  ): void {
    const sourceFile = expressionSourceFile;

    // Cursor within `content` tracking what's been emitted so far.
    let local = 0;

    const emitVerbatimTo = (localEnd: number) => {
      if (localEnd <= local) return;
      mappings.push({
        sourceOffsets: [contentStart + local],
        generatedOffsets: [code.length],
        lengths: [localEnd - local],
        data: FULL_DATA,
      });
      code += content.slice(local, localEnd);
      local = localEnd;
    };

    const walk = (current: ts.Node) => {
      if (ts.isNumericLiteral(current) && current.text === "1") {
        const nodeStart = current.getStart(sourceFile);
        const nodeEnd = current.getEnd();

        // Emit anything before the literal verbatim.
        emitVerbatimTo(nodeStart);

        // `1` -> `(() => 1)()`.
        code += WRAP_PREFIX;
        const innerGenStart = code.length;
        code += current.text;
        code += WRAP_SUFFIX;

        // Map `1` -> `1` so a position on the literal resolves exactly; the
        // surrounding `(() => … )()` is covered by the region-level mapping.
        mappings.push({
          sourceOffsets: [contentStart + nodeStart],
          generatedOffsets: [innerGenStart],
          lengths: [nodeEnd - nodeStart],
          data: FULL_DATA,
        });

        local = nodeEnd;
        return;
      }

      current.forEachChild(walk);
    };

    walk(node);

    // Emit any trailing content (e.g. whitespace) after the last node.
    emitVerbatimTo(content.length);
  }
}
