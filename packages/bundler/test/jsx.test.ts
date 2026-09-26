import assert from "node:assert/strict";
import { test } from "node:test";
import { createImport } from "@backtickjs/platform-sdk";
import { createJsxElement } from "@backtickjs/ui-platform-sdk";
import { bundler } from "../dist/bundler.js";

// A host element is printed as JSX, for the framework's compiler: read back
// here as the module the bundler answers.

async function printed(
  type: Parameters<typeof createJsxElement>[0],
  props: { [key: string]: unknown },
): Promise<string> {
  return (await bundler.run(createJsxElement(type, props))).code;
}

const root = async (...args: Parameters<typeof printed>) =>
  (await printed(...args)).match(/export default \(\) => \(([\s\S]*)\);$/)![1]!;

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

test("a client module's component is a tag of its import", async () => {
  const For = createImport({ name: "For", from: "solid-js" });
  const module = await printed(For as never, { each: [1] });
  assert.match(module, /^import \{ For as \$i0 \} from "solid-js";/);
  assert.match(module, /export default \(\) => \(<\$i0 each=\{\[1\]\} \/>\);/);
});
