import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { bundler } from "@backtickjs/bundler";
import { compile } from "@backtickjs/solid-js/transform";
import { cs } from "@backtickjs/core";
// Built rather than written out: what a bundle looks like is the bundler's, and
// a fixture that spelled one would pin the format twice. The claim about what
// each takes is still written, because that is what is under test.
async function Row({ count }) {
  return cs.create(
    "2msn24wxkt6xj:16:9",
    { params: [{ kind: "splice", value: count, bindings: [] }] },
    '($splice0) => <em>{"rows " + $splice0()}</em>',
    '{"version":3,"file":"eval-props.test.jsx","sourceRoot":"","sources":["typecheck-errors/eval-props.test.tsx"],"names":[],"mappings":"AAeY,cAAA,CAAC,EAAE,CAAC,CAAC,OAAO,GAAG,UAAM,CAAC,EAAE,EAAE,CAAC"}',
  );
}
async function Nothing() {
  return cs.create(
    "2msn24wxkt6xj:20:9",
    { params: [] },
    '() => <em>{"nothing to hand it"}</em>',
    '{"version":3,"file":"eval-props.test.jsx","sourceRoot":"","sources":["typecheck-errors/eval-props.test.tsx"],"names":[],"mappings":"AAmBY,MAAA,CAAC,EAAE,CAAC,CAAC,oBAAoB,CAAC,EAAE,EAAE,CAAC"}',
  );
}
const rows = compile(
  await bundler.run(
    cs.create(
      "2msn24wxkt6xj:25:4",
      {
        params: [
          {
            kind: "splice",
            value: _jsx(Row, {
              count: cs.create(
                "2msn24wxkt6xj:25:52",
                { params: [{ kind: "capture", key: "props$2msn24wxkt6xj$0" }] },
                "($capture0) => $capture0.count",
                '{"version":3,"file":"eval-props.test.jsx","sourceRoot":"","sources":["typecheck-errors/eval-props.test.tsx"],"names":[],"mappings":"AAwBuD,eAAA,SAAK,CAAC,KAAK"}',
              ),
            }),
            bindings: ["props$2msn24wxkt6xj$0"],
          },
        ],
      },
      "($splice0) => (props) => $splice0(props)",
      '{"version":3,"file":"eval-props.test.jsx","sourceRoot":"","sources":["typecheck-errors/eval-props.test.tsx"],"names":[],"mappings":"AAwBO,cAAA,CAAC,KAAwB,EAAE,EAAE,CAAC,eAAC"}',
    ),
  ),
).code;
const empty = compile(await bundler.run(_jsx(Nothing, {}))).code;
export default cs.create(
  "2msn24wxkt6xj:32:15",
  {
    params: [
      { kind: "splice", value: rows, bindings: [] },
      { kind: "splice", value: empty, bindings: [] },
    ],
  },
  '($splice0, $splice1) => {\n    const Rows = eval($splice0());\n    const Empty = eval($splice1());\n    const wrongType = <Rows count={"one"}/>;\n    const unknownName = <Rows nope={1}/>;\n    const missing = <Rows />;\n    const called = <Empty count={1}/>;\n    return (<div>\n      \n      <Rows count={1}/>\n      {Empty}\n      {wrongType}\n      {unknownName}\n      {missing}\n      {called}\n      \n      {eval(null)}\n    </div>);\n}',
  '{"version":3,"file":"eval-props.test.jsx","sourceRoot":"","sources":["typecheck-errors/eval-props.test.tsx"],"names":[],"mappings":"AA+BkB;IAChB,MAAM,IAAI,GAAG,IAAI,CAAC,UAAK,CAAC,CAAC;IACzB,MAAM,KAAK,GAAG,IAAI,CAAC,UAAM,CAAC,CAAC;IAI3B,MAAM,SAAS,GAAG,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,KAAK,CAAC,EAAG,CAAC;IAEzC,MAAM,WAAW,GAAG,CAAC,IAAI,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,EAAG,CAAC;IAEtC,MAAM,OAAO,GAAG,CAAC,IAAI,CAAC,AAAD,EAAG,CAAC;IAIzB,MAAM,MAAM,GAAG,CAAC,KAAK,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,EAAG,CAAC;IAEnC,OAAO,CACL,CAAC,GAAG,CACF;MACA;MAAA,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,EACf;MAAA,CAAC,KAAK,CACN;MAAA,CAAC,SAAS,CACV;MAAA,CAAC,WAAW,CACZ;MAAA,CAAC,OAAO,CACR;MAAA,CAAC,MAAM,CACP;MACA;MAAA,CAEE,IAAI,CAAC,IAAI,CACX,CACF;IAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
);
