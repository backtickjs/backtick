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

test("sibling components expand at once", async () => {
  // Each waits for the other to start, so expanding one after the other
  // never finishes.
  let started = 0;
  let bothStarted!: () => void;
  const both = new Promise<void>((resolve) => (bothStarted = resolve));
  const Waits = async () => {
    started += 1;
    if (started === 2) {
      bothStarted();
    }
    await both;
    return "drawn";
  };
  const code = await Promise.race([
    es([createJsxElement(Waits, {}), createJsxElement(Waits, {})]),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("expanded one at a time")), 1000),
    ),
  ]);
  assert.match(code, /^export default \(\["drawn", "drawn"\]\);$/m);
});

test("what a component draws is expanded in turn", async () => {
  const Inner = async () => ({ label: "inner" });
  const Outer = () => ({ child: createJsxElement(Inner, {}) });
  assert.match(
    await es(createJsxElement(Outer, {})),
    /^export default \(\{ child: \{ label: "inner" \} \}\);$/m,
  );
});

test("a component that draws its own element is a cycle", async () => {
  const element = createJsxElement(() => [element], {});
  await assert.rejects(() => es(element), /contains itself/);
});

test("a `__proto__` key next to a component stays a key", async () => {
  const value = JSON.parse('{"__proto__": {"admin": true}}');
  value.drawn = createJsxElement(() => "drawn", {});
  assert.match(
    await es(value),
    /^export default \(\{ \["__proto__"\]: \{ admin: true \}, drawn: "drawn" \}\);$/m,
  );
});
