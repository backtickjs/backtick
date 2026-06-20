import type ts from "typescript";

export function scriptKindFor(
  ts: typeof import("typescript"),
  fileName: string,
): ts.ScriptKind {
  if (fileName.endsWith(".tsx")) {
    return ts.ScriptKind.TSX;
  }
  if (fileName.endsWith(".jsx")) {
    return ts.ScriptKind.JSX;
  }
  if (fileName.endsWith(".js")) {
    return ts.ScriptKind.JS;
  }
  if (fileName.endsWith(".mjs")) {
    return ts.ScriptKind.JS;
  }
  return ts.ScriptKind.TS;
}
