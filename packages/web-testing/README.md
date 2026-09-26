# @backtickjs/web-testing

Testing Library for Backtick on the web, in the shape of
[React Testing Library](https://testing-library.com/docs/react-testing-library/api).
`render` bundles an element and draws it into the test environment's
document, and every query from `@testing-library/dom` reads the result.

An adapter binds `render` and `evaluate` to its client and transform, and
re-exports the rest, so a test imports from the adapter:

```tsx
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, screen } from "@backtickjs/solid-js/testing";
import { userEvent } from "@testing-library/user-event";

async function Counter() {
  return cs`{
    const [count, setCount] = $createSignal(0);
    return (
      <div>
        <button onclick={() => setCount(count() + 1)}>Add</button>
        <p>{"Count: " + count()}</p>
      </div>
    );
  }`;
}

test("increments the counter", async () => {
  await render(<Counter />);
  await userEvent.click(screen.getByRole("button", { name: /add/i }));
  expect(screen.getByText("Count: 1")).toBeTruthy();
});
```

## Setup

A test file that holds components and `cs` scripts has to be compiled by
Backtick, as an app's source is: `@backtickjs/bun-plugin` does it for Bun, and
`@backtickjs/tspatch-plugin` for a `tspc` build. No Vite plugin or Jest
transform is packaged yet. For `node:test`, a module hook that runs `.tsx`
files through the compiler does it; this repository's `tests/test/tsxHooks.ts`
is one.

web-testing brings no DOM of its own. Your test runner provides one, as it
does for React Testing Library, and `cleanup` has to run after each test.

**Jest**: set `testEnvironment: "jsdom"`. `cleanup` registers itself on Jest's
global `afterEach`.

**Vitest**:

```ts
// vitest.config.ts
export default defineConfig({
  test: { environment: "jsdom", globals: true },
});
```

With `globals: false`, call `afterEach(cleanup)` in a setup file instead.

**Bun**: install `jsdom` and `global-jsdom`, then preload a setup file after
`@backtickjs/bun-plugin`:

```toml
# bunfig.toml
[test]
preload = ["@backtickjs/bun-plugin", "./test/setup.ts"]
```

```ts
// test/setup.ts
import "global-jsdom/register";
import { afterEach } from "bun:test";

// Loaded once jsdom is registered: Testing Library binds `screen` on import,
// and Bun runs a CommonJS import before the imports written above it.
const { cleanup } = await import("@backtickjs/solid-js/testing");
afterEach(cleanup);
```

**`node:test`**: install `jsdom` and `global-jsdom`, then preload a setup file:

```ts
// test/setup.ts
import "global-jsdom/register";
import { afterEach } from "node:test";
import { cleanup } from "@backtickjs/solid-js/testing";

afterEach(cleanup);
```

```sh
node --import ./test/setup.ts --test
```

It has to be preloaded with `--import`: `@testing-library/dom` binds `screen`
to the document the first time it is imported.

To turn automatic cleanup off, import `@backtickjs/web-testing/pure` or set
`BACKTICK_SKIP_AUTO_CLEANUP`.

## API

- `render(element, options?)`: draws an element, or a script that evaluates to
  one (`Spliceable<BacktickElement>`), and resolves to `container`,
  `baseElement`, `rerender`, `unmount`, `asFragment`, `debug` and the queries.
  Options are `container`, `baseElement` and `queries`. It is async, because
  bundling is, and so is `rerender`.
- `evaluate(value)`: resolves to what any value or script
  evaluates to, without mounting it. It plays the part of React Testing Library's
  `renderHook`.
- `evaluateBundle(code)`: evaluates a hand-written bundle, for a bundle the
  bundler would never write.
- `cleanup()`: takes down everything `render` drew.
- `createTesting(client, transform)`: `render`, `evaluate` and
  `evaluateBundle` bound to an adapter's client and transform, which is what
  an adapter's testing entry exports.

- Everything from `@testing-library/dom`: `screen`, `within`, `fireEvent`,
  `waitFor`, and the rest.

Use `@testing-library/user-event` for interactions.
