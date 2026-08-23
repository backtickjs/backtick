import { cs } from "@backtickjs/core";

// A cell a script declares, read and written by what it draws. The script owns
// the storage, so the display and the handler are two readers of one binding
// and share one cell: `read()` is an input — a value that re-evaluates when the
// cell changes — and `write` is an effect, which only an action can perform.
async function Stepper() {
  return cs`{
    const size = state(16);
    return (
      <span
        style={"font-size: " + size.read() + "px"}
        onclick={() => {
          size.write(size.read() + 1);
        }}
      >
        press
      </span>
    );
  }`;
}

export default <Stepper />;
