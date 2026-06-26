import type { Segment } from "./segmentsToString.js";

export interface SourceMapping {
  sourceOffsets: number[];
  generatedOffsets: number[];
  lengths: number[];
  generatedLengths: number[];
}

export function buildMappings(segments: Segment[]): SourceMapping[] {
  const mappings: SourceMapping[] = [];
  let generatedOffset = 0;
  for (const segment of segments) {
    if (typeof segment === "string") {
      generatedOffset += segment.length;
      continue;
    }
    const [text, , sourceOffset, sourceLength] = segment;
    mappings.push({
      sourceOffsets: [sourceOffset],
      generatedOffsets: [generatedOffset],
      lengths: [sourceLength],
      generatedLengths: [text.length],
    });
    generatedOffset += text.length;
  }
  return mappings;
}
