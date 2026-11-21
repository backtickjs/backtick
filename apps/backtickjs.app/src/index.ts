// backtickjs.app's Worker: every app's host. <id>.backtickjs.app is the app,
// as <project>.vercel.app is a project: the phone gets its screens there, each
// answered by the app's latest release in an isolate of its own, and a browser
// a page to open it in Backtick. The bare domain sends people to
// backtickjs.com. Users' code runs here: the Worker's secrets stay in its own
// environment, and a release is loaded with none of them.
import { type Context, Hono } from "hono";
import { html, raw } from "hono/html";
import { createRemoteJWKSet, jwtVerify } from "jose";
import QRCode from "qrcode";

type Env = {
  Bindings: {
    LOADER: WorkerLoader;
    SUPABASE_URL: string;
    // Secrets (`wrangler secret put`): never handed to a release.
    SUPABASE_SERVICE_ROLE_KEY: string;
    BACKTICK_APP_USER_SECRET: string;
    // Who issues the phone's access tokens: auth.backtickjs.com.
    BACKTICK_AUTH_ORIGIN: string;
  };
};

const app = new Hono<Env>();

// The Backtick app claims every app's host for universal links
// (`applinks:*.backtickjs.app` in its entitlement), so a link to
// <id>.backtickjs.app opens the app itself, as App Links do on Android
// (assetlinks.json below). Every host serves the file, the bare domain and
// each app's: Apple's docs have each host serve its own. Before an app's
// host is handed to the app, below.
app.get("/.well-known/apple-app-site-association", (c) =>
  c.json({
    applinks: {
      details: [
        {
          appIDs: ["BM4485734W.com.backtickjs.app"],
          components: [{ "/": "*" }],
        },
      ],
    },
  }),
);

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
// isolate of its own: the internet through OutboundGateway, and never the
// token, only the path, the phone's modules and who's asking as this app's own
// user ID. The token must be one auth.backtickjs.com issued for this app's
// origin, and the app the token's user's own.
async function screen(c: Context<Env>, id: string): Promise<Response> {
  const user = await userOf(c, `https://${id}.backtickjs.app`);
  if (user === undefined) {
    return c.json({ error: "invalid_token" }, 401);
  }
  // A Worker's clock moves only while it waits, as each timed step does.
  let started = Date.now();
  const latest = await read(
    c,
    `select=version,release_id,apps!inner(id)&app_id=eq.${id}&apps.owner_id=eq.${user}&apps.deleted_at=is.null&compiled=not.is.null&order=version.desc&limit=1`,
  );
  const [row] = latest as { version: number; release_id: string }[];
  if (row === undefined) {
    return c.notFound();
  }
  const fetched = Date.now() - started;
  // Asked for only when the release has no isolate running here, while the
  // isolate starts: the read is fetching, not the app's answer.
  let miss = false;
  let reading = 0;
  // Keyed by the release's own id, which never repeats: an app id freed by
  // an erase and claimed again can't reach the old owner's isolate.
  const release = c.env.LOADER.get(row.release_id, async () => {
    miss = true;
    const begun = Date.now();
    const code = await releaseCode(c, row.release_id);
    reading = Date.now() - begun;
    return {
      compatibilityDate: "2026-10-01",
      compatibilityFlags: ["nodejs_compat"],
      mainModule: "app.js",
      modules: { "app.js": code },
      globalOutbound: c.executionCtx.exports.OutboundGateway({
        props: { app: id },
      }),
    };
  });
  started = Date.now();
  const answer = await release.getEntrypoint().fetch(
    new Request(c.req.url, {
      headers: {
        "x-backtick-modules": c.req.header("x-backtick-modules")!,
        "x-backtick-user": await appUser(c, id, user),
      },
    }),
  );
  const answered = Date.now() - started;
  const response = new Response(answer.body, answer);
  response.headers.set("x-backtick-version", String(row.version));
  // What the open read from outside, what the app took to answer, and
  // whether the release's isolate was already running.
  response.headers.set(
    "server-timing",
    `fetch;dur=${fetched + reading}, bundle;dur=${answered - reading}, cache;desc=${miss ? "miss" : "hit"}`,
  );
  return response;
}

// The user an access token is for, if auth.backtickjs.com issued it for
// `origin` and it hasn't expired (RFC 9068, section 4).
async function userOf(
  c: Context<Env>,
  origin: string,
): Promise<string | undefined> {
  const token = /^Bearer (\S+)$/.exec(c.req.header("authorization") ?? "")?.[1];
  if (token === undefined) {
    return undefined;
  }
  try {
    const { payload } = await jwtVerify(
      token,
      keysOf(c.env.BACKTICK_AUTH_ORIGIN),
      {
        issuer: c.env.BACKTICK_AUTH_ORIGIN,
        audience: origin,
        typ: "at+jwt",
        algorithms: ["ES256"],
      },
    );
    return typeof payload.sub === "string" &&
      /^[0-9a-f-]{36}$/.test(payload.sub)
      ? payload.sub
      : undefined;
  } catch {
    return undefined;
  }
}

// The issuer's published keys, fetched and cached by jose per isolate.
const keySets = new Map<string, ReturnType<typeof createRemoteJWKSet>>();
function keysOf(issuer: string) {
  let keys = keySets.get(issuer);
  if (keys === undefined) {
    keys = createRemoteJWKSet(new URL(`${issuer}/.well-known/jwks.json`));
    keySets.set(issuer, keys);
  }
  return keys;
}

// Who's asking, as this app knows them: an HMAC of the app and the user, so
// each app has its own ID for a person, and two apps can't match theirs.
async function appUser(
  c: Context<Env>,
  id: string,
  user: string,
): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(c.env.BACKTICK_APP_USER_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(`${id}:${user}`),
  );
  return btoa(String.fromCharCode(...new Uint8Array(mac)))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

// A version's release, from this data center's cache, or read the first
// time: a release never changes, so it's kept as long as the cache will. It's
// keyed by its release id, random and never reused, so no app can guess
// another's key, and a freed app id doesn't bring back the old owner's code.
// The version was read for its owner just before.
async function releaseCode(
  c: Context<Env>,
  releaseId: string,
): Promise<string> {
  const key = new Request(`https://releases.backtickjs.app/${releaseId}`);
  const cached = await caches.default.match(key);
  if (cached !== undefined) {
    return cached.text();
  }
  const [row] = (await read(
    c,
    `select=compiled&release_id=eq.${releaseId}`,
  )) as { compiled: string | null }[];
  // A save between the two reads clears this version's release; never cache
  // that as its code. The phone's next open gets the new version.
  if (row?.compiled == null) {
    throw new Error(`Release ${releaseId} was replaced while opening it`);
  }
  c.executionCtx.waitUntil(
    caches.default.put(
      key,
      new Response(row.compiled, {
        headers: { "cache-control": "public, max-age=31536000, immutable" },
      }),
    ),
  );
  return row.compiled;
}

// Versions, with the Worker's own key. Supabase's own errors stay here: the
// phone gets a plain 500.
async function read(c: Context<Env>, query: string): Promise<unknown[]> {
  const answer = await fetch(
    `${c.env.SUPABASE_URL}/rest/v1/versions?${query}`,
    {
      headers: {
        apikey: c.env.SUPABASE_SERVICE_ROLE_KEY,
        authorization: `Bearer ${c.env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
    },
  );
  if (!answer.ok) {
    throw new Error(`Supabase answered ${answer.status} to ${query}`);
  }
  return answer.json<unknown[]>();
}

// A browser: the app opens at the same path, in the Backtick app. A phone goes
// straight there, with the button in case its browser waits for a tap, and a
// link to get Backtick for a phone without it; a computer gets a QR code of
// this page, for the phone's camera.
async function openOnPhone(c: Context, id: string): Promise<Response> {
  const url = new URL(c.req.url);
  const link = `backtick://${id}${url.pathname}${url.search}`;
  const phone = /iPhone|iPad|iPod|Android/.test(
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
          <p>This app runs on your phone, in Backtick.</p>
          ${phone
            ? html`<a class="open" href="${link}">Open in Backtick</a>`
            : html`<div class="qr">${raw(qr)}</div>
                <p>Scan it with your phone's camera to open the app.</p>`}
          <p>
            Don't have Backtick?
            <a href="https://backtickjs.com">Get it on backtickjs.com</a>.
          </p>
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
