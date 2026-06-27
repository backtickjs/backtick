import type { Diagnostic } from "@backtick/core/compiler";
import { virtualize } from "@backtick/core/compiler";
import type {
  CodeMapping,
  LanguagePlugin,
  VirtualCode,
} from "@volar/language-core";
import type * as ts from "typescript";
import type { URI } from "vscode-uri";

export default function getBacktickLanguagePlugin(
  ts: typeof import("typescript"),
): LanguagePlugin<URI, BacktickVirtualCode> {
  return {
    getLanguageId() {
      // Keep as-is
    },
    createVirtualCode(uri, languageId, snapshot) {
      switch (languageId) {
        case "javascript":
        case "javascriptreact":
        case "typescript":
        case "typescriptreact":
          return new BacktickVirtualCode(ts, uri, languageId, snapshot);
        default:
          return;
      }
    },
    typescript: {
      extraFileExtensions: [],
      getServiceScript(root) {
        // TypeScript reads the compiled embedded code, not the source root.
        const code = root.embeddedCodes?.[0];
        if (!code) {
          return;
        }
        switch (root.languageId) {
          case "javascript":
            return {
              code,
              extension: ".js",
              scriptKind: 1 satisfies ts.ScriptKind.JS,
            };
          case "javascriptreact":
            return {
              code,
              extension: ".jsx",
              scriptKind: 2 satisfies ts.ScriptKind.JSX,
            };
          case "typescript":
            return {
              code,
              extension: ".ts",
              scriptKind: 3 satisfies ts.ScriptKind.TS,
            };
          case "typescriptreact":
            return {
              code,
              extension: ".tsx",
              scriptKind: 4 satisfies ts.ScriptKind.TSX,
            };
          default:
            return;
        }
      },
    },
  };
}

export class BacktickVirtualCode implements VirtualCode {
  id = "root";
  languageId: string;
  mappings: CodeMapping[];
  snapshot: ts.IScriptSnapshot;
  embeddedCodes: VirtualCode[];
  diagnostics: Diagnostic[];

  constructor(
    ts: typeof import("typescript"),
    uri: URI,
    languageId: string,
    snapshot: ts.IScriptSnapshot,
  ) {
    const fileName = uri.fsPath;
    const sourceText = snapshot.getText(0, snapshot.getLength());
    const { virtualCode, mappings, diagnostics } = virtualize(
      ts,
      fileName,
      sourceText,
    );

    this.languageId = languageId;
    this.diagnostics = diagnostics;

    // The root mirrors the original source 1:1. Prettier (with the Backtick
    // plugin) formats this, so on save the file stays as Backtick source
    this.snapshot = snapshot;
    this.mappings = [
      {
        sourceOffsets: [0],
        generatedOffsets: [0],
        lengths: [sourceText.length],
        data: { format: true, verification: true },
      },
    ];

    this.embeddedCodes = [
      {
        id: "compiled",
        languageId,
        snapshot: {
          getText: (start, end) => virtualCode.substring(start, end),
          getLength: () => virtualCode.length,
          getChangeRange: () => undefined,
        },
        mappings: mappings.map((mapping) => ({
          ...mapping,
          // Every feature is enabled except `format`, which is routed to the
          // root so the file isn't overwritten with compiled output on save.
          data: {
            completion: true,
            format: false,
            navigation: true,
            semantic: true,
            structure: true,
            verification: true,
          },
        })),
      },
    ];
  }
}
