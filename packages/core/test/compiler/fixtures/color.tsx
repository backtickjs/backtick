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
    return cs`({ r: ${this.r}, g: ${this.g}, b: ${this.b} })`.visit(visitor);
  }
}

const color = new Color(30, 144, 255);

const script = cs`{
  const c = ${color};
  const brightness = c.r + c.g + c.b;
  if (brightness > 382) {
    return "light";
  }
  return "dark";
}`;

print(script);
