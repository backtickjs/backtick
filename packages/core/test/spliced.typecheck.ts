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

// A client function is a script, and splices as the function it is.
declare const double: Client<(n: number) => number>;
spliced(double)(1) satisfies number;

// A host function is host code, and doesn't splice.
declare const card: (props: { readonly title: string }) => Client<number>;
// @ts-expect-error: a host function isn't spliceable
spliced(card);

// An action is a script like any other, in data too.
declare const action: Client<void>;
spliced([action]);
