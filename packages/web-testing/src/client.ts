import type { Bundle, ClientUnknown, ClientValue } from "@backtickjs/core";
import { printBundle } from "@backtickjs/bundler";
import { createInterpreter, createRuntime } from "@backtickjs/web-interpreter";
import type { Program } from "@backtickjs/web-interpreter";

/** What a test draws a bundle with: the bundle printed, or the interpreter. */
export interface TestClient {
  render(bundle: Bundle<ClientUnknown>, parent: Node): Promise<() => void>;
  evaluate<T extends ClientUnknown>(bundle: Bundle<T>): Promise<T>;
}

// `BACKTICK_BACKEND=interpreter` runs every test through the interpreter
// instead.
const scope = globalThis as {
  process?: { env?: Record<string, string | undefined> };
};
const printed = scope.process?.env?.["BACKTICK_BACKEND"] !== "interpreter";

// As a module rather than through `eval`: what a page with a strict Content
// Security Policy will load.
async function load(bundle: Bundle<ClientUnknown>): Promise<Program> {
  const { code, globals } = printBundle(bundle);
  const module = (await import(
    `data:text/javascript,${encodeURIComponent(`export default () => ${code};`)}`
  )) as { default: Program["run"] };
  return { globals, run: module.default };
}

export function testClient(
  builtinOf: ((name: string) => ClientValue) | undefined,
): TestClient {
  if (!printed) {
    const interpreter = createInterpreter({ window, builtinOf });
    return {
      render: async (bundle, parent) => interpreter.render(bundle, parent),
      evaluate: async (bundle) => interpreter.evaluate(bundle),
    };
  }
  // The module runs in this realm, not the document's, so the globals it
  // reads are this realm's.
  const runtime = createRuntime({ window, builtinOf, global: globalThis });
  return {
    render: async (bundle, parent) =>
      runtime.render(await load(bundle), parent),
    evaluate: async <T extends ClientUnknown>(bundle: Bundle<T>) =>
      runtime.evaluate<T>(await load(bundle)),
  };
}
