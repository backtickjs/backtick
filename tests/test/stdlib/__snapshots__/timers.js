import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { window } from "@backtickjs/browser";
import { snapshotCase } from "../snapshotCase.ts";
// A clock, which is the platform's rather than the language's: a script reaches
// one by splicing the browser's `window`, the same as anything else a platform
// hands over.
//
// And the shape of a member read off a handle. `$window.clearInterval` is
// read as a value and handed on, which is what a name has to survive being —
// the call site below reaches it through a variable, not through the window.
//
// An action rather than a value, and not by preference: starting a timer is a
// side effect, and a script that returns one cannot have those. Which is
// where a timer is started anyway — a handler is an action.
//
// Started and stopped in the one body, so nothing is left ticking after this
// is evaluated: what it pins is the lowering and the names, not the waiting.
// And either clear cancels either kind, which is why one of them is reached
// through the other's id.
it("timers", async (t) => {
  await snapshotCase(
    t,
    "timers",
    cs.create(
      "18988aj10wskx:26:4",
      { params: [{ kind: "splice", value: window, bindings: [] }] },
      "($splice0) => {\n    const stop = $splice0().clearInterval;\n    const repeating = $splice0().setInterval(() => 0, 1000);\n    stop(repeating);\n    $splice0().clearTimeout($splice0().setTimeout(() => 0, 1000));\n}",
      '{"version":3,"file":"timers.test.jsx","sourceRoot":"","sources":["stdlib/timers.test.tsx"],"names":[],"mappings":"AAyBO;IACD,MAAM,IAAI,GAAG,UAAO,CAAC,aAAa,CAAC;IACnC,MAAM,SAAS,GAAG,UAAO,CAAC,WAAW,CAAC,GAAG,EAAE,CAAC,CAAC,EAAE,IAAI,CAAC,CAAC;IACrD,IAAI,CAAC,SAAS,CAAC,CAAC;IAChB,UAAO,CAAC,YAAY,CAAC,UAAO,CAAC,UAAU,CAAC,GAAG,EAAE,CAAC,CAAC,EAAE,IAAI,CAAC,CAAC,CAAC;AAC1D,CAAC"}',
    ),
  );
});
