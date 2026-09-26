import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { importMap, renderToString } from "@backtickjs/solid-js/server";
import { snapshotCase } from "../snapshotCase.ts";
// A bundle written into a page's module script, which must not end it early.
const text = `& < > " ' </script> <!-- -->`;
const scriptCloseText = _jsx("p", { children: text });
const PAGE =
  /^<div id="([^"]+)"><\/div><script type="module">\n([\s\S]*)\n<\/script>$/;
const drawn = [];
afterEach(() => drawn.splice(0).forEach((container) => container.remove()));
// A page's markup, run as a browser runs it: the container in the document,
// and the script imported as a module, its bare imports resolved by the test
// environment as a page's import map resolves them.
async function draw(page) {
  const [, id, script] = PAGE.exec(page);
  const container = document.createElement("div");
  container.id = id;
  document.body.append(container);
  drawn.push(container);
  await import(`data:text/javascript,${encodeURIComponent(script)}`);
  return container;
}
describe("renderToString", () => {
  it("writes a container and one module script", async () => {
    assert.match(await renderToString(scriptCloseText), PAGE);
  });
  it("writes no `<` its script's parser could read", async () => {
    const [, , script] = PAGE.exec(await renderToString(scriptCloseText));
    assert.ok(!script.includes("<"));
  });
  it("draws the text as written, where it stands", async () => {
    const container = await draw(await renderToString(scriptCloseText));
    assert.equal(container.querySelector("p")?.textContent, text);
  });
  it("draws each bundle into its own container", async () => {
    const first = await draw(
      await renderToString(_jsx("p", { children: "first" })),
    );
    const second = await draw(
      await renderToString(_jsx("p", { children: "second" })),
    );
    assert.equal(first.textContent, "first");
    assert.equal(second.textContent, "second");
  });
});
describe("importMap", () => {
  it("maps Solid's modules to the CDN, one version for all", () => {
    const open = '<script type="importmap">';
    const map = importMap();
    const { imports } = JSON.parse(map.slice(open.length, -"</script>".length));
    assert.deepEqual(Object.keys(imports), [
      "solid-js",
      "solid-js/web",
      "solid-js/store",
    ]);
    const versions = new Set(
      Object.values(imports).map((url) => /solid-js@([^/]+)/.exec(url)[1]),
    );
    assert.equal(versions.size, 1);
  });
});
describe("what each case compiles and bundles to", () => {
  it("scriptCloseText", async (t) => {
    await snapshotCase(t, "scriptCloseText", scriptCloseText);
  });
});
