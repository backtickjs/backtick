import { cs } from "@backtickjs/core";
import type { ClientObject } from "@backtickjs/core/cs-runtime";

// A `lower()` override replaces reflection: the returned shape ships —
// computed at bundle time — and the class's own members (`f`) don't.
class Fahrenheit implements ClientObject {
  readonly "@backtickjs" = "ClientObject";

  readonly f: number;

  constructor(f: number) {
    this.f = f;
  }

  lower() {
    return { celsius: ((this.f - 32) * 5) / 9 };
  }
}

export default cs.lift(cs.lower(new Fahrenheit(212)).celsius);
