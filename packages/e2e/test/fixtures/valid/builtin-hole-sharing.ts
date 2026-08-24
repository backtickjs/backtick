import { cs, state, type Client, type State } from "@backtickjs/core";

// One script location, reached twice: once with a builtin filling its hole and
// once with a script. They are two entries, because a builtin is written into
// the body — `#f1` writes `state` and takes no parameter, where `#f2` takes the
// thunk every other splice takes.
//
// Sharing one entry would be a miscompile: whichever arrived first fixes the
// body, and the other reference then passes an argument nothing reads, or
// passes none where one is read. `wrapped` adds ten so that shows in the value
// as well as in the bundle — shared, `1 + 1`; separate, `1 + 11`.

const make = (f: Client<(n: number) => State<number>>) =>
  cs`{
    return $f(1).read();
  }`;

const wrapped = cs`(n: number) => $state(n + 10)`;

export default cs`{
  return ${make(state)} + ${make(wrapped)};
}`;
