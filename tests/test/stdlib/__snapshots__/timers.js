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
      {
        code: "export default $0 => {\n  const stop = $0().clearInterval;\n  const repeating = $0().setInterval(() => 0, 1000);\n  stop(repeating);\n  $0().clearTimeout($0().setTimeout(() => 0, 1000));\n};",
        map: '{"version":3,"mappings":"eAyBOA,EAAA;EACD,MAAMC,IAAI,GAAGD,EAAA,EAAO,CAACE,aAAa;EAClC,MAAMC,SAAS,GAAGH,EAAA,EAAO,CAACI,WAAW,CAAC,MAAM,CAAC,EAAE,IAAI,CAAC;EACpDH,IAAI,CAACE,SAAS,CAAC;EACfH,EAAA,EAAO,CAACK,YAAY,CAACL,EAAA,EAAO,CAACM,UAAU,CAAC,MAAM,CAAC,EAAE,IAAI,CAAC,CAAC;AACzD,CAAC","names":["$0","stop","clearInterval","repeating","setInterval","clearTimeout","setTimeout"],"ignoreList":[],"sources":["timers.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
