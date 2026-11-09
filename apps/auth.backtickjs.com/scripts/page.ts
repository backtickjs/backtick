// The sign-in page's script, with Solid in it, as a string the function
// serves at /sign-in.js: web/dist/script.js. From this origin only, never a
// CDN: the page signs people in, so no one else's server may change its code.
// Not in public/: Vercel copies public/ before the build runs.
import { writeFile } from "node:fs/promises";
import { build } from "esbuild";
import { signInScript } from "../web/dist/page.js";

const { outputFiles } = await build({
  stdin: {
    contents: await signInScript(),
    resolveDir: new URL("..", import.meta.url).pathname,
    loader: "js",
  },
  bundle: true,
  format: "esm",
  platform: "browser",
  conditions: ["browser"],
  minify: true,
  write: false,
  logLevel: "warning",
});

await writeFile(
  new URL("../web/dist/script.js", import.meta.url),
  `export const signInScript = ${JSON.stringify(outputFiles[0]!.text)};\n`,
);
await writeFile(
  new URL("../web/dist/script.d.ts", import.meta.url),
  "export declare const signInScript: string;\n",
);
