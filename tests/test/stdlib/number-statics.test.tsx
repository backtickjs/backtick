import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// A namespace holding a value beside its functions: `Number.EPSILON` is read
// where `Number.isInteger` is called, and both are whole names the client
// answers rather than a member read off a `Number` there is no value for.
async function Checked() {
  return cs`{
    const positive = Number.EPSILON > 0;
    const largest = Number.MAX_VALUE > 1e308;
    const safe =
      Number.MAX_SAFE_INTEGER === 9007199254740991 &&
      Number.MIN_SAFE_INTEGER === -9007199254740991 &&
      Number.MIN_VALUE > 0 &&
      Number.isSafeInteger(3) &&
      !Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1);
    const whole = Number.isInteger(2);
    const fractional = Number.isInteger(2.5);
    // Unconverted, so a string that reads as a number is still not one.
    const written = Number.isFinite("2");
    return (
      <span>
        {whole +
          " " +
          fractional +
          " " +
          written +
          " " +
          positive +
          " " +
          largest +
          " " +
          safe}
      </span>
    );
  }`;
}

it("Checked", async (t) => {
  await snapshotCase(t, "Checked", <Checked />);
});
