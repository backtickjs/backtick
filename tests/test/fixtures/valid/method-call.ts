import { cs } from "@backtickjs/core";

export default cs`{
  const greeting = "Hello";
  return greeting.concat(", ", "World").toUpperCase();
}`;
