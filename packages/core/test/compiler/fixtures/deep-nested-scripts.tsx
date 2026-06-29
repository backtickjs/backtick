import { cs, type Client } from "@backtick/core";
import { print } from "../print.ts";

function add(lhs: Client<number>, rhs: Client<number>): Client<number> {
  return cs`${lhs} + ${rhs}`;
}

const script = cs`${add(cs`1`, cs`2`)}`;

print(script);
