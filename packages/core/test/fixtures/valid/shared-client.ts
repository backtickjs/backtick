import { cs } from "@backtickjs/core";
import type { Client, ClientObject } from "@backtickjs/core/cs-runtime";

class Point implements ClientObject {
  "@backtickjs/Client": undefined;

  readonly x: Client<number>;
  readonly y: Client<number>;

  constructor(x: Client<number>, y: Client<number>) {
    this.x = x;
    this.y = y;
  }

  get sum() {
    return cs`() => ${this.x} + ${this.y}`;
  }
}

// The same instance spliced through two scripts: it must lower once and be
// shared (its getters evaluated a single time), not re-expanded per path.
const shared = new Point(cs`1`, cs`2`);

const left = cs`{
  const p = ${shared};
  return p.sum();
}`;

const right = cs`{
  const p = ${shared};
  return p.x;
}`;

export default cs`${left} + ${right}`;
