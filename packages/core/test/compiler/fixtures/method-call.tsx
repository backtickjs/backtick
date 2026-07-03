import { cs } from "@backtickjs/core";
import { print } from "../print.ts";

const script = cs`{
  const greeting = "Hello";
  return greeting.concat(", ", "World").toUpperCase();
}`;

print(script);
