import { cs } from "@backtickjs/core";
import type { Client, ClientObject } from "@backtickjs/core/cs-runtime";

class Point implements ClientObject {
  readonly "@backtickjs" = "ClientObject";

  readonly x: Client<number>;
  readonly y: Client<number>;

  constructor(x: Client<number>, y: Client<number>) {
    this.x = x;
    this.y = y;
  }

  get valid() {
    return cs.lift(() => cs.lower(this.x) + cs.lower(this.y));
  }

  get invalid() {
    return;
  }
}

export default cs.lift((() => {
    const __cs_a = cs.lower(new Point(cs.lift(1), cs.lift(2)));
    const __cs_b = cs.lower(new Point(cs.lift(3), cs.lift(4)));
    cs.virtualize(__cs_a).valid();
})());
