import assert from "node:assert/strict";
import { test } from "node:test";
import { createImport, createJsxElement } from "@backtickjs/core";
import { es } from "./es.ts";

// A host element is printed as JSX, for the framework's compiler: read back
// here as the module the bundler answers.

async function printed(
  type: Parameters<typeof createJsxElement>[0],
  props: { [key: string]: unknown },
): Promise<string> {
  return await es(createJsxElement(type, props));
}

const root = async (...args: Parameters<typeof printed>) =>
  (await printed(...args)).match(/^export default \(([\s\S]*)\);$/m)![1]!;

test("an element is a JSX tag", async () => {
  assert.equal(await root("br", {}), "<br />");
});

test("a prop is an attribute under its own name", async () => {
  assert.equal(await root("td", { class: "col" }), '<td class={"col"} />');
});

test("children are expressions inside the tag", async () => {
  assert.equal(
    await root("tr", { children: ["one", 2] }),
    '<tr>{"one"}{2}</tr>',
  );
});

test("an element holds an element as a tag", async () => {
  assert.equal(
    await root("tr", { children: createJsxElement("td", {}) }),
    "<tr><td /></tr>",
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

test("a component runs once per element per bundle", async () => {
  // An element held at module level is the same object in every bundle, so
  // what its component drew for one request must not be the next one's.
  let runs = 0;
  const Counted = () => {
    runs += 1;
    return "drawn";
  };
  const element = createJsxElement(Counted, {});
  await es([element, element]);
  assert.equal(runs, 1);
  await es(element);
  assert.equal(runs, 2);
});
