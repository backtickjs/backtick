import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { fireEvent, render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
// How a prop lands on the element it was drawn on: as the attribute a page's
// own markup would have written.
const SVG = "http://www.w3.org/2000/svg";
const HTML = "http://www.w3.org/1999/xhtml";
async function drawn(value) {
  const { container } = await render(value);
  return container.firstElementChild;
}
// Every attribute an element holds, by the name it was written under.
function attributes(element) {
  return Object.fromEntries(
    [...element.attributes].map((attribute) => [
      attribute.name,
      attribute.value,
    ]),
  );
}
describe("a prop", () => {
  it("is written as an attribute", async () => {
    const link = await drawn(
      _jsx("a", { href: "/counter", id: "press", children: "go" }),
    );
    assert.deepEqual(attributes(link), { href: "/counter", id: "press" });
  });
});
describe("an svg tag", () => {
  // `document.createElement("path")` is an `HTMLUnknownElement`: it parses, it
  // inserts, and it draws nothing. The prefix, which the interpreter adds to a
  // tag drawn inside an `svg`, is what says which namespace it is from.
  it("is made in the SVG namespace, without its prefix", async () => {
    const root = await drawn(
      _jsx("div", { children: _jsx("svg", { children: _jsx("path", {}) }) }),
    );
    const path = root.querySelector("path");
    assert.equal(path.namespaceURI, SVG);
    assert.equal(path.localName, "path");
    assert.equal(root.namespaceURI, HTML);
  });
});
describe("an attribute's case", () => {
  // HTML's attribute names are case-insensitive and SVG's are not, so one rule
  // cannot serve both: lowercasing is what makes a prop and an attribute the
  // same name in HTML, and what loses `viewBox` in SVG.
  it("is kept in the SVG namespace", async () => {
    const svg = await drawn(_jsx("svg", { viewBox: "0 0 279 38" }));
    assert.deepEqual(attributes(svg), { viewBox: "0 0 279 38" });
  });
  // The schema spells these the way SVG does, so a prop, the name on the wire
  // and the string handed to `setAttribute` are one name — nothing here has a
  // table to get from one to another.
  it("writes a hyphenated presentation name straight through", async () => {
    const svg = await drawn(
      _jsxs("svg", {
        children: [
          _jsx("path", { "stroke-width": 2, "fill-rule": "evenodd" }),
          _jsx("filter", { "color-interpolation-filters": "sRGB" }),
        ],
      }),
    );
    assert.deepEqual(attributes(svg.querySelector("path")), {
      "stroke-width": "2",
      "fill-rule": "evenodd",
    });
    assert.deepEqual(attributes(svg.querySelector("filter")), {
      "color-interpolation-filters": "sRGB",
    });
  });
  // And the ones SVG spells camel itself, which lowercasing would lose.
  it("leaves an attribute SVG spells camel alone", async () => {
    const svg = await drawn(
      _jsxs("svg", {
        children: [
          _jsx("linearGradient", { gradientTransform: "rotate(90)" }),
          _jsx("feTurbulence", { numOctaves: 3 }),
        ],
      }),
    );
    assert.deepEqual(attributes(svg.children[0]), {
      gradientTransform: "rotate(90)",
    });
    assert.deepEqual(attributes(svg.children[1]), { numOctaves: "3" });
  });
  it("is still folded down in HTML", async () => {
    // @ts-expect-error: the schema declares no `tabIndex` on a `div`
    const div = await drawn(_jsx("div", { tabIndex: 2 }));
    assert.deepEqual(attributes(div), { tabindex: "2" });
  });
});
describe("a field's value", () => {
  // Once a field is edited, its `value` and `checked` attributes are only its
  // defaults, so a write that reaches the attribute changes nothing shown.
  async function Field() {
    return cs.create(
      [111, 12, 128, 7],
      {
        version: "0.0.0",
        filePath: "render/attributes.test.tsx",
        fileHash: "2clp1jg90dm69",
        splices: { $state: { value: state, params: [] } },
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [111, 15, 128, 6],
        statements: [
          {
            kind: "const",
            loc: [112, 7, 112, 36],
            name: {
              kind: "id",
              loc: [112, 13, 112, 17],
              text: "text",
              bindingKey: "text$2clp1jg90dm69$0",
            },
            initializer: {
              kind: "()",
              loc: [112, 20, 112, 35],
              expression: {
                kind: "splice",
                loc: [112, 20, 112, 26],
                key: "$state",
              },
              arguments: [
                {
                  kind: "string",
                  loc: [112, 27, 112, 34],
                  text: "first",
                },
              ],
            },
          },
          {
            kind: "const",
            loc: [113, 7, 113, 34],
            name: {
              kind: "id",
              loc: [113, 13, 113, 17],
              text: "isOn",
              bindingKey: "isOn$2clp1jg90dm69$1",
            },
            initializer: {
              kind: "()",
              loc: [113, 20, 113, 33],
              expression: {
                kind: "splice",
                loc: [113, 20, 113, 26],
                key: "$state",
              },
              arguments: [
                {
                  kind: "false",
                  loc: [113, 27, 113, 32],
                },
              ],
            },
          },
          {
            kind: "return",
            loc: [114, 7, 127, 9],
            expression: {
              kind: "jsx",
              loc: [115, 9, 126, 15],
              type: {
                kind: "string",
                loc: [115, 10, 115, 13],
                text: "div",
              },
              attributes: [],
              children: [
                {
                  kind: "jsx",
                  loc: [116, 11, 116, 58],
                  type: {
                    kind: "string",
                    loc: [116, 12, 116, 17],
                    text: "input",
                  },
                  attributes: [
                    {
                      name: "aria-label",
                      initializer: {
                        kind: "string",
                        loc: [116, 29, 116, 35],
                        text: "text",
                      },
                    },
                    {
                      name: "value",
                      initializer: {
                        kind: "()",
                        loc: [116, 43, 116, 54],
                        expression: {
                          kind: ".",
                          loc: [116, 43, 116, 52],
                          expression: {
                            kind: "id",
                            loc: [116, 43, 116, 47],
                            text: "text",
                            bindingKey: "text$2clp1jg90dm69$0",
                          },
                          name: "read",
                        },
                        arguments: [],
                      },
                    },
                  ],
                  children: [],
                },
                {
                  kind: "jsx",
                  loc: [117, 11, 117, 74],
                  type: {
                    kind: "string",
                    loc: [117, 12, 117, 17],
                    text: "input",
                  },
                  attributes: [
                    {
                      name: "type",
                      initializer: {
                        kind: "string",
                        loc: [117, 23, 117, 33],
                        text: "checkbox",
                      },
                    },
                    {
                      name: "aria-label",
                      initializer: {
                        kind: "string",
                        loc: [117, 45, 117, 49],
                        text: "on",
                      },
                    },
                    {
                      name: "checked",
                      initializer: {
                        kind: "()",
                        loc: [117, 59, 117, 70],
                        expression: {
                          kind: ".",
                          loc: [117, 59, 117, 68],
                          expression: {
                            kind: "id",
                            loc: [117, 59, 117, 63],
                            text: "isOn",
                            bindingKey: "isOn$2clp1jg90dm69$1",
                          },
                          name: "read",
                        },
                        arguments: [],
                      },
                    },
                  ],
                  children: [],
                },
                {
                  kind: "jsx",
                  loc: [118, 11, 125, 20],
                  type: {
                    kind: "string",
                    loc: [118, 12, 118, 18],
                    text: "button",
                  },
                  attributes: [
                    {
                      name: "onclick",
                      initializer: {
                        kind: "=>",
                        loc: [119, 22, 122, 14],
                        parameters: [],
                        body: {
                          kind: "{}",
                          loc: [119, 28, 122, 14],
                          statements: [
                            {
                              kind: "()",
                              loc: [120, 15, 120, 35],
                              expression: {
                                kind: ".",
                                loc: [120, 15, 120, 25],
                                expression: {
                                  kind: "id",
                                  loc: [120, 15, 120, 19],
                                  text: "text",
                                  bindingKey: "text$2clp1jg90dm69$0",
                                },
                                name: "write",
                              },
                              arguments: [
                                {
                                  kind: "string",
                                  loc: [120, 26, 120, 34],
                                  text: "second",
                                },
                              ],
                            },
                            {
                              kind: "()",
                              loc: [121, 15, 121, 31],
                              expression: {
                                kind: ".",
                                loc: [121, 15, 121, 25],
                                expression: {
                                  kind: "id",
                                  loc: [121, 15, 121, 19],
                                  text: "isOn",
                                  bindingKey: "isOn$2clp1jg90dm69$1",
                                },
                                name: "write",
                              },
                              arguments: [
                                {
                                  kind: "true",
                                  loc: [121, 26, 121, 30],
                                },
                              ],
                            },
                          ],
                        },
                      },
                    },
                  ],
                  children: [
                    {
                      kind: "string",
                      loc: [124, 13, 125, 11],
                      text: "write",
                    },
                  ],
                },
              ],
            },
          },
        ],
      }),
    );
  }
  it("follows a write after the field was edited", async () => {
    await render(_jsx(Field, {}));
    const text = screen.getByLabelText("text");
    const on = screen.getByLabelText("on");
    fireEvent.input(text, { target: { value: "typed" } });
    await userEvent.click(on);
    await userEvent.click(on);
    await userEvent.click(screen.getByRole("button", { name: "write" }));
    assert.equal(text.value, "second");
    assert.equal(on.checked, true);
  });
});
