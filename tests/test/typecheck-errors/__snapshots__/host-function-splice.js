import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { cs } from "@backtickjs/core";
// A host function is not spliceable (see `Spliceable`): only a tag may name
// one, as a component. Client behaviour is `cs`.
function Card(props) {
  return _jsx("h2", { children: props.title });
}
export default cs.create(
  "2d4xjbzbsm8no:10:15",
  {
    params: [
      { kind: "splice", value: Card, bindings: [] },
      { kind: "tag", value: Card },
    ],
  },
  '($splice0, $tag1) => {\n    const Heading = $splice0();\n    return <$tag1 title="tag"/>;\n}',
  '{"version":3,"file":"host-function-splice.test.jsx","sourceRoot":"","sources":["typecheck-errors/host-function-splice.test.tsx"],"names":[],"mappings":"AASkB;IAEhB,MAAM,OAAO,GAAG,UAAK,CAAC;IACtB,OAAO,CAAC,KAAI,CAAC,KAAK,CAAC,KAAK,EAAG,CAAC;AAC9B,CAAC"}',
);
