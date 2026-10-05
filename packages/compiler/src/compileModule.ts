import type ts from "typescript";
import type { Plugin } from "./compileScript.js";
import { transform } from "./transform.js";

// A loader's compile of one file, as a runtime runs it: Node's, Bun's. The
// loader reads the file and loads what comes back; this does the rest, the
// same way for every runtime.

/** A compile step's module, as Babel's presets are: its default export makes the step. */
interface PluginModule {
  default: () => Plugin;
}

/**
 * The framework's compile steps a project names in its `package.json`, made
 * with the project's own `require`:
 *
 * ```json
 * "backtick": { "plugins": ["@backtickjs/react/plugin"] }
 * ```
 */
export function pluginsFrom(
  packageJson: string,
  require: (specifier: string) => unknown,
): Plugin[] {
  const { backtick } = JSON.parse(packageJson) as {
    backtick?: { plugins?: readonly string[] };
  };
  return (backtick?.plugins ?? []).map((specifier) =>
    (require(specifier) as PluginModule).default(),
  );
}

export interface CompileModuleOptions {
  /** The framework's compile steps, as `pluginsFrom` makes them. */
  readonly plugins: readonly Plugin[];
  /** Transforms run after Backtick's, as a runtime needs its own. */
  readonly before?: readonly ts.TransformerFactory<ts.SourceFile>[];
}

/**
 * A TypeScript file, its `cs` scripts included, as an ES module with its
 * source map inline, compiled with the `tsconfig.json` nearest it, as `tsc`
 * and editors find one, so an app and its server can each have their own.
 * Throws the compiler's errors: a refused script is emitted with `null` where
 * its code was, so it must not load.
 */
export function compileModule(
  ts: typeof import("typescript"),
  fileName: string,
  source: string,
  { plugins, before = [] }: CompileModuleOptions,
): string {
  const diagnostics: ts.Diagnostic[] = [];
  const { outputText } = ts.transpileModule(source, {
    fileName,
    compilerOptions: compilerOptionsFor(ts, directoryOf(fileName)),
    transformers: {
      before: [
        transform(ts, (diagnostic) => diagnostics.push(diagnostic), {
          plugins,
        }),
        ...before,
      ],
    },
  });

  const errors = diagnostics.filter(
    (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error,
  );
  if (errors.length > 0) {
    throw new Error(
      ts.formatDiagnostics(errors, {
        getCanonicalFileName: (name) => name,
        getCurrentDirectory: () => ts.sys.getCurrentDirectory(),
        getNewLine: () => "\n",
      }),
    );
  }
  return outputText;
}

// Read once per config, however many files share it.
const optionsByConfig = new Map<string, ts.CompilerOptions>();

function compilerOptionsFor(
  ts: typeof import("typescript"),
  directory: string,
): ts.CompilerOptions {
  const configPath =
    ts.findConfigFile(directory, ts.sys.fileExists, "tsconfig.json") ?? "";
  let options = optionsByConfig.get(configPath);
  if (options === undefined) {
    let fromConfig: ts.CompilerOptions = {};
    if (configPath !== "") {
      const { config } = ts.readConfigFile(configPath, ts.sys.readFile);
      // Parsed whole, so `extends` is followed, as `tsc` follows it.
      fromConfig = ts.parseJsonConfigFileContent(
        config,
        ts.sys,
        directoryOf(configPath),
      ).options;
    }
    // Where `tsc` would write its output says nothing about a file compiled
    // where it loads, but a source map written with it names the file relative
    // to that output, and a runtime resolves the name relative to the file.
    const {
      outDir: _outDir,
      outFile: _outFile,
      rootDir: _rootDir,
      sourceRoot: _sourceRoot,
      mapRoot: _mapRoot,
      ...compiling
    } = fromConfig;
    options = {
      ...compiling,
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ESNext,
      sourceMap: false,
      inlineSourceMap: true,
      inlineSources: true,
    };
    optionsByConfig.set(configPath, options);
  }
  return options;
}

// A path's directory, by `/` or `\`, without Node's `path`.
function directoryOf(path: string): string {
  const end = Math.max(path.lastIndexOf("/"), path.lastIndexOf("\\"));
  return end === -1 ? "." : path.slice(0, end);
}
