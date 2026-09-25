import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A component reading two levels deep. The hole is named for the path the
// component read, so `props.person.firstName` is `$0.person.firstName` — and
// only the first step off the parameter is a prop, which the tag hands over as
// a thunk. What that thunk answers with is an ordinary value, so reading a
// field of it is an ordinary read: `$0.person().firstName`.
//
// The cast is the gap this pins. A prop written at a tag inside a script is
// client code, so it types as `Prop<T>` — and a `Prop` may be a script, which
// has no fields to read. The bundler hands the component a hole either way, and
// a hole answers a field with a field of itself, so the read is meaningful
// where the type says it is not.
async function Greeting(props) {
  return _jsx("h2", { children: props.person.firstName });
}
it("scriptComponentNestedProp", async (t) => {
  await snapshotCase(
    t,
    "scriptComponentNestedProp",
    cs.create(
      "f9eea3gp8wr6:27:4",
      { params: [{ kind: "tag", value: Greeting }] },
      () => ({
        type: "JSXElement",
        loc: { start: { line: 27, column: 7 }, end: { line: 27, column: 49 } },
        openingElement: {
          type: "JSXOpeningElement",
          loc: {
            start: { line: 27, column: 7 },
            end: { line: 27, column: 49 },
          },
          name: {
            type: "JSXIdentifier",
            loc: {
              start: { line: 27, column: 8 },
              end: { line: 27, column: 16 },
            },
            name: "Greeting",
            param: 0,
          },
          attributes: [
            {
              type: "JSXAttribute",
              loc: {
                start: { line: 27, column: 17 },
                end: { line: 27, column: 46 },
              },
              name: {
                type: "JSXIdentifier",
                loc: {
                  start: { line: 27, column: 17 },
                  end: { line: 27, column: 23 },
                },
                name: "person",
              },
              value: {
                type: "JSXExpressionContainer",
                loc: {
                  start: { line: 27, column: 24 },
                  end: { line: 27, column: 46 },
                },
                expression: {
                  type: "ObjectExpression",
                  loc: {
                    start: { line: 27, column: 25 },
                    end: { line: 27, column: 45 },
                  },
                  properties: [
                    {
                      type: "Property",
                      loc: {
                        start: { line: 27, column: 27 },
                        end: { line: 27, column: 43 },
                      },
                      key: {
                        type: "Identifier",
                        loc: {
                          start: { line: 27, column: 27 },
                          end: { line: 27, column: 36 },
                        },
                        name: "firstName",
                      },
                      value: {
                        type: "Literal",
                        loc: {
                          start: { line: 27, column: 38 },
                          end: { line: 27, column: 43 },
                        },
                        value: "ada",
                      },
                      kind: "init",
                      computed: false,
                      method: false,
                      shorthand: false,
                    },
                  ],
                },
              },
            },
          ],
          selfClosing: true,
        },
        children: [],
        closingElement: null,
      }),
      '$0 => <$0 person={{ firstName: "ada" }}/>',
      '{"version":3,"file":"script-component-nested-prop.test.jsx","sourceRoot":"","sources":["script-component-nested-prop.test.tsx"],"names":[],"mappings":"AA0BO,MAAA,CAAC,EAAQ,CAAC,MAAM,CAAC,CAAC,EAAE,SAAS,EAAE,KAAK,EAAE,CAAC,EAAG,CAAA"}',
    ),
  );
});
