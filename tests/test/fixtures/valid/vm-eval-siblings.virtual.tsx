import { bundler } from "@backtickjs/bundler";
import { cs, vm } from "@backtickjs/core";

// A bundle evaluated among siblings. What it draws goes where the call stands,
// and nothing of its own does: the spans either side keep their order.
async function Other() {
  return cs.lift(cs.const(<em>{cs.lift("from another bundle")}</em>));
}

const held = await bundler.run(<Other />);

export default cs.lift(cs.const(<div>{cs.lift(<span>before</span>)}{cs.lift(cs.receiver(cs.splice((vm)) satisfies typeof cs.ClientUnknown).eval(cs.splice((held)) satisfies typeof cs.ClientUnknown))}{cs.lift(<span>after</span>)}</div>));
