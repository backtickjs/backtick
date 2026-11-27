import { Hono } from "hono";
import { toHtml } from "./html.js";
import { LLMS_FULL_TXT, LLMS_TXT } from "./llms.js";
import { markdownPathOf, NOT_FOUND, urlOf } from "./pages.js";
import { DOCS_PAGES } from "./pages/Docs.js";
import { Home } from "./pages/Home.js";

// The site's routes, as Vercel's function and the preview serve them.
export const app = new Hono();

// Kept by Vercel's CDN until the next deploy, which clears it: the pages
// change only then. Browsers check again each time.
app.use(async (context, next) => {
  await next();
  context.header("cache-control", "public, max-age=0, s-maxage=31536000");
});

app.get("/", async (context) =>
  context.html(
    await toHtml({
      path: "/",
      Page: Home,
      title: "Backtick · Fully server-driven React Native",
      description:
        "Fully server-driven React Native. Write every screen in React, on" +
        " your server: layout, data and behaviour. Changes ship with" +
        " your next deploy, not your next app store release.",
    }),
  ),
);

// The docs, in the sidebar's order (see pages/Docs.tsx), each also as its
// Markdown, for agents.
for (const page of DOCS_PAGES) {
  app.get(page.path, async (context) => context.html(await toHtml(page)));
  app.get(markdownPathOf(page.path), (context) => context.text(page.markdown));
}

app.get("/react-summit-talk", (context) =>
  context.redirect(
    "https://gitnation.com/contents/vibe-code-react-native-apps-from-your-phone-no-computer-needed",
    302,
  ),
);

app.get("/llms.txt", (context) => context.text(LLMS_TXT));
app.get("/llms-full.txt", (context) => context.text(LLMS_FULL_TXT));

// What search engines read: every page.
app.get("/sitemap.xml", (context) => {
  const urls = app.routes
    .filter(({ method, path }) => method === "GET" && path.endsWith("/"))
    .map(({ path }) => `  <url><loc>${urlOf(path)}</loc></url>`);
  return context.body(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`,
    200,
    { "content-type": "application/xml" },
  );
});

app.get("/robots.txt", (context) =>
  context.text(`User-agent: *
Allow: /

Sitemap: ${urlOf("/")}sitemap.xml
`),
);

app.notFound(async (context) => context.html(await toHtml(NOT_FOUND), 404));
