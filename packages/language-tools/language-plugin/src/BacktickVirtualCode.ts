import type { Diagnostic } from "@backtickjs/core/compiler";
import { virtualize } from "@backtickjs/core/compiler";
import type { CodeMapping, VirtualCode } from "@volar/language-core";
import type ts from "typescript";

export class BacktickVirtualCode implements VirtualCode {
  id = "backtick-source";
  languageId: string;
  mappings: CodeMapping[];
  snapshot: ts.IScriptSnapshot;
  embeddedCodes: VirtualCode[];
  diagnostics: Diagnostic[];

  constructor(
    ts: typeof import("typescript"),
    fileName: string,
    languageId: string,
    snapshot: ts.IScriptSnapshot,
  ) {
    const sourceText = snapshot.getText(0, snapshot.getLength());
    const { virtualCode, mappings, diagnostics } = virtualize(
      ts,
      fileName,
      sourceText,
    );

    this.languageId = languageId;
    this.diagnostics = diagnostics;

    this.snapshot = snapshot;
    this.mappings = [
      {
        sourceOffsets: [0],
        generatedOffsets: [0],
        lengths: [sourceText.length],
        data: { format: false, verification: true },
      },
    ];

    this.embeddedCodes = [
      {
        id: "backtick-virtual",
        languageId,
        snapshot: {
          getText: (start, end) => virtualCode.substring(start, end),
          getLength: () => virtualCode.length,
          getChangeRange: () => undefined,
        },
        mappings: mappings.map((mapping) => ({
          ...mapping,
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
