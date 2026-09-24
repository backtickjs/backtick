import type { ClientUnknown, Spliceable } from "@backtickjs/core";
import { bundler, printBundle } from "@backtickjs/bundler";
import { createInterpreter, createRuntime } from "@backtickjs/web-interpreter";
import type { Program } from "@backtickjs/web-interpreter";
import { defined } from "./cleanup.js";

/** A value bundled and ready to run: drawn into a node, or evaluated. */
export interface Prepared<T extends ClientUnknown> {
  render(parent: Node): () => void;
  evaluate(): T;
}

// `BACKTICK_BACKEND=interpreter` runs every test through the interpreter
// instead.
const scope = globalThis as {
  process?: { env?: Record<string, string | undefined> };
};
const printed = scope.process?.env?.["BACKTICK_BACKEND"] !== "interpreter";

// As a module rather than through `eval`: what a page with a strict Content
// Security Policy will load.
async function load(code: string): Promise<Program> {
  const module = (await import(
    `data:text/javascript,${encodeURIComponent(`export default () => ${code};`)}`
  )) as { default: Program };
  return module.default;
}

/**
 * Bundles `value` for the client a test draws with. A bundle runs in this
 * realm, not the document's, so the client's globals are this realm's.
 */
export async function prepare<T extends ClientUnknown>(
  value: Spliceable<T>,
  globals: { readonly [name: string]: unknown } = {},
): Promise<Prepared<T>> {
  for (const name of Object.keys(globals)) {
    defined.add(name);
  }
  const options = { window, globals, global: globalThis };
  if (!printed) {
    const interpreter = createInterpreter(options);
    const bundle = await bundler.run(value);
    return {
      render: (parent) => interpreter.render(bundle, parent),
      evaluate: () => interpreter.evaluate(bundle),
    };
  }
  const runtime = createRuntime(options);
  const code = printBundle(await bundler.run(value));
  const program = await load(code);
  return {
    render: (parent) => runtime.render(program, parent),
    evaluate: () => runtime.evaluate(program as () => T),
  };
}
