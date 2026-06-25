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
        switch (root.languageId) {
          case "javascript":
            return {
              code: root,
              extension: ".js",
              scriptKind: 1 satisfies ts.ScriptKind.JS,
            };
          case "javascriptreact":
            return {
              code: root,
              extension: ".jsx",
              scriptKind: 2 satisfies ts.ScriptKind.JSX,
            };
          case "typescript":
            return {
              code: root,
              extension: ".ts",
              scriptKind: 3 satisfies ts.ScriptKind.TS,
            };
          case "typescriptreact":
            return {
              code: root,
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

  constructor(
    ts: typeof import("typescript"),
    uri: URI,
    languageId: string,
    snapshot: ts.IScriptSnapshot,
  ) {
    const fileName = uri.fsPath;
    const sourceText = snapshot.getText(0, snapshot.getLength());
    const { virtualCode, mappings } = virtualize(ts, fileName, sourceText);

    this.languageId = languageId;
    this.snapshot = {
      getText: (start, end) => virtualCode.substring(start, end),
      getLength: () => virtualCode.length,
      getChangeRange: () => undefined,
    };
    this.mappings = mappings;
  }
}
