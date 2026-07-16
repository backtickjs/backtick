import type { Client, ClientObject } from "@backtickjs/core/cs-runtime";
import { cs } from "@backtickjs/core";

class Point implements ClientObject {
  readonly "@backtickjs" = "ClientObject";

  readonly x: Client<number>;
  readonly y: Client<number>;

  constructor(x: Client<number>, y: Client<number>) {
    this.x = x;
    this.y = y;
  }

  get sum() {
    return cs.lift(() => cs.splice(this.x) + cs.splice(this.y));
  }
}

class Segment implements ClientObject {
  readonly "@backtickjs" = "ClientObject";

  readonly from: Point;
  readonly to: Point;

  constructor(from: Point, to: Point) {
    this.from = from;
    this.to = to;
  }

  get vertical() {
    return cs.lift(() => cs.splice(this.from.x) === cs.splice(this.to.x));
  }
}

const segment = new Segment(new Point(cs.lift(1), cs.lift(2)), new Point(cs.lift(1), cs.lift(8)));

export default cs.lift((() => {
    const __cs_s = cs.splice((segment));
    const __cs_rise = cs.virtualize(cs.virtualize(__cs_s).to).y - cs.virtualize(cs.virtualize(__cs_s).from).y;
    if (cs.virtualize(__cs_s).vertical()) {
        return __cs_rise;
    }
    return cs.virtualize(cs.virtualize(__cs_s).to).sum() - cs.virtualize(cs.virtualize(__cs_s).from).sum();
})());
