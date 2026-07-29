import { bundle, type Spliceable } from "@backtickjs/core";
import { renderDocument, type DocumentOptions } from "./renderDocument.js";

export { renderDocument } from "./renderDocument.js";
export type { DocumentOptions } from "./renderDocument.js";

export interface HandlerOptions extends DocumentOptions {
  // How to read a served module. Supplied as a reader rather than a path,
  // because reaching a filesystem is the one thing this can't do and stay
  // runtime-neutral.
  readonly read?: (path: string) => Promise<Uint8Array | null>;
}

const contentTypes: { readonly [ext: string]: string } = {
  js: "text/javascript",
  map: "application/json",
  css: "text/css",
  json: "application/json",
};

// One handler for every client. The bundle is the same artifact whoever asks,
// so only the envelope is negotiated: a browser asks for `text/html` and gets
// the payload inside the document it already wanted — one round trip — while
// iOS, Android and an MCU get the JSON on its own.
//
// `text/html` has to be asked for. A client sending nothing, or `*/*`, is not a
// browser navigating, so JSON is the safer read.
//
// A `Request` in and a `Response` out, and nothing else — no runtime APIs, so
// this runs wherever those two types do. Bun serves it directly; Node needs the
// adapter in `@backtickjs/web-sdk/server/node`, which is also where reading a
// file off disk lives.
export function createHandler(
  app: Spliceable,
  options: HandlerOptions,
): (request: Request) => Promise<Response> {
  return async (request) => {
    const { pathname } = new URL(request.url);
    if (pathname !== "/") {
      const contents = await options.read?.(pathname);
      if (contents == null) {
        return new Response("Not found", { status: 404 });
      }
      const extension = pathname.split(".").pop() ?? "";
      // Copied into a plain `ArrayBuffer`: a `Uint8Array` over a `SharedArrayBuffer`
      // is not a body, and the type can't tell the two apart.
      return new Response(contents.slice().buffer as ArrayBuffer, {
        headers: {
          "content-type": contentTypes[extension] ?? "application/octet-stream",
        },
      });
    }
    // Bundled per request, so an edit shows on reload rather than on restart.
    // A deployment bundles once and serves the JSON as a file.
    const payload = await bundle(app);
    if (!(request.headers.get("accept") ?? "").includes("text/html")) {
      return new Response(JSON.stringify(payload), {
        headers: { "content-type": "application/json; charset=utf-8" },
      });
    }
    return new Response(renderDocument(payload, options), {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  };
}
