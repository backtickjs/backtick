import type { RewrittenFile } from "./rewriteFile.js";

export function printRuntimeCode(
  ts: typeof import("typescript"),
  rewrittenFile: RewrittenFile,
): string {
  const printer = ts.createPrinter(
    {},
    {
      substituteNode: (_hint, node) => {
        if (ts.isTaggedTemplateExpression(node)) {
          return rewrittenFile.scripts.get(node)?.runtime ?? node;
        }
        return node;
      },
    },
  );
  return printer.printFile(rewrittenFile.sourceFile);
}
