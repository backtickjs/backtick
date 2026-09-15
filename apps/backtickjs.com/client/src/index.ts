/**
 * This site's client, which is the web one with what this site's schema adds.
 *
 * Self-starting and exporting nothing, so a page declares no global and nothing
 * on it calls in. Only names, because the only thing this site's schema adds
 * that a client must answer for is names a script may call: its one tag is
 * named as the browser registers it, so the document builds that one itself.
 */
import { defineClient, dom } from "@backtickjs/web-vm";
import { compileBuiltin } from "./compileBuiltin.js";

defineClient({ renderer: dom, window, compileBuiltin });
