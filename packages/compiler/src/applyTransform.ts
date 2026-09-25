import remapping from "@jridgewell/remapping";
import type { EmittedScript } from "./emitScript.js";

/**
 * What an adapter's transform does to a script's code (see
 * `EmittedScript.code`), shaped as a Vite plugin's `transform`: the code and
 * the host file it was written in, in; whatever the framework's compiler made
 * of it out, with a source map (as JSON) into the code it was given. The
 * compiler composes that map with its own, so the result points into the host
 * file.
 */
export type CodeTransform = (
  code: string,
  id: string,
) => { readonly code: string; readonly map: string };

/** A script's code through `transform`, with its map still into the host file. */
export function applyTransform(
  transform: CodeTransform,
  script: EmittedScript,
  id: string,
): EmittedScript {
  const { code, map } = transform(script.code, id);
  return {
    code,
    map: remapping([map, script.map], () => null, {
      excludeContent: true,
    }).toString(),
  };
}
