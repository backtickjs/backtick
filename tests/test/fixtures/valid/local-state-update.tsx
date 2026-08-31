import { cs, state } from "@backtickjs/core";

// `update` derives the next value from the current one, so a handler needs no
// separate read. It returns `void` like `write`, which is what keeps it out of
// a value body: only a statement position accepts `void`.
async function Stepper() {
  return cs`{
    const size = $state(16);
    return (
      <span
        style={"font-size: " + size.read() + "px"}
        onclick={() => {
          size.update((current: number) => current + 1);
        }}
      >
        press
      </span>
    );
  }`;
}

export default <Stepper />;
