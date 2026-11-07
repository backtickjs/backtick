# @backtickjs/hono

[Hono](https://hono.dev) routes as [Backtick](https://backtickjs.com) screens: under `backtickRenderer()`, `context.render(<Home />)` answers a request with your server components, bundled for the modules the client that asked provides, as Hono's own `jsxRenderer()` answers with HTML. Each route is a screen, and a path on the client is the same path on the server. Hono is a peer dependency: this package is built against Hono 4.13.13, and works with any later 4.x.

## Install

```sh
npm install hono @backtickjs/hono @backtickjs/core @backtickjs/bundler
```

The [repository's README](https://github.com/backtickjs/backtick#packages) says what each package is.

## Usage

```tsx
import { cs } from "@backtickjs/core";
import { backtickApp } from "@backtickjs/hono";
import { Stack } from "expo-router" with { backtick: "client" };
import { Hono } from "hono";
import { Home } from "./Home.js";

// The root layout, around every screen: the navigator.
const RootLayout = cs`() => <$Stack />`;

const app = new Hono();

app.use(backtickApp(app, RootLayout));
app.get("/", (context) => context.render(<Home />));

export default app;
```

The Backtick app opens an app from one answer, which `backtickApp(app, RootLayout)` answers: the client code that fetches each screen and keeps it while it shows, around the app's root layout, a client component that draws its navigator, as Hono's `jsxRenderer()` takes the page's. Navigation works as in Next.js. Every route answers with what it draws, and the runtime fetches each as a query keyed by its path. A route with a `_loading` (`/day/_loading`, rendered for the path, so it can use its params) pushes as soon as that's in, at once if it was prefetched, and shows it until the route's answer is in; a navigation to one without holds the current screen until its answer is in, as expo-router's `unstable_useIsNavigating()` says, for a progress bar. Going back shows a screen as it was. `<Link prefetch>` fetches a route's loading state ahead, or its answer, without one. The root layout is the only one: what screens share is a component they draw. A client with a navigator of its own uses `backtickRenderer()` alone.

The runtime gives the app a [TanStack Query](https://tanstack.com/query) client whose query keys are paths: a query of `"/cart/items"` fetches that route, and its answer is what the route renders. For a screen whose parts load on their own, each in its own `Suspense`, and refetch on their own:

```tsx
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query" with {
  backtick: "client",
};

const Part = cs`(props: { path: string }) =>
  $useSuspenseQuery({ queryKey: [props.path] }).data as ReactNode`;

const Cart = cs`() => {
  const queryClient = $useQueryClient();
  return (
    <>
      <$Suspense fallback={<$ActivityIndicator />}>
        <$Part path="/cart/items" />
      </$Suspense>
      <$Button
        title="Refresh"
        onPress={() =>
          queryClient.invalidateQueries({ queryKey: ["/cart/items"] })
        }
      />
    </>
  );
}`;
app.get("/cart", (context) => context.render(cs`<$Cart />`));
```

The client sends its modules, each at its package's version, in `x-backtick-modules` (in an Expo app, `modulesOf` from `@backtickjs/core` writes them). The answer is the screen's bundle as CommonJS, `text/javascript`, for the client to run with `execRoot`.

A client without a module the screen needs gets a `426`, and any other refusal of the bundler's a `400`, each with `{ name, message }` as JSON: the client can show why. An error your server components throw passes through to Hono.
