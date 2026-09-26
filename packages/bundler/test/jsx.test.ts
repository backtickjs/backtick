import assert from "node:assert/strict";
import { test } from "node:test";
import { createImport } from "@backtickjs/platform-sdk";
import { createJsxElement } from "@backtickjs/ui-platform-sdk";
import { bundler } from "../dist/bundler.js";

// A host element is printed as JSX for the adapter's transform: read back here
// as the module the bundler hands it.

async function printed(
  type: Parameters<typeof createJsxElement>[0],
  props: { [key: string]: unknown },
): Promise<string> {
  let module = "";
  await bundler.run(createJsxElement(type, props), {
    transform: (code) => {
      module = code;
      return { code: "const $bundle = null;", map: "" };
    },
  });
  return module;
}

const root = async (...args: Parameters<typeof printed>) =>
  (await printed(...args)).match(/const \$bundle = ([\s\S]*);\s*$/)![1]!;

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
  assert.match(module, /^import \{For as \$i0\} from "solid-js";/);
  assert.match(module, /\$bundle = <\$i0 each=\{\[1\]\} \/>;/);
});

test("what the transform imports is read from $modules", async () => {
  const code = await bundler.run(1, {
    transform: () => ({
      code: 'import { a as b, c } from "m";\nconst $bundle = b(c);',
      map: "",
    }),
  });
  assert.equal(
    code,
    '(() => {\nconst { "a": b, "c": c } = $modules["m"];\nconst $bundle = b(c);\nreturn $bundle;\n})()',
  );
});
