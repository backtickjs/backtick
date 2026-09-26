import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";
// A handler is handed what the DOM hands it, and which event that is comes
// from the DOM: `click` is a `PointerEvent`, `input` an `InputEvent`.
//
// `currentTarget` is the element the handler is on rather than the DOM's
// opaque `EventTarget`, which is what makes reading a field's value sayable —
// the DOM expects a cast there, and this language has none.
it("eventHandlers", async (t) => {
  await snapshotCase(
    t,
    "eventHandlers",
    cs.create(
      "1s1l8g4skisa9:16:4",
      { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
      {
        code: 'export default ($0) => {\n    const said = $0()("");\n    return (<form onsubmit={(event) => {\n            event.preventDefault();\n            said[1](event.type + " " + event.cancelable);\n        }}>\n          <textarea oninput={(event) => said[1](event.currentTarget.value)}/>\n          <input oninput={(event) => said[1](event.currentTarget.value)}/>\n          <button onclick={(event) => said[1](event.clientX + " " + event.currentTarget.tagName)}>\n            {said[0]()}\n          </button>\n        </form>);\n};',
        map: '{"version":3,"file":"event-handlers.test.jsx","sourceRoot":"","sources":["event-handlers.test.tsx"],"names":[],"mappings":"eAeO;IACD,MAAM,IAAI,GAAG,IAAa,CAAC,EAAE,CAAC,CAAC;IAE/B,OAAO,CACL,CAAC,IAAI,CACH,QAAQ,CAAC,CAAC,CAAC,KAAK,EAAE,EAAE;YAClB,KAAK,CAAC,cAAc,EAAE,CAAC;YACvB,IAAI,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,IAAI,GAAG,GAAG,GAAG,KAAK,CAAC,UAAU,CAAC,CAAC;QAC/C,CAAC,CAAC,CAEF;UAAA,CAAC,QAAQ,CAAC,OAAO,CAAC,CAAC,CAAC,KAAK,EAAE,EAAE,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,aAAa,CAAC,KAAK,CAAC,CAAC,EACjE;UAAA,CAAC,KAAK,CAAC,OAAO,CAAC,CAAC,CAAC,KAAK,EAAE,EAAE,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,aAAa,CAAC,KAAK,CAAC,CAAC,EAC9D;UAAA,CAAC,MAAM,CACL,OAAO,CAAC,CAAC,CAAC,KAAK,EAAE,EAAE,CACjB,IAAI,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,OAAO,GAAG,GAAG,GAAG,KAAK,CAAC,aAAa,CAAC,OAAO,CAC3D,CAAC,CAED;YAAA,CAAC,IAAI,CAAC,CAAC,CAAC,EAAE,CACZ;UAAA,EAAE,MAAM,CACV;QAAA,EAAE,IAAI,CAAC,CACR,CAAC;AACJ,CAAC"}',
      },
    ),
  );
});
