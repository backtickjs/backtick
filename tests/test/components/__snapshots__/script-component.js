import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
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
      "t5r0so0w4r80:27:4",
      {
        params: [
          { kind: "tag", value: Card },
          { kind: "tag", value: Badge },
        ],
      },
      '($tag0, $tag1) => {\n    return (<div>\n          <$tag0 title="totals"/>\n          <$tag1 />\n        </div>);\n}',
      '{"version":3,"file":"script-component.test.jsx","sourceRoot":"","sources":["components/script-component.test.tsx"],"names":[],"mappings":"AA0BO;IACD,OAAO,CACL,CAAC,GAAG,CACF;UAAA,CAAC,KAAI,CAAC,KAAK,CAAC,QAAQ,EACpB;UAAA,CAAC,KAAK,CAAC,AAAD,EACR;QAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
    ),
  );
});
