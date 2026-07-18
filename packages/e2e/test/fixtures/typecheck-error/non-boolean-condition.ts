import { cs } from "@backtickjs/core";

// A condition must be a boolean: the language has no truthiness, so a
// string tested directly is a type error.
export default cs`(name: string) => {
  if (name) {
    return name;
  }
  return "anonymous";
}`;
