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

const script = cs`{
  const c = ${new Color(30, 144, 255)};
  const brightness = c.r + c.g + c.b;
  if (brightness > 382) {
    return "light";
  }
  return "dark";
}`;

print(script);
