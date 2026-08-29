/**
 * This site's client, which is the web one with what this site's schema adds.
 *
 * Self-starting and exporting nothing, so a page declares no global and nothing
 * on it calls in. Two tables, because the schema declares two things: names a
 * script may call, and a tag a bundle may draw.
 */
import { defineClient } from "@backtickjs/web-client";
import { builtins } from "./builtins.js";
import { elements } from "./elements.js";

defineClient({
  // Cast the way the web's own table is, a few lines into `defineClient`: what
  // a schema names is an interface, and an interface has no index signature
  // where a lookup by name wants one.
  builtins: builtins as never,
  elements,
});
