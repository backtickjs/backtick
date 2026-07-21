import { cs } from "@backtickjs/core";

// `?` marks a nullable parameter: an omitted argument binds as null — the
// language's absent value; `undefined` never arises.
const greet = cs`(name?: string) => {
  return name?.concat("!");
}`;

export default cs`({
  named: $greet("hi"),
  omitted: $greet(),
  explicit: $greet(null),
})`;
