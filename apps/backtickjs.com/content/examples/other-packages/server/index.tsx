import { createServer } from "node:http";
import { createRequire } from "node:module";
import { bundler } from "@backtickjs/bundler";
import { Home } from "./Home.js";

// The packages the app provides to screens, each at the version it's built
// with.
const require = createRequire(import.meta.url);
const packageVersions = {
  react: require("react/package.json").version,
  "react-native": require("react-native/package.json").version,
  "expo-haptics": require("expo-haptics/package.json").version,
  "expo-linear-gradient": require("expo-linear-gradient/package.json").version,
};

createServer(async (request, response) => {
  const bundle = await bundler.build({ input: <Home />, packageVersions });
  response.setHeader("content-type", "text/javascript");
  response.end(bundle.generate({ format: "cjs" }).code);
}).listen(3000);
