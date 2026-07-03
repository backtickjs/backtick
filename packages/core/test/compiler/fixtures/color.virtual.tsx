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
}

const color = new Color(30, 144, 255);

const script = cs.lift((() => {
    const __cs_c = cs.lower(color);
    const __cs_brightness = __cs_c.r + __cs_c.g + __cs_c.b;
    if (__cs_brightness > 382) {
        return "light";
    }
    return "dark";
})());

print(script);
