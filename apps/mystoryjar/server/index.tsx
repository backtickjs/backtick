import { readFile } from "node:fs/promises";
import { createServer, type ServerResponse } from "node:http";
import { createRequire } from "node:module";
import { bundler } from "@backtickjs/bundler";
import { screenRequest } from "./request.js";
import { routes } from "./routes.js";
import { fontFiles } from "./ui/fonts.js";

// Development is only what `npm start` runs, which sets NODE_ENV: any other
// run, a deploy included, is production. In development, this run of the
// server: `--watch` starts a new one whenever you save, and the app, seeing a
// new one at `/live`, fetches its screens again.
const development = process.env.NODE_ENV === "development";
const run = crypto.randomUUID();

// The versions of the packages the app provides to screens: this project's
// own, as the app and this server share a package.json.
const require = createRequire(import.meta.url);
const packageVersions = {
  react: require("react/package.json").version,
  "react-native": require("react-native/package.json").version,
  "@react-navigation/native": require("@react-navigation/native/package.json")
    .version,
  "expo-secure-store": require("expo-secure-store/package.json").version,
  "expo-font": require("expo-font/package.json").version,
  "react-native-svg": require("react-native-svg/package.json").version,
  "react-native-safe-area-context":
    require("react-native-safe-area-context/package.json").version,
};

const server = createServer(async (request, response) => {
  // `npm run web` serves the app from another origin.
  response.setHeader("access-control-allow-origin", "*");
  response.setHeader(
    "access-control-allow-headers",
    "authorization, x-time-zone, x-app-version",
  );
  if (request.method === "OPTIONS") {
    response.end();
    return;
  }
  const { pathname } = new URL(request.url ?? "/", "http://localhost");
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
  const route = routes[pathname];
  if (route === undefined) {
    response.statusCode = 404;
    response.end();
    return;
  }
  try {
    const started = performance.now();
    const bundle = await bundler.build({
      input: route(screenRequest(request)),
      packageVersions,
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

server.listen(3000, () => {
  console.log("MyStoryJar server on http://localhost:3000");
});
