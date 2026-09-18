import { cs } from "@backtickjs/core";
import type { Case } from "../Case.js";

export const controlFlow: Case[] = [
  {
    name: "if / else",
    subject: cs`{
      const count = 2 as number;
      if (count === 1) {
        return "one";
      } else {
        return "many";
      }
    }`,
    expected: "many",
  },
  {
    name: "for loop",
    subject: cs`{
      let total = 0;
      for (let i = 1; i <= 4; i = i + 1) {
        total = total + i;
      }
      return total;
    }`,
    expected: 10,
  },
  {
    name: "while with break and continue",
    subject: cs`{
      let i = 0;
      let odd = 0;
      while (true) {
        i = i + 1;
        if (i > 9) {
          break;
        }
        if (i % 2 === 0) {
          continue;
        }
        odd = odd + i;
      }
      return odd;
    }`,
    expected: 25,
  },
  {
    name: "try / catch",
    subject: cs`{
      try {
        throw "boom";
      } catch (error) {
        return error === "boom" ? "caught" : "wrong";
      }
    }`,
    expected: "caught",
  },
  {
    name: "throw escapes",
    subject: cs`{
      throw "out";
    }`,
    throws: "out",
  },
  {
    name: "a thrown object",
    subject: cs`{
      throw { code: 7 };
    }`,
    throws: { code: 7 },
  },
];
