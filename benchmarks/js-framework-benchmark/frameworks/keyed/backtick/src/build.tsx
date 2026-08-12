import { mkdir, writeFile } from "node:fs/promises";
import { bundle } from "@backtickjs/core";
import { client, insert } from "@backtickjs/web-sdk";
import { Main } from "./Main.js";

const here = new URL("../", import.meta.url);

const bundled = await bundle(<Main />);

// Into `lib/`, beside what the compiler wrote: this is what `Main.tsx`
// produced, and what `pnpm test` drives without a browser.
await writeFile(
  new URL("lib/bundle.json", here),
  `${JSON.stringify(bundled)}\n`,
);

const clientUrl = `./_backtick/client.js`;

await writeFile(
  new URL("index.html", here),
  insert(
    `<!doctype html><html><head>` +
      `<meta charset="utf-8">` +
      `<title>Backtick-"keyed"</title>` +
      `<link href="/css/currentStyle.css" rel="stylesheet">` +
      `<script defer src="${clientUrl}"></script>` +
      `</head><body><div id="main" class="container"></div></body></html>`,
    "#main",
    bundled,
  ),
);

// And the client itself, at the name this document asks for. It draws what it
// finds: nothing here appends a call.
const built = new URL(clientUrl, here);
await mkdir(new URL(".", built), { recursive: true });
await writeFile(built, client.source);

console.log(`${clientUrl}  ${client.source.length} bytes`);
