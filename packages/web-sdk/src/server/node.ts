import { createServer, type Server } from "node:http";
import { createHandler, type Route } from "./handler.js";

// An app's routes, and nothing else.
//
// This writes no HTML and knows of no page. A route that answers with a
// document builds that document itself, which is what `toHtml` is for — and
// that document carries the client, so there is nothing for a plain app to
// serve but the paths it answers for.
//
// No files, either: an app with a stylesheet or an image of its own passes a
// reader to `createHandler` and listens itself —
// `listen(createHandler(routes, { read }))`. Reading a directory safely is a
// job with one rule that matters, that a `..` may not climb out of it, and this
// package has no reason to be the one that gets it right.
export function serve(routes: readonly Route[]): Server {
  return listen(createHandler(routes));
}

// Node's half of what a runtime spells its own way: `node:http` predates
// `Request`/`Response`, so a handler needs the two translated. Bun needs none
// of this — `Bun.serve({ fetch })` takes a handler as it is.
export function listen(
  handle: (request: Request) => Promise<Response>,
): Server {
  return createServer((incoming, outgoing) => {
    const request = new Request(
      new URL(incoming.url ?? "/", "http://localhost"),
      { headers: incoming.headers as Record<string, string> },
    );
    void handle(request).then(
      async (response) => {
        outgoing.writeHead(
          response.status,
          Object.fromEntries(response.headers),
        );
        outgoing.end(Buffer.from(await response.arrayBuffer()));
      },
      (error: unknown) => {
        outgoing.writeHead(500, { "content-type": "text/plain" });
        outgoing.end(String(error));
      },
    );
  });
}
