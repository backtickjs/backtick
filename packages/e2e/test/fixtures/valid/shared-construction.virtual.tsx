import { cs } from "@backtickjs/core";
import type { Client, ClientObject } from "@backtickjs/core";

class Circle implements ClientObject {
  readonly "@backtickjs" = "ClientObject";
  readonly r: Client<number>;
  constructor(r: Client<number>) {
    this.r = r;
  }
}

class Square implements ClientObject {
  readonly "@backtickjs" = "ClientObject";
  readonly side: Client<number>;
  constructor(side: Client<number>) {
    this.side = side;
  }
}

// ONE template, ONE source location — but each call splices a different
// class into it.
function make(Shape: new (size: Client<number>) => Circle | Square) {
  return cs.lift(new (cs.splice((Shape)))(cs.lift(5)));
}

const a = make(Circle);
const b = make(Square);
const c = make(Square);
const d = make(Square);

export default cs.lift((() => {
    return { first: cs.splice((a)), second: cs.splice((b)), third: cs.splice((c)), fourth: cs.splice((d)) };
})());
