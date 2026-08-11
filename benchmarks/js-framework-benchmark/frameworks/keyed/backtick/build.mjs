import { spawnSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { bundle } from "@backtickjs/core";
import { client, clientUrl, insert } from "@backtickjs/web-sdk";
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

// The document this app is measured in, written here rather than by the SDK:
// what `page` would give is a document with nothing in its head, and what every
// framework here is measured with is the shared stylesheet and the `#main`
// container. So `insert` draws the bundle above into a document of this app's
// own — the same bundle the snapshots read, drawn once and written twice.
//
// `clientUrl` is a path from an origin's root, and this app is served under a
// prefix of the harness's choosing rather than at one. So the island is told to
// ask for it relatively, which is the whole of what that takes.
const asked = `.${clientUrl}`;

await writeFile(
  new URL("index.html", here),
  insert(
    `<!doctype html><html><head>` +
      `<meta charset="utf-8">` +
      `<title>Backtick-"keyed"</title>` +
      `<link href="/css/currentStyle.css" rel="stylesheet">` +
      `</head><body><div id="main" class="container"></div></body></html>`,
    "#main",
    drawn,
    asked,
  ),
);

// And the client itself, at the name the SDK gave it. The island draws itself:
// nothing here appends a call.
const built = new URL(asked, here);
await mkdir(new URL(".", built), { recursive: true });
await writeFile(built, client);

console.log(`${asked}  ${client.length} bytes`);
