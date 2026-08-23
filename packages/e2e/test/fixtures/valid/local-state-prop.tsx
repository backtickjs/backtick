import { cs } from "@backtickjs/core";
import type { Client, State } from "@backtickjs/core";

// A cell crossing a component boundary: declared once by the script that draws
// the pair, handed to each child as a prop, so both read one storage. The cell
// is an ordinary client value — the prop takes it the way it takes any other —
// which is what makes a write through either child reach the same storage.
const Counter = async ({ size }: { size: Client<State<number>> }) => (
  <span
    style={cs`"font-size: " + $size.read() + "px"`}
    onclick={cs`() => {
      $size.write($size.read() + 1);
    }`}
  >
    press
  </span>
);

async function Panel() {
  return cs`{
    const size = state(16);
    return (
      <div>
        <Counter size={size} />
        <Counter size={size} />
      </div>
    );
  }`;
}

export default <Panel />;
