// Type-level assertions for `Spliced` and the member-access view.
// Never executed — typechecked by `tsc -b`.
import type { Array } from "@backtickjs/language";
import type { Receiver } from "../src/Receiver.js";
import type { Client, ClientValue, Spliceable, Spliced } from "@backtickjs/language";

declare function spliced<T extends Spliceable>(value: T): Spliced<T>;
declare function receiver<T extends ClientValue>(value: T): Receiver<T>;
declare const clientNumber: Client<number>;
declare const clientArrow: Client<() => number>;

// A `Client<U>` is the host's name for a value that lives on the client, and
// splicing one is what unwraps it.
spliced(clientNumber) satisfies number;
spliced(clientArrow)() satisfies number;

// A container crosses member by member.
const point = spliced({ x: clientNumber, y: clientNumber, label: "origin" });
point.x satisfies number;
point.label satisfies string;

const list = spliced([clientNumber, clientNumber]);
list satisfies number[];

// Plain data crosses unchanged.
spliced("host label") satisfies string;
spliced([1, [true, null]]) satisfies (number | (boolean | null)[])[];

// A primitive receiver autoboxes to its client wrapper's view: members resolve
// against the explicit client API, not the host lib's. The wrapper applies to
// the receiver only — a primitive VALUE crosses unchanged — so re-virtualizing
// stays idempotent.
receiver(point.label).concat("!") satisfies string;
// @ts-expect-error — `padStart` isn't part of the client string API.
receiver(point.label).padStart;
receiver(point.x).toString(2) satisfies string;
receiver(true).toString() satisfies string;

// An array reads as the client array API.
receiver([1, 2, 3]) satisfies Array<number>;

// A plain object reads its own members, and an optional one reads as `null`
// rather than as `undefined`, which this language has no value for.
declare const held: { a: number; b?: string };
receiver(held).a satisfies number;
receiver(held).b satisfies string | null;

// Member access on a free host reference is outside `ClientUnknown`, so it has
// no receiver view: a script may call a host global but not reach into one.
// @ts-expect-error — `console` is a host interface, not a client value.
receiver(console);
