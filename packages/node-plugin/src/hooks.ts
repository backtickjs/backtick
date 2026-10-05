import { readFileSync } from "node:fs";
import {
  createRequire,
  type LoadHookSync,
  type ResolveHookSync,
} from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { type Plugin, transform } from "@backtickjs/compiler";
import ts from "typescript";

// Node's module hooks, registered by `index.ts`. What they read of the project
// is read once.
const plugins = loadPlugins();

// The project's own TypeScript, not what it installed.
const compiled = (url: string) =>
  url.startsWith("file:") &&
  /\.tsx?$/.test(url) &&
  !url.includes("/node_modules/");

// `./Home.js` for `./Home.tsx`, as TypeScript writes an import of a file it
// compiles: tried as written first, then as the source it stands for.
export const resolve: ResolveHookSync = (specifier, context, nextResolve) => {
  try {
    return nextResolve(specifier, context);
  } catch (error) {
    const relative = specifier.startsWith("./") || specifier.startsWith("../");
    if (!relative || !specifier.endsWith(".js")) {
      throw error;
    }
    for (const extension of [".ts", ".tsx"]) {
      try {
        return nextResolve(specifier.slice(0, -3) + extension, context);
      } catch {}
    }
    throw error;
  }
};

export const load: LoadHookSync = (url, context, nextLoad) => {
  if (!compiled(url)) {
    return nextLoad(url, context);
  }
  const file = fileURLToPath(url);
  const source = readFileSync(file, "utf8");
  const fileName =
    path.relative(process.cwd(), file).split(path.sep).join("/") || file;

  const diagnostics: ts.Diagnostic[] = [];
  const { outputText } = ts.transpileModule(source, {
    fileName,
    compilerOptions: compilerOptionsFor(path.dirname(file)),
    transformers: {
      before: [
        transform(ts, (diagnostic) => diagnostics.push(diagnostic), {
          plugins,
        }),
      ],
    },
  });

  // A script the compiler refused is emitted with `null` where the refused
  // code was, so it must not load.
  const errors = diagnostics.filter(
    (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error,
  );
  if (errors.length > 0) {
    throw new Error(
      ts.formatDiagnostics(errors, {
        getCanonicalFileName: (name) => name,
        getCurrentDirectory: () => process.cwd(),
        getNewLine: () => "\n",
      }),
    );
  }

  return { format: "module", source: outputText, shortCircuit: true };
};

// A compile step's module, as Babel's presets are: named in a config, resolved
// from the project, its default export making the step.
interface PluginModule {
  default: () => Plugin;
}

// The compile steps the project's `package.json` names under `backtick`.
function loadPlugins(): Plugin[] {
  const file = path.join(process.cwd(), "package.json");
  const { backtick } = JSON.parse(readFileSync(file, "utf8")) as {
    backtick?: { plugins?: readonly string[] };
  };
  const require = createRequire(file);
  return (backtick?.plugins ?? []).map((specifier) =>
    (require(specifier) as PluginModule).default(),
  );
}

// The compiler options of the `tsconfig.json` nearest a directory, as `tsc`
// and editors find them, so an app and its server can each have their own.
// Compiled to ES modules with the map inline, so a stack trace under
// `--enable-source-maps` points at the lines written.
const optionsByConfig = new Map<string, ts.CompilerOptions>();

function compilerOptionsFor(directory: string): ts.CompilerOptions {
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
        path.dirname(configPath),
      ).options;
    }
    options = {
      ...fromConfig,
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
