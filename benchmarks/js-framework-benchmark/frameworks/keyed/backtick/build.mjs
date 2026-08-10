import { spawnSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { bundle } from "@backtickjs/core";
import { client } from "@backtickjs/web-sdk";
import { jsx } from "@backtickjs/web-sdk/jsx-runtime";

// Three steps, because a component here is server code: compile it, run it to
// find out what it drew, then write that drawing out with the client that draws
// it. The page loads one script and asks for nothing else.
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
const drawn = await bundle(jsx(Main, {}));

await writeFile(
  new URL("lib/bundle.json", here),
  `${JSON.stringify(drawn)}\n`,
);

// The page, as the harness's own boilerplate plus what this app draws.
//
// `index.template.html` is upstream's file, unedited: the stylesheet it links
// and the `#main` it provides are what every framework here is measured in. The
// bundle goes in beside them as a data block, which is how an app written with
// this SDK carries one — so what runs in Chrome is the shape an app ships,
// rather than an arrangement this benchmark invented.
//
// `data-backtick` names where the drawing goes, and every `<` in the JSON is
// written `\u003c` — a `</script` would end the block wherever it stood, and
// only a string value in `JSON.stringify` output can hold one. Both are what
// the client reads and what `toHtml` writes, spelled here because this page is
// assembled rather than generated whole.
const escaped = JSON.stringify(drawn).replaceAll("<", "\\u003c");

const template = await readFile(new URL("index.template.html", here), "utf8");
await writeFile(
  new URL("index.html", here),
  template.replace(
    "<script src='dist/main.js'></script>",
    `<script type="application/json" data-backtick="#main">${escaped}</script>` +
      `\n    <script src='dist/main.js'></script>`,
  ),
);

// And the client, whole and unaccompanied. It finds the block above and draws
// it: nothing here appends a call, and nothing on the page reaches into it.
await writeFile(new URL("dist/main.js", here), `${client}\n`);

const bytes = (await readFile(new URL("dist/main.js", here))).byteLength;
console.log(`dist/main.js  ${bytes} bytes`);
