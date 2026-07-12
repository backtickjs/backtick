import { cs } from "@backtickjs/core";
import type { ClientObject } from "@backtickjs/core/cs-runtime";

// A `spliced()` override's result lowers by the normal rules: the array
// recurses, and the nested reflected instance reflects as usual.
class Inner implements ClientObject {
  readonly "@backtickjs" = "ClientObject";

  label = "inner";
}

class Outer implements ClientObject {
  readonly "@backtickjs" = "ClientObject";

  spliced() {
    return [new Inner()];
  }
}

export default cs.lift(cs.lower(new Outer()));
