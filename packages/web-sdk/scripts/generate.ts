import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { emitJsx } from "@backtickjs/schema";
import * as html from "../schema/html.ts";

// What this target draws, and where each artifact goes. How a schema becomes
// one is `@backtickjs/schema`'s, and is the same for every target.

// Relative to this file rather than to the working directory, so it writes the
// same files wherever it is run from.
const write = (path: string, body: string) => {
  writeFileSync(
    fileURLToPath(new URL(`../src/${path}`, import.meta.url)),
    body,
  );
  console.log(`${path}: ${body.split("\n").length} lines`);
};

write("jsx-runtime/index.ts", emitJsx(html));
