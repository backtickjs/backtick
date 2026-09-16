// The test environment: jsdom as the global document and window, the way
// Testing Library expects to find them, and `cleanup` after every test.
//
// Preloaded with `--import`, so the document exists before
// `@testing-library/dom` is first imported, and every test file shares it.
import "global-jsdom/register";
import { afterEach } from "node:test";
import { cleanup } from "@backtickjs/web-testing";

afterEach(cleanup);
