import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { cs } from "@backtickjs/core";
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
export default cs.create(
  [21, 16, 21, 62],
  {
    version: "0.0.0",
    filePath: "script-component-nested-prop.tsx",
    fileHash: "2tvhju2xcvczc",
    kind: "value",
    splices: { $Greeting: Greeting },
    captures: [],
    spliceParams: {},
  },
  () => ({
    kind: 285,
    loc: [21, 19, 21, 61],
    type: {
      kind: 1000,
      loc: [21, 20, 21, 28],
      key: "$Greeting",
    },
    attributes: [
      {
        name: "person",
        initializer: {
          kind: 211,
          loc: [21, 37, 21, 57],
          properties: [
            {
              kind: 304,
              loc: [21, 39, 21, 55],
              name: "firstName",
              initializer: {
                kind: 11,
                loc: [21, 50, 21, 55],
                text: "ada",
              },
            },
          ],
        },
      },
    ],
    children: [],
  }),
);
