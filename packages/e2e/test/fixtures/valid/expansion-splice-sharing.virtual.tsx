import { cs } from "@backtickjs/core";
import type { Client, ClientObject } from "@backtickjs/core";

// One helper builds the fragment for both classes, so the script is a single
// source location referenced from two expansions with different holes: the
// entry goes polymorphic, and each expansion body passes its own holes as
// thunks written where they are in scope.
function sum(a: Client<number>, b: Client<number>): Client<() => number> {
  return cs.lift(cs.const(() => cs.splice((a)) + cs.splice((b))));
}

class Point implements ClientObject {
  readonly "@backtickjs" = "ClientObject";

  readonly x: Client<number>;
  readonly y: Client<number>;

  constructor(x: Client<number>, y: Client<number>) {
    this.x = x;
    this.y = y;
  }

  get sum() {
    return sum(this.x, this.y);
  }
}

class Size implements ClientObject {
  readonly "@backtickjs" = "ClientObject";

  readonly width: Client<number>;
  readonly height: Client<number>;

  constructor(width: Client<number>, height: Client<number>) {
    this.width = width;
    this.height = height;
  }

  get sum() {
    return sum(this.width, this.height);
  }
}

export default cs.lift((() => {
    const __cs_p = cs.const(new (cs.splice((Point)))(cs.lift(cs.const(1)), cs.lift(cs.const(2))));
    const __cs_s = cs.const(new (cs.splice((Size)))(cs.lift(cs.const(3)), cs.lift(cs.const(4))));
    return cs.const(cs.receiver(__cs_p).sum() + cs.receiver(__cs_s).sum());
})());
