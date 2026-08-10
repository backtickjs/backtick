import { bundle, type JsxElement } from "@backtickjs/core";
import { respond } from "./handler.js";
import { toHtml } from "./toHtml.js";

/**
 * A page that draws this screen, as an answer to a request.
 *
 * Everything between a screen and a response — build the bundle, write the
 * document around it, say what it is — because a route that answers with a
 * screen does all three every time:
 *
 *     { path: "/", respond: () => page(<Home />) }
 *
 * A `JsxElement` rather than the `Spliceable` that `bundle` takes, because a
 * page draws an element: `page("hello")` would typecheck against the wider
 * type and answer with a document whose body is a bare string.
 *
 * Bundling per request rather than once, because it costs about 0.03 ms for the
 * screens there are — cheaper than an API for deciding when to do it — and
 * because a screen that reads the time or a database has to be built now
 * anyway. A route with a bundle already in hand calls `toHtml` instead.
 */
export async function page(screen: JsxElement): Promise<Response> {
  return respond(toHtml(await bundle(screen)), "text/html");
}
