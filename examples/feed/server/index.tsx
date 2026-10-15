import { serve } from "@hono/node-server";
import { app } from "./app.js";

// On the port it's given: `backtick-dev`, in development, gives it one behind
// http://localhost:3000.
serve({ fetch: app.fetch, port: Number(process.env.PORT ?? 3000) });
