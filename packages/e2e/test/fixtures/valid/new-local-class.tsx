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
}

// A spliced class lowers to a function with one hole per constructor
// parameter, and a construction is a plain call of that value — so the
// class can pass through a local and be instantiated on another line.
export default cs`{
  const C = $Point;
  const p = new C(1, 2);
  return p.x + p.y;
}`;
