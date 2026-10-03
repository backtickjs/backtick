import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// `<>…</>` in a script is Solid's fragment: its children where it stands, and no
// node of its own. Solid takes one only at the top of an expression, so a child
// that is one is written in braces.
it("fragmentShorthand", async (t) => {
  await snapshotCase(
    t,
    "fragmentShorthand",
    cs.lift((() => <div>
      {
        <>
          <span>a</span>
          <span>b</span>
        </>
      }
    </div>)()),
  );
});
