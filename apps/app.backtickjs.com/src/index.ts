// app.backtickjs.com's Vercel Function: Backtick's own screens on the phone,
// the shell's server (`shell/screens`), at their own paths.
import { Hono } from "hono";
import { app as screens } from "shell/screens";

const app = new Hono();

app.route("/", screens);

export default app;
