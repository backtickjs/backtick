import { cs } from "@backtickjs/core";
import type { Client, ClientObject } from "@backtickjs/core/cs-runtime";

// A script parameter annotated with a host class type: inside the script the
// value is the *lowered* shape — `c.r` is a number, not a `Client<number>` —
// so the returned sum only typechecks if the annotation is lowered too.
class Color implements ClientObject {
  readonly "@backtickjs" = "ClientObject";

  readonly r: Client<number>;
  readonly hex: string;

  constructor(r: Client<number>, hex: string) {
    this.r = r;
    this.hex = hex;
  }

  get update() {
    return cs`() => ${this.r} + 2`;
  }
}

export default cs`{
  const pick = (c: Color) => c.r + 1;
  return pick(${new Color(cs`7`, "#123")});
}`;
