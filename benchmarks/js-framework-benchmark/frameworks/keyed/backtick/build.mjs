import { spawnSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { build } from "esbuild";
import { bundle } from "@backtickjs/core";
import { jsx } from "@backtickjs/web-sdk/jsx-runtime";

// Three steps, because a component here is server code: compile it, run it to
// find out what it drew, then bundle that drawing with the client that draws
// it. The page loads one module and asks for nothing else.
//
// Plain JavaScript because it is build tooling rather than the app, which is
// also why `<Main />` is written as the call JSX compiles to.
const here = new URL("./", import.meta.url);

// `tspc` rather than `tsc`: a spliceable member is only there after the
// transform in `tsconfig.json` has run.
//
// Emitting only. What checks this app is `pnpm typecheck`, which runs
// `backtick-tsc` — plain `tsc` reads a script's result as `ClientUnknown` and
// rejects it as a child, so it is the wrong tool to check an app made of
// splices.
const compiled = spawnSync("npx", ["tspc", "--noCheck", "--declaration"], {
  cwd: here,
  stdio: "inherit",
});
if (compiled.status !== 0) {
  process.exit(compiled.status ?? 1);
}

const { Main } = await import(new URL("lib/Main.js", here));

// Into `lib/`, with everything else the compiler wrote: this is what `Main.tsx`
// produced, not something anyone typed, and `src/` holds only what was typed.
await writeFile(
  new URL("lib/bundle.json", here),
  `${JSON.stringify(await bundle(jsx(Main, {})))}\n`,
);

await build({
  entryPoints: [new URL("src/main.ts", here).pathname],
  outfile: new URL("dist/main.js", here).pathname,
  bundle: true,
  format: "esm",
  platform: "browser",
  target: "es2022",
  minify: true,
});

const bytes = (await readFile(new URL("dist/main.js", here))).byteLength;
console.log(`dist/main.js  ${bytes} bytes`);
