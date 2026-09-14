import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { schema } from "@backtickjs/web/schema";
import { dom } from "../src/dom.ts";

// The two ways a bundle could run what wrote it, each held to not happening.
//
// A bundle is walked node by node by this renderer rather than parsed as markup,
// so what a hostile one can reach is what these two answer with — which is why
// each case asserts the thing did not happen, not that something was cleaned up.

// A node that records which route a value took onto it.
function node(namespace = "http://www.w3.org/1999/xhtml") {
  const attrs: { [name: string]: string } = {};
  return {
    attrs,
    setAttribute: (name: string, value: string) => {
      attrs[name] = value;
    },
    removeAttribute: (name: string) => {
      delete attrs[name];
    },
    addEventListener: () => {},
    namespaceURI: namespace,
  };
}

// The document `createElement` asks, recording what it was asked for. Standing
// in for a browser's, so a refusal is a tag that never reached it.
function documented(): { asked: string[] } {
  const asked: string[] = [];
  const made = (tag: string) => ({ tag });
  (globalThis as { document?: unknown }).document = {
    createElement: (tag: string) => {
      asked.push(tag);
      return made(tag);
    },
    createElementNS: (_namespace: string, tag: string) => {
      asked.push(`svg:${tag}`);
      return made(tag);
    },
  };
  return { asked };
}

describe("a tag that would execute", () => {
  // HTML folds a tag name, so every spelling of it is the element.
  it("is refused in either language, and in HTML whatever its case", () => {
    for (const tag of ["script", "SCRIPT", "Script", "svg:script"]) {
      const { asked } = documented();
      assert.throws(
        () => dom.createElement(tag),
        /may not draw/,
        `\`${tag}\` was drawn`,
      );
      assert.deepEqual(asked, [], `\`${tag}\` reached the document`);
    }
  });

  // SVG does not fold, so `svg:SCRIPT` is an unknown element rather than the
  // one that runs. Verified in Chrome rather than read off the spec.
  it("does not stop a tag that only looks like one", () => {
    const { asked } = documented();
    for (const tag of ["svg:SCRIPT", "script-viewer", "marquee"]) {
      dom.createElement(tag);
    }
    assert.deepEqual(asked, ["svg:SCRIPT", "script-viewer", "marquee"]);
  });
});

describe("a handler that is not a function", () => {
  // `setAttribute("onerror", "…")` is source text the browser compiles, so a
  // string reaching an `on` name is a working inline handler.
  it("never reaches the attribute", () => {
    for (const prop of ["onerror", "onclick", "onError", "ONCLICK"]) {
      const el = node();
      assert.throws(
        () => dom.setProperty(el as never, prop, "alert(1)"),
        /takes a function/,
        `\`${prop}\` was allowed`,
      );
      assert.deepEqual(el.attrs, {}, `\`${prop}\` was written`);
    }
  });

  it("is refused whatever kind of value it is", () => {
    const el = node();
    for (const value of ["alert(1)", true, 1]) {
      assert.throws(() => dom.setProperty(el as never, "onclick", value));
    }
    assert.deepEqual(el.attrs, {});
  });

  it("leaves a function alone", () => {
    const el = node();
    dom.setProperty(el as never, "onclick", () => {});
    assert.deepEqual(el.attrs, {});
  });

  // The other direction: a function under a name no event answers to would have
  // been registered nowhere, which reads afterwards as a handler that never
  // fired.
  it("is refused the other way round too", () => {
    const el = node();
    assert.throws(
      () => dom.setProperty(el as never, "title", () => {}),
      /takes a value, not a function/,
    );
    assert.deepEqual(el.attrs, {});
  });

  // Nothing this removes was ever set, so a prop that went away stays a prop
  // that went away rather than becoming an error a drawing has to survive.
  it("lets an absent handler stay absent", () => {
    const el = node();
    dom.setProperty(el as never, "onclick", null);
    dom.setProperty(el as never, "onclick", undefined);
    assert.deepEqual(el.attrs, {});
  });

  // The rule is the prefix, not a list of events, so it refuses names no browser
  // would have run — `one`, `onset`, an `onboarding` a custom element made up.
  // Deliberate: which `on` names execute is the browser's list and it grows,
  // and a rule that has to be kept level with it is a rule that falls behind.
  // Nothing in HTML takes an attribute that starts this way and is not a
  // handler, so what this costs is a name nobody has.
  it("refuses a name that merely starts the same", () => {
    const el = node();
    assert.throws(() => dom.setProperty(el as never, "one", "1"));
    assert.deepEqual(el.attrs, {});
  });
});

// The rule is one name, so what can go wrong is the schema growing it back:
// declared and refused is a tag a drawing may write and no client will draw.
describe("the vocabulary and the schema", () => {
  // In either language: a tag drawn inside an `svg` arrives prefixed.
  it("declares no tag that would be refused", () => {
    const declared = Object.keys(schema.elements);
    const { asked } = documented();
    for (const tag of declared) {
      dom.createElement(tag);
      dom.createElement(`svg:${tag}`);
    }
    assert.equal(asked.length, declared.length * 2);
  });

  it("declares no `script`", () => {
    assert.ok(!("script" in schema.elements));
  });
});
