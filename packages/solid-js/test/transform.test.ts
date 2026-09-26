import "global-jsdom/register";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { after, describe, it } from "node:test";
import { pathToFileURL } from "node:url";
import { emitScripts } from "@backtickjs/compiler";
import { createSignal } from "solid-js";
import * as web from "solid-js/web";
import ts from "typescript";
import { transform } from "../dist/transform.js";

// Each script in `host`, compiled by backtick's compiler and then Solid's, as
// a module exporting it.
function compile(host: string) {
  return emitScripts(ts, "host.tsx", host).map((script) =>
    transform(`export default ${script.code};`, "host.tsx"),
  );
}

// Inside the package, so a module's imports resolve to the Solid this test
// renders with.
const cache = join(import.meta.dirname, "..", "node_modules", ".cache");
mkdirSync(cache, { recursive: true });
const modules = mkdtempSync(join(cache, "modules-"));
after(() => rmSync(modules, { recursive: true }));

// What a script's module exports by default.
let written = 0;
async function entry(code: string): Promise<(...args: unknown[]) => unknown> {
  const file = join(modules, `${written++}.js`);
  writeFileSync(file, code);
  return (await import(pathToFileURL(file).href)).default;
}

function draw(render: () => unknown): HTMLElement {
  const container = document.createElement("div");
  document.body.append(container);
  web.render(render as () => web.JSX.Element, container);
  return container;
}

const counter = `import { createSignal } from "solid-js";
export const counter = cs\`{
  const signal = $createSignal(0);
  return (
    <button onclick={() => signal[1](signal[0]() + 1)}>
      clicked {signal[0]()}
    </button>
  );
}\`;
`;

describe("transform", () => {
  it("runs as Solid code, splices and all", async () => {
    const [script] = compile(counter);
    const counterEntry = await entry(script!.code);
    const container = draw(() => counterEntry(() => createSignal));
    assert.equal(container.textContent, "clicked 0");
    container.querySelector("button")!.click();
    assert.equal(container.textContent, "clicked 1");
  });

  it("hands a tag its component as a value", async () => {
    const [script] = compile(`export const list = cs\`{
  const rows = ["a", "b"];
  return <ul><For each={rows}>{(row: string) => <li>{row}</li>}</For></ul>;
}\`;
`);
    const listEntry = await entry(script!.code);
    const container = draw(() => listEntry(web.For));
    assert.equal(container.innerHTML, "<ul><li>a</li><li>b</li></ul>");
  });
});
