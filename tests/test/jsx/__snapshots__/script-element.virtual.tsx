import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";

// An element a script writes, rather than one the host wrote and the script
// spliced in. What it lowers to is the node a tree entry builds, so the two
// spellings draw the same thing — the difference is where the element is
// written, not what it is.
async function Card() {
  return cs.lift((() => {
    const [__cs_label, __cs_setLabel] = cs.splice((createSignal))("hi");

    // A handler written inline and one held under a name: both are client code,
    // and a handler prop takes a function and nothing else.
    const __cs_row = (__cs_size: number) => {
      const __cs_css = "font-size: " + __cs_size + "px";
      const __cs_press = () => __cs_setLabel("held");
      return (
        <div style={__cs_css}>
          <span style={__cs_css} onclick={() => __cs_setLabel("pressed")}>
            {__cs_label()}
          </span>
          <span style="font-size: 8px">fixed</span>
          <span style={__cs_css} onclick={__cs_press}>
            held
          </span>
        </div>
      );
    };

    return <div style="padding: 0">{__cs_row(12)}</div>;
  })());
}

it("Card", async (t) => {
  await snapshotCase(t, "Card", <Card />);
});
