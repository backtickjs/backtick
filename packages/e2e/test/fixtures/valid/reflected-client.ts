import { cs } from "@backtickjs/core";
import type { Client, ClientObject } from "@backtickjs/core";

class Point implements ClientObject {
  readonly "@backtickjs" = "ClientObject";

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
  const sum = a.valid() + b.valid();
}`;
