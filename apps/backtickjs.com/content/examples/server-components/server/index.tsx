import { createServer } from "node:http";
import { bundler } from "@backtickjs/bundler";
import { Catalog } from "./catalog.js";
import { ProductScreen } from "./ProductScreen.js";

const packageVersions = { react: "19.2.3", "react-native": "0.86.3" };
const catalog = new Catalog();

createServer(async (request, response) => {
  // `/products/p1` draws product p1.
  const id = request.url?.match(/^\/products\/(\w+)$/)?.[1];
  if (id === undefined) {
    response.statusCode = 404;
    response.end();
    return;
  }
  const bundle = await bundler.build({
    input: <ProductScreen id={id} catalog={catalog} />,
    packageVersions,
  });
  response.setHeader("content-type", "text/javascript");
  response.end(bundle.generate({ format: "cjs" }).code);
}).listen(3000);
