import { cs } from "@backtickjs/core";
// A component tag naming a binding the script holds calls it, so what the
// binding holds has to be a function: `Tag` here is a number.
// @ts-expect-error: JSX element type 'Tag' does not have any construct or call signatures.
const held = cs.create(
  "xwewmj2gozc5:6:13",
  { params: [] },
  {
    code: "export default () => (Tag) => <Tag />;",
    map: '{"version":3,"file":"script-element-bound-tag.test.jsx","sourceRoot":"","sources":["script-element-bound-tag.test.tsx"],"names":[],"mappings":"eAKgB,MAAA,CAAC,GAAW,EAAE,EAAE,CAAC,CAAC,GAAG,CAAC,AAAD,EAAG"}',
    imports: [],
    exportAt: 0,
  },
);
