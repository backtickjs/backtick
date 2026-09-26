import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A clock, which is the platform's rather than the language's: a script reaches
// one by splicing the browser's `window`, the same as anything else a platform
// hands over.
//
// And the shape of a member read off a handle. `window.clearInterval` is
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
      "24wbmcspf2ydv:25:4",
      { params: [] },
      "() => {\n    const stop = window.clearInterval;\n    const repeating = window.setInterval(() => 0, 1000);\n    stop(repeating);\n    window.clearTimeout(window.setTimeout(() => 0, 1000));\n}",
      '{"version":3,"file":"timers.test.jsx","sourceRoot":"","sources":["stdlib/timers.test.tsx"],"names":[],"mappings":"AAwBO;IACD,MAAM,IAAI,GAAG,MAAM,CAAC,aAAa,CAAC;IAClC,MAAM,SAAS,GAAG,MAAM,CAAC,WAAW,CAAC,GAAG,EAAE,CAAC,CAAC,EAAE,IAAI,CAAC,CAAC;IACpD,IAAI,CAAC,SAAS,CAAC,CAAC;IAChB,MAAM,CAAC,YAAY,CAAC,MAAM,CAAC,UAAU,CAAC,GAAG,EAAE,CAAC,CAAC,EAAE,IAAI,CAAC,CAAC,CAAC;AACxD,CAAC"}',
    ),
  );
});
