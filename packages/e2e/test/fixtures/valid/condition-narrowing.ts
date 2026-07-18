import { cs, type Client } from "@backtickjs/core";

// Narrowing must survive the boolean-condition checks: the tested condition
// stays in place in the virtual code (its check reads a sequenced
// duplicate), so `text !== undefined` still narrows `text` in the branch it
// guards and from a `&&` left operand into the right. The conditions cover
// each checked shape: a bare boolean identifier, a braced splice (whose
// duplicate re-renders the host expression), and comparison/`&&` forms that
// are boolean by construction and need no check.
const flags = { strict: cs`true` };

const label: Client<(text: string | undefined, upper: boolean) => string> = cs`(
  text: string | undefined,
  upper: boolean,
) => {
  if (upper && text !== undefined) {
    return text.toUpperCase();
  }
  if (${flags.strict} && text !== undefined && text.charAt(0) === "!") {
    return text.concat("?");
  }
  return "none";
}`;

export default cs`({
  missing: $label(undefined, true),
  loud: $label("!hi", true),
  quiet: $label("!hi", false),
  plain: $label("zz", false),
})`;
