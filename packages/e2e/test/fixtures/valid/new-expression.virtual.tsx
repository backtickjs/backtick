import { cs } from "@backtickjs/core";
import type { Client, ClientObject } from "@backtickjs/core";

// A client-constructible class. The bundler expands the construction at
// bundle time: the constructor runs once with one opaque hole per
// argument, and the instance it returns is serialized with the holes marking
// where the client's argument values bind. The constructor parameters are
// `Client<…>`-typed to say exactly that: the values are opaque on the host —
// stored, never computed with — and exist only when the client runs.
class Point implements ClientObject {
  readonly "@backtickjs" = "ClientObject";

  readonly x: Client<number>;
  readonly y: Client<number>;

  constructor(x: Client<number>, y: Client<number>) {
    this.x = x;
    this.y = y;
  }
}

export default cs.liftValue((() => {
    const __cs_p = cs.value(new (cs.splice((Point)))(cs.liftValue(1), cs.liftValue(2)));
    return cs.receiver(__cs_p).x + cs.receiver(__cs_p).y;
})());
