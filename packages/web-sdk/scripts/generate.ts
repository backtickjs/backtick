import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { emitJson, emitJsx } from "@backtickjs/schema";
import * as schema from "../schema/index.ts";

// What this target draws, and where each artifact goes. How a schema becomes
// one is `@backtickjs/schema`'s, and is the same for every target.

// Relative to this file rather than to the working directory, so it writes the
// same files wherever it is run from.
const write = (path: string, body: string) => {
  writeFileSync(fileURLToPath(new URL(`../${path}`, import.meta.url)), body);
  console.log(`${path}: ${body.split("\n").length} lines`);
};

write("src/jsx-runtime/index.ts", emitJsx(schema));

// Beside the schema it came from, so a change to what this target draws is a
// change someone can read in review.
write("schema/index.json", emitJson(schema));
