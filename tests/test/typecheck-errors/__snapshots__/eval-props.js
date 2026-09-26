import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { bundler } from "@backtickjs/bundler";
import { transform } from "@backtickjs/solid-js/transform";
import { cs } from "@backtickjs/core";
// Built rather than written out: what a bundle looks like is the bundler's, and
// a fixture that spelled one would pin the format twice. The claim about what
// each takes is still written, because that is what is under test.
async function Row({ count }) {
  return cs.create(
    "1zsasunacegt:15:9",
    { params: [{ kind: "splice", value: count, bindings: [] }] },
    {
      code: 'export default ($0) => <em>{"rows " + $0()}</em>;',
      map: '{"version":3,"file":"eval-props.test.jsx","sourceRoot":"","sources":["eval-props.test.tsx"],"names":[],"mappings":"eAcY,QAAA,CAAC,EAAE,CAAC,CAAC,OAAO,GAAG,IAAM,CAAC,EAAE,EAAE,CAAC"}',
      imports: [],
      exportAt: 0,
    },
  );
}
async function Nothing() {
  return cs.create(
    "1zsasunacegt:19:9",
    { params: [] },
    {
      code: 'export default () => <em>{"nothing to hand it"}</em>;',
      map: '{"version":3,"file":"eval-props.test.jsx","sourceRoot":"","sources":["eval-props.test.tsx"],"names":[],"mappings":"eAkBY,MAAA,CAAC,EAAE,CAAC,CAAC,oBAAoB,CAAC,EAAE,EAAE,CAAC"}',
      imports: [],
      exportAt: 0,
    },
  );
}
const rows = await bundler.run(
  cs.create(
    "1zsasunacegt:23:2",
    {
      params: [
        {
          kind: "splice",
          value: _jsx(Row, {
            count: cs.create(
              "1zsasunacegt:23:50",
              { params: [{ kind: "capture", key: "props$1zsasunacegt$0" }] },
              {
                code: "export default ($0) => $0.count;",
                map: '{"version":3,"file":"eval-props.test.jsx","sourceRoot":"","sources":["eval-props.test.tsx"],"names":[],"mappings":"eAsBqD,QAAA,EAAK,CAAC,KAAK"}',
                imports: [],
                exportAt: 0,
              },
            ),
          }),
          bindings: ["props$1zsasunacegt$0"],
        },
      ],
    },
    {
      code: "export default ($0) => (props) => $0(props);",
      map: '{"version":3,"file":"eval-props.test.jsx","sourceRoot":"","sources":["eval-props.test.tsx"],"names":[],"mappings":"eAsBK,QAAA,CAAC,KAAwB,EAAE,EAAE,CAAC,SAAC"}',
      imports: [],
      exportAt: 0,
    },
  ),
  { transform },
);
const empty = await bundler.run(_jsx(Nothing, {}), {
  transform,
});
export default cs.create(
  "1zsasunacegt:31:15",
  {
    params: [
      { kind: "splice", value: rows, bindings: [] },
      { kind: "splice", value: empty, bindings: [] },
    ],
  },
  {
    code: 'export default ($0, $1) => {\n    const Rows = eval($0());\n    const Empty = eval($1());\n    const wrongType = <Rows count={"one"}/>;\n    const unknownName = <Rows nope={1}/>;\n    const missing = <Rows />;\n    const called = <Empty count={1}/>;\n    return (<div>\n      \n      <Rows count={1}/>\n      {Empty}\n      {wrongType}\n      {unknownName}\n      {missing}\n      {called}\n      \n      {eval(null)}\n    </div>);\n};',
    map: '{"version":3,"file":"eval-props.test.jsx","sourceRoot":"","sources":["eval-props.test.tsx"],"names":[],"mappings":"eA8BkB;IAChB,MAAM,IAAI,GAAG,IAAI,CAAC,IAAK,CAAC,CAAC;IACzB,MAAM,KAAK,GAAG,IAAI,CAAC,IAAM,CAAC,CAAC;IAI3B,MAAM,SAAS,GAAG,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,KAAK,CAAC,EAAG,CAAC;IAEzC,MAAM,WAAW,GAAG,CAAC,IAAI,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,EAAG,CAAC;IAEtC,MAAM,OAAO,GAAG,CAAC,IAAI,CAAC,AAAD,EAAG,CAAC;IAIzB,MAAM,MAAM,GAAG,CAAC,KAAK,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,EAAG,CAAC;IAEnC,OAAO,CACL,CAAC,GAAG,CACF;MACA;MAAA,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,EACf;MAAA,CAAC,KAAK,CACN;MAAA,CAAC,SAAS,CACV;MAAA,CAAC,WAAW,CACZ;MAAA,CAAC,OAAO,CACR;MAAA,CAAC,MAAM,CACP;MACA;MAAA,CAEE,IAAI,CAAC,IAAI,CACX,CACF;IAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
    imports: [],
    exportAt: 0,
  },
);
