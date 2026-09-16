import { it } from "node:test";
import { cs, type Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// Narrowing must survive the boolean-condition checks: the tested condition
// stays in place in the virtual code (its check reads a sequenced
// duplicate), so `text !== null` still narrows `text` in the branch it
// guards and from a `&&` left operand into the right. The conditions cover
// each checked shape: a bare boolean identifier, a braced splice (whose
// duplicate re-renders the host expression), and comparison/`&&` forms that
// are boolean by construction and need no check.
const flags = { strict: cs`true` };

const label: Client<(text: string | null, upper: boolean) => string> = cs`(
  text: string | null,
  upper: boolean,
) => {
  if (upper && text !== null) {
    return text.toUpperCase();
  }
  if (${flags.strict} && text !== null && text.charAt(0) === "!") {
    return text.concat("?");
  }
  return "none";
}`;

it("conditionNarrowing", async (t) => {
  await snapshotCase(
    t,
    "conditionNarrowing",
    cs`({
      missing: $label(null, true),
      loud: $label("!hi", true),
      quiet: $label("!hi", false),
      plain: $label("zz", false),
    })`,
  );
});
