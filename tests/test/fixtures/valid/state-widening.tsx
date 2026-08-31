import { cs, state } from "@backtickjs/core";

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
// `local-state` covers a number, `script-element` a string, and `state-enum` a
// numeric enum handed to a function typed as it.
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
          flag.write(false);
          tone.write(${Tone.Cool});
          step.write(() => 1);
        }}
      >
        {flag.read() + " " + tone.read() + " " + step.read()()}
      </span>
    );
  }`;
}

export default <Widened />;
