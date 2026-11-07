# @backtickjs/hono

[Hono](https://hono.dev) routes as [Backtick](https://backtickjs.com) screens: under `backtick()`, `context.render(<Home />)` answers a request with your server components, bundled for the modules the client that asked provides, as Hono's own `jsxRenderer()` answers with HTML. Each route is a screen, and a path on the client is the same path on the server. Hono is a peer dependency: this package is built against Hono 4.13.13, and works with any later 4.x.

## Install

```sh
npm install hono @backtickjs/hono @backtickjs/core @backtickjs/bundler
```

The [repository's README](https://github.com/backtickjs/backtick#packages) says what each package is.

## Usage

```tsx
import { cs } from "@backtickjs/core";
import { backtick } from "@backtickjs/hono";
import { Stack } from "expo-router" with { backtick: "client" };
import { Hono } from "hono";
import { Home } from "./Home.js";

// The root layout, around every screen: the navigator.
const RootLayout = cs`() => <$Stack />`;

const app = new Hono();

app.use(backtick(app));
app.get("/_layout", (context) => context.render(RootLayout));
app.get("/", (context) => context.render(<Home />));

export default app;
```

The Backtick app opens an app with two answers, fetched together: its `/_layout` route, the app's root layout, a client component rendered once as the app opens, around every screen, which renders its navigator; and the client code that fetches each screen and keeps it while it shows, which `backtick()` sends from `/.well-known/backtick/runtime`. Navigation works as in Next.js. A screen is drawn inside the layouts of its path and its parents' (`/day/_layout`): client components that take the screen as `children`, which the server renders for the path, so they can use its params. A route with a `_loading` (`/day/_loading`), a client component without props, answers at once, with its layouts and the loading state, and the phone then fetches the screen itself. A navigation to a route without one holds the current screen until the next is in, and expo-router's `unstable_useIsNavigating()` says so meanwhile, for a progress bar. `backtick(app)` asks `app` for these routes, in-process, as a screen is requested. `<Link prefetch>` fetches a route's answer ahead, so its navigation shows it at once: for a route with a `_loading`, its layouts and loading state, and the screen once it's shown. Unlike Next.js's, layouts are drawn again for each screen pushed. A client with a navigator of its own needs neither.

`Route` draws another route's answer inside a screen, alone, without its layouts or loading state: for a screen whose parts load on their own. It suspends to the nearest `Suspense` while it loads, and throws to the nearest error boundary if it fails.

```tsx
import { Route } from "@backtickjs/hono";

app.get("/cart", (context) =>
  context.render(cs`
    <$Suspense fallback={<$ActivityIndicator />}>
      {${(<Route href="/cart/items" />)}}
    </$Suspense>
  `),
);
```

The client sends its modules, each at its package's version, in `x-backtick-modules` (in an Expo app, `modulesOf` from `@backtickjs/core` writes them). The answer is the screen's bundle as CommonJS, `text/javascript`, for the client to run with `execRoot`.

A client without a module the screen needs gets a `426`, and any other refusal of the bundler's a `400`, each with `{ name, message }` as JSON: the client can show why. An error your server components throw passes through to Hono.
