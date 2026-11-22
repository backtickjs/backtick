# @backtickjs/react-query

[Backtick](https://backtickjs.com) in your React or React Native app: `<Backtick href>` draws what your server renders at a path, inside your own screens and navigation. It runs on [TanStack Query](https://tanstack.com/query), so answers share your app's query client, cache and devtools.

The [repository's README](https://github.com/backtickjs/backtick#packages) says what each package is.

## Install

```sh
npm install @backtickjs/react-query @tanstack/react-query
```

## Usage

Make the client once, outside React, and hand it to a provider inside your app's `QueryClientProvider`. `<Backtick href>` suspends to the nearest `<Suspense>` until the answer is in, and throws to the nearest error boundary if it can't be fetched or run:

```tsx
import * as BacktickReactQuery from "@backtickjs/react-query";
import { Backtick, BacktickClient, BacktickProvider } from "@backtickjs/react-query";

const backtick = new BacktickClient({
  origin: "https://api.example.com",
  moduleMap: { react: React, "@backtickjs/react-query": BacktickReactQuery, … },
  installedPackages,
});

<QueryClientProvider client={queryClient}>
  <BacktickProvider client={backtick}>
    <ErrorBoundary fallback={<Text>Couldn't load</Text>}>
      <Suspense fallback={<ActivityIndicator />}>
        <Backtick href="/feed" />
      </Suspense>
    </ErrorBoundary>
  </BacktickProvider>
</QueryClientProvider>;
```

- Answers live in your `QueryClient`, beside your other queries and in its devtools. `backtick.queryOptions(href)` is the query `<Backtick>` runs, for `useQuery`, `prefetchQuery` and the like; to fetch a screen again, `queryClient.invalidateQueries({ queryKey: backtick.queryOptions("/feed").queryKey })`.
- An answer is always the latest copy: views of the same `href` share one request, and the next view fetches again, except within a second of the last one, which TanStack's suspense mode keeps. Coming back to the app doesn't refetch, so a screen never changes under the user.
- A request that brings back no answer throws a `BacktickError`: its `name` is the server's for a refusal (`ClientVersionMismatch` when the app lacks a module the screen needs), `NotABundle` for what isn't a Backtick route, and it has no `response` when the server couldn't be reached. Only that and a server error (5xx) are retried; a refusal, or an answer that throws, goes to the error boundary at once.
- `backtick.fetch(href, init?)` fetches and runs an answer outside React. The `fetch` option replaces the transport: anything that answers a `Request` with a `Response`, for auth headers or a proxy.
- One import for React Native and the web. Answers are CommonJS on both, run with `new Function` against your module map, so they use your app's own copy of React and of every module. A web page with a Content-Security-Policy needs `'unsafe-eval'` in `script-src`.
- The module map lists `@backtickjs/react-query` itself, the copy your app imports, so a script in an answer reaches the client with `useBacktickClient()`. Without it, `new BacktickClient` doesn't typecheck.

## License

MIT
