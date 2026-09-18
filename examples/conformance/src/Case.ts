import { cs } from "@backtickjs/core";
import type { Client, ClientValue } from "@backtickjs/core";

/**
 * One thing a client must do the same way as every other: a script, and what
 * it evaluates to — or, with `throws`, what it throws.
 */
export type Case =
  | { name: string; subject: Client<ClientValue>; expected: ClientValue }
  | { name: string; subject: Client<ClientValue>; throws: ClientValue };

/** A case's outcome, as the client under test decided it. */
export type Verdict = { name: string; ok: boolean; detail: string };

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

/**
 * The script that runs a case and judges it, on the client. Its own `try`, so
 * a case that throws fails alone.
 */
export function verdict(test: Case): Client<Verdict> {
  const name = test.name;
  if ("throws" in test) {
    const thrown = test.throws;
    const same = sameAs(thrown);
    return cs`{
      try {
        const got = ${test.subject};
        return {
          name: $name,
          ok: false,
          detail: "returned " + JSON.stringify(got),
        };
      } catch (error) {
        if ($same(error as ClientValue, $thrown)) {
          return { name: $name, ok: true, detail: "" };
        }
        return {
          name: $name,
          ok: false,
          detail: "threw " + JSON.stringify(error as ClientValue),
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
        return { name: $name, ok: true, detail: "" };
      }
      return { name: $name, ok: false, detail: "got " + JSON.stringify(got) };
    } catch (error) {
      return {
        name: $name,
        ok: false,
        detail: "threw " + JSON.stringify(error as ClientValue),
      };
    }
  }`;
}
