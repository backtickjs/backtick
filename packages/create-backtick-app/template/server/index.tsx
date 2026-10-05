import { createServer } from "node:http";
import { bundler } from "@backtickjs/bundler";
import { Home } from "./Home.js";

// This run of the server. `--watch` starts a new one whenever you save, and
// the app, seeing a new one at `/live`, draws its screen again.
const run = crypto.randomUUID();

const server = createServer(async (request, response) => {
  // `npm run web` serves the app from another origin.
  response.setHeader("access-control-allow-origin", "*");
  response.setHeader(
    "access-control-allow-headers",
    "backtick-package-versions",
  );
  if (request.method === "OPTIONS") {
    response.end();
    return;
  }
  if (request.url === "/live") {
    response.end(run);
    return;
  }
  if (request.url === "/home") {
    try {
      // The versions of React and React Native the app was built with, so
      // its screen requires nothing the app doesn't have.
      const packageVersions = JSON.parse(
        String(request.headers["backtick-package-versions"]),
      );
      const bundle = await bundler.build({ input: <Home />, packageVersions });
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
