import type { CompiledFile } from "./compileFile.js";
import type { ParsedFile } from "./parseFile.js";

// The runtime output needs no mappings, so we let the printer rewrite the file
// in place via `substituteNode` rather than reassembling it by hand.
export function printRuntimeCode(
  ts: typeof import("typescript"),
  parsedFile: ParsedFile,
  compiledFile: CompiledFile,
): string {
  const printer = ts.createPrinter(
    {},
    {
      substituteNode: (_hint, node) => {
        if (ts.isTaggedTemplateExpression(node)) {
          return compiledFile.scripts.get(node)?.runtime ?? node;
        }
        return node;
      },
    },
  );
  return printer.printFile(parsedFile.sourceFile);
}
