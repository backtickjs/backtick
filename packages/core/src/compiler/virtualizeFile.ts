import type { CodeMapping } from "@volar/language-core";

export interface VirtualizedFile {
  virtualCode: string;
  mappings: CodeMapping[];
}

export function virtualizeFile(
  _ts: typeof import("typescript"),
  _fileName: string,
  sourceText: string,
): VirtualizedFile {
  // Not implemented yet
  return {
    virtualCode: sourceText,
    mappings: [
      {
        sourceOffsets: [0],
        generatedOffsets: [0],
        lengths: [sourceText.length],
        data: {
          verification: true,
          completion: true,
          semantic: true,
          navigation: true,
          structure: true,
          format: true,
        },
      },
    ],
  };
}
