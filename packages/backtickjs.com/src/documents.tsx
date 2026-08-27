import { bundler } from "@backtickjs/core";
import { insert } from "@backtickjs/web-sdk";
import { Layout } from "./components/Layout.js";
import { shell } from "./shell.js";
import { pages } from "./routes.js";

/**
 * Every page, built. One bundle each, drawn into a document whose body holds
 * nothing else — the chrome is in the bundle too, so what is static here is a
 * head and the script that reads what follows it.
 */
export const documents = await Promise.all(
  pages.map(async (page) => {
    // The layout is applied here rather than inside each page, so a page
    // is its content and the chrome is written once.
    const bundle = await bundler.run(<Layout>{page.view}</Layout>);
    return {
      path: page.path,
      html: insert(shell(page), "body", bundle),
      bytes: Buffer.byteLength(JSON.stringify(bundle)),
    };
  }),
);
