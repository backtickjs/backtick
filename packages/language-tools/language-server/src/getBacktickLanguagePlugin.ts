import {
  type CodeMapping,
  type LanguagePlugin,
  type VirtualCode,
} from "@volar/language-core";
import type * as ts from "typescript";
import { URI } from "vscode-uri";

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
    _ts: typeof import("typescript"),
    _uri: URI,
    languageId: string,
    snapshot: ts.IScriptSnapshot,
  ) {
    this.languageId = languageId;

    const source = snapshot.getText(0, snapshot.getLength());
    if (!source.includes("c`")) {
      this.mappings = [];
      this.snapshot = snapshot;
      return;
    }

    this.mappings = [];
    this.snapshot = {
      getText: (start, end) => source.substring(start, end),
      getLength: () => source.length,
      getChangeRange: () => undefined,
    };
  }
}
