import { writeFile } from "node:fs/promises";
import { html } from "./dist/html.js";

await writeFile(new URL("./dist/index.html", import.meta.url), html);
