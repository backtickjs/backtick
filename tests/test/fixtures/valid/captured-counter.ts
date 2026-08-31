import { cs } from "@backtickjs/core";

// Within one script, an arrow assigns an enclosing binding freely — the
// frames live and die together in a single evaluation.
export default cs`{
  let count = 0;
  const bump = () => {
    count = count + 1;
    return count;
  };
  return bump() + bump();
}`;
