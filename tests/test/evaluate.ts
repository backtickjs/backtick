import { bundler } from "@backtickjs/bundler";
import {
  type Bundle,
  type Client,
  createRuntime,
  type Spliceable,
  type Spliced,
} from "@backtickjs/core";
import type { JSX } from "@backtickjs/jsx-solid/jsx-runtime";
import * as AcmeUi from "acme-ui";
import type { JSXElement } from "solid-js";
import * as SolidJs from "solid-js";
import * as SolidJsStore from "solid-js/store";
import * as SolidJsWeb from "solid-js/web";
import * as App from "./stdlib/app.ts";
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

// The modules the client provides: Solid's, the one an app adds beside them
// (see `stdlib/target-builtins.test.tsx`), and a library it installs (see
// `bindings/library-component.test.tsx`).
const modules = {
  "solid-js": "1.9.14",
  "solid-js/store": "1.9.14",
  "solid-js/web": "1.9.14",
  app: "1.0.0",
  "acme-ui": "1.0.0",
};
const moduleMap = {
  "solid-js": SolidJs,
  "solid-js/store": SolidJsStore,
  "solid-js/web": SolidJsWeb,
  app: App,
  "acme-ui": AcmeUi,
};

/**
 * A value as the client gets it, its scripts compiled by Solid when the test
 * file was, against the modules the client provides.
 */
export async function bundle<T>(
  value: Client<T>,
): Promise<{ code: Bundle<T>; map: string }> {
  const built = await bundler.build({ input: value, modules });
  const { code, map } = built.generate({ sourcemap: "hidden" });
  return { code, map: map! };
}

/**
 * A value as the client runs it: bundled, and run by a runtime with the
 * modules the client provides. Run a drawing the
 * way Solid does, as a function it calls, which the client gets as one:
 *
 *     render(await evaluate(() => <Counter from={0} />));
 */
export async function evaluate<T extends Client<unknown> | (() => Spliceable)>(
  value: T,
): Promise<Evaluated<T>> {
  const { code } = await bundle(
    typeof value === "function" ? drawing(value()) : value,
  );
  // A runtime of its own each time, as each page load has: the same bundle
  // twice still runs twice.
  return createRuntime({ moduleMap, installedPackages: modules }).exec(
    code,
  ) as Promise<Evaluated<T>>;
}
