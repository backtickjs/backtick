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
const scriptComponentNestedProp = cs.create(
  [21, 35, 23, 4],
  {
    version: "0.0.0",
    filePath: "scriptComponentNestedProp.tsx",
    fileHash: "2ojksi16rswxz",
    splices: { $Greeting: { value: Greeting, params: [] } },
    captures: [],
  },
  () => ({
    kind: "jsx",
    loc: [21, 38, 23, 3],
    type: {
      kind: "splice",
      loc: [21, 39, 21, 47],
      key: "$Greeting",
    },
    attributes: [
      {
        name: "person",
        initializer: {
          kind: "obj",
          loc: [22, 11, 22, 31],
          properties: [
            {
              kind: ":",
              loc: [22, 13, 22, 29],
              name: "firstName",
              initializer: {
                kind: "string",
                loc: [22, 24, 22, 29],
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
