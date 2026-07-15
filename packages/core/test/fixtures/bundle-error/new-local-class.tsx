import { cs } from "@backtickjs/core";
import type { Client, ClientObject } from "@backtickjs/core/cs-runtime";

class Point implements ClientObject {
  readonly "@backtickjs" = "ClientObject";

  readonly x: Client<number>;
  readonly y: Client<number>;

  constructor(x: Client<number>, y: Client<number>) {
    this.x = x;
    this.y = y;
  }
}

// A construction reaches its class through the callee's splice slot: the
// bundler expands `new` at bundle time by running the spliced class, which
// never ships to the client. A local holding the spliced class compiles,
// but the construction's callee is then a plain binding — no slot to expand
// through — so the bundler rejects it.
export default cs`{
  const C = ${Point};
  return new C(1, 2);
}`;
