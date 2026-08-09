import { bundle, type Spliceable } from "@backtickjs/core";
import { toHtml } from "../toHtml.js";
import { respond } from "./handler.js";

/**
 * A page that draws this, as an answer to a request.
 *
 * The three steps between a screen and a response — build the bundle, write the
 * document around it, say what it is — taken together, because a route that
 * answers with a screen takes all three every time:
 *
 *     { path: "/", respond: () => page(<Home />) }
 *
 * A route that wants the document itself, to write to disk or to send some
 * other way, calls `bundle` and `toHtml` instead. This is those two and
 * `respond`, in the order there is only one of.
 */
export async function page(drawing: Spliceable): Promise<Response> {
  return respond(toHtml(await bundle(drawing)), "text/html");
}
