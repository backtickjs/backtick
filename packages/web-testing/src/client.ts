import type { Bundle, ClientUnknown, ClientValue } from "@backtickjs/core";
import { printBundle } from "@backtickjs/bundler";
import { createInterpreter, createRuntime } from "@backtickjs/web-interpreter";
import type { PrintedModule, Program } from "@backtickjs/web-interpreter";

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

async function load(bundle: Bundle<ClientUnknown>): Promise<PrintedModule> {
  const { code, data, globals } = printBundle(bundle);
  const module = (await import(
    `data:text/javascript,${encodeURIComponent(code)}`
  )) as { default: Program };
  return { program: module.default, data, globals };
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
  const runtime = createRuntime({ window, builtinOf });
  return {
    render: async (bundle, parent) =>
      runtime.render(await load(bundle), parent),
    evaluate: async <T extends ClientUnknown>(bundle: Bundle<T>) =>
      runtime.evaluate<T>(await load(bundle)),
  };
}
