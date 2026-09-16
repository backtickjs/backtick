# @backtickjs/web-testing

Testing Library for Backtick on the web, in the shape of
[React Testing Library](https://testing-library.com/docs/react-testing-library/api).
`render` bundles a value and draws it into the test environment's document,
and every query from `@testing-library/dom` reads the result.

```ts
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";

test("increments the counter", async () => {
  await render(<Counter />);
  await userEvent.click(screen.getByRole("button", { name: /add/i }));
  expect(screen.getByText("Count: 1")).toBeTruthy();
});
```

## Setup

web-testing brings no DOM of its own. Your test runner provides one, as it
does for React Testing Library. Two more things must hold: Solid has to resolve
to its browser build, and `cleanup` has to run after each test.

**Jest**: set `testEnvironment: "jsdom"`. The jsdom environment resolves the
`browser` export condition, and `cleanup` registers itself on Jest's global
`afterEach`.

**Vitest**:

```ts
// vitest.config.ts
export default defineConfig({
  resolve: { conditions: ["browser"] },
  test: { environment: "jsdom", globals: true },
});
```

With `globals: false`, call `afterEach(cleanup)` in a setup file instead.

**`node:test`**: install `jsdom` and `global-jsdom`, then preload a setup file:

```ts
// test/setup.ts
import "global-jsdom/register";
import { afterEach } from "node:test";
import { cleanup } from "@backtickjs/web-testing";

afterEach(cleanup);
```

```sh
node --conditions=browser --import ./test/setup.ts --test
```

It has to be preloaded with `--import`: `@testing-library/dom` binds `screen`
to the document the first time it is imported.

To turn automatic cleanup off, import `@backtickjs/web-testing/pure` or set
`BACKTICK_SKIP_AUTO_CLEANUP`.

## API

- `render(value, options?)`: draws `value` and resolves to `container`,
  `baseElement`, `rerender`, `unmount`, `asFragment`, `debug` and the queries.
  Options are `container`, `baseElement`, `queries` and `builtinOf`. It is
  async, because bundling is.
- `evaluate(value, { builtinOf? })`: resolves to what `value` evaluates to,
  without mounting it. It plays the part of React Testing Library's
  `renderHook`.
- `evaluateUntrustedBundle(bundle)`: evaluates a hand-written bundle. For
  security tests only.
- `cleanup()`: takes down everything `render` drew.
- Everything from `@testing-library/dom`: `screen`, `within`, `fireEvent`,
  `waitFor`, and the rest.

Use `@testing-library/user-event` for interactions.
