// Type-level assertions for `Spliced`.
// Never executed — typechecked by `tsc -b`.
import type { Client, Spliceable, Spliced } from "../dist/index.js";

declare function spliced<T extends Spliceable>(value: T): Spliced<T>;
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
