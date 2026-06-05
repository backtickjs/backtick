import {
  type CodeMapping,
  type LanguagePlugin,
  type VirtualCode,
} from "@volar/language-core";
import type * as ts from "typescript";
import { URI } from "vscode-uri";

const FULL_DATA = {
  completion: true,
  format: true,
  navigation: true,
  semantic: true,
  structure: true,
  verification: true,
} as const;

export default function getBacktickLanguagePlugin(
  ts: typeof import("typescript"),
): LanguagePlugin<URI, BacktickVirtualCode> {
  return {
    getLanguageId(uri) {
      if (uri.path.endsWith(".bt")) {
        return "backtick";
      }
    },
    createVirtualCode(_uri, languageId, snapshot) {
      if (languageId === "backtick") {
        return new BacktickVirtualCode(ts, snapshot);
      }
    },
    typescript: {
      extraFileExtensions: [
        {
          extension: ".bt",
          isMixedContent: false,
          scriptKind: 7 satisfies ts.ScriptKind.Deferred,
        },
      ],
      getServiceScript(root) {
        // The root snapshot already *is* the combined generated TS, so it is
        // handed to the TS service directly.
        return {
          code: root,
          extension: ".tsx",
          scriptKind: 4 satisfies ts.ScriptKind.TSX,
        };
      },
    },
  };
}

export class BacktickVirtualCode implements VirtualCode {
  id = "root";
  languageId = "typescriptreact";
  mappings: CodeMapping[];
  embeddedCodes: VirtualCode[] = [];
  snapshot: ts.IScriptSnapshot;

  constructor(ts: typeof import("typescript"), source: ts.IScriptSnapshot) {
    // The root *is* the full source with each backtick region that parses as a
    // TypeScript expression replaced in place by its generated TS
    // (e.g. `1` -> `(() => 1)()`). Everything outside the backticks is kept
    // verbatim and identity-mapped, so the whole file type-checks and only the
    // regions are transformed.
    const { code, mappings } = compile(
      ts,
      source.getText(0, source.getLength()),
    );
    this.mappings = mappings;
    this.snapshot = {
      getText: (start, end) => code.substring(start, end),
      getLength: () => code.length,
      getChangeRange: () => undefined,
    };
  }
}

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
function compile(
  ts: typeof import("typescript"),
  source: string,
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

  // Next source offset not yet emitted.
  let cursor = 0;

  let index = 0;
  while (true) {
    const open = source.indexOf("`", index);
    if (open === -1) {
      break;
    }

    const close = source.indexOf("`", open + 1);
    if (close === -1) {
      break;
    }

    const contentStart = open + 1;
    const content = source.slice(contentStart, close);
    const expression = parseExpression(ts, content);

    // Leave regions that don't parse as a single expression untouched; the
    // surrounding pass-through emits them verbatim, backticks included.
    if (!expression) {
      index = close + 1;
      continue;
    }

    // Emit up to the opening backtick, then walk the expression. The backticks
    // are dropped from the output but kept in the mapping below.
    passThrough(cursor, open);
    cursor = close + 1;

    const regionGenStart = code.length;
    emitExpression(expression, contentStart, content);

    // Map the whole `...` literal — backticks included — onto the whole
    // generated region (source and generated lengths differ).
    mappings.push({
      sourceOffsets: [open],
      generatedOffsets: [regionGenStart],
      lengths: [close - open + 1],
      generatedLengths: [code.length - regionGenStart],
      data: FULL_DATA,
    });

    index = close + 1;
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
    const sourceFile = node.getSourceFile();

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

/**
 * Parses `content` as a standalone TypeScript expression. Returns the
 * expression node when it parses without syntax errors into exactly one
 * expression statement, otherwise `undefined`.
 */
function parseExpression(
  ts: typeof import("typescript"),
  content: string,
): ts.Expression | undefined {
  const sourceFile = ts.createSourceFile(
    "expression.tsx",
    content,
    ts.ScriptTarget.Latest,
    false, // perf optimization: node.parent left unset
    ts.ScriptKind.TSX,
  );

  const [statement] = sourceFile.statements;
  if (
    sourceFile.statements.length !== 1 ||
    !ts.isExpressionStatement(statement)
  ) {
    return undefined;
  }

  return statement.expression;
}
