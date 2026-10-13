import { createServer, type IncomingMessage } from "node:http";
import { fileURLToPath } from "node:url";
import { createBuilds, DeprecatedBuild } from "@backtickjs/builds";
import { bundler } from "@backtickjs/bundler";
import type { JSX } from "@backtickjs/react/jsx-runtime";
import { AppUpdateRequired } from "./AppUpdateRequired.js";
import { Home } from "./Home.js";

// Your app's screens, by path: add one here, and the app can fetch it. Each
// draws its screen for the request, which carries what the app sent.
const screens: Record<string, (request: IncomingMessage) => JSX.Element> = {
  "/home": () => <Home />,
};

// Development is only what `npm start` runs, which sets NODE_ENV: any other
// run, a deploy included, is production. In development, this run of the
// server: `--watch` starts a new one whenever you save, and the app, seeing a
// new one at `/live`, draws its screen again.
const development = process.env.NODE_ENV === "development";
const run = crypto.randomUUID();

// Your app's builds: each sends its id, and a screen is bundled for the
// modules that build carries, from moduleMap.ts. A build in users' hands
// keeps working as your app moves on, once registered: see builds/.
const builds = createBuilds({
  projectRoot: fileURLToPath(new URL("..", import.meta.url)),
});

const server = createServer(async (request, response) => {
  // `npm run web` serves the app from another origin.
  response.setHeader("access-control-allow-origin", "*");
  response.setHeader("access-control-allow-headers", "x-build-id");
  if (request.method === "OPTIONS") {
    response.end();
    return;
  }
  const { pathname } = new URL(request.url ?? "/", "http://localhost");
  if (development && pathname === "/live") {
    response.end(run);
    return;
  }
  const screen = screens[pathname];
  if (screen === undefined) {
    response.statusCode = 404;
    response.end();
    return;
  }
  try {
    const buildId = request.headers["x-build-id"]?.toString() || null;
    let input: JSX.Element;
    let modules;
    try {
      modules = builds.modulesOf(buildId);
      input = screen(request);
    } catch (error) {
      // A build you retired: a screen asking to update, bundled for the
      // modules it has.
      if (!(error instanceof DeprecatedBuild)) throw error;
      input = <AppUpdateRequired />;
      modules = error.modules;
    }
    const bundle = await bundler.build({ input, modules });
    const { code } = bundle.generate({ format: "cjs" });
    response.setHeader("content-type", "text/javascript");
    response.end(code);
  } catch (error) {
    // Answered rather than crashed on, so the app can show why.
    console.error(error);
    response.statusCode = 500;
    response.end(String(error));
  }
});

server.listen(3000, () => {
  console.log("Backtick server on http://localhost:3000");
});
