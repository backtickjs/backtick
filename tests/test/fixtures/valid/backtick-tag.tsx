import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";

async function Other() {
  return cs`<em>{"from another bundle"}</em>`;
}

const held = JSON.stringify(await bundler.run(<Other />));

export default cs`
  <div>
    <span>before</span>
    <backtick bundle={$held} />
    <backtick bundle={null} />
    <span>after</span>
  </div>
`;
