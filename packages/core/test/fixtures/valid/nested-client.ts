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
    return cs`() => ${this.x} + ${this.y}`;
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

export default cs`{
  const s = ${new Segment(new Point(cs`1`, cs`2`), new Point(cs`3`, cs`4`))};
  return s.to.sum() - s.from.sum();
}`;
