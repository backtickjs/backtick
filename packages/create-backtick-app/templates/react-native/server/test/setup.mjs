// What `npm test` runs in: jsdom as the document Testing Library draws into,
// React told it's under test, and each test's drawing cleared after it.
import "global-jsdom/register";
import { cleanup } from "@testing-library/react";
import { afterEach } from "node:test";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

afterEach(cleanup);

// jsdom has no ResizeObserver, which React Native's web build looks for as it
// loads, to report layout.
window.ResizeObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Loaded before `@backtickjs/node-plugin`, so Node loads it as plain
// CommonJS.
await import("react-native-web");
