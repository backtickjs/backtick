import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A client component the host holds, and a binding of the same name an
// enclosing script holds. Scope decides: the nested script's `<Card>` is the
// captured function, and only the one outside every script binding it is the
// host's.
const Card = cs.create(
  "1frijc9i1kpaq:11:13",
  { params: [] },
  "() => (props) => <h2>{props.title}</h2>",
  '{"version":3,"file":"script-bound-tag-capture-shadow.test.jsx","sourceRoot":"","sources":["captures/script-bound-tag-capture-shadow.test.tsx"],"names":[],"mappings":"AAUgB,MAAA,CAAC,KAAwB,EAAE,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,KAAK,CAAC,KAAK,CAAC,EAAE,EAAE,CAAC"}',
);
// Instantiated twice with different labels, so the enclosing script is
// polymorphic and its nested script's captures arrive through a thunk.
function labelled(label) {
  return cs.create(
    "1frijc9i1kpaq:16:9",
    {
      params: [
        { kind: "splice", value: label, bindings: [] },
        {
          kind: "splice",
          value: cs.create(
            "1frijc9i1kpaq:18:17",
            { params: [{ kind: "capture", key: "Card$1frijc9i1kpaq$1" }] },
            "($capture0) => <$capture0 n={1}/>",
            '{"version":3,"file":"script-bound-tag-capture-shadow.test.jsx","sourceRoot":"","sources":["captures/script-bound-tag-capture-shadow.test.tsx"],"names":[],"mappings":"AAiBoB,eAAA,CAAC,SAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAG"}',
          ),
          bindings: ["Card$1frijc9i1kpaq$1"],
        },
      ],
    },
    "($splice0, $splice1) => {\n    const Card = (props) => <i>{$splice0() + props.n}</i>;\n    return <p>{$splice1(Card)}</p>;\n}",
    '{"version":3,"file":"script-bound-tag-capture-shadow.test.jsx","sourceRoot":"","sources":["captures/script-bound-tag-capture-shadow.test.tsx"],"names":[],"mappings":"AAeY;IACR,MAAM,IAAI,GAAG,CAAC,KAAoB,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,UAAM,GAAG,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC;IACjE,OAAO,CAAC,CAAC,CAAC,CAAC,cAAqB,CAAC,EAAE,CAAC,CAAC,CAAC;AACxC,CAAC"}',
  );
}
it("scriptBoundTagCaptureShadow", async (t) => {
  await snapshotCase(
    t,
    "scriptBoundTagCaptureShadow",
    cs.create(
      "1frijc9i1kpaq:26:4",
      {
        params: [
          {
            kind: "splice",
            value: labelled(
              cs.create(
                "1frijc9i1kpaq:28:18",
                { params: [] },
                '() => "a"',
                '{"version":3,"file":"script-bound-tag-capture-shadow.test.jsx","sourceRoot":"","sources":["captures/script-bound-tag-capture-shadow.test.tsx"],"names":[],"mappings":"AA2BqB,MAAA,GAAG"}',
              ),
            ),
            bindings: [],
          },
          {
            kind: "splice",
            value: labelled(
              cs.create(
                "1frijc9i1kpaq:29:18",
                { params: [] },
                '() => "b"',
                '{"version":3,"file":"script-bound-tag-capture-shadow.test.jsx","sourceRoot":"","sources":["captures/script-bound-tag-capture-shadow.test.tsx"],"names":[],"mappings":"AA4BqB,MAAA,GAAG"}',
              ),
            ),
            bindings: [],
          },
          { kind: "tag", value: Card },
        ],
      },
      '($splice0, $splice1, $tag2) => <div>\n      <$tag2 title="host"/>\n      {$splice0()}\n      {$splice1()}\n    </div>',
      '{"version":3,"file":"script-bound-tag-capture-shadow.test.jsx","sourceRoot":"","sources":["captures/script-bound-tag-capture-shadow.test.tsx"],"names":[],"mappings":"AAyBO,+BAAA,CAAC,GAAG,CACL;MAAA,CAAC,KAAI,CAAC,KAAK,CAAC,MAAM,EAClB;MAAA,CAAC,UAAoB,CACrB;MAAA,CAAC,UAAoB,CACvB;IAAA,EAAE,GAAG,CAAC"}',
    ),
  );
});
// Which tag names a function the script holds is the scope rule every name
// follows. Inside the arrow, `Card` is its parameter; outside it, the same
// name is the host's component.
it("scriptBoundTagScope", async (t) => {
  await snapshotCase(
    t,
    "scriptBoundTagScope",
    cs.create(
      "1frijc9i1kpaq:41:4",
      { params: [{ kind: "tag", value: Card }] },
      '($tag0) => {\n    const twice = (Card) => (<div>\n          <Card n={1}/>\n          <Card n={2}/>\n        </div>);\n    return (<section>\n          <$tag0 title="host"/>\n          {twice((props) => (<i>{"row " + props.n}</i>))}\n        </section>);\n}',
      '{"version":3,"file":"script-bound-tag-capture-shadow.test.jsx","sourceRoot":"","sources":["captures/script-bound-tag-capture-shadow.test.tsx"],"names":[],"mappings":"AAwCO;IACD,MAAM,KAAK,GAAG,CAAC,IAA2C,EAAE,EAAE,CAAC,CAC7D,CAAC,GAAG,CACF;UAAA,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EACX;UAAA,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EACb;QAAA,EAAE,GAAG,CAAC,CACP,CAAC;IAEF,OAAO,CACL,CAAC,OAAO,CACN;UAAA,CAAC,KAAI,CAAC,KAAK,CAAC,MAAM,EAClB;UAAA,CAAC,KAAK,CAAC,CAAC,KAAoB,EAAE,EAAE,CAAC,CAC/B,CAAC,CAAC,CAAC,CAAC,MAAM,GAAG,KAAK,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,CAC1B,CAAC,CACJ;QAAA,EAAE,OAAO,CAAC,CACX,CAAC;AACJ,CAAC"}',
    ),
  );
});
