import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A component spliced as a value, then used as a tag under the script's own
// name for it. It is expanded like any host function: against a hole standing
// for its props, so `props.title` is read where the drawing reads it.
function Card(props) {
  return _jsx("h2", { children: props.title });
}
it("splicedComponent", async (t) => {
  await snapshotCase(
    t,
    "splicedComponent",
    cs.create(
      "1dupdldvieh7y:17:4",
      { params: [{ kind: "splice", value: Card, bindings: [] }] },
      '($splice0) => {\n    const Heading = $splice0();\n    return <Heading title="tag"/>;\n}',
      '{"version":3,"file":"spliced-component.test.jsx","sourceRoot":"","sources":["components/spliced-component.test.tsx"],"names":[],"mappings":"AAgBO;IACD,MAAM,OAAO,GAAG,UAAK,CAAC;IACtB,OAAO,CAAC,OAAO,CAAC,KAAK,CAAC,KAAK,EAAG,CAAC;AACjC,CAAC"}',
    ),
  );
});
