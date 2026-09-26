import type { ScriptModule } from "@backtickjs/client-script";

const EXPORT = "export default ";

/**
 * A script's module as its bundle entry: the expression it exports by
 * default. The compiler writes nothing else in it.
 */
export function entryOf(module: ScriptModule): string {
  const { code } = module;
  if (!code.startsWith(EXPORT) || !code.endsWith(";")) {
    throw new Error(`A script's module is \`export default …;\`: ${code}`);
  }
  return code.slice(EXPORT.length, -1);
}
