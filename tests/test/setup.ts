// The test environment: jsdom as the global document and window, the way
// Testing Library expects to find them, `cleanup` after every test, and `.tsx`
// test files compiled by Backtick.
//
// Preloaded with `--import`, so the document exists before
// `@testing-library/dom` is first imported, and every test file shares it.
import "global-jsdom/register";
import { register } from "node:module";
import { afterEach } from "node:test";

register("./tsxHooks.ts", import.meta.url);

// Imported once the hooks are in place, so it, like everything after it, gets
// Solid's DOM build rather than its server one.
const { cleanup } = await import("@solidjs/testing-library");
afterEach(cleanup);
