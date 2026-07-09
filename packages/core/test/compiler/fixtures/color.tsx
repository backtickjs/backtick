import type { Client, ClientObject } from "@backtickjs/core/cs-runtime";
import { cs } from "@backtickjs/core";
import { print } from "../print.ts";

class Color implements Client<ClientObject<Color>> {
  "@backtickjs": ClientObject<Color>;

  readonly r: Client<number>;
  readonly g: Client<number>;
  readonly b: Client<number>;

  constructor(r: Client<number>, g: Client<number>, b: Client<number>) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
}

const script = cs`{
  const c = ${new Color(cs`30`, cs`144`, cs`255`)};
  const brightness = c.r + c.g + c.b;
  if (brightness > 382) {
    return "light";
  }
  return "dark";
}`;

print(script);
