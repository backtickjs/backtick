import type { CodeInformation, CodeMapping } from "@volar/language-core";
import type * as ts from "typescript";

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

/** Prints the rewritten virtual and runtime files and resolves their mappings. */
export function emit(
  ts: typeof import("typescript"),
  sourceFile: ts.SourceFile,
  virtualFile: ts.SourceFile,
  runtimeFile: ts.SourceFile,
  virtualMapping: Map<ts.Node, ts.Node>,
): CompilerResult {
  const printer = ts.createPrinter();

  const virtualCode = printer.printFile(virtualFile);
  const runtimeCode = printer.printFile(runtimeFile);

  return {
    virtualCode,
    runtimeCode,
    mappings: buildMappings(
      ts,
      printer,
      sourceFile,
      virtualFile,
      virtualCode,
      virtualMapping,
    ),
  };
}

/**
 * Builds a code mapping for each rewritten node. The source range comes from
 * the original node's position; the generated range is found by locating the
 * generated node's printed text in the virtual code. Entries are iterated in
 * source order (insertion order), which matches the order the regions appear in
 * the output, so a forward-only cursor disambiguates repeated text.
 */
function buildMappings(
  ts: typeof import("typescript"),
  printer: ts.Printer,
  sourceFile: ts.SourceFile,
  virtualFile: ts.SourceFile,
  virtualCode: string,
  virtualMapping: Map<ts.Node, ts.Node>,
): CodeMapping[] {
  const mappings: CodeMapping[] = [];
  let cursor = 0;

  for (const [original, generated] of virtualMapping) {
    const sourceOffset = original.getStart(sourceFile);
    const sourceLength = original.getEnd() - sourceOffset;

    const generatedText = printer.printNode(
      ts.EmitHint.Unspecified,
      generated,
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
