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

  // Client methods take and return `Client<…>` values. Called from host code
  // they build a client script; called inside a `cs` script they virtualize.
  brightness(): Client<number> {
    return cs`${this.r} + ${this.g} + ${this.b}`;
  }

  isBrighterThan(threshold: Client<number>): Client<boolean> {
    return cs`${this.brightness()} > ${threshold}`;
  }
}

const color = new Color(30, 144, 255);

const script = cs`{
  const c = ${color};
  if (c.isBrighterThan(382)) {
    return "light";
  }
  return "dark";
}`;

print(script);
