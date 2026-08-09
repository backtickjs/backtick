import { cs, state } from "@backtickjs/core";

// State belongs to the component that declared it. `Counter` calls `state`
// once per invocation, so two `<Counter />` tags are two cells — and each
// invocation is its own tree entry, so neither depends on how many places
// reference an element.
async function Counter() {
  const size = state(16);
  return (
    <span
      style={cs`"font-size: " + $size.read() + "px"`}
      onclick={cs`() => {
        $size.write($size.read() + 1);
      }`}
    >
      press
    </span>
  );
}

export default (
  <div>
    <Counter />
    <Counter />
  </div>
);
