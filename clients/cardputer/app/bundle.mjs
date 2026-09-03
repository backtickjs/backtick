import { writeFile } from "node:fs/promises";
import { bundler } from "@backtickjs/bundler";

// Which of `src` to build, so the device can be given something other than the
// app it usually runs — `BACKTICK_APP=keys` for the one that says what the
// keyboard reported.
const name = process.env.BACKTICK_APP ?? "app";
const { default: app } = await import(`./dist/${name}.js`);

// The app, bundled, where the firmware expects to find it. What the device
// runs is this file and nothing else — the firmware is the same whatever the
// app is, which is the whole point of shipping an AST rather than a program.
const bundle = await bundler.run(app);
const written = JSON.stringify(bundle);
await writeFile(
  new URL("../firmware/main/bundle.json", import.meta.url),
  written,
);
console.log(`bundle.json: ${name}, ${written.length} bytes`);
