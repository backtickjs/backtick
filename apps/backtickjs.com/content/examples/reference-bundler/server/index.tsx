import { createServer } from "node:http";
import { createRequire } from "node:module";
import { bundler } from "@backtickjs/bundler";
import { Home } from "./Home.js";

const require = createRequire(import.meta.url);
const packageVersions = {
  react: require("react/package.json").version,
  "react-native": require("react-native/package.json").version,
};

createServer(async (request, response) => {
  try {
    const bundle = await bundler.build({ input: <Home />, packageVersions });
    const { code } = bundle.generate({ format: "cjs" });
    response.setHeader("content-type", "text/javascript");
    response.end(code);
  } catch (error) {
    // A screen the bundler refuses, answered rather than crashed on.
    console.error(error);
    response.statusCode = 500;
    response.end(String(error));
  }
}).listen(3000);
