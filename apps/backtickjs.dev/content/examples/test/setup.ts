// What the example tests run in: jsdom as the document Testing Library draws
// into, React told it's under test, and each test's drawing cleared after it.
import "global-jsdom/register";
import { cleanup } from "@testing-library/react";
import { afterEach } from "node:test";

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

afterEach(cleanup);

// jsdom has no ResizeObserver, which React Native's web build looks for as it
// loads, to report layout. Nothing the tests check depends on layout.
window.ResizeObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Loaded here, before `@backtickjs/node-plugin`, so it loads as Node loads
// it: Node 23 runs CommonJS through module hooks and breaks on its circular
// requires.
await import("react-native-web");
