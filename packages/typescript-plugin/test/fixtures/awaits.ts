import { cs } from "@backtickjs/core";

async function fetchGreeting() {
  return "hello";
}

export function greeting() {
  return cs`${await fetchGreeting()} + "!"`;
}
