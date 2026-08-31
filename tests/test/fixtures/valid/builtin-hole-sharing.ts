import { cs, state, type Client, type State } from "@backtickjs/core";

const make = (f: Client<(n: number) => State<number>>) =>
  cs`{
    return $f(1).read();
  }`;

const wrapped = cs`(n: number) => $state(n + 10)`;

export default cs`{
  return ${make(state)} + ${make(wrapped)};
}`;
