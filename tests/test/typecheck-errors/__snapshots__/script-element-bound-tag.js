import { cs } from "@backtickjs/core";
// A component tag naming a binding the script holds calls it, so what the
// binding holds has to be a function: `Tag` here is a number.
// @ts-expect-error: JSX element type 'Tag' does not have any construct or call signatures.
const held = cs.create(
  "xwewmj2gozc5:6:13",
  { params: [] },
  {
    code: 'import { createComponent as _$createComponent } from "solid-js/web";\nexport default () => Tag => _$createComponent(Tag, {});',
    map: '{"version":3,"mappings":";eAKgB,MAACA,GAAW,IAAAC,iBAAA,CAAMD,GAAG,KAAG","names":["Tag","_$createComponent"],"ignoreList":[],"sources":["script-element-bound-tag.test.tsx"]}',
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
