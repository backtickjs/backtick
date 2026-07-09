import { cs } from "@backtickjs/core";
import type { Client, AsObject } from "@backtickjs/core/cs-runtime";

class Point implements Client<AsObject<Point>> {
  "@backtickjs": AsObject<Point>;

  constructor(
    readonly x: Client<number>,
    readonly y: Client<number>,
  ) {}

  get valid() {
    return cs`() => ${this.x} + ${this.y}`;
  }

  get invalid() {
    return;
  }
}

export default cs`{
  const a = ${new Point(cs`1`, cs`2`)};
  const b = ${new Point(cs`3`, cs`4`)};
  a.valid();
}`;
