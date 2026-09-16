// The client, as `scripts/build.mjs` bundles it. Self-starting and exporting
// nothing, so a page declares no global and nothing on it calls in: it answers
// for the web and for nothing else.
//
// An app with a name of its own calls `defineClient` with its own
// `builtinOf` rather than loading this beside it.
import { defineClient } from "./defineClient.js";

defineClient({ window });
