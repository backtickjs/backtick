// Thin entry point. Importing the client-script module triggers its top-level
// evaluation — including the throwing `${...}` splice in `src/index.ts` — while
// the `bun-preload.ts` plugin transpiles it with correct source maps.
//
// This must stay separate from the transformed module: Bun swallows an uncaught
// top-level throw from a plugin-transformed *entry* point.
import "./src/index.ts";
