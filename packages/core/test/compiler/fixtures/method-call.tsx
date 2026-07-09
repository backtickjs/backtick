import { cs } from "@backtickjs/core";

const script = cs`{
  const greeting = "Hello";
  return greeting.concat(", ", "World").toUpperCase();
}`;
