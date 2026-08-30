import { source } from "@backtickjs.com/client/bundle";
import { client, htmlOf } from "./html.js";
import { Home } from "./pages/Home.js";

/**
 * What is served, and where.
 *
 * A path to what is at it, the way a server takes them. This site has no
 * server: the build asks for every one of these once and writes the answer to
 * a file. Nothing here says which — a route is a route whether it is answered
 * on a request or ahead of all of them.
 */
export const routes: Readonly<Record<string, () => Promise<string>>> =
  {
    "/": async () => htmlOf(<Home />),
    
    [`/${client}`]: async () => source,

    // The domain, read by GitHub from what is published — here rather than
    // committed at the root of the repository, where it would also be the
    // domain of anything else served from it.
    "/CNAME": async () => "backtickjs.com\n",

    // What stops Jekyll dropping files it does not recognise. The workflow
    // uploads a directory, where this changes nothing; it is here for the day
    // someone publishes from a branch instead.
    "/.nojekyll": async () => "",
  };
