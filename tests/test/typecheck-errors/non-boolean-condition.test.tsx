import { cs } from "@backtickjs/core";

// A condition must be a boolean: the language has no truthiness, so a
// string tested directly is a type error.
export default cs`(name: string) => {
  // @ts-expect-error: Argument of type 'string' is not assignable to parameter of type 'boolean'.
  if (name) {
    return name;
  }
  return "anonymous";
}`;
