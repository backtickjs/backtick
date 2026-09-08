import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";

async function Other() {
  return cs.lift(cs.const(<em>{cs.lift("from another bundle")}</em>));
}

const held = JSON.stringify(await bundler.run(<Other />));

export default cs.lift(cs.const(<div>{cs.lift(<span>before</span>)}{cs.lift(<backtick bundle={cs.lift(cs.splice((held)) satisfies import("@backtickjs/core").ClientUnknown)}/>)}{cs.lift(<backtick bundle={cs.lift(null)}/>)}{cs.lift(<span>after</span>)}</div>));
