// What `update_app` checks: what `backtick-tsc` reports for the app's file, from
// its own program, in this process. Static only: the file's code doesn't run.
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createProgram } from "@backtickjs/tsc";
import ts from "typescript";

const root = fileURLToPath(new URL("../..", import.meta.url));
const { config } = ts.readConfigFile(
  join(root, "tsconfig.app.json"),
  ts.sys.readFile,
);
const { options } = ts.parseJsonConfigFileContent(config, ts.sys, root);
const host = keepingDeclarations(ts.createCompilerHost(options));

// The errors, as tsc prints them, or none.
export function typecheck(file: string): string[] {
  const program = createProgram({ rootNames: [file], options, host });
  return ts
    .getPreEmitDiagnostics(program, program.getSourceFile(file))
    .map((diagnostic) =>
      ts.formatDiagnostic(diagnostic, formatHost(file)).trimEnd(),
    );
}

// Relative to the current directory, as tsc prints paths: here the app's
// folder, so the model reads `App.tsx` rather than `.builds/<uuid>/App.tsx`.
function formatHost(file: string): ts.FormatDiagnosticsHost {
  return {
    getCurrentDirectory: () => dirname(file),
    getCanonicalFileName: (fileName) => fileName,
    getNewLine: () => "\n",
  };
}

// Declarations don't change while this process runs, so each is parsed
// once. Handing back the same file also lets a program reuse what it made of it.
function keepingDeclarations(host: ts.CompilerHost): ts.CompilerHost {
  const parsed = new Map<string, ts.SourceFile | undefined>();
  const parse = host.getSourceFile;
  return {
    ...host,
    getSourceFile: (fileName, ...rest) => {
      if (!fileName.endsWith(".d.ts")) {
        return parse(fileName, ...rest);
      }
      if (!parsed.has(fileName)) {
        parsed.set(fileName, parse(fileName, ...rest));
      }
      return parsed.get(fileName);
    },
  };
}
