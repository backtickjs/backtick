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
    return cs.lift(cs.value(() => cs.splice(this.x) + cs.splice(this.y)));
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

export default cs.lift(cs.value((() => {
    const __cs_s = cs.value(new (cs.splice((Segment)))(cs.lift(cs.value(new (cs.splice((Point)))(cs.lift(cs.value(1)), cs.lift(cs.value(2))))), cs.lift(cs.value(new (cs.splice((Point)))(cs.lift(cs.value(1)), cs.lift(cs.value(2)))))));
    return cs.receiver(cs.receiver(__cs_s).to).sum() - cs.receiver(cs.receiver(__cs_s).from).sum();
})()));
