import { readFileSync } from "node:fs";
import {
  createRequire,
  type LoadHookSync,
  type ResolveHookSync,
} from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { compileModule, pluginsFrom } from "@backtickjs/compiler";
import ts from "typescript";

// Node's module hooks, registered by `index.ts`. The framework's compile steps
// are read once, from the project's `package.json`.
const packageJson = path.join(process.cwd(), "package.json");
const plugins = pluginsFrom(
  readFileSync(packageJson, "utf8"),
  createRequire(packageJson),
);

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
  const fileName =
    path.relative(process.cwd(), file).split(path.sep).join("/") || file;
  const source = compileModule(ts, fileName, readFileSync(file, "utf8"), {
    plugins,
  });
  return { format: "module", source, shortCircuit: true };
};
