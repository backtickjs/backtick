import type { Diagnostic } from "@backtick/core/compiler";
import { virtualize } from "@backtick/core/compiler";
import type { CodeMapping, VirtualCode } from "@volar/language-core";
import type * as ts from "typescript";

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
        id: "backtick-virtual",
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
