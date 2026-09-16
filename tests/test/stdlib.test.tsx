import { describe, it } from "node:test";
import { cs, http, state } from "@backtickjs/core";
import type { Client, HttpResponse, State } from "@backtickjs/core";
import { window } from "@backtickjs/web-sdk";
import { snapshotCase } from "./snapshotCase.ts";

// The names every client answers for — array and string members, `Math`,
// `JSON`, `Number`, `http`, timers — and builtins used as values.

// The copying members: each answers with a new array and leaves the one it was
// given alone, which is what lets an array be a value here. `sort`, `reverse`
// and `splice` — the ones that write into the array instead — are absent.
const arrayCopyingMembers = cs`{
  const rows = [3, 1, 2];
  const sorted = rows.toSorted((a, b) => a - b);
  const reversed = rows.toReversed();
  const spliced = rows.toSpliced(1, 1);
  const inserted = rows.toSpliced(1, 0, 9);
  return (
    sorted.join(",") +
    "|" +
    reversed.join(",") +
    "|" +
    spliced.join(",") +
    "|" +
    inserted.join(",") +
    "|" +
    rows.join(",")
  );
}`;

// The one thing the language cannot do for itself: produce a sequence of a
// given length. Everything else about an array is a transformation of one that
// already exists.
//
// The mapper's first argument is always `undefined` — the standard library
// passes the element it found, and against a `{ length }` source there is
// none. `null` would mean the source held one and it was null.
const arrayFrom = cs`{
  const doubled = Array.from({ length: 4 }, (_, index) => index * 2);
  const empty = Array.from({ length: 0 }, (_, index) => index);
  const absent = Array.from({ length: 2 }, (value, index) =>
    value === undefined ? index : -1,
  );
  return doubled.join(",") + "|" + empty.length + "|" + absent.join(",");
}`;

// The key is an expression, which is the point: a loop reaches every element
// without one script per position.
const arrayIndex = cs`{
  const coins = [5, 31, 7];
  let total = 0;
  for (let i = 0; i < coins.length; i = i + 1) {
    total = total + coins[i];
  }
  return total;
}`;

// Arrays expose the curated `ClientArray` API: pure members only, none
// producing `undefined`. Callback parameters are contextually typed.
const arrayMembers = cs`{
  const coins = [1, 2, 3];
  const four = 4;
  return {
    count: coins.length,
    all: coins.concat([four]),
    part: coins.slice(0, 2),
    where: coins.indexOf(2),
    has: coins.includes(3),
    text: coins.join("-"),
    doubled: coins.map((n) => n * 2),
    small: coins.filter((n) => n < 3),
  };
}`;

// `reduce` takes its initial value, where the standard library lets it be left
// out: without one the first call is handed an element rather than an
// accumulator, and an empty array has nothing to hand it at all. Naming it is
// what makes the empty case an answer rather than a throw.
const arrayReduce = cs`{
  const prices = [4.5, 3.25, 2];
  const total = prices.reduce((sum, price) => sum + price, 0);
  const names = ["a", "b", "c"];
  const joined = names.reduce((all, one, index) => all + index + one, "");
  const empty: number[] = [];
  return (
    total.toFixed(2) +
    "|" +
    joined +
    "|" +
    empty.reduce((sum, one) => sum + one, 0)
  );
}`;

// The one global. What it is, is the host's to answer; which members exist and
// what each means is the format's, which is why the list is short — only the
// members every host can agree on to the last bit are here.
const math = cs`{
  const rounded =
    Math.round(2.5) + "," + Math.round(-2.5) + "," + Math.round(-0.5);
  const edges =
    Math.floor(-1.5) + "," + Math.ceil(-1.5) + "," + Math.trunc(-1.5);
  const picks =
    Math.min(3, 1, 2) + "," + Math.max(3, 1, 2) + "," + Math.abs(-4);
  return (
    rounded +
    "|" +
    edges +
    "|" +
    picks +
    "|" +
    Math.sqrt(9) +
    "," +
    Math.sign(-8) +
    "," +
    Math.fround(1.5) +
    "|" +
    (Math.PI > 3.14) +
    "," +
    (Math.E > 2.71)
  );
}`;

// Text in, value out, and back again. What round-trips is the format's to say —
// so what is here is what every host spells the same way, and a value a host
// could not hand back is not a value this admits.
const jsonRoundTrip = cs`{
  const numbers = JSON.stringify([1, 2, 3]);
  const text = JSON.stringify("hi");
  const flag = JSON.stringify(true);
  const held = JSON.stringify({ a: 1, b: "two" });
  const back = JSON.parse(numbers);
  return (
    numbers +
    "|" +
    text +
    "|" +
    flag +
    "|" +
    held +
    "|" +
    JSON.stringify(back) +
    "|" +
    JSON.stringify(JSON.parse(held))
  );
}`;

// Every answer reaches `onResponse`, and a throw from it reaches `onFailure`:
// a status is failed on by throwing, and so is a body that is not JSON.
//
// An arrow rather than a call, so what this pins is the bundling and the
// typechecking: nothing is asked of a network to snapshot a value.
const httpRequests = cs`() => {
  const held = $state("waiting");

  $http.get(
    "/cases/built-ins/Math/trunc/Math.trunc_Success",
    (response: HttpResponse) => {
      if (response.status !== 200) {
        throw "answered " + response.status;
      }
      held.write(JSON.parse(response.data) === null ? "null" : "a value");
    },
    (message: string) => {
      held.write("failed — " + message);
    },
    { timeout: 3000 },
  );

  $http.post(
    "/cases",
    JSON.stringify({ name: "Math.trunc", passed: true }),
    (response: HttpResponse) => {
      held.write(response.data);
    },
    (message: string) => {
      held.write(message);
    },
    { headers: { "content-type": "application/json" } },
  );

  return held.read();
}`;

// A clock, which is the target's rather than the language's: a script reaches
// one by splicing the window, the same as anything else a target hands over.
//
// And the shape of a member read off a handle. `$window.clearInterval` is read
// as a value and handed on, which is what a name has to survive being — the
// call site below reaches it through a variable, not through the window.
//
// An action rather than a value, and not by preference: starting a timer is a
// side effect, and a script that returns one cannot have those. Which is where
// a timer is started anyway — a handler is an action.
//
// Started and stopped in the one body, so nothing is left ticking after this is
// evaluated: what it pins is the lowering and the names, not the waiting. And
// either clear cancels either kind, which is why one of them is reached through
// the other's id.
const timers = cs`{
  const stop = $window.clearInterval;
  const repeating = $window.setInterval(() => 0, 1000);
  stop(repeating);
  $window.clearTimeout($window.setTimeout(() => 0, 1000));
}`;

// A namespace static, reached the way `Math.floor` and `Array.from` are: the
// whole of `Number.parseInt` is one name the client answers, so `Number` is a
// front rather than a value and nothing is read off it.
async function Parsed() {
  return cs`{
    const whole = Number.parseInt("42px");
    const based = Number.parseInt("ff", 16);
    const fractional = Number.parseFloat("1.5");
    return <span>{whole + based + fractional + ""}</span>;
  }`;
}

// A namespace holding a value beside its functions: `Number.EPSILON` is read
// where `Number.isInteger` is called, and both are whole names the client
// answers rather than a member read off a `Number` there is no value for.
async function Checked() {
  return cs`{
    const positive = Number.EPSILON > 0;
    const whole = Number.isInteger(2);
    const fractional = Number.isInteger(2.5);
    // Unconverted, so a string that reads as a number is still not one.
    const written = Number.isFinite("2");
    return (
      <span>{whole + " " + fractional + " " + written + " " + positive}</span>
    );
  }`;
}

// A namespace static taking a rest parameter, so the whole of the call crosses
// as one name and a list of arguments — `String` is the front of the name and
// never a value read off. Called with none, which the schema says answers with
// the empty string rather than refusing the way an empty `Math.min` does.
async function Written() {
  return cs`{
    return (
      <span>{String.fromCodePoint(72, 105) + String.fromCodePoint()}</span>
    );
  }`;
}

// The members ES2015 added that this language answers for: a search that
// finds nothing reads as `undefined`, as a read past the end does, and
// everything else is what the standard library says it is.
const stdlibEs2015 = cs`{
  const xs = [3, 8, 12, 5];
  const word = "backtick";
  return {
    found: xs.find((x) => x > 7),
    missing: xs.find((x) => x > 100) === undefined,
    at: xs.findIndex((x) => x > 7),
    nowhere: xs.findIndex((x) => x > 100),
    includes: word.includes("tick"),
    startsWith: word.startsWith("back"),
    endsWith: word.endsWith("tick", 4),
    repeated: "ab".repeat(3),
    codePoint: "\u{1F600}".codePointAt(0),
    keys: Object.keys({ a: 1, b: 2 }),
  };
}`;

// A record read as pairs and built back from them: how a script makes a record
// whose keys it only learns when it runs.
const objectEntries = cs`{
  const held = { n: 1, q: "ada" };
  const written = Object.fromEntries(
    Object.entries(held).map((pair) => [pair[0], JSON.stringify(pair[1])]),
  );
  return written.n + " " + written.q;
}`;

// A builtin is a value, not only a callee. The compiler folds `Math.floor` into
// one whole name the client answers — there is no `Math` for a read to yield —
// and that name stands wherever a value does: bound to a variable, and handed
// to something that calls it.
//
// The `math` case reads `Math.PI` as a value too, but a constant is the easy
// half of this. What a builtin *function* is read as has to arrive callable.
const builtinAsValue = cs`{
  const floor = Math.floor;
  const apply = (f: (n: number) => number, n: number) => f(n);
  return floor(3.5) + apply(Math.ceil, 3.5);
}`;

const make = (f: Client<(n: number) => State<number>>) =>
  cs`{
    return $f(1).read();
  }`;

const wrapped = cs`(n: number) => $state(n + 10)`;

const builtinHoleSharing = cs`{
  return ${make(state)} + ${make(wrapped)};
}`;

const runtimeValues = cs`({
  list: ${[1, "two", true, null]},
  obj: ${{ k: 3 }},
})`;

describe("what each case compiles and bundles to", () => {
  it("arrayCopyingMembers", async (t) => {
    await snapshotCase(t, "arrayCopyingMembers", arrayCopyingMembers);
  });

  it("arrayFrom", async (t) => {
    await snapshotCase(t, "arrayFrom", arrayFrom);
  });

  it("arrayIndex", async (t) => {
    await snapshotCase(t, "arrayIndex", arrayIndex);
  });

  it("arrayMembers", async (t) => {
    await snapshotCase(t, "arrayMembers", arrayMembers);
  });

  it("arrayReduce", async (t) => {
    await snapshotCase(t, "arrayReduce", arrayReduce);
  });

  it("math", async (t) => {
    await snapshotCase(t, "math", math);
  });

  it("jsonRoundTrip", async (t) => {
    await snapshotCase(t, "jsonRoundTrip", jsonRoundTrip);
  });

  it("httpRequests", async (t) => {
    await snapshotCase(t, "httpRequests", httpRequests);
  });

  it("timers", async (t) => {
    await snapshotCase(t, "timers", timers);
  });

  it("Parsed", async (t) => {
    await snapshotCase(t, "Parsed", <Parsed />);
  });

  it("Checked", async (t) => {
    await snapshotCase(t, "Checked", <Checked />);
  });

  it("Written", async (t) => {
    await snapshotCase(t, "Written", <Written />);
  });

  it("stdlibEs2015", async (t) => {
    await snapshotCase(t, "stdlibEs2015", stdlibEs2015);
  });

  it("objectEntries", async (t) => {
    await snapshotCase(t, "objectEntries", objectEntries);
  });

  it("builtinAsValue", async (t) => {
    await snapshotCase(t, "builtinAsValue", builtinAsValue);
  });

  it("builtinHoleSharing", async (t) => {
    await snapshotCase(t, "builtinHoleSharing", builtinHoleSharing);
  });

  it("runtimeValues", async (t) => {
    await snapshotCase(t, "runtimeValues", runtimeValues);
  });
});
