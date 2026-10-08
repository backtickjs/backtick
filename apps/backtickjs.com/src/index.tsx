import { toHtml } from "./html.js";
import { TEXT_FILES } from "./llms.js";
import { NOT_FOUND, PAGES, REDIRECTS } from "./pages.js";

const server = Bun.serve({
  port: 4321,
  routes: Object.fromEntries([
    ...PAGES.map((page) => [
      page.path,
      async () =>
        new Response(await toHtml(page), {
          headers: { "content-type": "text/html" },
        }),
    ]),
    ...Object.entries(REDIRECTS).map(([from, to]) => [
      from,
      () => Response.redirect(to, 301),
    ]),
    ...TEXT_FILES.map((file) => [
      file.path,
      () =>
        new Response(file.text, {
          headers: { "content-type": "text/plain; charset=utf-8" },
        }),
    ]),
  ]),
  // Anything else is a file in `public/`, as the build copies it, or the page
  // for addresses that don't exist.
  async fetch(request) {
    const file = Bun.file(
      new URL(`../public${new URL(request.url).pathname}`, import.meta.url),
    );
    return (await file.exists())
      ? new Response(file)
      : new Response(await toHtml(NOT_FOUND), {
          status: 404,
          headers: { "content-type": "text/html" },
        });
  },
});

console.log(`Preview on ${server.url}`);
