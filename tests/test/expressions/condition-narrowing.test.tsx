import { it } from "node:test";
import { cs, type Client } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A condition narrows in the virtual code: `text !== null` narrows `text` in
// the branch it guards and from a `&&` left operand into the right, a braced
// splice included.
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
