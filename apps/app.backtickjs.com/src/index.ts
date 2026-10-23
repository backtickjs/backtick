// app.backtickjs.com's Vercel Function: the Backtick app's own screens, from
// apps/shell/server, where the phone fetches them, at their own paths.
// Compiled by `tspc` first: they're Backtick scripts.
import { waitUntil } from "@vercel/functions";
import { Hono } from "hono";
import { app as screens } from "../shell/dist/index.js";

const app = new Hono();

// A signed-in phone at its home is about to open an app: its sandbox starts
// now, in the background, so that open doesn't wait for it.
app.use("/", async (c, next) => {
  const authorization = c.req.header("authorization");
  if (authorization !== undefined) {
    waitUntil(
      fetch("https://api.backtickjs.com/warm", {
        method: "POST",
        headers: { authorization },
      }),
    );
  }
  await next();
});

app.route("/", screens);

export default app;
