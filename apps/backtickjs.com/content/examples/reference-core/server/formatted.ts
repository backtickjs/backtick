import { type Client, cs } from "@backtickjs/core";

// A script built from another: the phone computes `amount`, then formats it.
export function formatted(amount: Client<number>): Client<string> {
  return cs`"$" + $amount.toFixed(2)`;
}

export const total = formatted(cs`4.5 + 4`);
