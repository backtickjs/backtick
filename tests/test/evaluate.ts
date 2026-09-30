import { bundler } from "@backtickjs/bundler";
import type { Client, Spliceable, Spliced } from "@backtickjs/core";
import { modules } from "@backtickjs/solid-js";
import { compile } from "@backtickjs/solid-js/bundle";
import type { JSX } from "@backtickjs/solid-js/jsx-runtime";
import type { JSX as Solid } from "solid-js";

/**
 * What evaluating a bundle answers: what a script evaluates to, what a host
 * function becomes on the client, and Solid's own element for a drawing.
 */
export type Evaluated<T> = T extends JSX.Element
  ? Solid.Element
  : T extends Client<infer Value>
    ? Evaluated<Value>
    : T extends (...args: infer Args) => infer Returned
      ? (...args: { [K in keyof Args]: Spliced<Args[K]> }) => Evaluated<Returned>
      : T;

/**
 * A value as the client runs it: bundled with Solid's compiler, and imported
 * from a `data:` URL, its imports resolved as a page's import map resolves
 * them — Solid's modules, and the one an app adds beside them (see
 * `stdlib/target-builtins.test.tsx`). Run a drawing the way Solid does, as a
 * function it calls:
 *
 *     render(await evaluate(() => <Counter from={0} />));
 */
export async function evaluate<T extends Spliceable>(
  value: T,
): Promise<Evaluated<T>> {
  const bundle = await bundler.build({
    input: value,
    external: [...modules, "app"],
    plugins: [compile],
  });
  const { code } = bundle.generate({ format: "es" });
  const module = (await import(
    `data:text/javascript,${encodeURIComponent(code)}`
  )) as { default: Evaluated<T> };
  return module.default;
}
