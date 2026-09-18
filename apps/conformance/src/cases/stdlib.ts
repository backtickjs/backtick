import { cs } from "@backtickjs/core";
import type { Case } from "../Case.js";

export const stdlib: Case[] = [
  {
    name: "array map",
    subject: cs`[1, 2, 3].map((n) => n * 2)`,
    expected: [2, 4, 6],
  },
  {
    name: "array filter",
    subject: cs`[1, 2, 3, 4].filter((n) => n % 2 === 0)`,
    expected: [2, 4],
  },
  { name: "array join", subject: cs`["a", "b"].join("-")`, expected: "a-b" },
  { name: "array includes", subject: cs`[1, 2].includes(2)`, expected: true },
  {
    name: "array indexOf missing",
    subject: cs`[1, 2].indexOf(5)`,
    expected: -1,
  },
  {
    name: "string toUpperCase",
    subject: cs`"hi".toUpperCase()`,
    expected: "HI",
  },
  { name: "Math.floor", subject: cs`Math.floor(-1.5)`, expected: -2 },
  { name: "Math.round halves up", subject: cs`Math.round(-2.5)`, expected: -2 },
  { name: "Math.max", subject: cs`Math.max(3, 9, 4)`, expected: 9 },
  {
    name: "Number.parseInt",
    subject: cs`Number.parseInt("42px")`,
    expected: 42,
  },
  {
    name: "JSON.stringify object",
    subject: cs`JSON.stringify({ a: [1, true] })`,
    expected: '{"a":[1,true]}',
  },
  {
    name: "JSON.stringify string",
    subject: cs`JSON.stringify('say "hi"')`,
    expected: '"say \\"hi\\""',
  },
  { name: "JSON.parse", subject: cs`JSON.parse("[1,2]")`, expected: [1, 2] },
  {
    name: "Object.entries",
    subject: cs`Object.entries({ x: 1, y: 2 })`,
    expected: [
      ["x", 1],
      ["y", 2],
    ],
  },
];
