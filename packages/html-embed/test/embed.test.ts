import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseHTML } from "linkedom";
import type { ClientUnknown } from "@backtickjs/boundary";
import type { Bundle } from "@backtickjs/bundler";
import { embed } from "../src/embed.ts";

const template =
  `<!doctype html><html><head></head><body>` +
  `<div id="a"><p id="first">first</p></div>` +
  `<p id="between">between</p>` +
  `<div id="b"></div>` +
  `</body></html>`;

// A bundle holding every character an HTML serializer is tempted to rewrite,
// and the one sequence that would end the script it rides in.
const bundle = (mark: string): Bundle<ClientUnknown> =>
  ({
    functions: {
      "0": ["=>", [], ["el", "em", {}, `& < > " ' </script> ${mark}`]],
    },
    root: ["()", ["fn", "0"], []],
  }) as unknown as Bundle<ClientUnknown>;

const scripts = (html: string): string[] =>
  [...parseHTML(html).document.querySelectorAll("script[data-backtick]")].map(
    (script) => script.textContent ?? "",
  );

describe("more than one bundle in a document", () => {
  it("carries each one back whole", () => {
    let html = embed(template, "#a", bundle("one"));
    html = embed(html, "#a", bundle("two"));
    html = embed(html, "#b", bundle("three"));

    // Each call parses back what the last one wrote, so a bundle embedded first
    // is serialized once more for every one that follows it.
    assert.deepEqual(
      scripts(html).map((held) => JSON.parse(held)),
      [bundle("one"), bundle("two"), bundle("three")],
    );
  });

  it("puts each one where its selector said", () => {
    let html = embed(template, "#a", bundle("one"));
    html = embed(html, "#a", bundle("two"));
    html = embed(html, "#b", bundle("three"));
    const { document } = parseHTML(html);
    const held = (id: string): string[] =>
      [...document.querySelector(`#${id}`)!.children].map((node) =>
        node.id === "" ? node.tagName.toLowerCase() : node.id,
      );

    // After what the target already held, in the order they were embedded, and
    // nothing between the targets is moved.
    assert.deepEqual(held("a"), ["first", "script", "script"]);
    assert.deepEqual(held("b"), ["script"]);
    assert.ok(document.querySelector("#between") !== null);
  });

  it("throws where a selector matches nothing", () => {
    assert.throws(
      () => embed(template, "#nowhere", bundle("one")),
      /nothing in the document matches/,
    );
  });
});
