import { cs } from "@backtickjs/core";
import type { Client, ClientValue } from "@backtickjs/core";

/**
 * A script a client must run the way ECMAScript does: it passes by finishing,
 * as a Test262 case does, or by throwing when it is `negative`.
 */
export type Case = { name: string; run: Client<void>; negative: boolean };

/**
 * A case's outcome. `pass` and `fail` are the client's to decide;
 * `unsupported` is the host's, for a case client script cannot say.
 */
export type Verdict = {
  name: string;
  outcome: "pass" | "fail" | "unsupported";
  detail: string;
};

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
export function verdict({ name, run, negative }: Case): Client<Verdict> {
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
