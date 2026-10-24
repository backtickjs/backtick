// backtickjs.app's Worker: every app's host. <id>.backtickjs.app is the app,
// as <project>.vercel.app is a project: the phone gets its screens there, each
// answered by the app's latest release in an isolate of its own, and a browser
// a page to open it in Expo Go. The bare domain sends people to
// backtickjs.com. Users' code runs here, so this holds no secrets: Supabase
// checks the phone's token as it reads the app.
import { type Context, Hono } from "hono";
import { html, raw } from "hono/html";
import QRCode from "qrcode";

type Env = {
  Bindings: {
    LOADER: WorkerLoader;
    SUPABASE_URL: string;
    SUPABASE_PUBLISHABLE_KEY: string;
  };
};

// The shell, published with EAS Update: Expo Go opens it from anywhere, at
// the Expo Go build's SDK, and follows the path after `--/`.
const shell = "exp://u.expo.dev/baed8ee5-a651-438c-999f-aff346fa0064";

const app = new Hono<Env>();

// An app's own host, matched before the bare domain's routes below.
app.use("*", async (c, next) => {
  const id = /^([0-9a-f-]{36})\.backtickjs\.app$/.exec(
    new URL(c.req.url).hostname,
  )?.[1];
  if (id === undefined) {
    return next();
  }
  return c.req.header("x-backtick-modules") === undefined
    ? openInExpoGo(c, id)
    : screen(c, id);
});

// The phone's request, answered by the app's latest release, loaded into an
// isolate of its own: no network of its own, and never the token, only the
// path and the phone's modules. Supabase checks the token as it reads the
// version, so only the owner gets one; a token it refuses is the phone's 401.
async function screen(c: Context<Env>, id: string): Promise<Response> {
  const authorization = c.req.header("authorization");
  if (authorization === undefined) {
    return c.json(
      {
        error: "invalid_token",
        error_description: "Missing Authorization header",
      },
      401,
    );
  }
  // A Worker's clock moves only while it waits, as each timed step does.
  let started = Date.now();
  const latest = await asUser(
    c,
    authorization,
    `select=version&app_id=eq.${id}&compiled=not.is.null&order=version.desc&limit=1`,
  );
  if (!latest.ok) {
    return latest;
  }
  const [row] = await latest.json<{ version: number }[]>();
  if (row === undefined) {
    return c.notFound();
  }
  const fetched = Date.now() - started;
  // Asked for only when the release has no isolate running here, while the
  // isolate starts: the read is fetching, not the app's answer.
  let miss = false;
  let read = 0;
  const release = c.env.LOADER.get(`${id}@${row.version}`, async () => {
    miss = true;
    const reading = Date.now();
    const code = await releaseCode(c, authorization, id, row.version);
    read = Date.now() - reading;
    return {
      compatibilityDate: "2026-10-01",
      compatibilityFlags: ["nodejs_compat"],
      mainModule: "app.js",
      modules: { "app.js": code },
      globalOutbound: null,
    };
  });
  started = Date.now();
  const answer = await release.getEntrypoint().fetch(
    new Request(c.req.url, {
      headers: { "x-backtick-modules": c.req.header("x-backtick-modules")! },
    }),
  );
  const answered = Date.now() - started;
  const response = new Response(answer.body, answer);
  response.headers.set("x-backtick-version", String(row.version));
  // What the open read from outside, what the app took to answer, and
  // whether the release's isolate was already running.
  response.headers.set(
    "server-timing",
    `fetch;dur=${fetched + read}, bundle;dur=${answered - read}, cache;desc=${miss ? "miss" : "hit"}`,
  );
  return response;
}

// A version's release, from this data center's cache, or read as the user the
// first time: a release never changes, so it's kept as long as the cache will.
async function releaseCode(
  c: Context<Env>,
  authorization: string,
  id: string,
  version: number,
): Promise<string> {
  const key = new Request(`https://releases.backtickjs.app/${id}@${version}`);
  const cached = await caches.default.match(key);
  if (cached !== undefined) {
    return cached.text();
  }
  const read = await asUser(
    c,
    authorization,
    `select=compiled&app_id=eq.${id}&version=eq.${version}`,
  );
  if (!read.ok) {
    throw new Error(`Reading release ${id}@${version}: ${read.status}`);
  }
  const [{ compiled }] = await read.json<{ compiled: string | null }[]>();
  // A save between the two reads clears this version's release; never cache
  // that as its code. The phone's next open gets the new version.
  if (compiled === null) {
    throw new Error(`Release ${id}@${version} was replaced while opening it`);
  }
  c.executionCtx.waitUntil(
    caches.default.put(
      key,
      new Response(compiled, {
        headers: { "cache-control": "public, max-age=31536000, immutable" },
      }),
    ),
  );
  return compiled;
}

// The app's versions, as the user whose token it is: row-level security
// answers only their own apps'.
function asUser(
  c: Context<Env>,
  authorization: string,
  query: string,
): Promise<Response> {
  return fetch(`${c.env.SUPABASE_URL}/rest/v1/versions?${query}`, {
    headers: { apikey: c.env.SUPABASE_PUBLISHABLE_KEY, authorization },
  });
}

// A browser: the app opens in Expo Go, at the same path. A phone goes
// straight there, with the button in case its browser waits for a tap; a
// computer gets a QR code of this page, for the phone's camera.
async function openInExpoGo(c: Context, id: string): Promise<Response> {
  const url = new URL(c.req.url);
  const params = new URLSearchParams(url.search);
  params.set("channel-name", "production");
  const link = `${shell}/--/${id}${url.pathname}?${params}`;
  const phone = /Android|iPhone|iPad|iPod/.test(
    c.req.header("user-agent") ?? "",
  );
  const qr = phone
    ? ""
    : await QRCode.toString(url.href, { type: "svg", margin: 0 });
  return c.html(
    html`<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          ${phone
            ? html`<meta http-equiv="refresh" content="0; url=${link}" />`
            : ""}
          <title>Open in Expo Go</title>
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
            .qr {
              width: 240px;
              height: 240px;
              margin: 16px 0;
              padding: 12px;
              border-radius: 12px;
              background: #fff;
            }
            .qr svg {
              display: block;
              width: 100%;
              height: 100%;
            }
          </style>
        </head>
        <body>
          <p>This app runs on your phone, in Expo Go.</p>
          ${phone
            ? html`<a class="open" href="${link}">Open in Expo Go</a>`
            : html`<div class="qr">${raw(qr)}</div>
                <p>Scan it with your phone's camera to open the app.</p>`}
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
