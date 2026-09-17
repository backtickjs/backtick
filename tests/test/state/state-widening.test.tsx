import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// What a cell holds is the initial widened, so a second value of the same kind
// goes in after it. Each write is the assertion — every one is an error the
// moment `$state` reads its initial narrowly.
//
// A function is the one initial that does not widen on its own: what an arrow
// answers with widens only against a contextual type, and `$state` takes its
// initial unbound so that every other kind does widen. Written out, the type
// argument is the contextual type — `$state<() => number>` holds a function
// answering with any number rather than only the one it was built from.
//
// `Stepper` covers a number, and `Swatch` a numeric enum handed to a function
// typed as it.
enum Tone {
  Warm = "warm",
  Cool = "cool",
}

async function Widened() {
  return cs`{
    const flag = $state(true);
    const tone = $state(${Tone.Warm});
    const step = $state<() => number>(() => 0);
    return (
      <span
        onclick={() => {
          flag.set(false);
          tone.set(${Tone.Cool});
          step.set(() => 1);
        }}
      >
        {flag.get() + " " + tone.get() + " " + step.get()()}
      </span>
    );
  }`;
}

it("Widened", async (t) => {
  await snapshotCase(t, "Widened", <Widened />);
});
