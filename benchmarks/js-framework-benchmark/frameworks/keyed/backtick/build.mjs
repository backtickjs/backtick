import { writeFile } from "node:fs/promises";
import { client } from "@backtickjs/web-sdk";
import { html } from "./dist/html.js";

const dist = new URL("./dist/", import.meta.url);
await writeFile(new URL("index.html", dist), html);
await writeFile(new URL("client.js", dist), client.source);
