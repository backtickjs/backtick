import type { Spliceable } from "@backtickjs/core";
import { bundler } from "../dist/bundler.js";

// A value bundled as a module: built with no plugins, so its JSX stays JSX,
// against the package the tests import from.
export async function es(value: Spliceable): Promise<string> {
  const bundle = await bundler.build({
    input: value,
    packageVersions: { "solid-js": "1.9.14" },
  });
  return bundle.generate({ format: "es" }).code;
}
