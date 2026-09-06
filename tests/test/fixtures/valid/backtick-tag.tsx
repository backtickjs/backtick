import { cs } from "@backtickjs/core";

// The tag written directly, without the component.
const held = JSON.stringify({
  functions: { "0": ["=>", [], ["el", "em", {}, "from another bundle"]] },
  root: ["()", ["fn", "0"], []],
});

export default cs`<backtick bundle={$held} />`;
