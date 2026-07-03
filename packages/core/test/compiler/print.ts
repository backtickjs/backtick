import type { Client } from "@backtickjs/core/cs-runtime";
import { buildAst, printAst } from "@backtickjs/core/jit-bundler";

export function print(script: Client<unknown>): void {
  process.stdout.write(`${printAst(buildAst(script))}\n`);
}
