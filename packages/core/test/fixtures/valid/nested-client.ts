import { cs } from "@backtickjs/core";
import type {
  Client,
  ClientObject,
  ClientUnknown,
} from "@backtickjs/core/cs-runtime";

class Point implements ClientObject {
  readonly "@backtickjs" = "ClientObject";

  readonly x: Client<number>;
  readonly y: Client<number>;

  constructor(x: Client<number>, y: Client<number>) {
    this.x = x;
    this.y = y;
  }

  get sum() {
    return cs`() => ${this.x} + ${this.y}`;
  }
}

// A client object nested inside another: `Segment` holds `Point` fragments,
// so the script reaches `s.to.sum` two levels deep.
class Segment implements ClientObject {
  readonly "@backtickjs" = "ClientObject";

  readonly from: Client<Point>;
  readonly to: Client<Point>;

  constructor(from: Client<Point>, to: Client<Point>) {
    this.from = from;
    this.to = to;
  }
}

function new0<T extends ClientObject>(Cls: new () => T): Client<() => T> {
  return cs`() => ${new Cls()}`;
}

function new1<TObject extends ClientObject, TArg0 extends ClientUnknown>(
  Obj: new (arg0: Client<TArg0>) => TObject,
): Client<(arg0: TArg0) => TObject> {
  return cs`(arg0: TArg0) => ${new Obj(cs`arg0`)}`;
}

function new2<
  TObject extends ClientObject,
  TArg0 extends ClientUnknown,
  TArg1 extends ClientUnknown,
>(
  Obj: new (arg0: Client<TArg0>, arg1: Client<TArg1>) => TObject,
): Client<(arg0: TArg0, arg1: TArg1) => TObject> {
  return cs`(arg0: TArg0, arg1: TArg1) => ${new Obj(cs`arg0`, cs`arg1`)}`;
}

export default cs`{
  const s = ${new2(Segment)}(${new2(Point)}(1, 2), ${new2(Point)}(1, 2));
  return s.to.sum() - s.from.sum();
}`;
