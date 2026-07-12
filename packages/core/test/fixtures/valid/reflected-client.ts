import { cs } from "@backtickjs/core";
import type { AsObject, Client, ClientObject } from "@backtickjs/core/cs-runtime";

class Point implements ClientObject<AsObject<Point>> {
  "@backtickjs/Client": AsObject<Point>;

  readonly x: Client<number>;
  readonly y: Client<number>;

  constructor(x: Client<number>, y: Client<number>) {
    this.x = x;
    this.y = y;
  }

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
