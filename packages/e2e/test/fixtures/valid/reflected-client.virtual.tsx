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
    return cs.lift(cs.value(() => cs.splice(this.x) + cs.splice(this.y)));
  }

  get invalid() {
    return;
  }
}

export default cs.lift((() => {
    const __cs_a = cs.value(cs.splice(new Point(cs.lift(cs.value(1)), cs.lift(cs.value(2)))));
    const __cs_b = cs.value(cs.splice(new Point(cs.lift(cs.value(3)), cs.lift(cs.value(4)))));
    const __cs_sum = cs.value(cs.receiver(__cs_a).valid() + cs.receiver(__cs_b).valid());
})());
