import type { CodeMapping } from "@volar/language-core";
import type { CompileResult } from "./index.js";

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
  private code = "";
  private readonly mappings: CodeMapping[] = [];
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
      generatedOffsets: [this.code.length],
      lengths: [end - start],
      generatedLengths: [generated.length],
      data: FULL_DATA,
    });
    this.code += generated;
    this.cursor = end;
  }

  /** Passes through any remaining source and returns the compiled result. */
  finish(): CompileResult {
    this.passThroughTo(this.source.length);
    return {
      virtualCode: this.code,
      mappings: this.mappings,
    };
  }

  private passThrough(start: number, end: number): void {
    if (end <= start) return;
    this.mappings.push({
      sourceOffsets: [start],
      generatedOffsets: [this.code.length],
      lengths: [end - start],
      data: FULL_DATA,
    });
    this.code += this.source.slice(start, end);
  }
}
