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
    return cs.value(() => cs.splice(this.x) + cs.splice(this.y));
  }

  get invalid() {
    return;
  }
}

export default cs.action((() => {
    const __cs_a = cs.splice(new Point(cs.value(1), cs.value(2)));
    const __cs_b = cs.splice(new Point(cs.value(3), cs.value(4)));
    cs.virtualize(__cs_a).valid();
})());
