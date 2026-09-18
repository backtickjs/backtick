import { cs } from "@backtickjs/core";
import type { Client, ClientValue } from "@backtickjs/core";

/**
 * One thing a client must do the same way as every other: a script, and what
 * it evaluates to — or, with `throws`, what it throws. A `run` passes by
 * finishing, the way a Test262 case does, and a `negative` one by throwing.
 */
export type Case =
  | { name: string; subject: Client<ClientValue>; expected: ClientValue }
  | { name: string; subject: Client<ClientValue>; throws: ClientValue }
  | { name: string; run: Client<void>; negative: boolean };

/**
 * A case's outcome. `pass` and `fail` are the client's to decide;
 * `unsupported` is the host's, for a case client script cannot say.
 */
export type Verdict = {
  name: string;
  outcome: "pass" | "fail" | "unsupported";
  detail: string;
};

// Chosen on the host, since a script can't ask what kind of value it holds.
// Anything structured is compared as text, which leans on the client's
// `JSON.stringify` — so the JSON cases are the ones that compare with `===`.
const sameValue = cs`(got: ClientValue, expected: ClientValue) =>
  got === expected`;
const sameNaN = cs`(got: ClientValue, expected: ClientValue) => got !== got`;
const sameJson = cs`(got: ClientValue, expected: ClientValue) =>
  JSON.stringify(got) === JSON.stringify(expected)`;

function sameAs(expected: ClientValue) {
  if (typeof expected === "number" && Number.isNaN(expected)) return sameNaN;
  if (expected !== null && typeof expected === "object") return sameJson;
  return sameValue;
}

// What a client threw, as text: its own message where it has one.
// Asked inside a `try`: a client may refuse to read a member a value lacks.
export const shown = cs`(thrown: ClientValue) => {
  try {
    return (thrown as { message?: string }).message ?? JSON.stringify(thrown);
  } catch (error) {
    return JSON.stringify(thrown);
  }
}`;

/**
 * A verdict the host reached without a client: a case client script cannot
 * say, or one whose answer is whether it compiles.
 */
export function decided(verdict: Verdict): Client<Verdict> {
  return cs`$verdict`;
}

/**
 * The script that runs a case and judges it, on the client. Its own `try`, so
 * a case that throws fails alone.
 */
export function verdict(test: Case): Client<Verdict> {
  const name = test.name;
  if ("run" in test) {
    const run = test.run;
    const negative = test.negative;
    return cs`{
      try {
        $run;
      } catch (error) {
        return $negative
          ? { name: $name, outcome: "pass", detail: "" }
          : {
              name: $name,
              outcome: "fail",
              detail: $shown(error as ClientValue),
            };
      }
      return $negative
        ? { name: $name, outcome: "fail", detail: "finished, expected a throw" }
        : { name: $name, outcome: "pass", detail: "" };
    }`;
  }
  if ("throws" in test) {
    const thrown = test.throws;
    const same = sameAs(thrown);
    return cs`{
      try {
        const got = ${test.subject};
        return {
          name: $name,
          outcome: "fail",
          detail: "returned " + JSON.stringify(got),
        };
      } catch (error) {
        if ($same(error as ClientValue, $thrown)) {
          return { name: $name, outcome: "pass", detail: "" };
        }
        return {
          name: $name,
          outcome: "fail",
          detail: "threw " + $shown(error as ClientValue),
        };
      }
    }`;
  }
  const expected = test.expected;
  const same = sameAs(expected);
  return cs`{
    try {
      const got = ${test.subject};
      if ($same(got, $expected)) {
        return { name: $name, outcome: "pass", detail: "" };
      }
      return {
        name: $name,
        outcome: "fail",
        detail: "got " + JSON.stringify(got),
      };
    } catch (error) {
      return {
        name: $name,
        outcome: "fail",
        detail: "threw " + $shown(error as ClientValue),
      };
    }
  }`;
}
