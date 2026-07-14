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

  get sum() {
    return cs.lift(() => cs.splice(this.x) + cs.splice(this.y));
  }
}

// A client object nested inside another: `Segment` holds `Point` fragments,
// so the script reaches `s.to.sum` two levels deep.
class Segment implements ClientObject {
  readonly "@backtickjs" = "ClientObject";

  readonly from: Client<Point>;
  readonly to: Client<Point>;

  constructor(from: Client<Point>, to: Client<Point>) {
    this.from = from;
    this.to = to;
  }
}

export default cs.lift((() => {
    const __cs_init = (__cs_arg0: Point, __cs_arg1: Point) => cs.splice(new Segment(cs.lift(__cs_arg0), cs.lift(__cs_arg1)));
    const __cs_s = cs.splice(new Segment(cs.lift(cs.splice(new Point(cs.lift(1), cs.lift(2)))), cs.lift(cs.splice(new Point(cs.lift(3), cs.lift(4))))));
    return cs.virtualize(cs.virtualize(__cs_s).to).sum() - cs.virtualize(cs.virtualize(__cs_s).from).sum();
})());
