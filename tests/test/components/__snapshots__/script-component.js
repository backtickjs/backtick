import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A host component spliced into a client script and used as a tag under the
// script's own name for it. What a splice holds that is a function is its
// expansion: the component run once against one opaque hole for the argument
// it takes, with a field read off that hole wherever it read a prop. The tag is
// a call of it.
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
      "kb4jgh2qale6:27:4",
      {
        params: [
          { kind: "splice", value: Card, bindings: [] },
          { kind: "splice", value: Badge, bindings: [] },
        ],
      },
      '($splice0, $splice1) => {\n    const Heading = $splice0();\n    const New = $splice1();\n    return (<div>\n          <Heading title="totals"/>\n          <New />\n        </div>);\n}',
      '{"version":3,"file":"script-component.test.jsx","sourceRoot":"","sources":["components/script-component.test.tsx"],"names":[],"mappings":"AA0BO;IACD,MAAM,OAAO,GAAG,UAAK,CAAC;IACtB,MAAM,GAAG,GAAG,UAAM,CAAC;IACnB,OAAO,CACL,CAAC,GAAG,CACF;UAAA,CAAC,OAAO,CAAC,KAAK,CAAC,QAAQ,EACvB;UAAA,CAAC,GAAG,CAAC,AAAD,EACN;QAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
    ),
  );
});
