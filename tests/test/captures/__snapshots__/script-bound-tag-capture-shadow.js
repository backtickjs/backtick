import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A host component, and a binding of the same name an enclosing script holds.
// Scope decides: the nested script's `<Card>` is the captured function, and
// only the one outside every script binding it is the host's.
async function Card(props) {
  return _jsx("h2", { children: props.title });
}
// Instantiated twice with different labels, so the enclosing script is
// polymorphic and its nested script's captures arrive through a thunk.
function labelled(label) {
  return cs.create(
    "2mv5sg07ackia:16:9",
    {
      params: [
        { kind: "splice", value: label, bindings: [] },
        {
          kind: "splice",
          value: cs.create(
            "2mv5sg07ackia:18:17",
            { params: [{ kind: "capture", key: "Card$2mv5sg07ackia$0" }] },
            {
              code: "export default ($0) => <$0 n={1}/>;",
              map: '{"version":3,"file":"script-bound-tag-capture-shadow.test.jsx","sourceRoot":"","sources":["script-bound-tag-capture-shadow.test.tsx"],"names":[],"mappings":"eAiBoB,QAAA,CAAC,EAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAG"}',
            },
          ),
          bindings: ["Card$2mv5sg07ackia$0"],
        },
      ],
    },
    {
      code: "export default ($0, $1) => {\n    const Card = (props) => <i>{$0() + props.n}</i>;\n    return <p>{$1(Card)}</p>;\n};",
      map: '{"version":3,"file":"script-bound-tag-capture-shadow.test.jsx","sourceRoot":"","sources":["script-bound-tag-capture-shadow.test.tsx"],"names":[],"mappings":"eAeY;IACR,MAAM,IAAI,GAAG,CAAC,KAAoB,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,IAAM,GAAG,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC;IACjE,OAAO,CAAC,CAAC,CAAC,CAAC,QAAqB,CAAC,EAAE,CAAC,CAAC,CAAC;AACxC,CAAC"}',
    },
  );
}
it("scriptBoundTagCaptureShadow", async (t) => {
  await snapshotCase(
    t,
    "scriptBoundTagCaptureShadow",
    cs.create(
      "2mv5sg07ackia:26:4",
      {
        params: [
          {
            kind: "splice",
            value: labelled(
              cs.create(
                "2mv5sg07ackia:28:18",
                { params: [] },
                {
                  code: 'export default () => "a";',
                  map: '{"version":3,"file":"script-bound-tag-capture-shadow.test.jsx","sourceRoot":"","sources":["script-bound-tag-capture-shadow.test.tsx"],"names":[],"mappings":"eA2BqB,MAAA,GAAG"}',
                },
              ),
            ),
            bindings: [],
          },
          {
            kind: "splice",
            value: labelled(
              cs.create(
                "2mv5sg07ackia:29:18",
                { params: [] },
                {
                  code: 'export default () => "b";',
                  map: '{"version":3,"file":"script-bound-tag-capture-shadow.test.jsx","sourceRoot":"","sources":["script-bound-tag-capture-shadow.test.tsx"],"names":[],"mappings":"eA4BqB,MAAA,GAAG"}',
                },
              ),
            ),
            bindings: [],
          },
          { kind: "tag", value: Card },
        ],
      },
      {
        code: 'export default ($0, $1, $2) => <div>\n      <$2 title="host"/>\n      {$0()}\n      {$1()}\n    </div>;',
        map: '{"version":3,"file":"script-bound-tag-capture-shadow.test.jsx","sourceRoot":"","sources":["script-bound-tag-capture-shadow.test.tsx"],"names":[],"mappings":"eAyBO,gBAAA,CAAC,GAAG,CACL;MAAA,CAAC,EAAI,CAAC,KAAK,CAAC,MAAM,EAClB;MAAA,CAAC,IAAoB,CACrB;MAAA,CAAC,IAAoB,CACvB;IAAA,EAAE,GAAG,CAAC"}',
      },
    ),
  );
});
// Which tag names a function the script holds is the scope rule every name
// follows. Inside the arrow, `Card` is its parameter; outside it, the same
// name is the host's component, spliced as before.
it("scriptBoundTagScope", async (t) => {
  await snapshotCase(
    t,
    "scriptBoundTagScope",
    cs.create(
      "2mv5sg07ackia:41:4",
      { params: [{ kind: "tag", value: Card }] },
      {
        code: 'export default ($0) => {\n    const twice = (Card) => (<div>\n          <Card n={1}/>\n          <Card n={2}/>\n        </div>);\n    return (<section>\n          <$0 title="host"/>\n          {twice((props) => (<i>{"row " + props.n}</i>))}\n        </section>);\n};',
        map: '{"version":3,"file":"script-bound-tag-capture-shadow.test.jsx","sourceRoot":"","sources":["script-bound-tag-capture-shadow.test.tsx"],"names":[],"mappings":"eAwCO;IACD,MAAM,KAAK,GAAG,CAAC,IAA+C,EAAE,EAAE,CAAC,CACjE,CAAC,GAAG,CACF;UAAA,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EACX;UAAA,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EACb;QAAA,EAAE,GAAG,CAAC,CACP,CAAC;IAEF,OAAO,CACL,CAAC,OAAO,CACN;UAAA,CAAC,EAAI,CAAC,KAAK,CAAC,MAAM,EAClB;UAAA,CAAC,KAAK,CAAC,CAAC,KAAoB,EAAE,EAAE,CAAC,CAC/B,CAAC,CAAC,CAAC,CAAC,MAAM,GAAG,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAC1B,CAAC,CACJ;QAAA,EAAE,OAAO,CAAC,CACX,CAAC;AACJ,CAAC"}',
      },
    ),
  );
});
