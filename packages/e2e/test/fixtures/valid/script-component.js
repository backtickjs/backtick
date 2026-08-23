import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
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
  [21, 16, 26, 3],
  {
    version: "0.0.0",
    filePath: "script-component.tsx",
    fileHash: "2gppm3p0jls6q",
    kind: "value",
    splices: { $Card: Card, $Badge: Badge },
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 242,
    loc: [21, 19, 26, 2],
    statements: [
      {
        kind: 254,
        loc: [22, 3, 25, 10],
        expression: {
          kind: 285,
          loc: [22, 10, 25, 9],
          type: {
            kind: 11,
            loc: [22, 11, 22, 14],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: 285,
              loc: [23, 5, 23, 28],
              type: {
                kind: 1000,
                loc: [23, 6, 23, 10],
                key: "$Card",
              },
              attributes: [
                {
                  name: "title",
                  initializer: {
                    kind: 11,
                    loc: [23, 17, 23, 25],
                    text: "totals",
                  },
                },
              ],
              children: [],
            },
            {
              kind: 285,
              loc: [24, 5, 24, 14],
              type: {
                kind: 1000,
                loc: [24, 6, 24, 11],
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
