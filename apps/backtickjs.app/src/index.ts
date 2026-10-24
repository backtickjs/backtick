// backtickjs.app's Worker: every app's host. <id>.backtickjs.app is the app,
// as <project>.vercel.app is a project: the phone gets its screens there, each
// answered by the app's latest release in an isolate of its own, and a browser
// a page to open it in Backtick. The bare domain sends people to
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
// the Expo Go build's SDK, and follows the path after `--/`. The Backtick app
// runs the same shell, at its own scheme.
const expoGo = "exp://u.expo.dev/baed8ee5-a651-438c-999f-aff346fa0064";

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
    ? openOnPhone(c, id)
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

// A browser: the app opens at the same path, in the Backtick app on Android
// and in Expo Go on iOS, where there's no Backtick app yet. A phone goes
// straight there, with the button in case its browser waits for a tap, and on
// Android Expo Go's link for a phone without Backtick; a computer gets a QR
// code of this page, for the phone's camera.
async function openOnPhone(c: Context, id: string): Promise<Response> {
  const url = new URL(c.req.url);
  const backtickLink = `backtick://${id}${url.pathname}${url.search}`;
  const params = new URLSearchParams(url.search);
  params.set("channel-name", "production");
  const expoGoLink = `${expoGo}/--/${id}${url.pathname}?${params}`;
  const agent = c.req.header("user-agent") ?? "";
  const iOS = /iPhone|iPad|iPod/.test(agent);
  const phone = iOS || /Android/.test(agent);
  const [link, shell] = iOS
    ? [expoGoLink, "Expo Go"]
    : [backtickLink, "Backtick"];
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
          <title>Open in ${shell}</title>
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
          <p>This app runs on your phone, in ${shell}.</p>
          ${phone
            ? html`<a class="open" href="${link}">Open in ${shell}</a>`
            : html`<div class="qr">${raw(qr)}</div>
                <p>Scan it with your phone's camera to open the app.</p>`}
          ${phone && !iOS
            ? html`<p>
                No Backtick? <a href="${expoGoLink}">Open it in Expo Go</a>.
              </p>`
            : ""}
          <p><a href="https://backtickjs.com">What's Backtick?</a></p>
        </body>
      </html>`,
  );
}

// The Backtick app claims every app's host (Android App Links), so a link to
// <id>.backtickjs.app opens the app itself. For a wildcard host Android checks
// this file at the bare domain: the app, and the certificate EAS signs it with.
app.get("/.well-known/assetlinks.json", (c) =>
  c.json([
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: "com.backtickjs.app",
        sha256_cert_fingerprints: [
          "89:AF:4E:D2:72:B6:B5:EF:49:4A:28:14:66:52:C7:18:70:EA:D7:C8:4C:C6:27:41:6E:C0:EA:C4:48:47:4C:B7",
        ],
      },
    },
  ]),
);

// The website is backtickjs.com.
app.get("/", (c) => c.redirect("https://backtickjs.com", 302));

export default app;
