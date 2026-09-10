import * as core from "@backtickjs/core";
import { bundler } from "@backtickjs/bundler";
import * as webSchema from "@backtickjs/web";
import * as jsxRuntime from "@backtickjs/web/jsx-runtime";

const MODULES: Readonly<Record<string, unknown>> = {
  "@backtickjs/core": core,
  "@backtickjs/web": webSchema,
  "@backtickjs/web/jsx-runtime": jsxRuntime,
};

function evaluate(javascript: string): unknown {
  const exports: Record<string, unknown> = {};
  const require = (specifier: string): unknown => {
    const held = MODULES[specifier];
    if (held === undefined) {
      throw new Error(
        "this answers for `@backtickjs/core` and `@backtickjs/web` and" +
          ` nothing else, and this asked for \`${specifier}\``,
      );
    }
    return held;
  };
  new Function("require", "exports", "module", javascript)(require, exports, {
    exports,
  });
  return exports;
}

// Answered to whoever asked, at `*` because this has no origin to name and the
// asker's is not something an opaque document can know.
window.addEventListener("message", (event: MessageEvent) => {
  const { id, javascript } = event.data as { id: number; javascript: string };
  const back = (answer: Record<string, unknown>) =>
    (event.source as Window | null)?.postMessage({ id, ...answer }, "*");

  void (async () => {
    try {
      // What `export default` holds is a component, which is what every
      // example spells: `export default async function Screen()`.
      const { default: draw } = evaluate(javascript) as {
        default: (props: object) => Promise<never>;
      };
      back({ bundle: JSON.stringify(await bundler.run(await draw({}))) });
    } catch (thrown: unknown) {
      back({ message: String(thrown) });
    }
  })();
});
