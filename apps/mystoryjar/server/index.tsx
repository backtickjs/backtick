import { createServer } from "node:http";
import { createRequire } from "node:module";
import { bundler } from "@backtickjs/bundler";
import { routes } from "./routes.js";

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
  const route = routes[pathname];
  if (route === undefined) {
    response.statusCode = 404;
    response.end();
    return;
  }
  try {
    const bundle = await bundler.build({ input: route(), packageVersions });
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
  console.log("MyStoryJar server on http://localhost:3000");
});
