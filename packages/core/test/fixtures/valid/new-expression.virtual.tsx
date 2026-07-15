import { cs } from "@backtickjs/core";
import type { Client, ClientObject } from "@backtickjs/core/cs-runtime";

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

export default cs.lift((() => {
    const __cs_p = new (cs.splice(Point))(cs.lift(1), cs.lift(2));
    return cs.virtualize(__cs_p).x + cs.virtualize(__cs_p).y;
})());
