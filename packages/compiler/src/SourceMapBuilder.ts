import type { CodeMapping } from "@volar/language-core";
import type { MappedSegment } from "./rewriter.js";

const FULL_DATA = {
  completion: true,
  format: true,
  navigation: true,
  semantic: true,
  structure: true,
  verification: true,
};

/** Accumulates the virtual code source map as a source file is walked. */
export default class SourceMapBuilder {
  private readonly source: string;
  private virtualCode = "";
  private mappings: CodeMapping[] = [];
  private cursor = 0;

  constructor(source: string) {
    this.source = source;
  }

  /** Copies source verbatim from the cursor up to `until`, mapped 1:1. */
  passThroughTo(until: number): void {
    this.passThrough(this.cursor, until);
    this.cursor = until;
  }

  /**
   * Replaces the source span `[start, end)` with `segments`, emitting a mapping
   * for each segment that carries a source span. Segments without one (e.g.
   * generated punctuation) are still written but left unmapped.
   */
  replaceWith(start: number, end: number, segments: MappedSegment[]): void {
    this.passThroughTo(start);
    for (const { virtual, source } of segments) {
      if (source) {
        this.mappings.push({
          sourceOffsets: [source.start],
          generatedOffsets: [this.virtualCode.length],
          lengths: [source.length],
          generatedLengths: [virtual.length],
          data: FULL_DATA,
        });
      }
      this.virtualCode += virtual;
    }
    this.cursor = end;
  }

  /** Passes through any remaining source and returns the compiled result. */
  finish(): {
    virtualCode: string;
    mappings: CodeMapping[];
  } {
    this.passThroughTo(this.source.length);
    return {
      virtualCode: this.virtualCode,
      mappings: this.mappings,
    };
  }

  private passThrough(start: number, end: number): void {
    if (end <= start) {
      return;
    }
    this.mappings.push({
      sourceOffsets: [start],
      generatedOffsets: [this.virtualCode.length],
      lengths: [end - start],
      data: FULL_DATA,
    });
    this.virtualCode += this.source.slice(start, end);
  }
}
