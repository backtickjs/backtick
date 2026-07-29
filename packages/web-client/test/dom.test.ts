import assert from "node:assert/strict";
import { test, beforeEach } from "node:test";
import { Element } from "@backtickjs/js-interpreter";
import { renderInto } from "../dist/dom.js";

// The slice of the DOM `dom.ts` reaches for. Modelled rather than imported so
// this needs no browser: every assertion below is about the mapping this
// package owns — which tag, which unit, which listener — and not about what a
// browser does with the result.
interface Fake {
  tag: string;
  style: Record<string, string>;
  dataset: Record<string, string>;
  attributes: Record<string, string>;
  children: unknown[];
  listeners: Record<string, (() => void)[]>;
  src?: string;
}

const node = (tag: string): Fake => {
  const self: Fake = {
    tag,
    style: new Proxy({} as Record<string, string>, {
      get: (target, key: string) =>
        key === "setProperty"
          ? (name: string, value: string) => {
              target[name] = value;
            }
          : target[key],
      set: (target, key: string, value: string) => {
        target[key] = value;
        return true;
      },
    }),
    dataset: {},
    attributes: {},
    children: [],
    listeners: {},
  };
  return Object.assign(self, {
    setAttribute: (name: string, value: string) => {
      self.attributes[name] = value;
    },
    append: (...kids: unknown[]) => self.children.push(...kids),
    addEventListener: (kind: string, run: () => void) => {
      (self.listeners[kind] ??= []).push(run);
    },
  });
};

let root: Fake & { replaceChildren?: (...kids: unknown[]) => void };

beforeEach(() => {
  (globalThis as Record<string, unknown>).document = {
    createElement: node,
    createTextNode: (text: string) => ({ text }),
  };
  root = node("root");
  root.replaceChildren = (...kids: unknown[]) => {
    root.children = kids;
  };
});

const render = (tree: unknown): Fake[] => {
  renderInto(root as never, tree);
  return root.children as Fake[];
};

test("maps the component vocabulary onto tags", () => {
  assert.equal(render(new Element("View", null, {}))[0]?.tag, "div");
  assert.equal(render(new Element("Text", null, {}))[0]?.tag, "span");
  assert.equal(render(new Element("Image", null, {}))[0]?.tag, "img");
});

test("a View lays out as a column, as on the native clients", () => {
  const view = render(new Element("View", null, {}))[0];
  assert.equal(view?.style.display, "flex");
  assert.equal(view?.style.flexDirection, "column");
});

test("a bare number means pixels for a length, and nothing else", () => {
  const styled = render(
    new Element("Text", null, { style: { fontSize: 14, flexGrow: 2 } }),
  )[0];
  assert.equal(styled?.style["font-size"], "14px");
  // `flexGrow` is unitless in CSS too, so a number stays a number.
  assert.equal(styled?.style["flex-grow"], "2");
});

test("a Fragment renders its children with no node of its own", () => {
  const kids = render(
    new Element("Fragment", null, {
      children: [new Element("Text", null, {}), new Element("Text", null, {})],
    }),
  );
  assert.deepEqual(
    kids.map((each) => each.tag),
    ["span", "span"],
  );
});

test("onPress becomes a click listener, testID a data attribute", () => {
  let pressed = 0;
  const button = render(
    new Element("Text", null, {
      onPress: () => (pressed += 1),
      testID: "go",
    }),
  )[0];
  assert.equal(button?.dataset.testid, "go");
  assert.equal(button?.style.cursor, "pointer");
  button?.listeners.click?.[0]?.();
  assert.equal(pressed, 1);
});

test("names the components it can render when it meets one it can't", () => {
  assert.throws(() => render(new Element("Slider", null, {})), {
    message:
      /No web rendering for <Slider \/>.*View, Text, Image, Link and Fragment/s,
  });
});

test("a Link renders as the tag a browser can already follow", () => {
  const link = render(
    new Element("Link", null, { href: "/about", children: "About" }),
  )[0];
  assert.equal(link?.tag, "a");
  // `href` is not one of the props handled specially, so it falls through as an
  // ordinary attribute — no wiring of its own.
  assert.equal(link?.attributes.href, "/about");
});
