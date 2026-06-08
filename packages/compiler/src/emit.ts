import type { CodeInformation, CodeMapping } from "@volar/language-core";
import type * as ts from "typescript";
import type { NodeMapping, RewriteResult } from "./rewrite.ts";

export interface CompilerResult {
  virtualCode: string;
  runtimeCode: string;
  mappings: CodeMapping[];
}

/** Every language feature is available on the regions we rewrite. */
const fullCodeInformation: CodeInformation = {
  completion: true,
  format: true,
  navigation: true,
  semantic: true,
  structure: true,
  verification: true,
};

/**
 * Prints the rewritten virtual and runtime trees and resolves their mappings.
 */
export function emit(
  ts: typeof import("typescript"),
  rewritten: RewriteResult,
): CompilerResult {
  const printer = ts.createPrinter();

  const virtualCode = printer.printFile(rewritten.virtualFile);
  const runtimeCode = printer.printFile(rewritten.runtimeFile);

  return {
    virtualCode,
    runtimeCode,
    mappings: buildMappings(
      ts,
      printer,
      rewritten.virtualFile,
      virtualCode,
      rewritten.mappings,
    ),
  };
}

/**
 * Builds a code mapping for each rewritten node. The source range comes from
 * the original node's recorded position; the generated range is found by
 * locating the generated node's printed text in the virtual code. Entries are
 * iterated in source order, which matches the order the regions appear in the
 * output, so a forward-only cursor disambiguates repeated text.
 */
function buildMappings(
  ts: typeof import("typescript"),
  printer: ts.Printer,
  virtualFile: ts.SourceFile,
  virtualCode: string,
  nodeMappings: NodeMapping[],
): CodeMapping[] {
  const mappings: CodeMapping[] = [];
  let cursor = 0;

  for (const { sourceOffset, sourceLength, virtual } of nodeMappings) {
    const generatedText = printer.printNode(
      ts.EmitHint.Unspecified,
      virtual,
      virtualFile,
    );
    const generatedOffset = virtualCode.indexOf(generatedText, cursor);
    if (generatedOffset === -1) {
      continue;
    }
    cursor = generatedOffset + generatedText.length;

    mappings.push({
      sourceOffsets: [sourceOffset],
      generatedOffsets: [generatedOffset],
      lengths: [sourceLength],
      generatedLengths: [generatedText.length],
      data: fullCodeInformation,
    });
  }

  return mappings;
}
