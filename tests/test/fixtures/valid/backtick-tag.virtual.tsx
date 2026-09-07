import { cs } from "@backtickjs/core";

// A bundle drawn inside a drawing, and a bundle that is not there yet.
//
// What lands in the drawing is what the inner bundle drew — no element of its
// own. A backtick draws no node, the way a list does not, so nothing of the tag
// reaches the target.
const held = JSON.stringify({
  functions: { "0": ["=>", [], ["el", "em", {}, "from another bundle"]] },
  root: ["()", ["fn", "0"], []],
});

export default cs.lift(cs.const(<div>{cs.lift(<span>before</span>)}{cs.lift(<backtick bundle={cs.lift(cs.splice((held)) satisfies import("@backtickjs/core").ClientUnknown)}/>)}{cs.lift(<backtick bundle={cs.lift(null)}/>)}{cs.lift(<span>after</span>)}</div>));
