import type { Client, ClientUnknown } from "@backtickjs/core/cs-runtime";
import { buildAst, printAst } from "@backtickjs/core/jit-bundler";

export function print(script: Client<ClientUnknown>): void {
  process.stdout.write(`${printAst(buildAst(script))}\n`);
}
