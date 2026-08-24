import { cs, state } from "@backtickjs/core";

// State belongs to the script that declares it, and a script entry is applied
// once per place that reaches it — so two `<Counter />` tags are two
// applications of one entry, and each declares a cell of its own.
async function Counter() {
  return cs`{
    const size = $state(16);
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

export default (
  <div>
    <Counter />
    <Counter />
  </div>
);
