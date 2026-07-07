import { cs } from "@backtickjs/core";
import type { Client } from "@backtickjs/core/cs-runtime";

class Point implements Client<Point> {
  declare $$type: Point;

  constructor(
    readonly x: number,
    readonly y: number,
  ) {}
}

export default cs`{
  const a = ${new Point(1, 2)};
  const b = ${new Point(3, 4)};
  return a.x + b.y;
}`;
