import { toHtml } from "./html.js";
import { PAGES } from "./pages.js";

const server = Bun.serve({
  port: 4321,
  routes: Object.fromEntries(
    PAGES.map(({ path, Page, title }) => [
      path,
      async () =>
        new Response(await toHtml(Page, title), {
          headers: { "content-type": "text/html" },
        }),
    ]),
  ),
  // Anything else is a file in `public/`, as the build copies it.
  async fetch(request) {
    const file = Bun.file(
      new URL(`../public${new URL(request.url).pathname}`, import.meta.url),
    );
    return (await file.exists())
      ? new Response(file)
      : new Response("Not found", { status: 404 });
  },
});

console.log(`Preview on ${server.url}`);
