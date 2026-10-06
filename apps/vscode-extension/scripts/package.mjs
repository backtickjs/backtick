// @ts-check
import { execFileSync } from "node:child_process";
import {
  cpSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { createRequire } from "node:module";
import esbuild from "esbuild";

// The extension as the Marketplace and Open VSX take it, assembled in
// `.vsix/` and removed once packaged: `vsce` neither accepts a scoped name nor
// follows pnpm's links, so the manifest is rewritten and the TypeScript plugin
// is bundled in place.

const require = createRequire(import.meta.url);
const stage = new URL("../.vsix/", import.meta.url);
const root = new URL("../", import.meta.url);

rmSync(stage, { recursive: true, force: true });
mkdirSync(stage, { recursive: true });

const manifest = JSON.parse(
  readFileSync(new URL("package.json", root), "utf8"),
);
const {
  name: _name,
  private: _private,
  scripts: _scripts,
  dependencies: _dependencies,
  devDependencies: _devDependencies,
  ...published
} = manifest;
// What ships: the client, the grammars, the plugin and the listing's files.
const files = [
  "dist/node/**",
  "syntaxes/**",
  "images/**",
  "node_modules/@backtickjs/typescript-plugin/**",
  "README.md",
  "LICENSE",
];
writeFileSync(
  new URL("package.json", stage),
  `${JSON.stringify(
    {
      name: "backtick-vscode",
      ...published,
      files,
      // The bundled plugin below, so `vsce` packs it as the one dependency.
      dependencies: { "@backtickjs/typescript-plugin": manifest.version },
    },
    null,
    2,
  )}\n`,
);

for (const path of ["dist/", "syntaxes/", "images/", "README.md"]) {
  cpSync(new URL(path, root), new URL(path, stage), { recursive: true });
}
cpSync(new URL("../../LICENSE", root), new URL("LICENSE", stage));

// Where TypeScript's server looks for the plugin `contributes` names: the
// extension's own `node_modules`. TypeScript itself is the server's, passed
// to the plugin when it loads.
const plugin = "node_modules/@backtickjs/typescript-plugin/";
await esbuild.build({
  entryPoints: [require.resolve("@backtickjs/typescript-plugin")],
  outfile: new URL(`${plugin}index.js`, stage).pathname,
  bundle: true,
  format: "cjs",
  platform: "node",
  external: ["typescript"],
  minify: true,
});
writeFileSync(
  new URL(`${plugin}package.json`, stage),
  `${JSON.stringify(
    {
      name: "@backtickjs/typescript-plugin",
      version: manifest.version,
      main: "index.js",
    },
    null,
    2,
  )}\n`,
);

const vsix = `backtick-vscode-${manifest.version}.vsix`;
execFileSync(
  require.resolve("@vscode/vsce/vsce"),
  ["package", "--out", `../${vsix}`],
  { cwd: stage, stdio: "inherit" },
);
rmSync(stage, { recursive: true, force: true });
console.log(`Packaged ${vsix}.`);
