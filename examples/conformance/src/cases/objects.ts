import { cs } from "@backtickjs/core";
import type { Case } from "../Case.js";

export const objects: Case[] = [
  {
    name: "object literal",
    subject: cs`({ a: 1, b: "two" })`,
    expected: { a: 1, b: "two" },
  },
  { name: "property access", subject: cs`({ a: { b: 3 } }).a.b`, expected: 3 },
  {
    name: "array literal",
    subject: cs`[1, "two", null]`,
    expected: [1, "two", null],
  },
  { name: "array index", subject: cs`[10, 20, 30][1]`, expected: 20 },
  { name: "array length", subject: cs`[1, 2, 3].length`, expected: 3 },
  { name: "spread", subject: cs`[0, ...[1, 2], 3]`, expected: [0, 1, 2, 3] },
  {
    name: "key order is insertion order",
    subject: cs`Object.keys({ b: 1, a: 2, c: 3 })`,
    expected: ["b", "a", "c"],
  },
];
