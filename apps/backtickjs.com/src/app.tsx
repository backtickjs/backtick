import { Hono } from "hono";
import { appendTrailingSlash } from "hono/trailing-slash";
import { toHtml } from "./html.js";
import { IPHONE, NOT_FOUND, urlOf } from "./pages.js";
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

// Every page's address ends in a slash: one without it, which would be a
// 404, redirects to the page.
app.use(appendTrailingSlash());

// What search engines read about Backtick as data: the company, and the free
// iPhone app it makes. backtickjs.dev, the framework's site, is the same
// company.
const ORGANIZATION = urlOf("/#organization");
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION,
      name: "Backtick",
      url: urlOf("/"),
      logo: urlOf("/apple-touch-icon.png"),
      sameAs: ["https://backtickjs.dev/", IPHONE],
    },
    {
      "@type": "MobileApplication",
      name: "Backtick: Make Apps with AI",
      operatingSystem: "iOS",
      applicationCategory: "DeveloperApplication",
      publisher: { "@id": ORGANIZATION },
      installUrl: IPHONE,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
  ],
};

app.get("/", async (context) =>
  context.html(
    await toHtml({
      path: "/",
      Page: Home,
      structuredData: STRUCTURED_DATA,
      preloadImage: "/thornvale.webp",
      title: "Backtick · Build React Native apps with AI",
      description:
        "Claude builds a React Native app. Backtick runs it on your" +
        " phone. Free: no subscription, no credits.",
    }),
  ),
);

app.get("/support/", async (context) =>
  context.html(
    await toHtml({
      path: "/support/",
      Page: Support,
      title: "Backtick · Support",
      description:
        "How to make apps with Claude and Backtick, what to do when" +
        " something doesn't work, and how to reach us.",
    }),
  ),
);

// Help was its own page, which the Claude connector's listing links to. As
// `all`, not `get`, so the sitemap, which lists GET routes, leaves it out.
app.all("/help/", (context) => context.redirect("/support/", 301));
app.all("/help", (context) => context.redirect("/support/", 301));

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

// What AI assistants read about Backtick, as llmstxt.org describes.
app.get("/llms.txt", (context) =>
  context.text(`# Backtick

> Build React Native apps with AI. Describe an app to Claude, and it builds a real React Native app that runs natively on your iPhone in the Backtick app. Free: no subscription, no credits; the building happens in your own Claude account.

## How it works

1. Install Backtick on your iPhone (${IPHONE}) and sign in.
2. Connect Backtick to Claude: in Claude's settings, Connectors, add a custom connector named Backtick with the URL https://mcp.backtickjs.com, then sign in with the same account.
3. Tap + New in Backtick, describe your app, and tap Ask Claude. Claude writes the app, and Backtick checks and saves each version.
4. Tap Open in Backtick in the chat. To change the app, ask Claude in the same chat, or tap Edit in Backtick.

## Links

- [Support](${urlOf("/support/")}): getting started, troubleshooting, contact and account deletion
- [Privacy policy](${urlOf("/privacy/")})
- [Terms of service](${urlOf("/terms/")})
- [Backtick.js](https://backtickjs.dev/): the open-source framework Backtick apps are built with
`),
);

app.get("/robots.txt", (context) =>
  context.text(`User-agent: *
Allow: /

Sitemap: ${urlOf("/")}sitemap.xml
`),
);

app.notFound(async (context) => context.html(await toHtml(NOT_FOUND), 404));
