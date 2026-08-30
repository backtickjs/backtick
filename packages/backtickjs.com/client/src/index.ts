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
  builtins: builtins as never,
  elements,
});
