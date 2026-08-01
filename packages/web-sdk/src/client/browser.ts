import { start } from "./index.js";

/**
 * The client as a page loads it: a script tag, and it has already started.
 *
 * The package export stays quiet — an app that imports `start` decides when to
 * call it, which is what a bundler build or a test wants. This entry is the
 * same code with that decision made, because a page that says nothing but
 * `<script type="module" src="/backtick.js">` has asked for the ordinary thing:
 * draw what this path says to draw.
 *
 * A module is evaluated once, so a page that also imports from here — for
 * `mount`, or to draw again later — gets the same running client rather than a
 * second one.
 */
export * from "./index.js";

await start();
