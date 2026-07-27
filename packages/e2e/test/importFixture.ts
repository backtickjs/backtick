import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { basename, extname, join } from "node:path";
import { pathToFileURL } from "node:url";
import type { Client, ClientValue } from "@backtickjs/core";
import { transpileFixture } from "./transpileFixture.ts";

export const fixturesRoot = join(import.meta.dirname, "fixtures");

// Compiles a fixture with the same transform the compiler suite snapshots as
// `*.js`, then imports the emitted module to get the client it exports.
//
// Each suite loads through its own cache directory: `node --test` runs test
// files in separate processes, so one shared directory would have a starting
// suite clearing another's modules mid-run. The emitted modules land inside
// the package either way, so their `@backtickjs/core` imports resolve through
// its `node_modules`.
export function createFixtureLoader(
  suite: string,
): (dir: string, file: string) => Promise<Client<ClientValue> | Client<void>> {
  const cacheDir = join(import.meta.dirname, "../.cache", suite);
  rmSync(cacheDir, { recursive: true, force: true });
  return async function importFixture(dir, file) {
    const sourceText = readFileSync(join(dir, file), "utf8");
    const outputText = await transpileFixture(file, sourceText);
    const base = file.slice(0, -extname(file).length);
    const compiled = join(cacheDir, basename(dir), `${base}.js`);
    mkdirSync(join(cacheDir, basename(dir)), { recursive: true });
    writeFileSync(compiled, outputText);
    const { default: script } = (await import(
      pathToFileURL(compiled).href
    )) as {
      default: Client<ClientValue> | Client<void>;
    };
    return script;
  };
}
