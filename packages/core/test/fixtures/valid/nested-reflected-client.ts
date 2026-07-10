import type { Client, AsObject } from "@backtickjs/core/cs-runtime";
import { cs } from "@backtickjs/core";

class Point implements Client<AsObject<Point>> {
  "@backtickjs/Client": AsObject<Point>;

  readonly x: Client<number>;
  readonly y: Client<number>;

  constructor(x: Client<number>, y: Client<number>) {
    this.x = x;
    this.y = y;
  }

  get sum() {
    return cs`() => ${this.x} + ${this.y}`;
  }
}

class Segment implements Client<AsObject<Segment>> {
  "@backtickjs/Client": AsObject<Segment>;

  readonly from: Point;
  readonly to: Point;

  constructor(from: Point, to: Point) {
    this.from = from;
    this.to = to;
  }

  get vertical() {
    return cs`() => ${this.from.x} === ${this.to.x}`;
  }
}

const segment = new Segment(new Point(cs`1`, cs`2`), new Point(cs`1`, cs`8`));

export default cs`{
  const s = ${segment};
  const rise = s.to.y - s.from.y;
  if (s.vertical()) {
    return rise;
  }
  return s.to.sum() - s.from.sum();
}`;
