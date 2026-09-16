import { writeFile } from "node:fs/promises";
import * as client from "@backtickjs/web-page/bundle";
import { html } from "./dist/html.js";

const dist = new URL("./dist/", import.meta.url);
await writeFile(new URL("index.html", dist), html);
await writeFile(new URL("client.js", dist), client.source);
