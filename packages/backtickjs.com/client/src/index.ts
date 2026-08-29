/**
 * This site's client, which is the web one with one more name in its table.
 *
 * Self-starting and exporting nothing, so a page declares no global and nothing
 * on it calls in. `defineClient` registers the element the web client would
 * have; what differs is what the table answers for.
 */
import { defineClient } from "@backtickjs/web-client";
import { compile } from "./compile.js";

defineClient({ compile } as never);
