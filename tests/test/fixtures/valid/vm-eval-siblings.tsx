import { bundler } from "@backtickjs/bundler";
import { cs, vm } from "@backtickjs/core";

// A bundle evaluated among siblings. What it draws goes where the call stands,
// and nothing of its own does: the spans either side keep their order.
async function Other() {
  return cs`<em>{"from another bundle"}</em>`;
}

const held = await bundler.run(<Other />);

export default cs`
  <div>
    <span>before</span>
    {$vm.eval($held)}
    <span>after</span>
  </div>
`;
