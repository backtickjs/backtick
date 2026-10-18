import { readFile } from "node:fs/promises";
import { bundler, ClientVersionMismatch } from "@backtickjs/bundler";
import { type Context, Hono } from "hono";
import { cors } from "hono/cors";
import { api } from "./api.js";
import { readBackupToken } from "./auth/session.js";
import { backupPdf } from "./backup.js";
import { screenRequest } from "./request.js";
import { draw, type Route, routes } from "./routes.js";
import { fontFiles } from "./ui/fonts.js";

// Development is only what `npm start` runs, which sets NODE_ENV: any other
// run, a deploy included, is production.
const development = process.env.NODE_ENV === "development";

/** The app's server: its screens, its API, and the files screens link to. */
export const app = new Hono();

// `npm run web` serves the app from another origin.
app.use(
  cors({
    origin: "*",
    allowHeaders: [
      "authorization",
      "content-type",
      "x-time-zone",
      "x-backtick-modules",
    ],
  }),
);

// The fonts and pictures screens link to, which don't change once served.
const immutable = (context: Context, type: string, body: Buffer) =>
  context.body(new Uint8Array(body), 200, {
    "content-type": type,
    "cache-control": "public, max-age=31536000, immutable",
  });
app.get("/fonts/:file", (context) => {
  const font = /^(\w+)\.ttf$/.exec(context.req.param("file"))?.[1];
  const file = font === undefined ? undefined : fontFiles.get(font);
  return file === undefined
    ? context.notFound()
    : immutable(context, "font/ttf", file);
});
app.get("/assets/:file", async (context) => {
  const asset = /^[\w@-]+\.png$/.exec(context.req.param("file"))?.[0];
  const file =
    asset === undefined
      ? undefined
      : await readFile(new URL(`assets/${asset}`, import.meta.url)).catch(
          () => undefined,
        );
  return file === undefined
    ? context.notFound()
    : immutable(context, "image/png", file);
});

// The backup, for the link the app opened in the phone's browser.
app.get("/backup.pdf", async (context) => {
  const backup = await readBackupToken(context.req.query("token") ?? "");
  if (backup === null) {
    return context.text(
      "This link has expired. Ask the app for a new one.",
      403,
    );
  }
  const pdf = await backupPdf(backup.uid, backup.timeZone);
  return context.body(new Uint8Array(pdf), 200, {
    "content-type": "application/pdf",
    "content-disposition": 'inline; filename="MyStoryJar stories.pdf"',
  });
});

// What scripts post to: its routes are under `/api`.
app.route("/", api);

for (const [path, route] of Object.entries(routes)) {
  app.get(path, (context) => screen(context, route));
}

// A route's screen, bundled for the modules the app that asked carries. An app
// that can't run it, lacking a module or carrying a version its imports aren't
// typed for, is answered 426: it draws its own screen asking to update.
async function screen(context: Context, route: Route) {
  const started = performance.now();
  const request = await screenRequest(context);
  const { modules } = request;
  let bundle;
  try {
    bundle = await bundler.build({ input: draw(route, request), modules });
  } catch (error) {
    if (!(error instanceof ClientVersionMismatch)) throw error;
    // In development, more likely a module missing from the module map.
    if (development) {
      console.warn(`[server] ${context.req.path}:`, error.message);
    }
    return context.body(null, 426);
  }
  const { code } = bundle.generate({ format: "cjs" });
  if (development) {
    const time = (performance.now() - started).toFixed(1);
    const size = (Buffer.byteLength(code) / 1024).toFixed(1);
    console.log(`[server] ${context.req.path}: ${size} KB in ${time} ms`);
  }
  return context.body(code, 200, { "content-type": "text/javascript" });
}

// Answered rather than crashed on, so the app can show why.
app.onError((error, context) => {
  console.error(`[server] ${context.req.method} ${context.req.path}:`, error);
  return context.text(String(error), 500);
});
