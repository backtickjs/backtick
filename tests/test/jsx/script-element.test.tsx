import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";

// An element a script writes, rather than one the host wrote and the script
// spliced in. What it lowers to is the node a tree entry builds, so the two
// spellings draw the same thing — the difference is where the element is
// written, not what it is.
async function Card() {
  return cs`{
    const [label, setLabel] = $createSignal("hi");

    // A handler written inline and one held under a name: both are client code,
    // and a handler prop takes a function and nothing else.
    const row = (size: number) => {
      const css = "font-size: " + size + "px";
      const press = () => setLabel("held");
      return (
        <div style={css}>
          <span style={css} onclick={() => setLabel("pressed")}>
            {label()}
          </span>
          <span style="font-size: 8px">fixed</span>
          <span style={css} onclick={press}>
            held
          </span>
        </div>
      );
    };

    return <div style="padding: 0">{row(12)}</div>;
  }`;
}

it("Card", async (t) => {
  await snapshotCase(t, "Card", <Card />);
});
