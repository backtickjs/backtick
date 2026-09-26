import type { ScriptModule } from "@backtickjs/client-script";

const EXPORT = "export default ";

/** A script's entry: its code, and its map with where the code starts in it. */
export interface Entry {
  readonly code: string;
  // the module's source map, into the host file
  readonly map: string;
  // the column the code starts at on the map's first line
  readonly column: number;
}

/**
 * A script's module as its bundle entry: the expression it exports by
 * default. The compiler writes nothing else in it.
 */
export function entryOf(module: ScriptModule): Entry {
  const { code, map } = module;
  if (!code.startsWith(EXPORT) || !code.endsWith(";")) {
    throw new Error(`A script's module is \`export default …;\`: ${code}`);
  }
  return { code: code.slice(EXPORT.length, -1), map, column: EXPORT.length };
}
