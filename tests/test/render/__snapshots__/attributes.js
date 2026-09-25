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
  // inserts, and it draws nothing. The prefix, which the runtime adds to a
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
      "2pi9tt1octht0:111:11",
      { params: [{ kind: "splice", value: state, bindings: [] }] },
      () => ({
        type: "BlockStatement",
        loc: {
          start: { line: 111, column: 14 },
          end: { line: 128, column: 5 },
        },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 112, column: 6 },
              end: { line: 112, column: 35 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 112, column: 12 },
                  end: { line: 112, column: 34 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 112, column: 12 },
                    end: { line: 112, column: 16 },
                  },
                  name: "text",
                  key: "text$2pi9tt1octht0$0",
                },
                init: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 112, column: 19 },
                    end: { line: 112, column: 34 },
                  },
                  callee: {
                    type: "Splice",
                    loc: {
                      start: { line: 112, column: 19 },
                      end: { line: 112, column: 25 },
                    },
                    param: 0,
                  },
                  arguments: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 112, column: 26 },
                        end: { line: 112, column: 33 },
                      },
                      value: "first",
                    },
                  ],
                  optional: false,
                },
              },
            ],
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 113, column: 6 },
              end: { line: 113, column: 33 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 113, column: 12 },
                  end: { line: 113, column: 32 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 113, column: 12 },
                    end: { line: 113, column: 16 },
                  },
                  name: "isOn",
                  key: "isOn$2pi9tt1octht0$1",
                },
                init: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 113, column: 19 },
                    end: { line: 113, column: 32 },
                  },
                  callee: {
                    type: "Splice",
                    loc: {
                      start: { line: 113, column: 19 },
                      end: { line: 113, column: 25 },
                    },
                    param: 0,
                  },
                  arguments: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 113, column: 26 },
                        end: { line: 113, column: 31 },
                      },
                      value: false,
                    },
                  ],
                  optional: false,
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 114, column: 6 },
              end: { line: 127, column: 8 },
            },
            argument: {
              type: "JSXElement",
              loc: {
                start: { line: 115, column: 8 },
                end: { line: 126, column: 14 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 115, column: 8 },
                  end: { line: 115, column: 13 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 115, column: 9 },
                    end: { line: 115, column: 12 },
                  },
                  name: "div",
                },
                attributes: [],
                selfClosing: false,
              },
              children: [
                {
                  type: "JSXText",
                  loc: {
                    start: { line: 116, column: 10 },
                    end: { line: 116, column: 10 },
                  },
                  value: "\n          ",
                  raw: "\n          ",
                },
                {
                  type: "JSXElement",
                  loc: {
                    start: { line: 116, column: 10 },
                    end: { line: 116, column: 56 },
                  },
                  openingElement: {
                    type: "JSXOpeningElement",
                    loc: {
                      start: { line: 116, column: 10 },
                      end: { line: 116, column: 56 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 116, column: 11 },
                        end: { line: 116, column: 16 },
                      },
                      name: "input",
                    },
                    attributes: [
                      {
                        type: "JSXAttribute",
                        loc: {
                          start: { line: 116, column: 17 },
                          end: { line: 116, column: 34 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 116, column: 17 },
                            end: { line: 116, column: 27 },
                          },
                          name: "aria-label",
                        },
                        value: {
                          type: "Literal",
                          loc: {
                            start: { line: 116, column: 28 },
                            end: { line: 116, column: 34 },
                          },
                          value: "text",
                        },
                      },
                      {
                        type: "JSXAttribute",
                        loc: {
                          start: { line: 116, column: 35 },
                          end: { line: 116, column: 53 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 116, column: 35 },
                            end: { line: 116, column: 40 },
                          },
                          name: "value",
                        },
                        value: {
                          type: "JSXExpressionContainer",
                          loc: {
                            start: { line: 116, column: 41 },
                            end: { line: 116, column: 53 },
                          },
                          expression: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 116, column: 42 },
                              end: { line: 116, column: 52 },
                            },
                            callee: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 116, column: 42 },
                                end: { line: 116, column: 50 },
                              },
                              object: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 116, column: 42 },
                                  end: { line: 116, column: 46 },
                                },
                                name: "text",
                                key: "text$2pi9tt1octht0$0",
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 116, column: 47 },
                                  end: { line: 116, column: 50 },
                                },
                                name: "get",
                              },
                              computed: false,
                              optional: false,
                            },
                            arguments: [],
                            optional: false,
                          },
                        },
                      },
                    ],
                    selfClosing: true,
                  },
                  children: [],
                  closingElement: null,
                },
                {
                  type: "JSXText",
                  loc: {
                    start: { line: 117, column: 10 },
                    end: { line: 117, column: 10 },
                  },
                  value: "\n          ",
                  raw: "\n          ",
                },
                {
                  type: "JSXElement",
                  loc: {
                    start: { line: 117, column: 10 },
                    end: { line: 117, column: 72 },
                  },
                  openingElement: {
                    type: "JSXOpeningElement",
                    loc: {
                      start: { line: 117, column: 10 },
                      end: { line: 117, column: 72 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 117, column: 11 },
                        end: { line: 117, column: 16 },
                      },
                      name: "input",
                    },
                    attributes: [
                      {
                        type: "JSXAttribute",
                        loc: {
                          start: { line: 117, column: 17 },
                          end: { line: 117, column: 32 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 117, column: 17 },
                            end: { line: 117, column: 21 },
                          },
                          name: "type",
                        },
                        value: {
                          type: "Literal",
                          loc: {
                            start: { line: 117, column: 22 },
                            end: { line: 117, column: 32 },
                          },
                          value: "checkbox",
                        },
                      },
                      {
                        type: "JSXAttribute",
                        loc: {
                          start: { line: 117, column: 33 },
                          end: { line: 117, column: 48 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 117, column: 33 },
                            end: { line: 117, column: 43 },
                          },
                          name: "aria-label",
                        },
                        value: {
                          type: "Literal",
                          loc: {
                            start: { line: 117, column: 44 },
                            end: { line: 117, column: 48 },
                          },
                          value: "on",
                        },
                      },
                      {
                        type: "JSXAttribute",
                        loc: {
                          start: { line: 117, column: 49 },
                          end: { line: 117, column: 69 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 117, column: 49 },
                            end: { line: 117, column: 56 },
                          },
                          name: "checked",
                        },
                        value: {
                          type: "JSXExpressionContainer",
                          loc: {
                            start: { line: 117, column: 57 },
                            end: { line: 117, column: 69 },
                          },
                          expression: {
                            type: "CallExpression",
                            loc: {
                              start: { line: 117, column: 58 },
                              end: { line: 117, column: 68 },
                            },
                            callee: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 117, column: 58 },
                                end: { line: 117, column: 66 },
                              },
                              object: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 117, column: 58 },
                                  end: { line: 117, column: 62 },
                                },
                                name: "isOn",
                                key: "isOn$2pi9tt1octht0$1",
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 117, column: 63 },
                                  end: { line: 117, column: 66 },
                                },
                                name: "get",
                              },
                              computed: false,
                              optional: false,
                            },
                            arguments: [],
                            optional: false,
                          },
                        },
                      },
                    ],
                    selfClosing: true,
                  },
                  children: [],
                  closingElement: null,
                },
                {
                  type: "JSXText",
                  loc: {
                    start: { line: 118, column: 10 },
                    end: { line: 118, column: 10 },
                  },
                  value: "\n          ",
                  raw: "\n          ",
                },
                {
                  type: "JSXElement",
                  loc: {
                    start: { line: 118, column: 10 },
                    end: { line: 125, column: 19 },
                  },
                  openingElement: {
                    type: "JSXOpeningElement",
                    loc: {
                      start: { line: 118, column: 10 },
                      end: { line: 123, column: 11 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 118, column: 11 },
                        end: { line: 118, column: 17 },
                      },
                      name: "button",
                    },
                    attributes: [
                      {
                        type: "JSXAttribute",
                        loc: {
                          start: { line: 119, column: 12 },
                          end: { line: 122, column: 14 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 119, column: 12 },
                            end: { line: 119, column: 19 },
                          },
                          name: "onclick",
                        },
                        value: {
                          type: "JSXExpressionContainer",
                          loc: {
                            start: { line: 119, column: 20 },
                            end: { line: 122, column: 14 },
                          },
                          expression: {
                            type: "ArrowFunctionExpression",
                            loc: {
                              start: { line: 119, column: 21 },
                              end: { line: 122, column: 13 },
                            },
                            params: [],
                            body: {
                              type: "BlockStatement",
                              loc: {
                                start: { line: 119, column: 27 },
                                end: { line: 122, column: 13 },
                              },
                              body: [
                                {
                                  type: "ExpressionStatement",
                                  loc: {
                                    start: { line: 120, column: 14 },
                                    end: { line: 120, column: 33 },
                                  },
                                  expression: {
                                    type: "CallExpression",
                                    loc: {
                                      start: { line: 120, column: 14 },
                                      end: { line: 120, column: 32 },
                                    },
                                    callee: {
                                      type: "MemberExpression",
                                      loc: {
                                        start: { line: 120, column: 14 },
                                        end: { line: 120, column: 22 },
                                      },
                                      object: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 120, column: 14 },
                                          end: { line: 120, column: 18 },
                                        },
                                        name: "text",
                                        key: "text$2pi9tt1octht0$0",
                                      },
                                      property: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 120, column: 19 },
                                          end: { line: 120, column: 22 },
                                        },
                                        name: "set",
                                      },
                                      computed: false,
                                      optional: false,
                                    },
                                    arguments: [
                                      {
                                        type: "Literal",
                                        loc: {
                                          start: { line: 120, column: 23 },
                                          end: { line: 120, column: 31 },
                                        },
                                        value: "second",
                                      },
                                    ],
                                    optional: false,
                                  },
                                },
                                {
                                  type: "ExpressionStatement",
                                  loc: {
                                    start: { line: 121, column: 14 },
                                    end: { line: 121, column: 29 },
                                  },
                                  expression: {
                                    type: "CallExpression",
                                    loc: {
                                      start: { line: 121, column: 14 },
                                      end: { line: 121, column: 28 },
                                    },
                                    callee: {
                                      type: "MemberExpression",
                                      loc: {
                                        start: { line: 121, column: 14 },
                                        end: { line: 121, column: 22 },
                                      },
                                      object: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 121, column: 14 },
                                          end: { line: 121, column: 18 },
                                        },
                                        name: "isOn",
                                        key: "isOn$2pi9tt1octht0$1",
                                      },
                                      property: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 121, column: 19 },
                                          end: { line: 121, column: 22 },
                                        },
                                        name: "set",
                                      },
                                      computed: false,
                                      optional: false,
                                    },
                                    arguments: [
                                      {
                                        type: "Literal",
                                        loc: {
                                          start: { line: 121, column: 23 },
                                          end: { line: 121, column: 27 },
                                        },
                                        value: true,
                                      },
                                    ],
                                    optional: false,
                                  },
                                },
                              ],
                            },
                            expression: false,
                          },
                        },
                      },
                    ],
                    selfClosing: false,
                  },
                  children: [
                    {
                      type: "JSXText",
                      loc: {
                        start: { line: 124, column: 12 },
                        end: { line: 125, column: 10 },
                      },
                      value: "\n            write\n          ",
                      raw: "\n            write\n          ",
                    },
                  ],
                  closingElement: {
                    type: "JSXClosingElement",
                    loc: {
                      start: { line: 125, column: 10 },
                      end: { line: 125, column: 19 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 125, column: 12 },
                        end: { line: 125, column: 18 },
                      },
                      name: "button",
                    },
                  },
                },
                {
                  type: "JSXText",
                  loc: {
                    start: { line: 126, column: 8 },
                    end: { line: 126, column: 8 },
                  },
                  value: "\n        ",
                  raw: "\n        ",
                },
              ],
              closingElement: {
                type: "JSXClosingElement",
                loc: {
                  start: { line: 126, column: 8 },
                  end: { line: 126, column: 14 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 126, column: 10 },
                    end: { line: 126, column: 13 },
                  },
                  name: "div",
                },
              },
            },
          },
        ],
      }),
      'export default ($0) => {\n    const text = $0()("first");\n    const isOn = $0()(false);\n    return (<div>\n          <input aria-label="text" value={text.get()}/>\n          <input type="checkbox" aria-label="on" checked={isOn.get()}/>\n          <button onclick={() => {\n            text.set("second");\n            isOn.set(true);\n        }}>\n            write\n          </button>\n        </div>);\n};',
      '{"version":3,"file":"attributes.test.jsx","sourceRoot":"","sources":["attributes.test.tsx"],"names":[],"mappings":"eA8Gc;IACR,MAAM,IAAI,GAAG,IAAM,CAAC,OAAO,CAAC,CAAC;IAC7B,MAAM,IAAI,GAAG,IAAM,CAAC,KAAK,CAAC,CAAC;IAC3B,OAAO,CACL,CAAC,GAAG,CACF;UAAA,CAAC,KAAK,CAAC,UAAU,CAAC,MAAM,CAAC,KAAK,CAAC,CAAC,IAAI,CAAC,GAAG,EAAE,CAAC,EAC3C;UAAA,CAAC,KAAK,CAAC,IAAI,CAAC,UAAU,CAAC,UAAU,CAAC,IAAI,CAAC,OAAO,CAAC,CAAC,IAAI,CAAC,GAAG,EAAE,CAAC,EAC3D;UAAA,CAAC,MAAM,CACL,OAAO,CAAC,CAAC,GAAG,EAAE;YACZ,IAAI,CAAC,GAAG,CAAC,QAAQ,CAAC,CAAC;YACnB,IAAI,CAAC,GAAG,CAAC,IAAI,CAAC,CAAC;QACjB,CAAC,CAAC,CAEF;;UACF,EAAE,MAAM,CACV;QAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
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
  // A read past the end types as the element and reads as `undefined`, so
  // nothing reaches a field without a cast.
  async function Clearable() {
    return cs.create(
      "2pi9tt1octht0:147:11",
      { params: [{ kind: "splice", value: state, bindings: [] }] },
      () => ({
        type: "BlockStatement",
        loc: {
          start: { line: 147, column: 14 },
          end: { line: 164, column: 5 },
        },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 148, column: 6 },
              end: { line: 148, column: 52 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 148, column: 12 },
                  end: { line: 148, column: 51 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 148, column: 12 },
                    end: { line: 148, column: 17 },
                  },
                  name: "texts",
                  key: "texts$2pi9tt1octht0$2",
                },
                init: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 148, column: 20 },
                    end: { line: 148, column: 51 },
                  },
                  callee: {
                    type: "Splice",
                    loc: {
                      start: { line: 148, column: 20 },
                      end: { line: 148, column: 26 },
                    },
                    param: 0,
                  },
                  arguments: [
                    {
                      type: "ArrayExpression",
                      loc: {
                        start: { line: 148, column: 27 },
                        end: { line: 148, column: 50 },
                      },
                      elements: [
                        {
                          type: "Literal",
                          loc: {
                            start: { line: 148, column: 28 },
                            end: { line: 148, column: 49 },
                          },
                          value: "typed by the script",
                        },
                      ],
                    },
                  ],
                  optional: false,
                },
              },
            ],
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 149, column: 6 },
              end: { line: 149, column: 35 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 149, column: 12 },
                  end: { line: 149, column: 34 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 149, column: 12 },
                    end: { line: 149, column: 17 },
                  },
                  name: "flags",
                  key: "flags$2pi9tt1octht0$3",
                },
                init: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 149, column: 20 },
                    end: { line: 149, column: 34 },
                  },
                  callee: {
                    type: "Splice",
                    loc: {
                      start: { line: 149, column: 20 },
                      end: { line: 149, column: 26 },
                    },
                    param: 0,
                  },
                  arguments: [
                    {
                      type: "ArrayExpression",
                      loc: {
                        start: { line: 149, column: 27 },
                        end: { line: 149, column: 33 },
                      },
                      elements: [
                        {
                          type: "Literal",
                          loc: {
                            start: { line: 149, column: 28 },
                            end: { line: 149, column: 32 },
                          },
                          value: true,
                        },
                      ],
                    },
                  ],
                  optional: false,
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 150, column: 6 },
              end: { line: 163, column: 8 },
            },
            argument: {
              type: "JSXElement",
              loc: {
                start: { line: 151, column: 8 },
                end: { line: 162, column: 14 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 151, column: 8 },
                  end: { line: 151, column: 13 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 151, column: 9 },
                    end: { line: 151, column: 12 },
                  },
                  name: "div",
                },
                attributes: [],
                selfClosing: false,
              },
              children: [
                {
                  type: "JSXText",
                  loc: {
                    start: { line: 152, column: 10 },
                    end: { line: 152, column: 10 },
                  },
                  value: "\n          ",
                  raw: "\n          ",
                },
                {
                  type: "JSXElement",
                  loc: {
                    start: { line: 152, column: 10 },
                    end: { line: 152, column: 60 },
                  },
                  openingElement: {
                    type: "JSXOpeningElement",
                    loc: {
                      start: { line: 152, column: 10 },
                      end: { line: 152, column: 60 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 152, column: 11 },
                        end: { line: 152, column: 16 },
                      },
                      name: "input",
                    },
                    attributes: [
                      {
                        type: "JSXAttribute",
                        loc: {
                          start: { line: 152, column: 17 },
                          end: { line: 152, column: 34 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 152, column: 17 },
                            end: { line: 152, column: 27 },
                          },
                          name: "aria-label",
                        },
                        value: {
                          type: "Literal",
                          loc: {
                            start: { line: 152, column: 28 },
                            end: { line: 152, column: 34 },
                          },
                          value: "text",
                        },
                      },
                      {
                        type: "JSXAttribute",
                        loc: {
                          start: { line: 152, column: 35 },
                          end: { line: 152, column: 57 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 152, column: 35 },
                            end: { line: 152, column: 40 },
                          },
                          name: "value",
                        },
                        value: {
                          type: "JSXExpressionContainer",
                          loc: {
                            start: { line: 152, column: 41 },
                            end: { line: 152, column: 57 },
                          },
                          expression: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 152, column: 42 },
                              end: { line: 152, column: 56 },
                            },
                            object: {
                              type: "CallExpression",
                              loc: {
                                start: { line: 152, column: 42 },
                                end: { line: 152, column: 53 },
                              },
                              callee: {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 152, column: 42 },
                                  end: { line: 152, column: 51 },
                                },
                                object: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 152, column: 42 },
                                    end: { line: 152, column: 47 },
                                  },
                                  name: "texts",
                                  key: "texts$2pi9tt1octht0$2",
                                },
                                property: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 152, column: 48 },
                                    end: { line: 152, column: 51 },
                                  },
                                  name: "get",
                                },
                                computed: false,
                                optional: false,
                              },
                              arguments: [],
                              optional: false,
                            },
                            property: {
                              type: "Literal",
                              loc: {
                                start: { line: 152, column: 54 },
                                end: { line: 152, column: 55 },
                              },
                              value: 0,
                            },
                            computed: true,
                            optional: false,
                          },
                        },
                      },
                    ],
                    selfClosing: true,
                  },
                  children: [],
                  closingElement: null,
                },
                {
                  type: "JSXText",
                  loc: {
                    start: { line: 153, column: 10 },
                    end: { line: 153, column: 10 },
                  },
                  value: "\n          ",
                  raw: "\n          ",
                },
                {
                  type: "JSXElement",
                  loc: {
                    start: { line: 153, column: 10 },
                    end: { line: 153, column: 76 },
                  },
                  openingElement: {
                    type: "JSXOpeningElement",
                    loc: {
                      start: { line: 153, column: 10 },
                      end: { line: 153, column: 76 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 153, column: 11 },
                        end: { line: 153, column: 16 },
                      },
                      name: "input",
                    },
                    attributes: [
                      {
                        type: "JSXAttribute",
                        loc: {
                          start: { line: 153, column: 17 },
                          end: { line: 153, column: 32 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 153, column: 17 },
                            end: { line: 153, column: 21 },
                          },
                          name: "type",
                        },
                        value: {
                          type: "Literal",
                          loc: {
                            start: { line: 153, column: 22 },
                            end: { line: 153, column: 32 },
                          },
                          value: "checkbox",
                        },
                      },
                      {
                        type: "JSXAttribute",
                        loc: {
                          start: { line: 153, column: 33 },
                          end: { line: 153, column: 48 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 153, column: 33 },
                            end: { line: 153, column: 43 },
                          },
                          name: "aria-label",
                        },
                        value: {
                          type: "Literal",
                          loc: {
                            start: { line: 153, column: 44 },
                            end: { line: 153, column: 48 },
                          },
                          value: "on",
                        },
                      },
                      {
                        type: "JSXAttribute",
                        loc: {
                          start: { line: 153, column: 49 },
                          end: { line: 153, column: 73 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 153, column: 49 },
                            end: { line: 153, column: 56 },
                          },
                          name: "checked",
                        },
                        value: {
                          type: "JSXExpressionContainer",
                          loc: {
                            start: { line: 153, column: 57 },
                            end: { line: 153, column: 73 },
                          },
                          expression: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 153, column: 58 },
                              end: { line: 153, column: 72 },
                            },
                            object: {
                              type: "CallExpression",
                              loc: {
                                start: { line: 153, column: 58 },
                                end: { line: 153, column: 69 },
                              },
                              callee: {
                                type: "MemberExpression",
                                loc: {
                                  start: { line: 153, column: 58 },
                                  end: { line: 153, column: 67 },
                                },
                                object: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 153, column: 58 },
                                    end: { line: 153, column: 63 },
                                  },
                                  name: "flags",
                                  key: "flags$2pi9tt1octht0$3",
                                },
                                property: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 153, column: 64 },
                                    end: { line: 153, column: 67 },
                                  },
                                  name: "get",
                                },
                                computed: false,
                                optional: false,
                              },
                              arguments: [],
                              optional: false,
                            },
                            property: {
                              type: "Literal",
                              loc: {
                                start: { line: 153, column: 70 },
                                end: { line: 153, column: 71 },
                              },
                              value: 0,
                            },
                            computed: true,
                            optional: false,
                          },
                        },
                      },
                    ],
                    selfClosing: true,
                  },
                  children: [],
                  closingElement: null,
                },
                {
                  type: "JSXText",
                  loc: {
                    start: { line: 154, column: 10 },
                    end: { line: 154, column: 10 },
                  },
                  value: "\n          ",
                  raw: "\n          ",
                },
                {
                  type: "JSXElement",
                  loc: {
                    start: { line: 154, column: 10 },
                    end: { line: 161, column: 19 },
                  },
                  openingElement: {
                    type: "JSXOpeningElement",
                    loc: {
                      start: { line: 154, column: 10 },
                      end: { line: 159, column: 11 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 154, column: 11 },
                        end: { line: 154, column: 17 },
                      },
                      name: "button",
                    },
                    attributes: [
                      {
                        type: "JSXAttribute",
                        loc: {
                          start: { line: 155, column: 12 },
                          end: { line: 158, column: 14 },
                        },
                        name: {
                          type: "JSXIdentifier",
                          loc: {
                            start: { line: 155, column: 12 },
                            end: { line: 155, column: 19 },
                          },
                          name: "onclick",
                        },
                        value: {
                          type: "JSXExpressionContainer",
                          loc: {
                            start: { line: 155, column: 20 },
                            end: { line: 158, column: 14 },
                          },
                          expression: {
                            type: "ArrowFunctionExpression",
                            loc: {
                              start: { line: 155, column: 21 },
                              end: { line: 158, column: 13 },
                            },
                            params: [],
                            body: {
                              type: "BlockStatement",
                              loc: {
                                start: { line: 155, column: 27 },
                                end: { line: 158, column: 13 },
                              },
                              body: [
                                {
                                  type: "ExpressionStatement",
                                  loc: {
                                    start: { line: 156, column: 14 },
                                    end: { line: 156, column: 28 },
                                  },
                                  expression: {
                                    type: "CallExpression",
                                    loc: {
                                      start: { line: 156, column: 14 },
                                      end: { line: 156, column: 27 },
                                    },
                                    callee: {
                                      type: "MemberExpression",
                                      loc: {
                                        start: { line: 156, column: 14 },
                                        end: { line: 156, column: 23 },
                                      },
                                      object: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 156, column: 14 },
                                          end: { line: 156, column: 19 },
                                        },
                                        name: "texts",
                                        key: "texts$2pi9tt1octht0$2",
                                      },
                                      property: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 156, column: 20 },
                                          end: { line: 156, column: 23 },
                                        },
                                        name: "set",
                                      },
                                      computed: false,
                                      optional: false,
                                    },
                                    arguments: [
                                      {
                                        type: "ArrayExpression",
                                        loc: {
                                          start: { line: 156, column: 24 },
                                          end: { line: 156, column: 26 },
                                        },
                                        elements: [],
                                      },
                                    ],
                                    optional: false,
                                  },
                                },
                                {
                                  type: "ExpressionStatement",
                                  loc: {
                                    start: { line: 157, column: 14 },
                                    end: { line: 157, column: 28 },
                                  },
                                  expression: {
                                    type: "CallExpression",
                                    loc: {
                                      start: { line: 157, column: 14 },
                                      end: { line: 157, column: 27 },
                                    },
                                    callee: {
                                      type: "MemberExpression",
                                      loc: {
                                        start: { line: 157, column: 14 },
                                        end: { line: 157, column: 23 },
                                      },
                                      object: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 157, column: 14 },
                                          end: { line: 157, column: 19 },
                                        },
                                        name: "flags",
                                        key: "flags$2pi9tt1octht0$3",
                                      },
                                      property: {
                                        type: "Identifier",
                                        loc: {
                                          start: { line: 157, column: 20 },
                                          end: { line: 157, column: 23 },
                                        },
                                        name: "set",
                                      },
                                      computed: false,
                                      optional: false,
                                    },
                                    arguments: [
                                      {
                                        type: "ArrayExpression",
                                        loc: {
                                          start: { line: 157, column: 24 },
                                          end: { line: 157, column: 26 },
                                        },
                                        elements: [],
                                      },
                                    ],
                                    optional: false,
                                  },
                                },
                              ],
                            },
                            expression: false,
                          },
                        },
                      },
                    ],
                    selfClosing: false,
                  },
                  children: [
                    {
                      type: "JSXText",
                      loc: {
                        start: { line: 160, column: 12 },
                        end: { line: 161, column: 10 },
                      },
                      value: "\n            clear\n          ",
                      raw: "\n            clear\n          ",
                    },
                  ],
                  closingElement: {
                    type: "JSXClosingElement",
                    loc: {
                      start: { line: 161, column: 10 },
                      end: { line: 161, column: 19 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 161, column: 12 },
                        end: { line: 161, column: 18 },
                      },
                      name: "button",
                    },
                  },
                },
                {
                  type: "JSXText",
                  loc: {
                    start: { line: 162, column: 8 },
                    end: { line: 162, column: 8 },
                  },
                  value: "\n        ",
                  raw: "\n        ",
                },
              ],
              closingElement: {
                type: "JSXClosingElement",
                loc: {
                  start: { line: 162, column: 8 },
                  end: { line: 162, column: 14 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 162, column: 10 },
                    end: { line: 162, column: 13 },
                  },
                  name: "div",
                },
              },
            },
          },
        ],
      }),
      'export default ($0) => {\n    const texts = $0()(["typed by the script"]);\n    const flags = $0()([true]);\n    return (<div>\n          <input aria-label="text" value={texts.get()[0]}/>\n          <input type="checkbox" aria-label="on" checked={flags.get()[0]}/>\n          <button onclick={() => {\n            texts.set([]);\n            flags.set([]);\n        }}>\n            clear\n          </button>\n        </div>);\n};',
      '{"version":3,"file":"attributes.test.jsx","sourceRoot":"","sources":["attributes.test.tsx"],"names":[],"mappings":"eAkJc;IACR,MAAM,KAAK,GAAG,IAAM,CAAC,CAAC,qBAAqB,CAAC,CAAC,CAAC;IAC9C,MAAM,KAAK,GAAG,IAAM,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC;IAC7B,OAAO,CACL,CAAC,GAAG,CACF;UAAA,CAAC,KAAK,CAAC,UAAU,CAAC,MAAM,CAAC,KAAK,CAAC,CAAC,KAAK,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC,CAAC,EAC/C;UAAA,CAAC,KAAK,CAAC,IAAI,CAAC,UAAU,CAAC,UAAU,CAAC,IAAI,CAAC,OAAO,CAAC,CAAC,KAAK,CAAC,GAAG,EAAE,CAAC,CAAC,CAAC,CAAC,EAC/D;UAAA,CAAC,MAAM,CACL,OAAO,CAAC,CAAC,GAAG,EAAE;YACZ,KAAK,CAAC,GAAG,CAAC,EAAE,CAAC,CAAC;YACd,KAAK,CAAC,GAAG,CAAC,EAAE,CAAC,CAAC;QAChB,CAAC,CAAC,CAEF;;UACF,EAAE,MAAM,CACV;QAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
    );
  }
  it("is cleared by nothing, after the field was edited", async () => {
    await render(_jsx(Clearable, {}));
    const text = screen.getByLabelText("text");
    const on = screen.getByLabelText("on");
    fireEvent.input(text, { target: { value: "typed" } });
    await userEvent.click(on);
    await userEvent.click(on);
    await userEvent.click(screen.getByRole("button", { name: "clear" }));
    assert.equal(text.value, "");
    assert.equal(on.checked, false);
  });
});
