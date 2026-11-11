// What `context.render` takes at each kind of route, typechecked by
// render.test.ts: a line marked refused is an error saying what the mark
// says, and every other line typechecks.
import type { Client } from "@backtickjs/core";
import { Hono } from "hono";
import type {} from "../../dist/index.js";

declare const rootLayout: Client<() => unknown>;
declare const optionalChildren: Client<
  (props: { children?: unknown }) => unknown
>;
declare const layout: Client<(props: { children: unknown }) => unknown>;
declare const element: Client<{ readonly element: true }>;
declare const either: typeof element | typeof rootLayout;
declare const maybeProps: typeof element | typeof layout;

const app = new Hono();

app.get("/_layout", (context) => context.render(rootLayout));
app.get("/_layout", (context) => context.render(optionalChildren));
app.get("/_layout", (context) => context.render(layout)); // refused: the root /_layout is a component that takes no props
app.get("/_layout", (context) => context.render(element)); // refused: the root /_layout is a component that takes no props

app.get("/day/:n/_layout", (context) => context.render(layout));
app.get("/day/:n/_layout", async (context) => context.render(rootLayout));
app.get("/day/:n/_layout", (context) => context.render(element)); // refused: a _layout answers a component
app.get("/day/:n/_layout", (context) => context.render(either)); // refused: a _layout answers a component

app.get("/day/_loading", (context) => context.render(element));
app.get("/day/_loading", (context) => context.render(rootLayout));
app.get("/day/_loading", (context) => context.render(optionalChildren));
app.get("/day/_loading", (context) => context.render(either));
app.get("/day/_loading", (context) => context.render(layout)); // refused: a _loading answers what it draws
app.get("/day/_loading", (context) => context.render(maybeProps)); // refused: a _loading answers what it draws

// Any other route renders what splices; so does a context with no path.
app.get("/day", (context) => context.render(element));
app.get("/day", (context) => context.render(either));
app.get("/day", ({ render }) => render(either));
app.notFound((context) => context.render(either));
