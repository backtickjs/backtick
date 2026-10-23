// app.backtickjs.com's Vercel Function: Backtick's own screens on the phone,
// the shell's server (`shell/screens`), at their own paths.
import { waitUntil } from "@vercel/functions";
import { Hono } from "hono";
import { app as screens } from "shell/screens";

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
