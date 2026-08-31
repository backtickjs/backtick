import { cs, type Client } from "@backtickjs/core";

// A fragment written under the outer `total`, carried by host code into a hole
// inside a block that shadows it.
//
// Refused. The binding is still in scope there, and the bundler could reach it
// by renaming the inner one — which is what it used to do, quietly returning 5
// where the fragment meant 4. But no JavaScript can name a shadowed binding
// from inside the scope that shadows it, and a bundle should not be able to say
// what its source cannot. The behaviour itself is ordinary — a closure written
// in the outer scope and called in the inner does exactly this — so the fix is
// to splice the fragment where its binding is not shadowed.
let carried: Client<number> | undefined;

const keep = (fragment: Client<number>): Client<number> => {
  carried = fragment;
  return fragment;
};

const again = (): Client<number> => {
  if (carried === undefined) {
    throw new Error("the first hole runs first");
  }
  return carried;
};

export default cs`{
  const total = 1;
  const first = ${keep(cs`total`)};
  {
    const total = 2;
    return first + total + ${again()};
  }
}`;
