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
import { backtick, type RootLayoutProps } from "@backtickjs/hono";
import { Stack } from "expo-router" with { backtick: "client" };
import { type ReactNode, Suspense, use } from "react" with {
  backtick: "client",
};
import { Hono } from "hono";
import { Home } from "./Home.js";

// Keeps the screen on top until the next one arrives.
const HoldScreen = cs`(props: { navigating?: Promise<void>; children: ReactNode }) => {
  if (props.navigating) $use(props.navigating);
  return props.children;
}`;

// Around every screen, as expo-router's app/_layout.tsx.
const RootLayout = cs`(props: RootLayoutProps) => (
  <$Suspense fallback={null}>
    <$HoldScreen navigating={props.navigating}>
      <$Stack />
    </$HoldScreen>
  </$Suspense>
)`;

const app = new Hono();

app.use(backtick({ rootLayout: RootLayout }));
app.get("/", (context) => context.render(<Home />));

export default app;
```

`rootLayout` is the app's root layout: a client component rendered once as the app opens, around every screen, which renders its navigator. The Backtick app fetches it at `/.well-known/backtick/root-layout`, and passes it `navigating`, the screen a navigation is loading. The root layout owns the transition between screens: `use()` it inside its own `Suspense` to keep the current screen until the next arrives, and put anything that should update meanwhile, such as a progress bar, outside it. A client with a navigator of its own never fetches it.

The client sends its modules, each at its package's version, in `x-backtick-modules` (in an Expo app, `modulesOf` from `@backtickjs/core` writes them). The answer is the screen's bundle as CommonJS, `text/javascript`, for the client to run with `execRoot`.

A client without a module the screen needs gets a `426`, and any other refusal of the bundler's a `400`, each with `{ name, message }` as JSON: the client can show why. An error your server components throw passes through to Hono.
