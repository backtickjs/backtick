import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

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

it("Parsed", async (t) => {
  await snapshotCase(t, "Parsed", <Parsed />);
});
