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

const app = new Hono();

app.use(backtickApp(app));
// The root layout, around every screen: the navigator.
app.get("/_layout", (context) => context.render(cs`() => <$Stack />`));
app.get("/", (context) => context.render(<Home />));

export default app;
```

The Backtick app opens an app from one answer, which `backtickApp(app)` answers: the client code that fetches each screen and keeps it while it shows. Navigation works as in Next.js, whose folders are routes here. `/_layout` is the root layout, a client component that draws the navigator; unlike Next.js's, it takes no `children`, as the navigator renders the screens. An app without one gets a plain Stack, `` cs`() => <$Stack />` ``, as every other layout is optional. A screen is each segment's `_layout` (`/day/:id/_layout`, rendered for its path, answering a client component given `children`), around its `_loading` while what's under it loads, around the page. A page answers what it draws: an element, or a component that takes no props; one that takes props is refused when it's drawn, as a page can't be given them. A loading state takes no params, as in Next.js: it's fetched once for its pattern, and reading a param throws; what depends on the path, such as the title, goes in a `_layout`. Every link fetches ahead what its screen needs to show, its layouts down to its first loading state and that loading state, as Next.js's `Link` prefetches; `<Link prefetch>` adds the page, and `router.prefetch(href)` fetches as a link does. A navigation pushes once those are in, at once if they were fetched ahead; with no loading state, it holds the current screen until all of it is in, as expo-router's `unstable_useIsNavigating()` says, for a progress bar. Going back shows a screen as it was. A client with a navigator of its own uses `backtickRenderer()` alone.

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
