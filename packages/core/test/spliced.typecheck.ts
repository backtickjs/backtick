// Type-level assertions for `Spliced` and the `ClientObject` reflection marker.
// Never executed — typechecked by `tsc -b` alongside the virtual snapshots.
import type {
  Client,
  ClientObject,
  Spliceable,
  Spliced,
  Virtualize,
} from "@backtickjs/core/cs-runtime";

declare function spliced<T extends Spliceable>(value: T): Spliced<T>;
declare function virtualize<T>(value: T): Virtualize<T>;
declare const clientNumber: Client<number>;
declare const clientArrow: Client<() => number>;

class Point implements ClientObject {
  readonly "@backtickjs" = "ClientObject";

  readonly x: Client<number>;
  readonly y: Client<number>;

  constructor(x: Client<number>, y: Client<number>) {
    this.x = x;
    this.y = y;
  }

  get sum(): Client<() => number> {
    return clientArrow;
  }

  get reflectsNothing(): undefined {
    return undefined;
  }

  scaled(_factor: number): Point {
    return new Point(this.x, this.y);
  }
}

class Segment implements ClientObject {
  readonly "@backtickjs" = "ClientObject";

  readonly from: Point;
  readonly to: Point;
  // plain data lowers by the same rule as a plain object member
  readonly label: string;

  constructor(from: Point, to: Point, label: string) {
    this.from = from;
    this.to = to;
    this.label = label;
  }
}

const point = spliced(new Point(clientNumber, clientNumber));

// A spliced instance keeps its nominal type — hovers and errors say `Point`.
point satisfies Point;

// Members unwrap at access time, through the member-access view: a
// `Client`-typed field or getter reads as its payload.
virtualize(point).x satisfies number;
virtualize(point).sum() satisfies number;

// The view doesn't filter members: host-only members keep their host types
// (they aren't shipped at runtime — reflection only carries spliceable
// members — so using them fails at bundle time, not in the typechecker),
// and the marker stays visible.
virtualize(point).reflectsNothing satisfies undefined;
virtualize(point).scaled satisfies (factor: number) => Point;
virtualize(point)["@backtickjs"] satisfies "ClientObject";

const segment = spliced(
  new Segment(
    new Point(clientNumber, clientNumber),
    new Point(clientNumber, clientNumber),
    "host label",
  ),
);

// Nested client objects stay nominal and virtualize per access.
virtualize(segment).from satisfies Point;
virtualize(virtualize(segment).from).x satisfies number;
virtualize(virtualize(segment).to).sum() satisfies number;

// Plain data crosses into the client unchanged, like a plain object member.
virtualize(segment).label satisfies string;

// A `cs` script's payload type passes through unchanged.
spliced(clientArrow)() satisfies number;
