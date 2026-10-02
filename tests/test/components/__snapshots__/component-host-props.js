import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A component's props are the host's own. It runs while bundling and consumes
// them there, so they never cross and need not be able to: a class instance and
// a host function are both fine here, where either would be refused in a
// script.
//
// This is why a drawing's props are `unknown` rather than what a client value
// may be — crossing is a tag's requirement, checked where a tag lowers.
class Palette {
  accent;
  constructor(accent) {
    this.accent = accent;
  }
}
async function Swatch(props) {
  const accent = props.palette.accent;
  const label = props.label();
  return cs.create(
    "2w330bu6mnxi6:22:9",
    {
      params: [
        { kind: "splice", value: accent, bindings: [] },
        { kind: "splice", value: label, bindings: [] },
      ],
    },
    "($splice0, $splice1) => <span class={$splice0()}>{$splice1()}</span>",
    '{"version":3,"file":"component-host-props.test.jsx","sourceRoot":"","sources":["components/component-host-props.test.tsx"],"names":[],"mappings":"AAqBY,wBAAA,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,UAAO,CAAC,CAAC,CAAC,UAAM,CAAC,EAAE,IAAI,CAAC"}',
  );
}
it("componentHostProps", async (t) => {
  await snapshotCase(
    t,
    "componentHostProps",
    cs.create(
      "2w330bu6mnxi6:29:4",
      {
        params: [
          {
            kind: "splice",
            value: _jsx(Swatch, {
              palette: new Palette("danger"),
              label: () => "one",
            }),
            bindings: [],
          },
        ],
      },
      "($splice0) => <div>\n      {$splice0()}\n    </div>",
      '{"version":3,"file":"component-host-props.test.jsx","sourceRoot":"","sources":["components/component-host-props.test.tsx"],"names":[],"mappings":"AA4BO,cAAA,CAAC,GAAG,CACL;MAAA,CAAC,UAAmE,CACtE;IAAA,EAAE,GAAG,CAAC"}',
    ),
  );
});
