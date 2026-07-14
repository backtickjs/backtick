import { cs } from "@backtickjs/core";
import type { Client, ClientObject } from "@backtickjs/core/cs-runtime";

// A client-constructible class. The compiled script passes the class itself
// to `v.new`, and the bundle carries its name — the client resolves that
// name on its global object, so the class is registered there for the test
// client. The constructor parameters are `Client<…>`-typed for the script's
// type-level view; at client runtime they receive the evaluated raw values.
class Point implements ClientObject {
  readonly "@backtickjs" = "ClientObject";

  readonly x: Client<number>;
  readonly y: Client<number>;

  constructor(x: Client<number>, y: Client<number>) {
    this.x = x;
    this.y = y;
  }
}

export default cs`{
  const p = new ${Point}(1, 2);
  return p.x + p.y;
}`;
