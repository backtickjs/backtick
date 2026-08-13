import { writeFile } from "node:fs/promises";
import { client } from "@backtickjs/web-sdk";
import { bundled } from "./dist/bundle.js";
import { toHtml } from "./dist/toHtml.js";

const dist = new URL("./dist/", import.meta.url);
await writeFile(new URL("index.html", dist), toHtml(bundled));
await writeFile(new URL("client.js", dist), client.source);
