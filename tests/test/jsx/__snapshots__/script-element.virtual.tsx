import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// An element a script writes, rather than one the host wrote and the script
// spliced in. What it lowers to is the node a tree entry builds, so the two
// spellings draw the same thing — the difference is where the element is
// written, not what it is.
async function Card() {
  return cs.lift((() => {
    const __cs_label = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)("hi"));
    // A handler written inline and one held under a name: both are client code,
    // and a handler prop takes a function and nothing else.
    const __cs_row = cs.const((__cs_size: number) => {
        const __cs_css = cs.const("font-size: " + __cs_size + "px");
        const __cs_press = cs.const(() => cs.receiver(__cs_label).set("held"));
        return cs.const(<div style={cs.lift(__cs_css)}>{cs.lift(<span style={cs.lift(__cs_css)} onclick={cs.lift(() => cs.receiver(__cs_label).set("pressed"))}>{cs.lift(cs.receiver(__cs_label).get())}</span>)}{cs.lift(<span style={cs.lift("font-size: 8px")}>fixed</span>)}{cs.lift(<span style={cs.lift(__cs_css)} onclick={cs.lift(__cs_press)}>
            held
          </span>)}</div>);
    });
    return cs.const(<div style={cs.lift("padding: 0")}>{cs.lift(__cs_row(12))}</div>);
})());
}

it("Card", async (t) => {
  await snapshotCase(t, "Card", <Card />);
});
