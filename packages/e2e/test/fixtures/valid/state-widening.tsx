import { cs, state } from "@backtickjs/core";

// What a cell holds is the initial widened, so a second value of the same kind
// goes in after it. Each write is the assertion — every one is an error the
// moment `$state` reads its initial narrowly.
//
// The three kinds here are the ones nothing else pins: a boolean, a string enum
// — which widens to its enum and not to the `string` under it — and a function,
// whose answer widens so the cell takes another of the same shape rather than
// only the one it was built from. `local-state` covers a number,
// `script-element` a string, and `state-enum` a numeric enum.
enum Tone {
  Warm = "warm",
  Cool = "cool",
}

async function Widened() {
  return cs`{
    const flag = $state(true);
    const tone = $state(${Tone.Warm});
    const step = $state(() => 0);
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
