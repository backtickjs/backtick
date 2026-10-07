import { createServer } from "node:http";
import { createRequire } from "node:module";
import { text } from "node:stream/consumers";
import { bundler } from "@backtickjs/bundler";
import { Home } from "./Home.js";
import { saveOrder } from "./orders.js";

// Development is only what `npm start` runs, which sets NODE_ENV: any other
// run, a deploy included, is production. In development, this run of the
// server: `--watch` starts a new one whenever you save, and the app, seeing a
// new one at `/live`, draws its screen again.
const development = process.env.NODE_ENV === "development";
const run = crypto.randomUUID();

// The versions of React and React Native the app is built with: this
// project's own, as the app and this server share a package.json. A server
// for apps of many versions would tell them apart, by their user agent for
// one, and bundle each for its own.
const require = createRequire(import.meta.url);
const packageVersions = {
  react: require("react/package.json").version,
  "react-native": require("react-native/package.json").version,
};

const server = createServer(async (request, response) => {
  // `npm run web` serves the app from another origin.
  response.setHeader("access-control-allow-origin", "*");
  if (development && request.url === "/live") {
    response.end(run);
    return;
  }
  if (request.method === "POST" && request.url === "/orders") {
    await saveOrder(JSON.parse(await text(request)));
    response.end();
    return;
  }
  if (request.url === "/home") {
    // Where the app reached this server, for the screen to send its order to.
    const origin = `http://${request.headers.host}`;
    try {
      const bundle = await bundler.build({
        input: <Home origin={origin} />,
        packageVersions,
      });
      const { code } = bundle.generate({ format: "cjs" });
      response.setHeader("content-type", "text/javascript");
      response.end(code);
    } catch (error) {
      // Answered rather than crashed on, so the app can show why.
      console.error(error);
      response.statusCode = 500;
      response.end(String(error));
    }
    return;
  }
  response.statusCode = 404;
  response.end();
});

server.listen(3000, () => {
  console.log("Backtick server on http://localhost:3000");
});
