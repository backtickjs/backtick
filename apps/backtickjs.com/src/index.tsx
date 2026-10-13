import { serve } from "@hono/node-server";
import { app } from "./app.js";
import { toHtml } from "./html.js";
import { NOT_FOUND } from "./pages.js";

// Anything else is a file in `public/`, as the build copies it, or the page
// for addresses that don't exist.
app.get("*", async (context) => {
  const file = Bun.file(
    new URL(`../public${new URL(context.req.url).pathname}`, import.meta.url),
  );
  return (await file.exists())
    ? new Response(file, { headers: { "content-type": file.type } })
    : context.html(await toHtml(NOT_FOUND), 404);
});

serve({ fetch: app.fetch, port: 4321 }, ({ port }) => {
  console.log(`Preview on http://localhost:${port}/`);
});
