import type { CodeMapping } from "@volar/language-core";

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

  /** Replaces the source span `[start, end)` with `generated` text. */
  replace(start: number, end: number, generated: string): void {
    this.passThroughTo(start);
    this.mappings.push({
      sourceOffsets: [start],
      generatedOffsets: [this.virtualCode.length],
      lengths: [end - start],
      generatedLengths: [generated.length],
      data: FULL_DATA,
    });
    this.virtualCode += generated;
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
