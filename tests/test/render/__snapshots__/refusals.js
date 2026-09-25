import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { evaluateBundle, render } from "@backtickjs/web-testing";
// The two ways a bundle could run what wrote it, each held to not happening.
//
// A bundle is walked node by node by the renderer rather than parsed as markup,
// so what a hostile one can reach is what these two answer with — which is why
// each case asserts the thing did not happen, not that something was cleaned up.
//
// The drawings are ones the typechecker refuses, written anyway under
// `@ts-expect-error`: they are the bundle a server that skipped it would send.
// A container a refused drawing was drawn into, read after the refusal: it
// holds what the page put there before, and nothing the drawing asked for.
async function refused(value, message) {
  const container = document.body.appendChild(document.createElement("div"));
  container.innerHTML = "<main></main>";
  await assert.rejects(render(value, { container }), message);
  assert.equal(container.innerHTML, "<main></main>");
}
// A drawing and the one element it put in the page.
async function drawn(value) {
  const { container } = await render(value);
  return container.firstElementChild;
}
// An element whose tag no source can spell: JSX reads a capital as a
// component, so this is the bundle written by hand.
const element = (tag) => `jsx(${JSON.stringify(tag)}, {})`;
describe("a tag that would execute", () => {
  it("is refused in HTML", async () => {
    await refused(
      _jsx("div", { children: _jsx("script", { children: "alert(1)" }) }),
      /may not draw a `script`/,
    );
  });
  it("is refused in SVG", async () => {
    await refused(
      _jsx("svg", { children: _jsx("script", { children: "alert(1)" }) }),
      /may not draw/,
    );
  });
  // HTML folds a tag name, so every spelling of it is the element.
  it("is refused in HTML whatever its case", () => {
    for (const tag of ["SCRIPT", "Script"]) {
      assert.throws(() => evaluateBundle(element(tag)), /may not draw/, tag);
    }
  });
  // SVG does not fold, so `svg:SCRIPT` is an unknown element rather than the
  // one that runs. Verified in Chrome rather than read off the spec.
  it("does not stop a tag that only looks like one", async () => {
    const svgScript = evaluateBundle(element("svg:SCRIPT"));
    assert.equal(svgScript.localName, "SCRIPT");
    const { container } = await render(
      _jsxs("div", {
        children: [_jsx("script-viewer", {}), _jsx("marquee", {})],
      }),
    );
    assert.ok(container.querySelector("script-viewer"));
    assert.ok(container.querySelector("marquee"));
  });
});
describe("a handler that is not a function", () => {
  // `setAttribute("onerror", "…")` is source text the browser compiles, so a
  // string reaching an `on` name is a working inline handler.
  it("never reaches the attribute", async () => {
    const handlers = [
      _jsx("img", { onerror: "alert(1)" }),
      _jsx("img", { onclick: "alert(1)" }),
      _jsx("img", { onError: "alert(1)" }),
      _jsx("img", { ONCLICK: "alert(1)" }),
    ];
    for (const handler of handlers) {
      await refused(handler, /takes a function/);
    }
  });
  it("is refused whatever kind of value it is", async () => {
    const handlers = [
      _jsx("div", { onclick: "alert(1)" }),
      _jsx("div", { onclick: true }),
      _jsx("div", { onclick: 1 }),
    ];
    for (const handler of handlers) {
      await refused(handler, /takes a function/);
    }
  });
  it("leaves a function alone", async () => {
    const div = await drawn(
      cs.create(
        "2i39r1w0584h:134:28",
        { params: [] },
        () => ({
          type: "JSXElement",
          loc: {
            start: { line: 134, column: 31 },
            end: { line: 134, column: 57 },
          },
          openingElement: {
            type: "JSXOpeningElement",
            loc: {
              start: { line: 134, column: 31 },
              end: { line: 134, column: 57 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 134, column: 32 },
                end: { line: 134, column: 35 },
              },
              name: "div",
            },
            attributes: [
              {
                type: "JSXAttribute",
                loc: {
                  start: { line: 134, column: 36 },
                  end: { line: 134, column: 54 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 134, column: 36 },
                    end: { line: 134, column: 43 },
                  },
                  name: "onclick",
                },
                value: {
                  type: "JSXExpressionContainer",
                  loc: {
                    start: { line: 134, column: 44 },
                    end: { line: 134, column: 54 },
                  },
                  expression: {
                    type: "ArrowFunctionExpression",
                    loc: {
                      start: { line: 134, column: 45 },
                      end: { line: 134, column: 53 },
                    },
                    params: [],
                    body: {
                      type: "BlockStatement",
                      loc: {
                        start: { line: 134, column: 51 },
                        end: { line: 134, column: 53 },
                      },
                      body: [],
                    },
                    expression: false,
                  },
                },
              },
            ],
            selfClosing: true,
          },
          children: [],
          closingElement: null,
        }),
        "() => <div onclick={() => { }}/>",
        '{"version":3,"file":"refusals.test.jsx","sourceRoot":"","sources":["refusals.test.tsx"],"names":[],"mappings":"AAqI+B,MAAA,CAAC,GAAG,CAAC,OAAO,CAAC,CAAC,GAAG,EAAE,GAAE,CAAC,CAAC,EAAG,CAAA"}',
      ),
    );
    assert.equal(div.attributes.length, 0);
  });
  // The other direction: a function under a name no event answers to would have
  // been registered nowhere, which reads afterwards as a handler that never
  // fired.
  it("is refused the other way round too", async () => {
    await refused(
      cs.create(
        "2i39r1w0584h:144:6",
        { params: [] },
        () => ({
          type: "JSXElement",
          loc: {
            start: { line: 144, column: 9 },
            end: { line: 144, column: 33 },
          },
          openingElement: {
            type: "JSXOpeningElement",
            loc: {
              start: { line: 144, column: 9 },
              end: { line: 144, column: 33 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 144, column: 10 },
                end: { line: 144, column: 13 },
              },
              name: "div",
            },
            attributes: [
              {
                type: "JSXAttribute",
                loc: {
                  start: { line: 144, column: 14 },
                  end: { line: 144, column: 30 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 144, column: 14 },
                    end: { line: 144, column: 19 },
                  },
                  name: "title",
                },
                value: {
                  type: "JSXExpressionContainer",
                  loc: {
                    start: { line: 144, column: 20 },
                    end: { line: 144, column: 30 },
                  },
                  expression: {
                    type: "ArrowFunctionExpression",
                    loc: {
                      start: { line: 144, column: 21 },
                      end: { line: 144, column: 29 },
                    },
                    params: [],
                    body: {
                      type: "BlockStatement",
                      loc: {
                        start: { line: 144, column: 27 },
                        end: { line: 144, column: 29 },
                      },
                      body: [],
                    },
                    expression: false,
                  },
                },
              },
            ],
            selfClosing: true,
          },
          children: [],
          closingElement: null,
        }),
        "() => <div title={() => { }}/>",
        '{"version":3,"file":"refusals.test.jsx","sourceRoot":"","sources":["refusals.test.tsx"],"names":[],"mappings":"AA+IS,MAAA,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,GAAG,EAAE,GAAE,CAAC,CAAC,EAAG,CAAA"}',
      ),
      /takes a value, not a function/,
    );
  });
  // Nothing this removes was ever set, so a prop that went away stays a prop
  // that went away rather than becoming an error a drawing has to survive.
  // Absent is what a read past the end of an array is.
  it("lets an absent handler stay absent", async () => {
    const absent = [
      cs.create(
        "2i39r1w0584h:155:6",
        { params: [] },
        () => ({
          type: "JSXElement",
          loc: {
            start: { line: 155, column: 9 },
            end: { line: 155, column: 31 },
          },
          openingElement: {
            type: "JSXOpeningElement",
            loc: {
              start: { line: 155, column: 9 },
              end: { line: 155, column: 31 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 155, column: 10 },
                end: { line: 155, column: 13 },
              },
              name: "div",
            },
            attributes: [
              {
                type: "JSXAttribute",
                loc: {
                  start: { line: 155, column: 14 },
                  end: { line: 155, column: 28 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 155, column: 14 },
                    end: { line: 155, column: 21 },
                  },
                  name: "onclick",
                },
                value: {
                  type: "JSXExpressionContainer",
                  loc: {
                    start: { line: 155, column: 22 },
                    end: { line: 155, column: 28 },
                  },
                  expression: {
                    type: "Literal",
                    loc: {
                      start: { line: 155, column: 23 },
                      end: { line: 155, column: 27 },
                    },
                    value: null,
                  },
                },
              },
            ],
            selfClosing: true,
          },
          children: [],
          closingElement: null,
        }),
        "() => <div onclick={null}/>",
        '{"version":3,"file":"refusals.test.jsx","sourceRoot":"","sources":["refusals.test.tsx"],"names":[],"mappings":"AA0JS,MAAA,CAAC,GAAG,CAAC,OAAO,CAAC,CAAC,IAAI,CAAC,EAAG,CAAA"}',
      ),
      cs.create(
        "2i39r1w0584h:156:6",
        { params: [] },
        () => ({
          type: "JSXElement",
          loc: {
            start: { line: 156, column: 9 },
            end: { line: 156, column: 40 },
          },
          openingElement: {
            type: "JSXOpeningElement",
            loc: {
              start: { line: 156, column: 9 },
              end: { line: 156, column: 40 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 156, column: 10 },
                end: { line: 156, column: 13 },
              },
              name: "div",
            },
            attributes: [
              {
                type: "JSXAttribute",
                loc: {
                  start: { line: 156, column: 14 },
                  end: { line: 156, column: 37 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 156, column: 14 },
                    end: { line: 156, column: 21 },
                  },
                  name: "onclick",
                },
                value: {
                  type: "JSXExpressionContainer",
                  loc: {
                    start: { line: 156, column: 22 },
                    end: { line: 156, column: 37 },
                  },
                  expression: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 156, column: 23 },
                      end: { line: 156, column: 36 },
                    },
                    object: {
                      type: "ArrayExpression",
                      loc: {
                        start: { line: 156, column: 23 },
                        end: { line: 156, column: 33 },
                      },
                      elements: [
                        {
                          type: "ArrowFunctionExpression",
                          loc: {
                            start: { line: 156, column: 24 },
                            end: { line: 156, column: 32 },
                          },
                          params: [],
                          body: {
                            type: "BlockStatement",
                            loc: {
                              start: { line: 156, column: 30 },
                              end: { line: 156, column: 32 },
                            },
                            body: [],
                          },
                          expression: false,
                        },
                      ],
                    },
                    property: {
                      type: "Literal",
                      loc: {
                        start: { line: 156, column: 34 },
                        end: { line: 156, column: 35 },
                      },
                      value: 1,
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
        }),
        "() => <div onclick={[() => { }][1]}/>",
        '{"version":3,"file":"refusals.test.jsx","sourceRoot":"","sources":["refusals.test.tsx"],"names":[],"mappings":"AA2JS,MAAA,CAAC,GAAG,CAAC,OAAO,CAAC,CAAC,CAAC,GAAG,EAAE,GAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAG,CAAA"}',
      ),
    ];
    for (const value of absent) {
      const div = await drawn(value);
      assert.equal(div.attributes.length, 0);
    }
  });
  // The rule is the prefix, not a list of events, so it refuses names no browser
  // would have run — `one`, `onset`, an `onboarding` a custom element made up.
  // Deliberate: which `on` names execute is the browser's list and it grows,
  // and a rule that has to be kept level with it is a rule that falls behind.
  // Nothing in HTML takes an attribute that starts this way and is not a
  // handler, so what this costs is a name nobody has.
  it("refuses a name that merely starts the same", async () => {
    // @ts-expect-error: `one` is not a prop a `div` takes
    await refused(_jsx("div", { one: "1" }), /takes a function/);
  });
});
