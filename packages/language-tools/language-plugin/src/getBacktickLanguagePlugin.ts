/// <reference types="@volar/typescript" />
import type { LanguagePlugin } from "@volar/language-core";
import type * as ts from "typescript";
import { BacktickVirtualCode } from "./BacktickVirtualCode.js";

export function getBacktickLanguagePlugin<T>(
  ts: typeof import("typescript"),
  getFileName: (uri: T) => string,
): LanguagePlugin<T, BacktickVirtualCode> {
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
          return new BacktickVirtualCode(
            ts,
            getFileName(uri),
            languageId,
            snapshot,
          );
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
