// backtickjs.app's Vercel Function: every app's host. <id>.backtickjs.app is
// the app, as <project>.vercel.app is a project: the phone gets its screens
// there, a browser a page to open it in Backtick. The bare domain sends people
// to backtickjs.com. Users' code lives here, so this holds no secrets: the
// service at api.backtickjs.com checks the token and bundles.
import { type Context, Hono } from "hono";
import { html } from "hono/html";

const api = "https://api.backtickjs.com";

const app = new Hono();

// An app's own host, matched before the bare domain's routes below.
app.use("*", async (c, next) => {
  const id = /^([0-9a-f-]{36})\.backtickjs\.app$/.exec(
    new URL(c.req.url).hostname,
  )?.[1];
  if (id === undefined) {
    return next();
  }
  return c.req.header("x-backtick-modules") === undefined
    ? openInBacktick(c, id)
    : screen(c, id);
});

// The phone's request, as it sent it: the service checks its token and
// answers with the app's bundle for its modules. Apps are one screen, so the
// path isn't sent on yet.
async function screen(c: Context, id: string): Promise<Response> {
  const authorization = c.req.header("authorization");
  const answer = await fetch(`${api}/apps/${id}/bundle`, {
    headers: {
      ...(authorization === undefined ? {} : { authorization }),
      "x-backtick-modules": c.req.header("x-backtick-modules")!,
    },
  });
  const headers = new Headers();
  for (const name of ["content-type", "x-backtick-version"]) {
    const value = answer.headers.get(name);
    if (value !== null) {
      headers.set(name, value);
    }
  }
  return new Response(await answer.text(), { status: answer.status, headers });
}

// A browser: the app opens in the Backtick app, at the same path.
function openInBacktick(c: Context, id: string): Response | Promise<Response> {
  const url = new URL(c.req.url);
  const link = `backtick://${id}${url.pathname}${url.search}`;
  return c.html(
    html`<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Open in Backtick</title>
          <style>
            body {
              font:
                17px system-ui,
                sans-serif;
              margin: 0;
              padding: 48px 24px;
              color: #17201b;
              background: #f3f5f2;
            }
            a.open {
              display: inline-block;
              margin: 16px 0;
              padding: 14px 20px;
              border-radius: 8px;
              background: #1f7a55;
              color: #fff;
              font-weight: 600;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <p>This app runs on your phone, in the Backtick app.</p>
          <a class="open" href="${link}">Open in Backtick</a>
          <p><a href="https://backtickjs.com">What's Backtick?</a></p>
        </body>
      </html>`,
  );
}

// The website is backtickjs.com.
app.get("/", (c) => c.redirect("https://backtickjs.com", 302));

// Android's App Links: the phone app opens every *.backtickjs.app link
// itself, which Android checks here. The fingerprints are the SHA-256 of each
// certificate the app is signed with (the development build's, EAS's, Google
// Play's), comma-separated.
app.get("/.well-known/assetlinks.json", (c) => {
  const fingerprints = process.env.ANDROID_CERT_SHA256;
  if (fingerprints === undefined) {
    return c.notFound();
  }
  return c.json([
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: "com.backtickjs.app",
        sha256_cert_fingerprints: fingerprints.split(",").map((f) => f.trim()),
      },
    },
  ]);
});

export default app;
