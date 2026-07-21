// Type-level assertions for `Spliced` and the `ClientObject` reflection marker.
// Never executed — typechecked by `tsc -b`.
import type {
  Client,
  ClientArray,
  ClientElement,
  ClientObject,
  ClientUnknown,
  SpliceableUnknown,
  Spliced,
  Virtualized,
} from "@backtickjs/cs-runtime";

declare function spliced<T extends SpliceableUnknown>(value: T): Spliced<T>;
declare function virtualize<T extends ClientUnknown>(value: T): Virtualized<T>;
declare const clientNumber: Client<number>;
declare const clientArrow: Client<() => number>;

class Point implements ClientObject {
  readonly "@backtickjs" = "ClientObject";

  readonly cls: typeof Point = Point;

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

// The view filters a `ClientObject`'s members to the spliceable ones, like
// reflection does at bundle time. A bare function member isn't spliceable —
// a client-callable member is declared as a `Client` function, like `sum` —
// so a host-only method doesn't exist on the client.
// @ts-expect-error — a getter reflecting no data doesn't exist on the client.
virtualize(point).reflectsNothing;
// @ts-expect-error — a host method isn't a client function; declare it as a
// `Client<(factor: number) => Point>` member to call it from a script.
virtualize(point).scaled;
// @ts-expect-error — the marker doesn't exist on the client.
virtualize(point)["@backtickjs"];
// @ts-expect-error — a class member doesn't reflect: reflection filters it
// like a host method (see `isSpliceable`).
virtualize(point).cls;

const segment = spliced(
  new Segment(
    new Point(clientNumber, clientNumber),
    new Point(clientNumber, clientNumber),
    "host label",
  ),
);

// A `ClientObject` member stays nominal, by `Spliced`'s rule — hovers and
// errors say `Point` — and unwraps at the next access, where the compiler
// virtualizes the receiver again.
virtualize(segment).from satisfies Point;
virtualize(virtualize(segment).from).x satisfies number;
virtualize(virtualize(segment).to).sum() satisfies number;

// Plain data crosses into the client unchanged, like a plain object member.
virtualize(segment).label satisfies string;

// A primitive receiver autoboxes to its client wrapper's view: members
// resolve against the explicit client API, not the host lib's. The wrapper
// applies to the receiver only — a primitive VALUE crosses unchanged (see
// `label` above), so re-virtualizing stays idempotent.
virtualize(virtualize(segment).label).concat("!") satisfies string;
// @ts-expect-error — `padStart` isn't part of the client string API.
virtualize(virtualize(segment).label).padStart;
virtualize(virtualize(point).x).toString(2) satisfies string;
virtualize(true).toString() satisfies string;

// A `cs` script's payload type passes through unchanged.
spliced(clientArrow)() satisfies number;

// Member access on a free host reference is outside `ClientUnknown`, so it
// can't be virtualized: a script may call a host global but not reach into
// one.
// @ts-expect-error — `console` is a host interface, not a client value.
virtualize(console);

// An array reaches a receiver position already unwrapped — `Spliced` maps a
// fragment array elementwise before it crosses — and then reads as the
// curated `ClientArray` API: pure members only, no mutators, nothing
// producing `undefined`.
declare const clientNumbers: Client<number>[];
spliced(clientNumbers) satisfies number[];
virtualize(spliced(clientNumbers)) satisfies ClientArray<number>;
virtualize(spliced(clientNumbers)).length satisfies number;
// @ts-expect-error — mutators aren't part of the client array API.
virtualize(spliced(clientNumbers)).pop;
// @ts-expect-error — a raw fragment array is a host value, not a client one.
virtualize(clientNumbers);

// An element is opaque in a script: it splices in whole — the payload stays
// `ClientElement` — and no member reflects on the client.
declare const element: ClientElement;
spliced(element) satisfies ClientElement;
// @ts-expect-error — an element's structure belongs to the client runtime,
// not the script.
virtualize(element).type;
// @ts-expect-error — see `type` above.
virtualize(element).key;
// @ts-expect-error — see `type` above.
virtualize(element).props;
// @ts-expect-error — the marker doesn't exist on the client.
virtualize(element)["@backtickjs"];
