/**
 * This site's client, which is the web one with what this site's schema adds.
 *
 * Self-starting and exporting nothing, so a page declares no global and nothing
 * on it calls in. One table, because the only thing this site's schema adds
 * that a client must answer for is names a script may call: its one tag is
 * named as the browser registers it, so the document builds that one itself.
 */
import { defineClient } from "@backtickjs/web-vm";
import { builtins } from "./builtins.js";

defineClient({ builtins: builtins as never });
