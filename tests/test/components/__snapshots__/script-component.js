import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A component tag written inside a client script. `Card` is a name no scope in
// the script binds, so it splices as the host binding, and what a splice holds
// that is a function is its expansion: the component run once against one
// opaque hole for the argument it takes, with a field read off that hole
// wherever it read a prop. The tag is a call of it.
//
// Each prop goes as a thunk and the drawing calls it where it reads it, which
// is what keeps a prop a prop: an argument is evaluated once where it is
// passed, and a prop has to be re-read whenever what it names changes.
async function Card(props) {
  return _jsx("h2", { children: props.title });
}
async function Badge() {
  return _jsx("span", { children: "new" });
}
it("scriptComponent", async (t) => {
  await snapshotCase(
    t,
    "scriptComponent",
    cs.create(
      [27, 5, 34, 7],
      {
        version: "0.0.0",
        filePath: "components/script-component.test.tsx",
        fileHash: "2ielk672xspgd",
        splices: {
          $Card: { value: Card, params: [] },
          $Badge: { value: Badge, params: [] },
        },
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [27, 8, 34, 6],
        statements: [
          {
            kind: "return",
            loc: [28, 7, 33, 9],
            expression: {
              kind: "jsx",
              loc: [29, 9, 32, 15],
              type: {
                kind: "string",
                loc: [29, 10, 29, 13],
                text: "div",
              },
              attributes: [],
              children: [
                {
                  kind: "jsx",
                  loc: [30, 11, 30, 34],
                  type: {
                    kind: "splice",
                    loc: [30, 12, 30, 16],
                    key: "$Card",
                  },
                  attributes: [
                    {
                      name: "title",
                      initializer: {
                        kind: "string",
                        loc: [30, 23, 30, 31],
                        text: "totals",
                      },
                    },
                  ],
                  children: [],
                },
                {
                  kind: "jsx",
                  loc: [31, 11, 31, 20],
                  type: {
                    kind: "splice",
                    loc: [31, 12, 31, 17],
                    key: "$Badge",
                  },
                  attributes: [],
                  children: [],
                },
              ],
            },
          },
        ],
      }),
    ),
  );
});
