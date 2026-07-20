import { cs } from "@backtickjs/core";
import type { Client, ClientObject, ClientUnknown } from "@backtickjs/core";

class Point implements ClientObject {
  readonly "@backtickjs" = "ClientObject";

  readonly x: Client<number>;
  readonly y: Client<number>;

  constructor(x: Client<number>, y: Client<number>) {
    this.x = x;
    this.y = y;
  }

  get sum() {
    return cs.liftValue(() => cs.splice(this.x) + cs.splice(this.y));
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

export default cs.liftValue((() => {
    const __cs_s = new (cs.splice((Segment)))(cs.liftValue(new (cs.splice((Point)))(cs.liftValue(1), cs.liftValue(2))), cs.liftValue(new (cs.splice((Point)))(cs.liftValue(1), cs.liftValue(2))));
    return cs.virtualize(cs.virtualize(__cs_s).to).sum() - cs.virtualize(cs.virtualize(__cs_s).from).sum();
})());
