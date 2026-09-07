import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { schema } from "@backtickjs/web-schema/schema";
import { DRAWABLE, dom } from "../src/dom.ts";

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

describe("a tag outside the vocabulary", () => {
  // Both languages have a `script` and both execute it.
  it("refuses the two that would execute", () => {
    for (const tag of ["script", "svg:script"]) {
      const { asked } = documented();
      assert.throws(
        () => dom.createElement(tag),
        /may not draw/,
        `\`${tag}\` was drawn`,
      );
      assert.deepEqual(asked, [], `\`${tag}\` reached the document`);
    }
  });

  // What an allowlist buys over a list of refusals: a name nobody weighed is a
  // name that draws nothing, spelling included.
  it("refuses a name it was never given", () => {
    for (const tag of ["SCRIPT", "Script", "svg:SCRIPT", "marquee", "DIV"]) {
      const { asked } = documented();
      assert.throws(() => dom.createElement(tag), `\`${tag}\` was drawn`);
      assert.deepEqual(asked, [], `\`${tag}\` reached the document`);
    }
  });

  it("draws what the schema does declare", () => {
    const { asked } = documented();
    for (const tag of ["div", "img", "svg:path", "svg:animateMotion"]) {
      dom.createElement(tag);
    }
    assert.deepEqual(asked, ["div", "img", "svg:path", "svg:animateMotion"]);
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

// The list is written out rather than read off the schema, so this is what keeps
// the two level: a tag added to the schema and not here would be declared and
// undrawable, and one left here after the schema dropped it would be drawable and
// undeclared — which is how `script` would come back.
describe("the vocabulary and the schema", () => {
  it("draws every tag the schema declares", () => {
    for (const tag of Object.keys(schema.elements)) {
      assert.ok(DRAWABLE.has(tag), `\`${tag}\` is declared and not drawable`);
    }
  });

  it("declares every tag it draws", () => {
    for (const tag of DRAWABLE) {
      assert.ok(
        tag in schema.elements,
        `\`${tag}\` is drawable and not declared`,
      );
    }
  });
});
