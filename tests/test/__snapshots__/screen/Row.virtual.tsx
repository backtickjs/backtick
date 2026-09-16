import { cs, state } from "@backtickjs/core";

// `Pressable` is the row that responds as one thing: `View` lays children out
// and `Text` takes a press, and this takes both — so a checkbox and a label are
// one tap target while staying separately styled.
async function Row() {
  return cs.lift((() => {
    const __cs_count = cs.const((cs.splice((state)) satisfies typeof cs.ClientUnknown)(0));
    return cs.const(<button id={cs.lift("row")} style={cs.lift("display: flex; gap: 8px")} onclick={cs.lift(() => cs.receiver(__cs_count).write(cs.receiver(__cs_count).read() + 1))}>{cs.lift(<span style={cs.lift("font-weight: 700")}>{cs.lift(cs.receiver(__cs_count).read() > 0 ? "\u2611" : "\u2610")}</span>)}{cs.lift(<span>{cs.lift("pressed " + cs.receiver(__cs_count).read() + " times")}</span>)}</button>);
})());
}
