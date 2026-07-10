// Type-level assertions for `Lower` and the explicit `AsObject` marker.
// Never executed — typechecked by `tsc -b` alongside the virtual snapshots.
import type { AsObject, Client, Lower } from "@backtickjs/core/cs-runtime";

declare function lower<T>(value: T): Lower<T>;
declare const clientNumber: Client<number>;
declare const clientArrow: Client<() => number>;

class Point implements Client<AsObject<Point>> {
  "@backtickjs": AsObject<Point>;

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

class Segment implements Client<AsObject<Segment>> {
  "@backtickjs": AsObject<Segment>;

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

const point = lower(new Point(clientNumber, clientNumber));

// Client-typed fields lower to their payload type.
point.x satisfies number;
// Getter scripts lower to callable members.
point.sum() satisfies number;

// @ts-expect-error — a getter reflecting no data doesn't exist on the client.
point.reflectsNothing;

// @ts-expect-error — host-only methods don't exist on the client.
point.scaled;

// @ts-expect-error — the phantom marker doesn't exist on the client.
point["@backtickjs"];

const segment = lower(
  new Segment(
    new Point(clientNumber, clientNumber),
    new Point(clientNumber, clientNumber),
    "host label",
  ),
);

// Nested client objects lower recursively.
segment.from.x satisfies number;
segment.to.sum() satisfies number;

// Plain data crosses into the client unchanged, like a plain object member.
segment.label satisfies string;

// A `cs` script's payload type passes through unchanged.
lower(clientArrow)() satisfies number;
