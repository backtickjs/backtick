import { cs } from "@backtickjs/core";
import type { Client } from "@backtickjs/core/cs-runtime";

class Point implements Client<Point> {
  "@backtickjs": Point;

  constructor(
    readonly x: number,
    readonly y: number,
    readonly z: Client<string>[],
  ) {}

  get valid() {
    return cs`() => ${this.x} + ${this.y}`;
  }

  get invalid() {
    return;
  }
}

export default cs`{
  const a = ${new Point(1, 2, [])};
  const b = ${new Point(3, 4, [])};
  return a.x + b.y;
}`;
