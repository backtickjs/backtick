import type { Client } from "@backtickjs/core/cs-runtime";
import { cs } from "@backtickjs/core";
import { print } from "../print.ts";

class Color implements Client<Color> {
  "@backtickjs": Color;
  
  readonly r: number;
  readonly g: number;
  readonly b: number;

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
}

const script = cs.lift((() => {
    const __cs_c = cs.lower(new Color(30, 144, 255));
    const __cs_brightness = __cs_c.r + __cs_c.g + __cs_c.b;
    if (__cs_brightness > 382) {
        return "light";
    }
    return "dark";
})());

print(script);
