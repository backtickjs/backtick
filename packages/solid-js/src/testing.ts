import { createTesting, type Testing } from "@backtickjs/web-testing";
import { client } from "./client.js";
import type { JSX } from "./jsx-runtime.js";
import { compile } from "./transform.js";

// Testing Library for a project drawn with Solid: everything
// `@backtickjs/web-testing` offers, with `render` and `evaluate` compiling
// and running on Solid.
export * from "@backtickjs/web-testing";

const testing: Testing<JSX.Element> = createTesting(client, compile);
export const render: Testing<JSX.Element>["render"] = testing.render;
export const evaluate: Testing["evaluate"] = testing.evaluate;
export const evaluateBundle: Testing["evaluateBundle"] = testing.evaluateBundle;
