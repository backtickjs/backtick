import { serve } from "@hono/node-server";
import { app } from "./app.js";

// 3000 unless PORT says otherwise, as a host such as Cloud Run does.
const port = Number(process.env.PORT ?? 3000);
serve({ fetch: app.fetch, port }, () => {
  console.log(`MyStoryJar server on http://localhost:${port}`);
});
