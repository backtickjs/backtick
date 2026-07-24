// Type-level assertions for `Spliced` and the `ClientObject` reflection marker.
// Never executed — typechecked by `tsc -b`.
import type {
  Client,
  ClientArray,
  JsxElement,
  ClientObject,
  ClientValue,
  Receiver,
  Spliceable,
  Spliced,
} from "@backtickjs/cs-runtime";

declare function spliced<T extends Spliceable>(value: T): Spliced<T>;
declare function receiver<T extends ClientValue>(value: T): Receiver<T>;
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
receiver(point).x satisfies number;
receiver(point).sum() satisfies number;

// The view filters a `ClientObject`'s members to the spliceable ones, like
// reflection does at bundle time. A bare function member isn't spliceable —
// a client-callable member is declared as a `Client` function, like `sum` —
// so a host-only method doesn't exist on the client.
// @ts-expect-error — a getter reflecting no data doesn't exist on the client.
receiver(point).reflectsNothing;
// @ts-expect-error — a host method isn't a client function; declare it as a
// `Client<(factor: number) => Point>` member to call it from a script.
receiver(point).scaled;
// @ts-expect-error — the marker doesn't exist on the client.
receiver(point)["@backtickjs"];
// @ts-expect-error — a class member doesn't reflect: reflection filters it
// like a host method (see `isSpliceable`).
receiver(point).cls;

const segment = spliced(
  new Segment(
    new Point(clientNumber, clientNumber),
    new Point(clientNumber, clientNumber),
    "host label",
  ),
);

// A `ClientObject` member stays nominal, by `Spliced`'s rule — hovers and
// errors say `Point` — and unwraps at the next access, where the compiler
// views the receiver again.
receiver(segment).from satisfies Point;
receiver(receiver(segment).from).x satisfies number;
receiver(receiver(segment).to).sum() satisfies number;

// Plain data crosses into the client unchanged, like a plain object member.
receiver(segment).label satisfies string;

// A primitive receiver autoboxes to its client wrapper's view: members
// resolve against the explicit client API, not the host lib's. The wrapper
// applies to the receiver only — a primitive VALUE crosses unchanged (see
// `label` above), so re-virtualizing stays idempotent.
receiver(receiver(segment).label).concat("!") satisfies string;
// @ts-expect-error — `padStart` isn't part of the client string API.
receiver(receiver(segment).label).padStart;
receiver(receiver(point).x).toString(2) satisfies string;
receiver(true).toString() satisfies string;

// A `cs` script's payload type passes through unchanged.
spliced(clientArrow)() satisfies number;

// Member access on a free host reference is outside `ClientUnknown`, so it
// has no receiver view: a script may call a host global but not reach into
// one.
// @ts-expect-error — `console` is a host interface, not a client value.
receiver(console);

// An array reaches a receiver position already unwrapped — `Spliced` maps a
// fragment array elementwise before it crosses — and then reads as the
// curated `ClientArray` API: pure members only, no mutators, nothing
// producing `undefined`.
declare const clientNumbers: Client<number>[];
spliced(clientNumbers) satisfies number[];
receiver(spliced(clientNumbers)) satisfies ClientArray<number>;
receiver(spliced(clientNumbers)).length satisfies number;
// @ts-expect-error — mutators aren't part of the client array API.
receiver(spliced(clientNumbers)).pop;
// @ts-expect-error — a raw fragment array is a host value, not a client one.
receiver(clientNumbers);

// An action member doesn't ship — a data slot invokes its entry when the
// container materializes, which for an action would run the effect — so
// reflection skips it like a host method. A throw-only member
// (`Client<never>`) is a value script and still reflects.
declare const clientString: Client<string>;
declare const clientAction: Client<void>;
declare const clientThrows: Client<never>;
declare const clientMaybe: Client<string | undefined>;

class Button implements ClientObject {
  readonly "@backtickjs" = "ClientObject";

  readonly label: Client<string> = clientString;
  readonly press: Client<void> = clientAction;
  readonly fail: Client<never> = clientThrows;
  // rides the `undefined ≤ void` door into `ClientUnknown`, but fits
  // neither arm of `Spliceable`, so it never reflects
  readonly nickname: Client<string | undefined> = clientMaybe;
}

const button = spliced(new Button());
receiver(button).label satisfies string;
receiver(button).fail satisfies never;
// @ts-expect-error — an action member doesn't ship, so it can't be read.
receiver(button).press;
// @ts-expect-error — an `undefined`-bearing member isn't spliceable.
receiver(button).nickname;

// A function is a value only if a client could call it: parameters must be
// client values (checked bivariantly — narrower params stay assignable),
// optionally omitted.
declare function asValue<T extends ClientValue>(_: T): T;
asValue((n: number) => n + 1);
asValue((name: string | null) => name ?? "you");
// @ts-expect-error — an optional parameter puts `undefined` in the
// function's type; declare `name: T | null` instead.
asValue((name?: string | null) => name ?? "you");
declare const onTap: (id: number) => void;
asValue({ tap: onTap, label: "x" });
// @ts-expect-error — a host-typed parameter isn't a client value.
asValue((d: Date) => 1);
// @ts-expect-error — same, a host collection parameter.
asValue((s: Set<number>) => 1);

// `?` on a plain object's member means omittable: a read scrubs the
// member's `undefined` to `null`; a required member reads unchanged.
declare const preferences: { label: string; nickname?: string };
receiver(preferences).label satisfies string;
receiver(preferences).nickname satisfies string | null;
// @ts-expect-error — an optional member never reads `undefined`.
receiver(preferences).nickname satisfies string | undefined;

// An element is opaque in a script: it splices in whole — the payload stays
// `JsxElement` — and no member reflects on the client.
declare const element: JsxElement;
spliced(element) satisfies JsxElement;
// @ts-expect-error — an element's structure belongs to the client runtime,
// not the script.
receiver(element).type;
// @ts-expect-error — see `type` above.
receiver(element).key;
// @ts-expect-error — see `type` above.
receiver(element).props;
// @ts-expect-error — the marker doesn't exist on the client.
receiver(element)["@backtickjs"];
