import assert from "node:assert";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import type { CodeMapping } from "@volar/language-core";
import ts from "typescript";
import { emit } from "../src/emit.ts";
import rewrite from "../src/rewrite.ts";

const fixturesDir = join(import.meta.dirname, "fixtures");

function matchFileSnapshot(actual: string, file: string): void {
  if (process.env.UPDATE_SNAPSHOTS) {
    writeFileSync(file, actual);
    return;
  }

  assert.strictEqual(actual, readFileSync(file, "utf8"));
}

const fixtureNames = readdirSync(fixturesDir)
  .filter((f) => f.endsWith(".bt"))
  .map((f) => f.slice(0, -".bt".length))
  .sort();

describe("compileFile", () => {
  for (const name of fixtureNames) {
    it(name, () => {
      const input = readFileSync(join(fixturesDir, `${name}.bt`), "utf8");

      const result = emit(ts, rewrite(ts, `${name}.tsx`, input));

      matchFileSnapshot(
        result.runtimeCode,
        join(fixturesDir, `${name}.runtime`),
      );

      matchFileSnapshot(
        result.virtualCode,
        join(fixturesDir, `${name}.virtual`),
      );

      matchFileSnapshot(
        renderMappings(input, result.virtualCode, result.mappings),
        join(fixturesDir, `${name}.mapping`),
      );
    });
  }
});

/**
 * Renders one line per mapped region as `<before> -> <after>`, showing the
 * mapped text and its offset on each side. Stays readable with many mappings.
 */
function renderMappings(
  source: string,
  virtualCode: string,
  mappings: CodeMapping[],
): string {
  const lines: string[] = [];

  for (const mapping of mappings) {
    for (let i = 0; i < mapping.sourceOffsets.length; i++) {
      const sourceLength = mapping.lengths[i];
      const generatedLength = mapping.generatedLengths?.[i] ?? sourceLength;
      const before = slice(source, mapping.sourceOffsets[i], sourceLength);
      const after = slice(
        virtualCode,
        mapping.generatedOffsets[i],
        generatedLength,
      );
      lines.push(`${before} -> ${after}`);
    }
  }

  return `${lines.join("\n")}\n`;
}

/** Formats a mapped region as `<offset>:"<text>"` with whitespace escaped. */
function slice(text: string, offset: number, length: number): string {
  const region = text.slice(offset, offset + length).replace(/\n/g, "\\n");
  return `${offset}:${JSON.stringify(region)}`;
}
