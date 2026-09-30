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
      "35n10e2h62hfl:17:4",
      { params: [{ kind: "splice", value: Card, bindings: [] }] },
      '($splice0) => {\n    const Heading = $splice0();\n    return <Heading title="tag"/>;\n}',
      '{"version":3,"file":"spliced-component.test.jsx","sourceRoot":"","sources":["components/spliced-component.test.tsx"],"names":[],"mappings":"AAgBO;IACD,MAAM,OAAO,GAAG,UAAK,CAAC;IACtB,OAAO,CAAC,OAAO,CAAC,KAAK,CAAC,KAAK,EAAG,CAAC;AACjC,CAAC"}',
    ),
  );
});
// Spliced in two scripts, it is still one declaration: both name `$expn0`.
it("splicedComponentTwice", async (t) => {
  await snapshotCase(
    t,
    "splicedComponentTwice",
    cs.create(
      "35n10e2h62hfl:29:4",
      {
        params: [
          {
            kind: "splice",
            value: cs.create(
              "35n10e2h62hfl:31:10",
              { params: [{ kind: "splice", value: Card, bindings: [] }] },
              '($splice0) => {\n    const Heading = $splice0();\n    return <Heading title="first"/>;\n}',
              '{"version":3,"file":"spliced-component.test.jsx","sourceRoot":"","sources":["components/spliced-component.test.tsx"],"names":[],"mappings":"AA8Ba;IACH,MAAM,OAAO,GAAG,UAAK,CAAC;IACtB,OAAO,CAAC,OAAO,CAAC,KAAK,CAAC,OAAO,EAAG,CAAC;AACnC,CAAC"}',
            ),
            bindings: [],
          },
          {
            kind: "splice",
            value: cs.create(
              "35n10e2h62hfl:37:10",
              { params: [{ kind: "splice", value: Card, bindings: [] }] },
              '($splice0) => {\n    const Heading = $splice0();\n    return <Heading title="second"/>;\n}',
              '{"version":3,"file":"spliced-component.test.jsx","sourceRoot":"","sources":["components/spliced-component.test.tsx"],"names":[],"mappings":"AAoCa;IACH,MAAM,OAAO,GAAG,UAAK,CAAC;IACtB,OAAO,CAAC,OAAO,CAAC,KAAK,CAAC,QAAQ,EAAG,CAAC;AACpC,CAAC"}',
            ),
            bindings: [],
          },
        ],
      },
      "($splice0, $splice1) => <div>\n      {$splice0()}\n      {$splice1()}\n    </div>",
      '{"version":3,"file":"spliced-component.test.jsx","sourceRoot":"","sources":["components/spliced-component.test.tsx"],"names":[],"mappings":"AA4BO,wBAAA,CAAC,GAAG,CACL;MAAA,CACE,UAIF,CACA;MAAA,CACE,UAIF,CACF;IAAA,EAAE,GAAG,CAAC"}',
    ),
  );
});
