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

// A construction and a plain call lower identically — a spliced class is a
// function with holes by the time the client runs — so the typechecker is
// what keeps them apart: the virtual code types a spliced class as the
// class itself, and calling a constructor without `new` is a type error.
export default cs.liftValue((() => {
    const __cs_C = cs.value(cs.spliceValue((Point)));
    return __cs_C(1, 2);
})());
