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
    return cs`({ r: this.r, g: this.g, b: this.b })`.visit(visitor);
  }

  // Client methods take and return `Client<…>` values. Called from host code
  // they build a client script; called inside a `cs` script they virtualize.
  brightness(): Client<number> {
    return cs`this.r + this.g + this.b`;
  }

  isBrighterThan(threshold: Client<number>): Client<boolean> {
    return cs`${this.brightness()} > ${threshold}`;
  }
}

const script = cs`{
  const c = new Color(30, 144, 255);
  if (c.isBrighterThan(382)) {
    return "light";
  }
  return "dark";
}`;

print(script);
