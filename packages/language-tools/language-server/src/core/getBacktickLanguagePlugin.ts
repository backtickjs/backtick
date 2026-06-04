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

export default function getBacktickLanguagePlugin(): LanguagePlugin<
  URI,
  BacktickVirtualCode
> {
  return {
    getLanguageId(uri) {
      if (uri.path.endsWith(".bt")) {
        return "backtick";
      }
    },
    createVirtualCode(_uri, languageId, snapshot) {
      if (languageId === "backtick") {
        return new BacktickVirtualCode(snapshot);
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

  constructor(source: ts.IScriptSnapshot) {
    // The root *is* the full source with each recognized backtick region
    // replaced in place by its generated TS (e.g. `1` -> `(() => 1)()`).
    // Everything outside the backticks is kept verbatim and identity-mapped,
    // so the whole file type-checks and only the regions are transformed.
    const { code, mappings } = compile(source.getText(0, source.getLength()));
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
 * Produces the generated TS by copying the source verbatim and replacing each
 * recognized backtick region in place (e.g. `1` -> `(() => 1)()`). Pass-through
 * text is identity-mapped; the inner content of each region is mapped onto its
 * generated location so hover, diagnostics, completion, etc. line up with the
 * original `.bt` file.
 *
 * For this initial implementation we only recognize the literal `1`.
 */
function compile(source: string): { code: string; mappings: CodeMapping[] } {
  const mappings: CodeMapping[] = [];
  let code = "";

  // Start of the current verbatim chunk, in source and generated coords.
  let identityStart = 0;
  let identityGenStart = 0;

  const flushIdentity = (sourceEnd: number) => {
    if (sourceEnd <= identityStart) return;
    const text = source.slice(identityStart, sourceEnd);
    mappings.push({
      sourceOffsets: [identityStart],
      generatedOffsets: [identityGenStart],
      lengths: [text.length],
      data: FULL_DATA,
    });
    code += text;
  };

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

    // Keep it simple: only `1` is recognized for now. Any other backtick region
    // is left untouched (handled by the surrounding identity pass-through).
    if (content !== "1") {
      index = close + 1;
      continue;
    }

    // Emit everything up to the opening backtick verbatim, then replace the
    // whole `...` literal with the wrapped expression `(() => 1)()`.
    flushIdentity(open);

    const genStart = code.length;
    code += WRAP_PREFIX;
    const innerGenStart = code.length;
    code += content;
    code += WRAP_SUFFIX;

    // Two mappings: the whole `1` literal maps onto the whole `(() => 1)()`
    // expression (source and generated lengths differ), and the inner content
    // maps `1` -> `1` so positions on it resolve exactly.
    mappings.push({
      sourceOffsets: [open],
      generatedOffsets: [genStart],
      lengths: [close - open + 1],
      generatedLengths: [code.length - genStart],
      data: FULL_DATA,
    });
    mappings.push({
      sourceOffsets: [contentStart],
      generatedOffsets: [innerGenStart],
      lengths: [content.length],
      data: FULL_DATA,
    });

    index = close + 1;
    identityStart = index;
    identityGenStart = code.length;
  }

  // Emit any trailing verbatim text after the last region.
  flushIdentity(source.length);

  return { code, mappings };
}
