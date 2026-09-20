import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs, evaluate } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A bundle evaluated among siblings. What it draws goes where the call stands,
// and nothing of its own does: the spans either side keep their order.
async function Other() {
  return cs.lift(cs.const(<em>{cs.lift("from another bundle")}</em>));
}

const otherBundle = await bundler.run(<Other />);

it("evaluateSiblings", async (t) => {
  await snapshotCase(
    t,
    "evaluateSiblings",
    cs.lift(cs.const(<div>{cs.lift(<span>before</span>)}{cs.lift((cs.splice((evaluate)) satisfies typeof cs.ClientUnknown)((cs.splice((otherBundle)) satisfies typeof cs.ClientUnknown)))}{cs.lift(<span>after</span>)}</div>)),
  );
});
