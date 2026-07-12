import { cs } from "@backtickjs/core";
import type { Client, ClientObject } from "@backtickjs/core/cs-runtime";

// The `lower()` escape hatch: instead of reflecting its members, the
// instance splices as the spliceable `lower()` returns — here a plain
// object renaming the member and baking in a unit — lowered by the normal
// rules, at the type level and at bundle time alike.
class Temperature implements ClientObject {
  readonly "@backtickjs" = "ClientObject";

  readonly celsius: Client<number>;

  constructor(celsius: Client<number>) {
    this.celsius = celsius;
  }

  lower() {
    return { unit: "C", value: this.celsius };
  }
}

export default cs.lift(cs.lower(new Temperature(cs.lift(21))).value + 1);
