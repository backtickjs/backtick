import { cs } from "@backtickjs/core";
import type { Client, Visitor } from "@backtickjs/core/cs-runtime";
import { print } from "../print.ts";

class Color implements Client<Color> {
  readonly r: Client<number>;
  readonly g: Client<number>;
  readonly b: Client<number>;

  constructor(r: Client<number>, g: Client<number>, b: Client<number>) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  $$type = this;

  visit<U>(visitor: Visitor<U>): U {
    return cs.lift({ r: cs.lower(this.r), g: cs.lower(this.g), b: cs.lower(this.b) }).visit(visitor);
  }

  // Client methods take and return `Client<…>` values. Called from host code
  // they build a client script; called inside a `cs` script they virtualize.
  brightness(): Client<number> {
    return cs.lift(cs.lower(this.r) + cs.lower(this.g) + cs.lower(this.b));
  }

  isBrighterThan(threshold: Client<number>): Client<boolean> {
    return cs.lift(cs.lower(this.brightness()) > cs.lower(threshold));
  }
}

const script = cs.lift((() => {
    const __cs_c = cs.lower(new Color(cs.lift(30), cs.lift(144), cs.lift(255)));
    if (cs.lower(cs.method(__cs_c, "isBrighterThan", [cs.lift(382)]))) {
        return "light";
    }
    return "dark";
})());

print(script);
