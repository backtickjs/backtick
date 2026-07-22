import type { Client, ClientObject } from "@backtickjs/core";
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
    return cs.liftValue(() => cs.spliceValue(this.x) + cs.spliceValue(this.y));
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
    return cs.liftValue(() => cs.spliceValue(this.from.x) === cs.spliceValue(this.to.x));
  }
}

const segment = new Segment(new Point(cs.liftValue(1), cs.liftValue(2)), new Point(cs.liftValue(1), cs.liftValue(8)));

export default cs.liftValue((() => {
    const __cs_s = (cs.value(cs.spliceValue((segment))), cs.spliceValue((segment)));
    const __cs_rise = cs.receiver(cs.receiver(__cs_s).to).y - cs.receiver(cs.receiver(__cs_s).from).y;
    if ((cs.condition(cs.receiver(__cs_s).vertical()) && cs.receiver(__cs_s).vertical())) {
        return __cs_rise;
    }
    return cs.receiver(cs.receiver(__cs_s).to).sum() - cs.receiver(cs.receiver(__cs_s).from).sum();
})());
