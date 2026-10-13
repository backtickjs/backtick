import { readFile } from "node:fs/promises";
import { createServer, type ServerResponse } from "node:http";
import { bundler } from "@backtickjs/bundler";
import { answer, callerOf } from "./api.js";
import { readBackupToken } from "./auth/session.js";
import { DeprecatedBuild } from "./builds.js";
import { backupPdf } from "./backup.js";
import { screenRequest } from "./request.js";
import { screenAt } from "./routes.js";
import { fontFiles } from "./ui/fonts.js";

// Development is only what `npm start` runs, which sets NODE_ENV: any other
// run, a deploy included, is production. In development, this run of the
// server: `--watch` starts a new one whenever you save, and the app, seeing a
// new one at `/live`, fetches its screens again.
const development = process.env.NODE_ENV === "development";
const run = crypto.randomUUID();

const server = createServer(async (request, response) => {
  // `npm run web` serves the app from another origin.
  response.setHeader("access-control-allow-origin", "*");
  response.setHeader(
    "access-control-allow-headers",
    "authorization, content-type, x-time-zone, x-build-id",
  );
  if (request.method === "OPTIONS") {
    response.end();
    return;
  }
  const url = new URL(request.url ?? "/", "http://localhost");
  const { pathname } = url;
  if (development && pathname === "/live") {
    response.end(run);
    return;
  }
  // The fonts and pictures screens link to, which don't change once served.
  const font = /^\/fonts\/(\w+)\.ttf$/.exec(pathname)?.[1];
  if (font !== undefined && fontFiles.has(font)) {
    send(response, "font/ttf", fontFiles.get(font)!);
    return;
  }
  const asset = /^\/assets\/([\w@-]+\.png)$/.exec(pathname)?.[1];
  if (asset !== undefined) {
    const file = await readFile(
      new URL(`assets/${asset}`, import.meta.url),
    ).catch(() => undefined);
    if (file !== undefined) {
      send(response, "image/png", file);
      return;
    }
  }
  try {
    // The backup, for the link the app opened in the phone's browser.
    if (pathname === "/backup.pdf") {
      const backup = await readBackupToken(url.searchParams.get("token") ?? "");
      if (backup === null) {
        response.statusCode = 403;
        response.end("This link has expired. Ask the app for a new one.");
        return;
      }
      const pdf = await backupPdf(backup.uid, backup.timeZone);
      response.setHeader("content-type", "application/pdf");
      response.setHeader(
        "content-disposition",
        'inline; filename="MyStoryJar stories.pdf"',
      );
      response.end(pdf);
      return;
    }
    const answered =
      request.method === "POST"
        ? await answer(pathname, request, await callerOf(request))
        : undefined;
    if (answered !== undefined) {
      response.statusCode = answered.status;
      response.setHeader("content-type", "application/json");
      response.end(JSON.stringify(answered.body));
      return;
    }
    const started = performance.now();
    // for the build's packages: a build this server doesn't know throws
    const screen = await screenRequest(request);
    const input = screenAt(pathname, screen);
    if (input === undefined) {
      response.statusCode = 404;
      response.end();
      return;
    }
    const bundle = await bundler.build({
      input,
      packageVersions: screen.packages,
    });
    const { code } = bundle.generate({ format: "cjs" });
    response.setHeader("content-type", "text/javascript");
    response.end(code);
    if (development) {
      const time = (performance.now() - started).toFixed(1);
      const size = (Buffer.byteLength(code) / 1024).toFixed(1);
      console.log(`[server] ${pathname}: ${size} KB in ${time} ms`);
    }
  } catch (error) {
    // A build retired on purpose: the app asks its user to update.
    if (error instanceof DeprecatedBuild) {
      response.statusCode = 426;
      response.end(String(error));
      return;
    }
    // Answered rather than crashed on, so the app can show why.
    console.error(error);
    response.statusCode = 500;
    response.end(String(error));
  }
});

function send(response: ServerResponse, type: string, body: Buffer) {
  response.setHeader("content-type", type);
  response.setHeader("cache-control", "public, max-age=31536000, immutable");
  response.end(body);
}

// 3000 unless PORT says otherwise, as a host such as Cloud Run does.
const port = Number(process.env.PORT ?? 3000);
server.listen(port, () => {
  console.log(`MyStoryJar server on http://localhost:${port}`);
});
