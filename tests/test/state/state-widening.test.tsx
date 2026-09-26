import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { snapshotCase } from "../snapshotCase.ts";

// What a signal holds is the initial widened, so a second value of the same
// kind goes in after it. Each write is the assertion — every one is an error
// the moment `$createSignal` reads its initial narrowly.
//
// A function is the one initial that does not widen on its own: what an arrow
// answers with widens only against a contextual type. Written out, the type
// argument is the contextual type — `$createSignal<() => number>` holds a
// function answering with any number rather than only the one it was built
// from. Solid's setter calls a function it is handed, so storing one wraps it.
//
// `Stepper` covers a number, and `Swatch` a numeric enum handed to a function
// typed as it.
enum Tone {
  Warm = "warm",
  Cool = "cool",
}

async function Widened() {
  return cs`{
    const flag = $createSignal(true);
    const tone = $createSignal(${Tone.Warm});
    const step = $createSignal<() => number>(() => 0);
    return (
      <span
        onclick={() => {
          flag[1](false);
          tone[1](${Tone.Cool});
          step[1](() => () => 1);
        }}
      >
        {flag[0]() + " " + tone[0]() + " " + step[0]()()}
      </span>
    );
  }`;
}

it("Widened", async (t) => {
  await snapshotCase(t, "Widened", <Widened />);
});
