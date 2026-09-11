import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { parseHTML } from "linkedom";
import { bundler } from "@backtickjs/bundler";
import { createJsxElement } from "@backtickjs/ui";
import { embed } from "../src/embed.ts";

const template =
  `<!doctype html><html><head></head><body>` +
  `<div id="a"><p id="first">first</p></div>` +
  `<p id="between">between</p>` +
  `<div id="b"></div>` +
  `</body></html>`;

// A drawing holding every character an HTML serializer is tempted to rewrite,
// and the one sequence that would end the script it rides in.
//
// Built rather than written out: what a bundle looks like is the bundler's, and
// a test that spelled one would be a test of the format rather than of this.
const made = async (mark: string) =>
  await bundler.run(
    createJsxElement("p", { children: `& < > " ' </script> ${mark}` }),
  );

const [one, two, three] = await Promise.all([
  made("one"),
  made("two"),
  made("three"),
]);

const scripts = (html: string): string[] =>
  [...parseHTML(html).document.querySelectorAll("script[data-backtick]")].map(
    (script) => script.textContent ?? "",
  );

describe("more than one bundle in a document", () => {
  it("carries each one back whole", () => {
    let html = embed(template, "#a", one);
    html = embed(html, "#a", two);
    html = embed(html, "#b", three);

    // Each call parses back what the last one wrote, so a bundle embedded first
    // is serialized once more for every one that follows it.
    assert.deepEqual(
      scripts(html).map((held) => JSON.parse(held)),
      [one, two, three],
    );
  });

  it("puts each one where its selector said", () => {
    let html = embed(template, "#a", one);
    html = embed(html, "#a", two);
    html = embed(html, "#b", three);
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
      () => embed(template, "#nowhere", one),
      /nothing in the document matches/,
    );
  });
});
