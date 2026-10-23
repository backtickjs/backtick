// app.backtickjs.com's Vercel Function: the Backtick app's own screens, from
// apps/mobile/server, where the phone fetches them, at their own paths.
// Compiled by `tspc` first: they're Backtick scripts.
import { Hono } from "hono";
import { app as screens } from "../mobile/dist/index.js";

const app = new Hono();

app.route("/", screens);

export default app;
