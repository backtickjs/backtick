// backtickjs.app's Vercel Function: every app's host. <id>.backtickjs.app is
// the app, as <project>.vercel.app is a project: the phone gets its screens
// there, a browser a page to open it in Expo Go. The bare domain sends people
// to backtickjs.com. Users' code lives here, so this holds no secrets: the
// service at api.backtickjs.com checks the token and bundles.
import { type Context, Hono } from "hono";
import { html } from "hono/html";

const api = "https://api.backtickjs.com";

// The shell, published with EAS Update: Expo Go opens it from anywhere, at
// the Expo Go build's SDK, and follows the path after `--/`.
const shell = "exp://u.expo.dev/baed8ee5-a651-438c-999f-aff346fa0064";

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

// A browser: the app opens in Expo Go, at the same path.
function openInBacktick(c: Context, id: string): Response | Promise<Response> {
  const url = new URL(c.req.url);
  const params = new URLSearchParams(url.search);
  params.set("channel-name", "production");
  const link = `${shell}/--/${id}${url.pathname}?${params}`;
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
          <p>This app runs on your phone, in Expo Go.</p>
          <a class="open" href="${link}">Open in Expo Go</a>
          <p>
            No Expo Go yet? Get it from the
            <a href="https://apps.apple.com/app/expo-go/id982107779"
              >App Store</a
            >
            or
            <a
              href="https://play.google.com/store/apps/details?id=host.exp.exponent"
              >Google Play</a
            >.
          </p>
          <p><a href="https://backtickjs.com">What's Backtick?</a></p>
        </body>
      </html>`,
  );
}

// The website is backtickjs.com.
app.get("/", (c) => c.redirect("https://backtickjs.com", 302));

export default app;
