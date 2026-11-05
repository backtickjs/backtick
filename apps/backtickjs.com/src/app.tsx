import { Hono } from "hono";
import { toHtml } from "./html.js";
import { DOCS_ORIGIN, NOT_FOUND, urlOf } from "./pages.js";
import { Download } from "./pages/Download.js";
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
      title: "Backtick · Build apps with AI, on your phone",
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

// The framework's docs moved to backtickjs.dev: their old addresses go there,
// at the same paths.
app.get("/docs", (context) => context.redirect(`${DOCS_ORIGIN}/docs/`, 301));
app.get("/docs/*", (context) =>
  context.redirect(DOCS_ORIGIN + context.req.path, 301),
);
app.get("/llms.txt", (context) =>
  context.redirect(`${DOCS_ORIGIN}/llms.txt`, 301),
);
app.get("/llms-full.txt", (context) =>
  context.redirect(`${DOCS_ORIGIN}/llms-full.txt`, 301),
);

// The app's page was here before it was the home page.
app.get("/app/", (context) => context.redirect("/", 301));

// What search engines read: every page.
app.get("/sitemap.xml", (context) => {
  const urls = ["/", "/download/", "/support/", "/privacy/", "/terms/"].map(
    (path) => `  <url><loc>${urlOf(path)}</loc></url>`,
  );
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
