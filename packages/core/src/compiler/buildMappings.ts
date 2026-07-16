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
    const [text, , sourceOffset, sourceLength, segmentData] = segment;
    // Text claiming no source at all maps for position bookkeeping only:
    // its zero-width boundary touches neighboring code, and hover must not
    // resolve through it.
    const data =
      segmentData ?? (sourceLength === 0 ? { semantic: false } : undefined);
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
