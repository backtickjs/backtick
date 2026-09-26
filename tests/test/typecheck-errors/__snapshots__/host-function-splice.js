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
  '($0, $1) => {\n    const Heading = $0();\n    return <$1 title="tag"/>;\n}',
  '{"version":3,"file":"host-function-splice.test.jsx","sourceRoot":"","sources":["typecheck-errors/host-function-splice.test.tsx"],"names":[],"mappings":"AASkB;IAEhB,MAAM,OAAO,GAAG,IAAK,CAAC;IACtB,OAAO,CAAC,EAAI,CAAC,KAAK,CAAC,KAAK,EAAG,CAAC;AAC9B,CAAC"}',
);
