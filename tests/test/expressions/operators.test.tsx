import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// Every JavaScript operator, answering what JavaScript answers.
it("binaryOperators", async (t) => {
  await snapshotCase(
    t,
    "binaryOperators",
    cs`{
      const n = 5;
      return [
        n ** 2,
        n & 6,
        n | 8,
        n ^ 1,
        n << 2,
        -n >> 1,
        -n >>> 28,
        n == 5,
        n != 5,
        "length" in [n],
        [n] instanceof Array,
      ];
    }`,
  );
});

it("unaryOperators", async (t) => {
  await snapshotCase(
    t,
    "unaryOperators",
    cs`{
      const s = "7";
      const o: { a?: number; b: number } = { a: 1, b: 2 };
      const deleted = delete o.a;
      return [+s, ~5, void s === null, deleted, "a" in o];
    }`,
  );
});

it("assignmentOperators", async (t) => {
  await snapshotCase(
    t,
    "assignmentOperators",
    cs`{
      let n = 3;
      n **= 2;
      n <<= 1;
      n >>= 2;
      n >>>= 1;
      n &= 7;
      n |= 8;
      n ^= 1;
      let a: number | null = null;
      a ??= 4;
      let b = false;
      b ||= true;
      let c = true;
      c &&= false;
      return [n, a, b, c];
    }`,
  );
});

// Anything a reference can name is a target: a variable, a member, an element.
it("assignmentTargets", async (t) => {
  await snapshotCase(
    t,
    "assignmentTargets",
    cs`{
      const o = { n: 1 };
      const list = [1, 2];
      o.n += 1;
      o.n++;
      list[0] = 10;
      list[1] **= 3;
      --list[1];
      return [o.n, list];
    }`,
  );
});

// `,` evaluates both sides and answers the right one.
it("commaOperator", async (t) => {
  await snapshotCase(
    t,
    "commaOperator",
    cs`{
      let n = 0;
      const last = (n++, n + 10);
      return [n, last];
    }`,
  );
});
