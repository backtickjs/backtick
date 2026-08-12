import { mkdir, writeFile } from "node:fs/promises";
import { client } from "@backtickjs/web-sdk";
import { html } from "./dist/html.js";

const here = new URL("./", import.meta.url);
await writeFile(new URL("index.html", here), html);
await writeFile(new URL("client.js", here), client.source);
