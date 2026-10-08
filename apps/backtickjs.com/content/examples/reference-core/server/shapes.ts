import { type Client, cs } from "@backtickjs/core";

// An expression is what it computes.
export const greeting: Client<string> = cs`new Date().getHours() < 12
  ? "Good morning"
  : "Good afternoon"`;

// A block is what it returns.
export const meal: Client<string> = cs`{
  const hour = new Date().getHours();
  return hour < 11 ? "Breakfast" : "Lunch";
}`;

// A function is the function.
export const double: Client<(n: number) => number> = cs`(n: number) => n * 2`;
