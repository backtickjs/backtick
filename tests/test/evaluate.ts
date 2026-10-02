import { bundler } from "@backtickjs/bundler";
import type { Client, Spliceable, Spliced } from "@backtickjs/core";
import type { JSX } from "@backtickjs/solid-js/jsx-runtime";
import type { JSXElement } from "@backtickjs/solid-js";
import { drawing } from "./drawing.tsx";

/**
 * What evaluating a bundle answers: what a script evaluates to, what a host
 * function becomes on the client, and Solid's own element for a drawing.
 */
export type Evaluated<T> = T extends JSX.Element
  ? JSXElement
  : T extends Client<infer Value>
    ? Evaluated<Value>
    : T extends (...args: infer Args) => infer Returned
      ? (
          ...args: { [K in keyof Args]: Spliced<Args[K]> }
        ) => Evaluated<Returned>
      : T;

/**
 * A value as the module a page imports, its scripts compiled by Solid when the
 * test file was, against the modules a page's import map provides — Solid's,
 * and the one an app adds beside them (see `stdlib/target-builtins.test.tsx`).
 */
export async function bundle(
  value: Spliceable,
): Promise<{ code: string; map: string }> {
  const built = await bundler.build({
    input: value,
    external: { "solid-js": "1.9.14", app: "1.0.0", "acme-ui": "1.0.0" },
  });
  const { code, map } = built.generate({ format: "es", sourcemap: "hidden" });
  return { code, map: map! };
}

/**
 * A value as the client runs it: bundled, and imported from a `data:` URL,
 * its imports resolved as a page's import map resolves them. Run a drawing the
 * way Solid does, as a function it calls, which the client gets as one:
 *
 *     render(await evaluate(() => <Counter from={0} />));
 */
export async function evaluate<T extends Spliceable | (() => Spliceable)>(
  value: T,
): Promise<Evaluated<T>> {
  const { code } = await bundle(
    typeof value === "function" ? drawing(value()) : value,
  );
  // A module is evaluated once per URL, so each call's is its own: the same
  // bundle twice still runs twice, as two page loads would.
  const evaluation = `\n// evaluation ${evaluations++}`;
  const module = (await import(
    `data:text/javascript,${encodeURIComponent(code + evaluation)}`
  )) as { default: Evaluated<T> };
  return module.default;
}

let evaluations = 0;
