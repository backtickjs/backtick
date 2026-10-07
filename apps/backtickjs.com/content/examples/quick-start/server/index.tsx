import { createServer } from "node:http";
import { bundler } from "@backtickjs/bundler";
import { db } from "./db.js";
import { Home } from "./Home.js";

// The versions of React and React Native your app ships.
const packageVersions = { react: "19.2.3", "react-native": "0.86.3" };

createServer(async (request, response) => {
  if (request.url === "/screens/home") {
    const user = await db.userFor(request.headers.authorization);
    const bundle = await bundler.build({
      input: <Home user={user} />,
      packageVersions,
    });
    const { code } = bundle.generate({ format: "cjs" });
    response.setHeader("content-type", "text/javascript");
    response.end(code);
    return;
  }
  response.statusCode = 404;
  response.end();
}).listen(3000);
