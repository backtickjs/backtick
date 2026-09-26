import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { cs } from "@backtickjs/core";
// A host function is not spliceable (see `Spliceable`): only a tag may name
// one, as a component. Client behaviour is `cs`.
function Card(props) {
  return _jsx("h2", { children: props.title });
}
export default cs.create(
  "1cgjxfb71wjwz:10:15",
  {
    params: [
      { kind: "splice", value: Card, bindings: [] },
      { kind: "tag", value: Card },
    ],
  },
  {
    code: 'import { createComponent as _$createComponent } from "solid-js/web";\nexport default ($0, $1) => {\n  const Heading = $0();\n  return _$createComponent($1, {\n    title: "tag"\n  });\n};',
    map: '{"version":3,"mappings":";eASkB,CAAAA,EAAA,EAAAC,EAAA;EAEhB,MAAMC,OAAO,GAAGF,EAAA,EAAK;EACrB,OAAAG,iBAAA,CAAQF,EAAI;IAACG,KAAK;EAAA;AACpB,CAAC","names":["$0","$1","Heading","_$createComponent","title"],"ignoreList":[],"sources":["host-function-splice.test.tsx"]}',
    imports: [
      {
        from: "solid-js/web",
        range: [0, 68],
        bindings: [{ name: "createComponent", local: "_$createComponent" }],
      },
    ],
    exportAt: 69,
  },
);
