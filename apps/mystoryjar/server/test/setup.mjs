// What `npm test` runs in: jsdom as the document Testing Library draws into,
// React told it's under test, and each test's drawing cleared after it.
import "global-jsdom/register";
import { cleanup } from "@testing-library/react";
import { afterEach } from "node:test";

// Node 24 or later, as `pnpm start` asks: Node 23's module hooks, which the
// Backtick loader uses, break firebase-admin's auth, pdfkit and semver.
if (Number(process.versions.node.split(".")[0]) < 24) {
  console.error(
    `MyStoryJar needs Node 24 or later, and this is Node ${process.versions.node}: nvm install 24`,
  );
  process.exit(1);
}

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

// The key the server signs sessions with, from its environment.
process.env.SESSION_SECRET ??= "test";

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
