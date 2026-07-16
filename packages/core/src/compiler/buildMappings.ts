import type { CodeInformation } from "./CodeInformation.js";
import type { Segment } from "./segmentsToString.js";

export interface SourceMapping {
  sourceOffsets: number[];
  generatedOffsets: number[];
  lengths: number[];
  generatedLengths: number[];
  data?: CodeInformation;
}

export function buildMappings(segments: Segment[]): SourceMapping[] {
  const mappings: SourceMapping[] = [];
  let generatedOffset = 0;
  for (const segment of segments) {
    if (typeof segment === "string") {
      generatedOffset += segment.length;
      continue;
    }
    const [text, , sourceOffset, sourceLength, data] = segment;
    mappings.push({
      sourceOffsets: [sourceOffset],
      generatedOffsets: [generatedOffset],
      lengths: [sourceLength],
      generatedLengths: [text.length],
      ...(data && { data }),
    });
    generatedOffset += text.length;
  }
  return mappings;
}
