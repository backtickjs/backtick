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
  return cs.liftValue(new (cs.spliceValue((Shape)))(cs.liftValue(5)));
}

const a = make(Circle);
const b = make(Square);
const c = make(Square);
const d = make(Square);

export default cs.liftValue((() => {
    return { first: cs.spliceValue((a)), second: cs.spliceValue((b)), third: cs.spliceValue((c)), fourth: cs.spliceValue((d)) };
})());
