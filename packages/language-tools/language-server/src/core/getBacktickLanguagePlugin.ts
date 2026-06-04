import {
  forEachEmbeddedCode,
  type CodeMapping,
  type LanguagePlugin,
  type VirtualCode,
} from "@volar/language-core";
import { backtick2tsx } from "./backtick2tsx";
import type { IScriptSnapshot } from "typescript";
import type * as ts from "typescript";
import { URI } from "vscode-uri";

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
    createVirtualCode(uri, languageId, snapshot) {
      if (languageId === "backtick") {
        const fileName = uri.fsPath.replace(/\\/g, "/");
        return new BacktickVirtualCode(fileName, snapshot);
      }
    },
    typescript: {
      extraFileExtensions: [
        {
          extension: "bt",
          isMixedContent: true,
          scriptKind: 7 satisfies ts.ScriptKind.Deferred,
        },
      ],
      getServiceScript(root) {
        for (const code of forEachEmbeddedCode(root)) {
          if (code.id === "tsx") {
            return {
              code,
              extension: ".tsx",
              scriptKind: 4 satisfies ts.ScriptKind.TSX,
            };
          }
        }
      },
    },
  };
}

export class BacktickVirtualCode implements VirtualCode {
  id = "root";
  languageId = "backtick";
  mappings!: CodeMapping[];
  embeddedCodes!: VirtualCode[];

  constructor(
    public fileName: string,
    public snapshot: IScriptSnapshot,
  ) {
    this.mappings = [
      {
        sourceOffsets: [0],
        generatedOffsets: [0],
        lengths: [this.snapshot.getLength()],
        data: {
          verification: true,
          completion: true,
          semantic: true,
          navigation: true,
          structure: true,
          format: true,
        },
      },
    ];

    const tsx = backtick2tsx(
      this.snapshot.getText(0, this.snapshot.getLength()),
      this.fileName,
    );

    this.embeddedCodes = [tsx.virtualCode];
  }
}
