import { createTesting, type Testing } from "@backtickjs/web-testing";
import * as solid from "solid-js";
import * as web from "solid-js/web";
import type { JSX } from "./jsx-runtime.js";
import { bundle } from "./bundle.js";

// Testing Library for a project drawn with Solid: everything
// `@backtickjs/web-testing` offers, with `render` and `evaluate` compiling
// and running on Solid.
export * from "@backtickjs/web-testing";

// A bundle's default export, run in a root of its own, which owns what it
// creates: evaluated, or drawn into a container.
const client = {
  evaluate<T>(run: () => T): T {
    return solid.createRoot(() => run());
  },
  render(run: () => unknown, container: Element): () => void {
    return web.render(() => run() as solid.JSX.Element, container);
  },
};

const testing: Testing<JSX.Element> = createTesting(client, bundle);
export const render: Testing<JSX.Element>["render"] = testing.render;
export const evaluate: Testing["evaluate"] = testing.evaluate;
export const evaluateBundle: Testing["evaluateBundle"] = testing.evaluateBundle;
