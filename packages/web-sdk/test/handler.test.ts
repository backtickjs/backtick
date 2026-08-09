import assert from "node:assert/strict";
import { test } from "node:test";
import {
  contentType,
  createHandler,
  respond,
  type Route,
} from "../dist/server/index.js";

const said = (text: string) => new TextEncoder().encode(text);

// Routes that answer with the path they matched and what it matched, so a test
// can read both out of the body.
const routes: Route[] = [
  "/",
  "/todos/new",
  "/todos/:id",
  "/todos/:id/notes/:note",
].map((path) => ({
  path,
  respond: ({ params }) =>
    respond(said(`${path} ${JSON.stringify(params)}`), "text/plain"),
}));

const handle = createHandler(routes, {
  read: async (path) =>
    path === "/main.js"
      ? said("export {}")
      : path === "/index.html"
        ? said("<!doctype html><html></html>")
        : null,
});

const ask = async (path: string, handler = handle) => {
  const answer = await handler(new Request(`http://localhost${path}`));
  return { status: answer.status, body: await answer.text(), answer };
};

test("a path with as many segments as a route is that route's", async () => {
  assert.equal((await ask("/todos/42")).body, '/todos/:id {"id":"42"}');
  assert.equal(
    (await ask("/todos/42/notes/7")).body,
    '/todos/:id/notes/:note {"id":"42","note":"7"}',
  );
});

test("a path with too few or too many segments is not", async () => {
  // Segment by segment, so a parameter is one segment and never several.
  assert.equal((await ask("/todos")).status, 404);
  assert.equal((await ask("/todos/42/edit")).status, 404);
});

test("a parameter is read as it was written, not as it was sent", async () => {
  assert.equal((await ask("/todos/a%20b")).body, '/todos/:id {"id":"a b"}');
});

test("a route earlier in the list wins the path", async () => {
  // `/todos/new` is a page, `/todos/:id` is a parameter, and both match. The
  // order they were written in is what says which was meant.
  assert.equal((await ask("/todos/new")).body, "/todos/new {}");
});

test("a route answers with whatever it built", async () => {
  // Nothing here reads what a route hands back, so a route is free to answer
  // with a page, a bundle as JSON, or an image.
  const json = createHandler([
    { path: "/", respond: () => Response.json({ drawn: true }) },
  ]);
  assert.deepEqual(
    await (await json(new Request("http://localhost/"))).json(),
    {
      drawn: true,
    },
  );
});

test("a path no route claims is read as a file", async () => {
  const { body, answer } = await ask("/main.js");
  assert.equal(body, "export {}");
  assert.equal(answer.headers.get("content-type"), "text/javascript");
});

test("a path nothing can answer for is a 404", async () => {
  assert.equal((await ask("/missing.js")).status, 404);
  // No reader at all is the static case: routes, and nothing else.
  assert.equal((await ask("/main.js", createHandler(routes))).status, 404);
});

test("everything served is asked for again next time", async () => {
  // One rule, and no revalidation to get wrong: a dev server reads its files
  // per request anyway, and a route answers with what is true now.
  for (const path of ["/", "/index.html", "/main.js"]) {
    const { answer } = await ask(path);
    assert.equal(answer.headers.get("cache-control"), "no-cache");
    assert.equal(answer.headers.get("etag"), null);
  }
});

test("the type a path implies is read from its name", () => {
  assert.equal(contentType("/index.html"), "text/html");
  assert.equal(contentType("/app.js"), "text/javascript");
  assert.equal(contentType("/app.js.map"), "application/json");
  // A directory has no extension to read, and what it serves is its page.
  assert.equal(contentType("/todos/"), "text/html");
  assert.equal(contentType("/logo.avif"), "application/octet-stream");
});
