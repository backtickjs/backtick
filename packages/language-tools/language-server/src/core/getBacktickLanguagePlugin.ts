import { compileToVirtualTSX } from "@backtick/compiler";
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
    getLanguageId(uri) {
      if (uri.path.endsWith(".bt")) {
        return "backtick";
      }
    },
    createVirtualCode(uri, languageId, snapshot) {
      if (languageId === "backtick") {
        const filename = uri.fsPath.replace(/\\/g, "/");
        return new BacktickVirtualCode(ts, filename, snapshot);
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
  snapshot: ts.IScriptSnapshot;

  constructor(
    ts: typeof import("typescript"),
    filename: string,
    snapshot: ts.IScriptSnapshot,
  ) {
    const source = snapshot.getText(0, snapshot.getLength());
    const options = { filename };
    const { code, mappings } = compileToVirtualTSX(ts, source, options);
    this.mappings = mappings;
    this.snapshot = {
      getText: (start, end) => code.substring(start, end),
      getLength: () => code.length,
      getChangeRange: () => undefined,
    };
  }
}
