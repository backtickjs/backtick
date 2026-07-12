import { cs } from "@backtickjs/core";
import type { Client, ClientObject } from "@backtickjs/core/cs-runtime";

// A script parameter annotated with a host class type: inside the script the
// value is the *lowered* shape — `c.r` is a number, not a `Client<number>` —
// so the returned sum only typechecks if the annotation is lowered too.
class Color implements ClientObject {
  readonly "@backtickjs" = "ClientObject";

  readonly r: Client<number>;
  readonly hex: string;

  constructor(r: Client<number>, hex: string) {
    this.r = r;
    this.hex = hex;
  }

  get update() {
    return cs.lift(() => cs.lower(this.r) + 2);
  }
}

export default cs.lift((() => {
    const __cs_pick = (__cs_c: Color) => __cs_c.r + 1;
    return __cs_pick(cs.lower(new Color(cs.lift(7), "#123")));
})());
