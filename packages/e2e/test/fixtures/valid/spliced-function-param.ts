import { cs } from "@backtickjs/core";

// A function is never spliceable — it can't cross the host/client boundary
// as data — but an annotation can still name a function type: the parameter
// receives a client-born function (here, a spliced script), already client
// currency, and passes through the annotation untouched.
export default cs`{
  const apply = (f: () => number) => f() + 1;
  return apply(${cs`() => 2`});
}`;
