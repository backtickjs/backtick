import { cs } from "@backtickjs/core";
import type {
  Client,
  ClientObject,
  ClientUnknown,
} from "@backtickjs/core/cs-runtime";

class Point implements ClientObject {
  readonly "@backtickjs" = "ClientObject";

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

export default cs`{
  const s = new $Segment(new $Point(1, 2), new $Point(1, 2));
  return s.to.sum() - s.from.sum();
}`;
