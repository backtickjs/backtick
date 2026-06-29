import { scriptKindFor } from "./scriptKindFor.js";
import { transform } from "./transform.js";

export interface Compiled {
  runtimeCode: string;
}

export function compile(
  ts: typeof import("typescript"),
  fileName: string,
  sourceText: string,
): Compiled {
  const sourceFile = ts.createSourceFile(
    fileName,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    scriptKindFor(ts, fileName),
  );

  const result = ts.transform(sourceFile, [transform(ts)]);
  const [transformed] = result.transformed;
  const runtimeCode = ts.createPrinter().printFile(transformed);
  result.dispose();

  return { runtimeCode };
}
