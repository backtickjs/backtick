// The client, as `scripts/build.mjs` bundles it. Self-starting and exporting
// nothing, so a page declares no global and nothing on it calls in: it answers
// for the web and for nothing else.
//
// A target with a name of its own registers the same element with its own
// table — see `./parts` — rather than loading this beside it.
import { defineClient } from "./defineClient.js";
import { dom } from "./dom.js";

defineClient({ renderer: dom, window });
