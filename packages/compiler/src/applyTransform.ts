import remapping from "@jridgewell/remapping";
import type { EmittedScript } from "./emitScript.js";

/**
 * What an adapter's transform does to a script's code (see
 * `EmittedScript.code`), shaped as a Vite plugin's `transform`: the code and
 * its module id in; whatever the framework's compiler made of it out, with a
 * source map (as JSON) into the code it was given. The compiler composes that
 * map with its own, so the result points into the host file.
 *
 * The id is the host file's path with where the script was written and the
 * language of its code, `host.tsx?cs=12:5&lang.jsx`, so each script is a
 * module of its own and its code reads as JSX, not TypeScript.
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
