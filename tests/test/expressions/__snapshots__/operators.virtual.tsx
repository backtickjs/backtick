import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";

// Every JavaScript operator, answering what JavaScript answers.
it("binaryOperators", async (t) => {
  await snapshotCase(
    t,
    "binaryOperators",
    cs.lift((() => {
    const __cs_n = 5;
    return [__cs_n ** 2, __cs_n & 6, __cs_n | 8, __cs_n ^ 1, __cs_n << 2, -__cs_n >> 1, -__cs_n >>> 28, __cs_n == 5, __cs_n != 5, "length" in [__cs_n], [__cs_n] instanceof Array];
})()),
  );
});

it("unaryOperators", async (t) => {
  await snapshotCase(
    t,
    "unaryOperators",
    cs.lift((() => {
    const __cs_s = "7";
    const __cs_o: {
        a?: number;
        b: number;
    } = { a: 1, b: 2 };
    const __cs_deleted = delete __cs_o.a;
    return [+__cs_s, ~5, void __cs_s === null, __cs_deleted, "a" in __cs_o];
})()),
  );
});

it("assignmentOperators", async (t) => {
  await snapshotCase(
    t,
    "assignmentOperators",
    cs.lift((() => {
    let __cs_n = 3;
    __cs_n **= 2;
    __cs_n <<= 1;
    __cs_n >>= 2;
    __cs_n >>>= 1;
    __cs_n &= 7;
    __cs_n |= 8;
    __cs_n ^= 1;
    let __cs_a: number | null = null;
    __cs_a ??= 4;
    let __cs_b = false;
    __cs_b ||= true;
    let __cs_c = true;
    __cs_c &&= false;
    return [__cs_n, __cs_a, __cs_b, __cs_c];
})()),
  );
});

// Anything a reference can name is a target: a variable, a member, an element.
it("assignmentTargets", async (t) => {
  await snapshotCase(
    t,
    "assignmentTargets",
    cs.lift((() => {
    const __cs_o = { n: 1 };
    const __cs_list = [1, 2];
    __cs_o.n += 1;
    __cs_o.n++;
    __cs_list[0] = 10;
    __cs_list[1] **= 3;
    --__cs_list[1];
    return [__cs_o.n, __cs_list];
})()),
  );
});

// `,` evaluates both sides and answers the right one.
it("commaOperator", async (t) => {
  await snapshotCase(
    t,
    "commaOperator",
    cs.lift((() => {
    let __cs_n = 0;
    const __cs_last = (__cs_n++, __cs_n + 10);
    return [__cs_n, __cs_last];
})()),
  );
});
