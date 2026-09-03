import { jsx as _jsx } from "@backtickjs/web-schema/jsx-runtime";
import { cs } from "@backtickjs/core";
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
export default cs.create(
  [21, 16, 28, 3],
  {
    version: "0.0.0",
    filePath: "script-component.tsx",
    fileHash: "11xubvfbwb82p",
    splices: {
      $Card: { value: Card, params: [] },
      $Badge: { value: Badge, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [21, 19, 28, 2],
    statements: [
      {
        kind: "return",
        loc: [22, 3, 27, 5],
        expression: {
          kind: "jsx",
          loc: [23, 5, 26, 11],
          type: {
            kind: "string",
            loc: [23, 6, 23, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: "jsx",
              loc: [24, 7, 24, 30],
              type: {
                kind: "splice",
                loc: [24, 8, 24, 12],
                key: "$Card",
              },
              attributes: [
                {
                  name: "title",
                  initializer: {
                    kind: "string",
                    loc: [24, 19, 24, 27],
                    text: "totals",
                  },
                },
              ],
              children: [],
            },
            {
              kind: "jsx",
              loc: [25, 7, 25, 16],
              type: {
                kind: "splice",
                loc: [25, 8, 25, 13],
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
);
