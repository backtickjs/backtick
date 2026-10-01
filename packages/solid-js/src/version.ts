/**
 * The Solid this adapter is typed against: its `solid-js` dependency, and its
 * own version (the guard in `scripts/checkVersions.mjs` keeps them one). A page
 * loads this Solid through its import map, and tells the bundler its client
 * provides it:
 *
 *     `https://cdn.jsdelivr.net/npm/solid-js@${version}/dist/solid.js`
 *     bundler.build({ input, external: { "solid-js": version }, plugins })
 */
export const version = "1.9.14";
