import { cs } from "@backtickjs/core";
import type { Client, ClientObject } from "@backtickjs/core";

// One helper builds the fragment for both classes, so the script is a single
// source location referenced from two expansions with different holes: the
// entry goes polymorphic, and each expansion body passes its own holes as
// thunks written where they are in scope.
function sum(a: Client<number>, b: Client<number>): Client<() => number> {
  return cs.value(() => cs.splice((a)) + cs.splice((b)));
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

export default cs.value((() => {
    const __cs_p = new (cs.splice((Point)))(cs.value(1), cs.value(2));
    const __cs_s = new (cs.splice((Size)))(cs.value(3), cs.value(4));
    return cs.virtualize(__cs_p).sum() + cs.virtualize(__cs_s).sum();
})());
