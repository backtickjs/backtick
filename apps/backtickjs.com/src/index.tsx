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
});

console.log(`Preview on ${server.url}`);
