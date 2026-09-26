import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
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
      {
        code: 'export default ($0) => <$0 person={{ firstName: "ada" }}/>;',
        map: '{"version":3,"file":"script-component-nested-prop.test.jsx","sourceRoot":"","sources":["script-component-nested-prop.test.tsx"],"names":[],"mappings":"eA0BO,QAAA,CAAC,EAAQ,CAAC,MAAM,CAAC,CAAC,EAAE,SAAS,EAAE,KAAK,EAAE,CAAC,EAAG"}',
      },
    ),
  );
});
