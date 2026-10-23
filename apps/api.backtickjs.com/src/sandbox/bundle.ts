// An app's bundle, made when a phone opens it, for the modules that phone sent
// in `x-backtick-modules`. A module it doesn't provide throws the bundler's
// `ClientVersionMismatch`, which the phone answers with its update screen.
import { pathToFileURL } from "node:url";
import { bundler, type Modules } from "@backtickjs/bundler";

export async function bundle(
  file: string,
  modules: Modules,
): Promise<{ code: string; map: string }> {
  const { default: app } = await import(pathToFileURL(file).href);
  const built = await bundler.build({ input: app, modules });
  const { code, map } = built.generate({ format: "cjs", sourcemap: "hidden" });
  return { code, map: map! };
}
