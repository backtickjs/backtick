import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "./snapshotCase.ts";

// Objects and reads by key: absent members, optional access, spreads, and the
// bundle's reserved `#` key.

// A key an object hasn't got reads as the language's one absent value. A
// record's member reads as `string | null` — a record says nothing about which
// keys it has — so this one is answered rather than assumed.
const answers: { [key: string]: string } = { here: "yes" };

const indexAbsent = cs`{
  const names = ["zero", "one"];
  const missing = $answers["nowhere"] ?? "gone";
  return names[1] + "/" + missing;
}`;

// Where the two rules part company, pinned so a client implementer can see it:
// `names[9]` types as `string`, because TypeScript's indexed access says the
// element type, and reads as null, because the runtime read is total. Nothing
// faults; the type simply doesn't mention the floor under it.
const indexPastEnd = cs`{
  const names = ["zero", "one"];
  return names[9];
}`;

// A property literally named `...`, in a literal a spread also runs through —
// which is the one shape where both are entries of the same node. The format
// tells them apart by the entry's first slot, and `...` is a name a property
// may have, so this is where the two could be confused.
const objectDotsKey = cs`{
  const base = { a: 1 };
  return { ...base, "...": 2 };
}`;

// An object is reached by a string key, and the type has to admit one: this
// record says any string names a number, so a key computed at runtime is a read
// the typechecker can allow. It reads as `number | null` — a record says
// nothing about which keys it has — so the absent case is answered here.
const rates: { [currency: string]: number } = { usd: 3, eur: 4 };

const objectIndex = cs`(currency: string) => {
  const table = $rates;
  const asked = table[currency] ?? 0;
  const usd = table["usd"] ?? 0;
  return asked + usd;
}`;

// A spread in an object literal, which is the one place the format cannot ship
// an object as the data it spells: an object in a value slot *is* its own keys
// and none of them is reserved, so there is nowhere to write "and every key of
// that one". A literal a spread runs through is a node instead — a name slot of
// `null` marking the spread — and a literal without one is data still.
//
// Later wins, both ways round, the way it does in the language this mirrors.
const objectSpread = cs`{
  const base = { a: 1, b: 2 };
  const over = { b: 9 };
  return {
    ...base,
    ...over,
    c: 3,
  };
}`;

// `?.` propagates null one step: a null receiver reads as null — the
// language's absent value; `undefined` never arises. A chain spells `?.` at
// each access, and a null method receiver skips the call.
const pick = cs`(p: { x: number } | null) => {
  return p?.x;
}`;

const deep = cs`(o: { inner: { z: number } | null } | null) => {
  return o?.inner?.z;
}`;

const shout = cs`(s: string | null) => {
  return s?.concat("!");
}`;

const optionalChain = cs`({
  found: $pick({ x: 5 }),
  missing: $pick(null),
  deep: $deep({ inner: { z: 7 } }),
  cut: $deep({ inner: null }),
  top: $deep(null),
  loud: $shout("hi"),
  silent: $shout(null),
})`;

// `?` marks an optional parameter — sugar for `T | undefined`. A caller may
// pass `undefined` where the argument is not supplied; `null` is a value of
// its own and not accepted here.
const greet = cs`(name?: string) => {
  return name?.concat("!");
}`;

// A function-typed annotation unions parenthesized: `(() => number) | undefined`.
const double = cs`() => 2`;

const callIfGiven = cs`(cb?: () => number) => {
  return cb?.() ?? 0;
}`;

const optionalParameter = cs`({
  named: $greet("hi"),
  explicit: $greet(undefined),
  supplied: $callIfGiven($double),
  fallback: $callIfGiven(undefined),
})`;

// `?` on a property means omittable: an absent member reads as null — the
// language's absent value; `undefined` never arises — and `?.` composes on
// top for the nullable reads.
const read = cs`(o: { label: string; inner?: { z?: number } }) => {
  return [o.label, o.inner?.z ?? 0];
}`;

const optionalProperty = cs`({
  present: $read({ label: "a", inner: { z: 3 } }),
  partial: $read({ label: "b", inner: {} }),
  omitted: $read({ label: "c" }),
})`;

// `#` stays reserved inside a script body: an object literal serializes as
// the plain object it spells, so it can't carry the discriminant key.
const reservedKeyScript = cs`({ "#": "value" })`;

// A runtime object spliced into a script inlines as the plain data it is, so
// it can't carry `#` — the bundle's one reserved key — either.
const reservedKeySplice = cs`${{ "#": "value" }}`;

// `#` is the bundle's one reserved key — the discriminant of every node — so a
// plain data object can't carry it.
const reservedKey = cs`() => ${{ "#": "value" }}`;

// Only the bare `#` key is reserved: a plain data object is free to use keys
// that merely start with `#`, even ones spelled like the tagged forms.
const hashKeyData = cs`() => ${{ "#call": "#f0" }}`;

describe("what each case compiles and bundles to", () => {
  it("indexAbsent", async (t) => {
    await snapshotCase(t, "indexAbsent", indexAbsent);
  });

  it("indexPastEnd", async (t) => {
    await snapshotCase(t, "indexPastEnd", indexPastEnd);
  });

  it("objectDotsKey", async (t) => {
    await snapshotCase(t, "objectDotsKey", objectDotsKey);
  });

  it("objectIndex", async (t) => {
    await snapshotCase(t, "objectIndex", objectIndex);
  });

  it("objectSpread", async (t) => {
    await snapshotCase(t, "objectSpread", objectSpread);
  });

  it("optionalChain", async (t) => {
    await snapshotCase(t, "optionalChain", optionalChain);
  });

  it("optionalParameter", async (t) => {
    await snapshotCase(t, "optionalParameter", optionalParameter);
  });

  it("optionalProperty", async (t) => {
    await snapshotCase(t, "optionalProperty", optionalProperty);
  });

  it("reservedKeyScript", async (t) => {
    await snapshotCase(t, "reservedKeyScript", reservedKeyScript);
  });

  it("reservedKeySplice", async (t) => {
    await snapshotCase(t, "reservedKeySplice", reservedKeySplice);
  });

  it("reservedKey", async (t) => {
    await snapshotCase(t, "reservedKey", reservedKey);
  });

  it("hashKeyData", async (t) => {
    await snapshotCase(t, "hashKeyData", hashKeyData);
  });
});
