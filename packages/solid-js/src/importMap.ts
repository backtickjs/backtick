// The Solid this adapter compiles for (its `solid-js` dependency), from a CDN.
const CDN = "https://cdn.jsdelivr.net/npm/solid-js@1.9.14";

/** A page's import map, as its JSON: each module a bundle imports, by URL. */
export interface ImportMap {
  imports: Record<string, string>;
}

/**
 * The import map a page needs, as its JSON: Solid's browser builds, by the
 * module a bundle imports. Its `imports` are the modules a Solid client
 * provides, all a bundle may import from (`bundler.build`'s `external` is
 * their keys). A page writes it, merged with any of its own:
 *
 *     <script type="importmap">${JSON.stringify(importMap)}</script>
 */
export const importMap: ImportMap = {
  imports: {
    "solid-js": `${CDN}/dist/solid.js`,
    "solid-js/web": `${CDN}/web/dist/web.js`,
    "solid-js/store": `${CDN}/store/dist/store.js`,
  },
};
