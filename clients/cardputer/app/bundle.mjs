import { writeFile } from "node:fs/promises";
import { bundler } from "@backtickjs/bundler";
import app from "./dist/app.js";

// The app, bundled, where the firmware expects to find it. What the device
// runs is this file and nothing else — the firmware is the same whatever the
// app is, which is the whole point of shipping an AST rather than a program.
const bundle = await bundler.run(app);
const written = JSON.stringify(bundle);
await writeFile(
  new URL("../firmware/main/bundle.json", import.meta.url),
  written,
);
console.log(`bundle.json: ${written.length} bytes`);
