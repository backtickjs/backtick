import type { AsObject, Client, ClientObject } from "@backtickjs/core/cs-runtime";
import { cs } from "@backtickjs/core";

class Color implements ClientObject<AsObject<Color>> {
  "@backtickjs/Client": AsObject<Color>;

  readonly r: Client<number>;
  readonly g: Client<number>;
  readonly b: Client<number>;

  constructor(r: Client<number>, g: Client<number>, b: Client<number>) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
}

export default cs`{
  const c = ${new Color(cs`30`, cs`144`, cs`255`)};
  const brightness = c.r + c.g + c.b;
  if (brightness > 382) {
    return "light";
  }
  return "dark";
}`;
