import { spawnSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { bundle } from "@backtickjs/core";
import { client, clientUrl, toHtml } from "@backtickjs/web-sdk";
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

// The page, from the SDK, around a template of this app's own — which is what
// the document every framework here is measured in is made of: the stylesheet
// in a real `<head>`, and the `#main` container the block draws inside of.
//
// `clientUrl` is a path from an origin's root, and this app is served under a
// prefix of the harness's choosing rather than at one. Asked for relatively
// instead, which is safe to do by replacement because both the string being
// matched and the string replacing it come from that constant.
const asked = `.${clientUrl}`;
const html = toHtml(drawn, (backtick) => {
  const relative = backtick.replace(`src="${clientUrl}"`, `src="${asked}"`);
  if (!relative.includes(asked)) {
    throw new Error(`the page does not ask for the client at ${clientUrl}`);
  }
  return (
    `<!doctype html><html><head>` +
    `<meta charset="utf-8">` +
    `<title>Backtick-"keyed"</title>` +
    `<link href="/css/currentStyle.css" rel="stylesheet">` +
    `</head><body><div id="main" class="container">${relative}</div></body></html>`
  );
});
await writeFile(new URL("index.html", here), html);

// And the client itself, at the name the SDK gave it. It finds the block in the
// page and draws it: nothing here appends a call.
const built = new URL(asked, here);
await mkdir(new URL(".", built), { recursive: true });
await writeFile(built, client);

console.log(`${asked}  ${client.length} bytes`);
