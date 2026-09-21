import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// `x += y` assigns what `x + y` answers and answers it: a string concatenates
// as `+` does. The variable is read before the value is evaluated, so an
// assignment inside the value doesn't change what it adds to.
it("compoundAssignment", async (t) => {
  await snapshotCase(
    t,
    "compoundAssignment",
    cs`{
      let n = 10;
      n += 5;
      n -= 3;
      n *= 2;
      n /= 4;
      n %= 4;
      let text = "a";
      text += "b";
      let total = 1;
      const answered = (total += 2);
      let x = 1;
      x += x = 5;
      return [n, text, answered, total, x];
    }`,
  );
});
