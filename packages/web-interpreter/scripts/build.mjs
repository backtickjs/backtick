import { build } from "esbuild";

// Solid is bundled in, from its browser build. Left as an import, Node and Bun
// resolve `solid-js` to the server build, which never reacts, unless every
// test runner is started with `--conditions=browser`.
//
// Written over the `index.js` tsc emitted, the one entry the package exports.
// tsc's other modules stay for this package's own tests.
await build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.js",
  bundle: true,
  format: "esm",
  platform: "browser",
  target: "es2022",
  external: ["@backtickjs/*"],
});
