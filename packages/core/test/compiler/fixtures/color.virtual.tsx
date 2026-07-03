import { cs } from "@backtickjs/core";
import type { Client, Visitor } from "@backtickjs/core/cs-runtime";
import { print } from "../print.ts";

class Color implements Client<Color> {
  readonly r: number;
  readonly g: number;
  readonly b: number;

  constructor(r: number, g: number, b: number) {
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

const color = new Color(30, 144, 255);

const script = cs.lift((() => {
    const __cs_c = cs.lower(color);
    if (cs.lower(cs.method(__cs_c, "isBrighterThan", [cs.lift(382)]))) {
        return "light";
    }
    return "dark";
})());

print(script);
