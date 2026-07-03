import type { Client } from "@backtickjs/core/cs-runtime";
import { buildAst } from "@backtickjs/core/jit-bundler";

export function print(script: Client<unknown>): void {
  process.stdout.write(`${buildAst(script).debugPrint()}\n`);
}
