import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { compileModule, pluginsFrom } from "@backtickjs/compiler";
import { plugin } from "bun";
import ts from "typescript";

const packageJson = path.join(process.cwd(), "package.json");
const plugins = pluginsFrom(
  readFileSync(packageJson, "utf8"),
  createRequire(packageJson),
);

/**
 * Use it from a `bunfig.toml`:
 *
 * ```toml
 * preload = ["@backtickjs/bun-plugin"]
 * ```
 *
 * or from the command line:
 *
 * ```sh
 * bun --preload @backtickjs/bun-plugin ./src/index.ts
 * ```
 *
 * The framework's compile steps are the project's, named in its
 * `package.json`:
 *
 * ```json
 * "backtick": { "plugins": ["@backtickjs/solid-js/plugin"] }
 * ```
 */
plugin({
  name: "backtick",
  setup(build) {
    build.onLoad({ filter: /\.tsx?$/ }, (args) => {
      const source = readFileSync(args.path, "utf8");

      // What the project installed is left to Bun. Returning `undefined` here
      // throws on Bun >= 1.3 ("onLoad() expects an object returned"), so hand
      // back the original source with a plain TS/TSX loader instead.
      if (args.path.includes("node_modules")) {
        return {
          contents: source,
          loader: args.path.endsWith(".tsx") ? "tsx" : "ts",
        };
      }

      // The project's own files are all compiled here, not only those with a
      // script: Bun reads only the root `tsconfig.json`, and a server beside an
      // app has its own, nearer one.
      const fileName =
        path.relative(process.cwd(), args.path).split(path.sep).join("/") ||
        args.path;
      const code = compileModule(ts, fileName, source, { plugins });

      return {
        contents: ascii(stampBun(code)),
        loader: args.path.endsWith(".tsx") ? "jsx" : "js",
      };
    });
  },
});

// Code with every character past ASCII escaped, `\uXXXX`: Bun reads a file
// stamped `// @bun` (below) as Latin-1, as its own transpiler writes them, so
// "🏡" would arrive as "ð\u009f\u008f¡". Escaped, a string, identifier or
// regular expression means what it did. (JSX text doesn't read escapes, but
// what reaches here is JSX compiled to calls unless a project preserves it.)
// The source map isn't shifted to match, so columns after an escape on its
// line are off; lines stay right, which is worth it for text that reads right.
function ascii(code: string): string {
  return code.replace(
    /[^\x00-\x7f]/g,
    (unit) => `\\u${unit.charCodeAt(0).toString(16).padStart(4, "0")}`,
  );
}

// HACK: stamp a `// @bun` pragma at the top of the output to trick Bun into
// using our inline source map.
//
// This relies on undocumented Bun internals and could break on any Bun upgrade.
// The proper fix would be a real Bun plugin API for handing back a source map.
//
// Bun reads the pragma only on the very first line, so it's written into the
// text rather than onto the first statement, where a leading comment would push
// it down. The map gains an empty first line to match.
const MAP = "//# sourceMappingURL=data:application/json;base64,";

function stampBun(code: string): string {
  const at = code.lastIndexOf(MAP);
  if (at === -1) {
    return `// @bun\n${code}`;
  }
  const map = JSON.parse(
    Buffer.from(code.slice(at + MAP.length).trim(), "base64").toString("utf8"),
  ) as { mappings: string };
  map.mappings = `;${map.mappings}`;
  const encoded = Buffer.from(JSON.stringify(map)).toString("base64");
  return `// @bun\n${code.slice(0, at)}${MAP}${encoded}\n`;
}
