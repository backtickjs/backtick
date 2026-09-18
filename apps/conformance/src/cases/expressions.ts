import { cs } from "@backtickjs/core";
import type { Case } from "../Case.js";

export const expressions: Case[] = [
  { name: "number addition", subject: cs`1 + 2`, expected: 3 },
  { name: "string concatenation", subject: cs`"a" + "b"`, expected: "ab" },
  { name: "number joins a string", subject: cs`"n" + 1`, expected: "n1" },
  { name: "precedence", subject: cs`1 + 2 * 3 - 4 / 2`, expected: 5 },
  { name: "remainder", subject: cs`-7 % 3`, expected: -1 },
  { name: "division by zero", subject: cs`1 / 0`, expected: Infinity },
  { name: "zero by zero", subject: cs`0 / 0`, expected: NaN },
  { name: "strict equality", subject: cs`1 === 1`, expected: true },
  {
    name: "no coercion in ===",
    subject: cs`("1" as string | number) === 1`,
    expected: false,
  },
  {
    name: "null is not nothing",
    subject: cs`((held: string | null) => held ?? "fallback")(null)`,
    expected: "fallback",
  },
  {
    name: "?? keeps zero",
    subject: cs`((held: number | null) => held ?? 1)(0)`,
    expected: 0,
  },
  {
    name: "|| takes the right when false",
    subject: cs`(false as boolean) || true`,
    expected: true,
  },
  {
    name: "&& short-circuits",
    subject: cs`(false as boolean) && true`,
    expected: false,
  },
  { name: "conditional", subject: cs`2 > 1 ? "yes" : "no"`, expected: "yes" },
  { name: "negation", subject: cs`-(2 + 3)`, expected: -5 },
  {
    name: "arrow captures",
    subject: cs`{
      const base = 10;
      const add = (one: number, two: number) => one + two + base;
      return add(1, 2);
    }`,
    expected: 13,
  },
];
