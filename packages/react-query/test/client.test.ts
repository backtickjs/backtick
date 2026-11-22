import "global-jsdom/register";
import assert from "node:assert/strict";
import { test } from "node:test";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { act, createElement, Suspense } from "react";
import { createRoot } from "react-dom/client";
import * as BacktickReactQuery from "../dist/index.js";
import {
  Backtick,
  BacktickClient,
  BacktickError,
  BacktickProvider,
  useBacktickClient,
} from "../dist/index.js";

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

const installedPackages = {
  react: "19.2.3",
  "@backtickjs/react-query": "0.5.2",
};

const bundle = (code: string) =>
  new Response(`module.exports = ${code};`, {
    headers: { "content-type": "text/javascript" },
  });

// A server answering each path with a CommonJS bundle of what `answers`
// holds for it, counting its requests: what render answers, written out.
function server(answers: Record<string, string>) {
  const requests: Request[] = [];
  const fetch = async (request: Request) => {
    requests.push(request);
    return bundle(answers[new URL(request.url).pathname]!);
  };
  return { requests, fetch };
}

function client(fetch: (request: Request) => Promise<Response>) {
  return new BacktickClient({
    origin: "https://api.test",
    moduleMap: { react: React, "@backtickjs/react-query": BacktickReactQuery },
    installedPackages,
    fetch,
  });
}

// Shows what a view throws, as an app's error boundary would.
class Boundary extends React.Component<
  { children?: React.ReactNode },
  { error?: unknown }
> {
  override state: { error?: unknown } = {};
  static getDerivedStateFromError(error: unknown) {
    return { error };
  }
  override render() {
    return this.state.error === undefined
      ? this.props.children
      : `failed: ${String(this.state.error)}`;
  }
}

// Draws `element` as an app would: its own query client, the provider, an
// error boundary and a `<Suspense>`.
async function draw(
  backtick: BacktickClient,
  element: React.ReactNode,
  queryClient = new QueryClient(),
) {
  const container = document.createElement("div");
  const root = createRoot(container);
  const show = (next: React.ReactNode) =>
    act(async () =>
      root.render(
        createElement(
          QueryClientProvider,
          { client: queryClient },
          createElement(
            BacktickProvider,
            { client: backtick },
            createElement(
              Boundary,
              null,
              createElement(Suspense, { fallback: "loading" }, next),
            ),
          ),
        ),
      ),
    );
  await show(element);
  return { container, show, unmount: () => act(async () => root.unmount()) };
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

test("fetch sends what the app can run to the href under the origin", async () => {
  const { requests, fetch } = server({ "/answer": "40 + 2" });
  assert.equal(await client(fetch).fetch("/answer"), 42);
  assert.equal(requests[0]!.url, "https://api.test/answer");
  assert.deepEqual(
    JSON.parse(requests[0]!.headers.get("x-backtick-modules")!),
    installedPackages,
  );
});

test("a refusal is a BacktickError with the server's name and message", async () => {
  const refused = Response.json(
    { name: "ClientVersionMismatch", message: "Can't import `Image`" },
    { status: 406 },
  );
  await assert.rejects(
    client(async () => refused).fetch("/"),
    (error) =>
      error instanceof BacktickError &&
      error.name === "ClientVersionMismatch" &&
      error.response?.status === 406 &&
      /406: Can't import `Image`/.test(error.message),
  );
});

test("what isn't a bundle is a NotABundle", async () => {
  const page = new Response("<html></html>", {
    headers: { "content-type": "text/html" },
  });
  await assert.rejects(
    client(async () => page).fetch("/"),
    (error) =>
      error instanceof BacktickError &&
      error.name === "NotABundle" &&
      /answered text\/html, not a bundle: is it a Backtick route\?/.test(
        error.message,
      ),
  );
});

test("a server it can't reach is a BacktickError without a response", async () => {
  const down = new TypeError("fetch failed");
  await assert.rejects(
    client(async () => {
      throw down;
    }).fetch("/"),
    (error) =>
      error instanceof BacktickError &&
      error.response === undefined &&
      error.cause === down,
  );
});

test("a view suspends until its answer is in, then draws it", async () => {
  let resolve!: (response: Response) => void;
  const backtick = client(() => new Promise((done) => (resolve = done)));
  const { container, unmount } = await draw(
    backtick,
    createElement(Backtick, { href: "/hello" }),
  );
  assert.equal(container.textContent, "loading");
  await act(async () => resolve(bundle('"hello"')));
  assert.equal(container.textContent, "hello");
  await unmount();
});

test("answers go in the app's query client", async () => {
  const queryClient = new QueryClient();
  const backtick = client(server({ "/hello": '"hello"' }).fetch);
  const { unmount } = await draw(
    backtick,
    createElement(Backtick, { href: "/hello" }),
    queryClient,
  );
  assert.equal(
    queryClient.getQueryData(backtick.queryOptions("/hello").queryKey),
    "hello",
  );
  await unmount();
});

test("two views of one href share one request", async () => {
  const { requests, fetch } = server({ "/hello": '"hello"' });
  const { container, unmount } = await draw(client(fetch), [
    createElement(Backtick, { key: "a", href: "/hello" }),
    createElement(Backtick, { key: "b", href: "/hello" }),
  ]);
  assert.equal(container.textContent, "hellohello");
  assert.equal(requests.length, 1);
  await unmount();
});

test("the next view a second after the last one unmounts fetches again", async () => {
  const queryClient = new QueryClient();
  const { requests, fetch } = server({ "/hello": '"hello"' });
  const backtick = client(fetch);
  const element = createElement(Backtick, { href: "/hello" });
  const first = await draw(backtick, element, queryClient);
  await first.unmount();
  // TanStack keeps a suspended query at least 1 s
  await wait(1100);
  const second = await draw(backtick, element, queryClient);
  assert.equal(second.container.textContent, "hello");
  assert.equal(requests.length, 2);
  await second.unmount();
});

test("a view whose href changes draws the new one", async () => {
  const backtick = client(server({ "/one": '"one"', "/two": '"two"' }).fetch);
  const { container, show, unmount } = await draw(
    backtick,
    createElement(Backtick, { href: "/one" }),
  );
  assert.equal(container.textContent, "one");
  await show(createElement(Backtick, { href: "/two" }));
  assert.equal(container.textContent, "two");
  await unmount();
});

test("invalidating the query fetches again for the views showing it, once", async () => {
  const queryClient = new QueryClient();
  let count = 0;
  const backtick = client(async () => {
    count += 1;
    return bundle(`"version ${count}"`);
  });
  const { container, show, unmount } = await draw(
    backtick,
    createElement(Backtick, { href: "/hello" }),
    queryClient,
  );
  assert.equal(container.textContent, "version 1");
  await act(async () => {
    await queryClient.invalidateQueries({
      queryKey: backtick.queryOptions("/hello").queryKey,
    });
    // TanStack tells its views on the next tick
    await wait(0);
  });
  assert.equal(container.textContent, "version 2");
  // The view keeps the new answer: a render later doesn't fetch it again.
  await show(createElement(Backtick, { href: "/hello" }));
  assert.equal(count, 2);
  await unmount();
});

for (const [what, answer] of [
  [
    "a refusal",
    async () =>
      Response.json(
        { name: "ClientVersionMismatch", message: "update the app" },
        { status: 406 },
      ),
  ],
  [
    "an answer that throws",
    async () => bundle('(() => { throw new Error("update the app"); })()'),
  ],
] as const) {
  test(`${what} goes to the error boundary at once, not retried`, async () => {
    let count = 0;
    const backtick = client(async () => {
      count += 1;
      return answer();
    });
    const error = console.error;
    console.error = () => {};
    try {
      const { container, unmount } = await draw(
        backtick,
        createElement(Backtick, { href: "/hello" }),
      );
      assert.match(container.textContent!, /^failed: .*update the app/);
      assert.equal(count, 1);
      await unmount();
    } finally {
      console.error = error;
    }
  });
}

test("useBacktickClient names the provider it needs", async () => {
  let caught: unknown;
  function Probe() {
    try {
      useBacktickClient();
    } catch (error) {
      caught = error;
    }
    return null;
  }
  const root = createRoot(document.createElement("div"));
  await act(async () => root.render(createElement(Probe)));
  assert.match(String(caught), /needs a <BacktickProvider> above it/);
  await act(async () => root.unmount());
});

test("BacktickProvider names the QueryClientProvider it needs", async () => {
  const { fetch } = server({});
  const container = document.createElement("div");
  // the boundary shows the error; React needn't log it too
  const root = createRoot(container, { onCaughtError: () => {} });
  await act(async () =>
    root.render(
      createElement(
        Boundary,
        null,
        createElement(BacktickProvider, { client: client(fetch) }),
      ),
    ),
  );
  assert.match(
    container.textContent!,
    /needs a <QueryClientProvider> above it/,
  );
  await act(async () => root.unmount());
});
