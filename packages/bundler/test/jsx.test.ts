import assert from "node:assert/strict";
import { test } from "node:test";
import { createImport, createJsxElement } from "@backtickjs/core";
import { es } from "./es.ts";

// A host element: a server component's, run while bundling, and nothing the
// client draws, which is written in a script.

async function printed(
  type: Parameters<typeof createJsxElement>[0],
  props: { [key: string]: unknown },
): Promise<string> {
  return await es(createJsxElement(type, props));
}

test("an intrinsic element is not a tag on the host", async () => {
  await assert.rejects(
    () => printed("br", {}),
    /`<br>` is drawn by the client, so it belongs in a script/,
  );
});

test("a client module's component is not a tag on the host", async () => {
  // It's client code, a tag in a script.
  const For = createImport({
    name: "For",
    from: "solid-js",
    version: "^1.9.0",
  });
  await assert.rejects(
    () => printed(For as never, { each: [1] }),
    /`<For>` is a client component, so it can't be a tag on the host/,
  );
});

test("a component runs each place its element is drawn", async () => {
  // As React renders an element each place it stands, in every bundle: an
  // element held at module level is the same object in each, and what its
  // component drew for one request is never the next one's.
  let runs = 0;
  const Counted = () => {
    runs += 1;
    return "drawn";
  };
  const element = createJsxElement(Counted, {});
  await es([element, element]);
  assert.equal(runs, 2);
  await es(element);
  assert.equal(runs, 3);
});
