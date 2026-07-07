import { cs } from "@backtickjs/core";
import { ClientObject } from "@backtickjs/core/cs-runtime";

class Point extends ClientObject {
  constructor(
    readonly x: number,
    readonly y: number,
  ) {
    super();
  }
}

export default cs`{
  const a = ${new Point(1, 2)};
  const b = ${new Point(3, 4)};
  return a.x + b.y;
}`;
