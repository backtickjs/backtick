import { cs } from "@backtickjs/core";
import type { Client, ClientObject } from "@backtickjs/core/cs-runtime";

class Point implements ClientObject {
  readonly "@backtickjs" = "ClientObject";

  readonly x: Client<number>;

  constructor(x: Client<number>) {
    this.x = x;
  }
}

// A host helper generic over the client object it splices: `Spliced<T>`
// defers over the unresolved type parameter, so the annotated return type
// errors — the documented cost of `cs.splice` losing its `ClientObject`
// identity overload. A concretely typed splice reduces fine (see
// `spliced-param`), and the runtime is unaffected either way.
function wrap<T extends ClientObject>(value: T): Client<() => T> {
  return cs.lift(() => cs.splice((value)));
}

export default cs.lift(cs.virtualize(cs.splice(wrap(new Point(cs.lift(7))))()).x);
