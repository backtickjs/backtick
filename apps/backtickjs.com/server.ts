// backtickjs.com's Vercel Function: the site's routes, as the build compiles
// them into dist/. Vercel serves public/ itself.
import type { Hono } from "hono";
import { app } from "./dist/app.js";

export default app satisfies Hono;
