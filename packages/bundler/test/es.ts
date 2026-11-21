import type { Client } from "@backtickjs/core";
import { bundler } from "../dist/bundler.js";

// What a server sends, bundled as a module: built with no plugins, so its JSX
// stays JSX, against the package the tests import from.
export async function es(input: Client<unknown>): Promise<string> {
  const bundle = await bundler.build({
    input,
    modules: { "solid-js": "1.9.14" },
  });
  return bundle.generate({ format: "es" }).code;
}
