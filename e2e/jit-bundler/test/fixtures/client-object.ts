import { cs } from "@backtickjs/core";
import { ClientObject } from "@backtickjs/core/cs-runtime";

class Color extends ClientObject {
  constructor(
    readonly r: number,
    readonly g: number,
    readonly b: number,
  ) {
    super();
  }
}

export default cs`{
  const c = ${new Color(1, 2, 3)};
  return c.r + c.g + c.b;
}`;
