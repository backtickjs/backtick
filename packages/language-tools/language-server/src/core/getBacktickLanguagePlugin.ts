import {
  forEachEmbeddedCode,
  type CodeMapping,
  type LanguagePlugin,
  type VirtualCode,
} from "@volar/language-core";
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
    createVirtualCode(_uri, languageId, snapshot) {
      if (languageId === "backtick") {
        return new BacktickVirtualCode(snapshot);
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

  constructor(public snapshot: IScriptSnapshot) {
    this.onSnapshotUpdated();
  }

  update(newSnapshot: IScriptSnapshot) {
    this.snapshot = newSnapshot;
    this.onSnapshotUpdated();
  }

  private onSnapshotUpdated() {
    const length = this.snapshot.getLength();

    // Identity mapping: the generated code maps 1:1 back onto the original
    // `.bt` source, so every language feature resolves to the right offset.
    // As the Backtick syntax grows, source-to-TypeScript transformation and
    // finer-grained mappings will live here.
    this.mappings = [
      {
        sourceOffsets: [0],
        generatedOffsets: [0],
        lengths: [length],
        data: {
          completion: true,
          format: true,
          navigation: true,
          semantic: true,
          structure: true,
          verification: true,
        },
      },
    ];

    // For now the whole document is treated as embedded TSX, so the TS
    // language service powers intellisense (including JSX) inside `.bt` files.
    this.embeddedCodes = [
      {
        id: "tsx",
        languageId: "typescriptreact",
        snapshot: this.snapshot,
        mappings: this.mappings,
      },
    ];
  }
}
