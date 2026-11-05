import { Hono } from "hono";
import { toHtml } from "./html.js";
import { NOT_FOUND, urlOf } from "./pages.js";
import { Download } from "./pages/Download.js";
import { Help } from "./pages/Help.js";
import { Home } from "./pages/Home.js";
import { Privacy } from "./pages/Privacy.js";
import { Support } from "./pages/Support.js";
import { Terms } from "./pages/Terms.js";

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
      title: "Backtick · Build native apps with AI, all from your phone",
      description:
        "Ask Claude for an app, and it runs natively on your phone, in the" +
        " Backtick app.",
    }),
  ),
);

app.get("/download/", async (context) =>
  context.html(
    await toHtml({
      path: "/download/",
      Page: Download,
      title: "Backtick · Download",
      description: "Get the Backtick app for iPhone and Android.",
    }),
  ),
);

app.get("/help/", async (context) =>
  context.html(
    await toHtml({
      path: "/help/",
      Page: Help,
      title: "Backtick · Help",
      description:
        "How to make apps with Claude and Backtick, and what to do when" +
        " something doesn't work.",
    }),
  ),
);

app.get("/support/", async (context) =>
  context.html(
    await toHtml({
      path: "/support/",
      Page: Support,
      title: "Backtick · Support",
      description: "Help with the Backtick app and the apps you make with it.",
    }),
  ),
);

app.get("/privacy/", async (context) =>
  context.html(
    await toHtml({
      path: "/privacy/",
      Page: Privacy,
      title: "Backtick · Privacy policy",
      description:
        "What Backtick collects, how it's used, who handles it, and your" +
        " choices.",
    }),
  ),
);

app.get("/terms/", async (context) =>
  context.html(
    await toHtml({
      path: "/terms/",
      Page: Terms,
      title: "Backtick · Terms of service",
      description:
        "The terms for using Backtick and the apps you make with it.",
    }),
  ),
);

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
