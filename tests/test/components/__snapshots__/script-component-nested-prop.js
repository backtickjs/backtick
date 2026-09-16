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
      [27, 5, 27, 51],
      {
        version: "0.0.0",
        filePath: "components/script-component-nested-prop.test.tsx",
        fileHash: "f9eea3gp8wr6",
        splices: { $Greeting: { value: Greeting, params: [] } },
        captures: [],
      },
      () => ({
        kind: "jsx",
        loc: [27, 8, 27, 50],
        type: {
          kind: "splice",
          loc: [27, 9, 27, 17],
          key: "$Greeting",
        },
        attributes: [
          {
            name: "person",
            initializer: {
              kind: "obj",
              loc: [27, 26, 27, 46],
              properties: [
                {
                  kind: ":",
                  loc: [27, 28, 27, 44],
                  name: "firstName",
                  initializer: {
                    kind: "string",
                    loc: [27, 39, 27, 44],
                    text: "ada",
                  },
                },
              ],
            },
          },
        ],
        children: [],
      }),
    ),
  );
});
