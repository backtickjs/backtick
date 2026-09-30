/** A page's import map, as its JSON: each module a bundle imports, by URL. */
export interface ImportMap {
  imports: Record<string, string>;
}

/**
 * The import map a page needs, as its JSON: each module a Solid client
 * provides, by its browser build under `packageUrl` — where the `solid-js`
 * package is served as published, from a CDN or the page's own server. Its
 * keys are all a bundle may import from (`bundler.build`'s `external`). A page
 * writes it, merged with any of its own:
 *
 *     const map = importMap("https://cdn.jsdelivr.net/npm/solid-js@1.9.14");
 *     `<script type="importmap">${JSON.stringify(map)}</script>`
 *
 * The Solid it serves should be the adapter's version, which its names are
 * typed against.
 */
export function importMap(packageUrl: string): ImportMap {
  const root = packageUrl.replace(/\/$/, "");
  return {
    imports: {
      "solid-js": `${root}/dist/solid.js`,
      "solid-js/web": `${root}/web/dist/web.js`,
      "solid-js/store": `${root}/store/dist/store.js`,
    },
  };
}
