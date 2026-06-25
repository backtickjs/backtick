import type { ClientScript } from "./parseFile.js";

// Yields every client script in the file, descending through splices
export function* flattenScripts(
  scripts: ClientScript[],
): Generator<ClientScript> {
  for (const script of scripts) {
    yield script;
    for (const splice of Object.values(script.splices)) {
      yield* flattenScripts(splice.scripts);
    }
  }
}
