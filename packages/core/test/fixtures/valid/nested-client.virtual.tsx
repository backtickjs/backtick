import { cs } from "@backtickjs/core";
import type { Client, AsObject } from "@backtickjs/core/cs-runtime";

class Point implements Client<AsObject<Point>> {
  "@backtickjs/Client": AsObject<Point>;

  readonly x: Client<number>;
  readonly y: Client<number>;

  constructor(x: Client<number>, y: Client<number>) {
    this.x = x;
    this.y = y;
  }

  get sum() {
    return cs.lift(() => cs.lower(this.x) + cs.lower(this.y));
  }
}

// A client object nested inside another: `Segment` reflects its `Point`
// members recursively, so the script reaches `s.to.sum` two levels deep.
class Segment implements Client<AsObject<Segment>> {
  "@backtickjs/Client": AsObject<Segment>;

  readonly from: Point;
  readonly to: Point;

  constructor(from: Point, to: Point) {
    this.from = from;
    this.to = to;
  }
}

export default cs.lift((() => {
    const __cs_s = cs.lower(new Segment(new Point(cs.lift(1), cs.lift(2)), new Point(cs.lift(3), cs.lift(4))));
    return __cs_s.to.sum() - __cs_s.from.sum();
})());
