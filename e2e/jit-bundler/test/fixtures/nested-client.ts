import { cs } from "@backtickjs/core";
import type { Client, ClientObject } from "@backtickjs/core/cs-runtime";

class Point implements Client<ClientObject<Point>> {
  "@backtickjs": ClientObject<Point>;

  constructor(
    readonly x: Client<number>,
    readonly y: Client<number>,
  ) {}

  get sum() {
    return cs`() => ${this.x} + ${this.y}`;
  }
}

// A client object nested inside another: `Segment` reflects its `Point`
// members recursively, so the script reaches `s.to.sum` two levels deep.
class Segment implements Client<ClientObject<Segment>> {
  "@backtickjs": ClientObject<Segment>;

  constructor(
    readonly from: Point,
    readonly to: Point,
  ) {}
}

export default cs`{
  const s = ${new Segment(new Point(cs`1`, cs`2`), new Point(cs`3`, cs`4`))};
  return s.to.sum() - s.from.sum();
}`;
