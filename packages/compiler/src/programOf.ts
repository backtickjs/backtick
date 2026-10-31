import type ts from "typescript";

// A program of the one file: no libraries, as only the file's own bindings
// are asked about.
export function programOf(
  ts: typeof import("typescript"),
  file: ts.SourceFile,
): ts.Program {
  const host: ts.CompilerHost = {
    getSourceFile: (name) => (name === file.fileName ? file : undefined),
    getDefaultLibFileName: () => "lib.d.ts",
    writeFile: () => {},
    getCurrentDirectory: () => "/",
    getCanonicalFileName: (name) => name,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => "\n",
    fileExists: (name) => name === file.fileName,
    readFile: () => undefined,
  };
  return ts.createProgram(
    [file.fileName],
    { noLib: true, noResolve: true, types: [], jsx: ts.JsxEmit.Preserve },
    host,
  );
}
