// The sign-in page's script, with Solid in it, as one static file:
// public/sign-in.js. From this origin only, never a CDN: the page takes
// passwords, so no one else's server may change its code.
import { build } from "esbuild";
import { signInScript } from "../web/dist/page.js";

await build({
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
  outfile: "public/sign-in.js",
  logLevel: "warning",
});
