import type { Client } from "@backtickjs/core/cs-runtime";
import { cs } from "@backtickjs/core";
import { print } from "../print.ts";

class Point implements Client<Point> {
  "@backtickjs": Point;

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

class Segment implements Client<Segment> {
  "@backtickjs": Segment;

  readonly from: Point;
  readonly to: Point;

  constructor(from: Point, to: Point) {
    this.from = from;
    this.to = to;
  }

  get vertical() {
    return cs.lift(() => cs.lower(this.from.x) === cs.lower(this.to.x));
  }
}

const segment = new Segment(
  new Point(cs.lift(1), cs.lift(2)),
  new Point(cs.lift(1), cs.lift(8)),
);

const script = cs.lift((() => {
    const __cs_s = cs.lower(segment);
    const __cs_rise = __cs_s.to.y - __cs_s.from.y;
    if (__cs_s.vertical()) {
        return __cs_rise;
    }
    return __cs_s.to.sum() - __cs_s.from.sum();
})());

print(script);
