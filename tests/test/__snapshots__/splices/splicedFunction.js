import { cs } from "@backtickjs/core";
// A host function has no data form — client code is written in `cs`...` — so
// the bundler expands it rather than carrying it: run once against one opaque
// hole per parameter, and what it answered is what crosses.
//
// Nothing here is about components. A component is a function of one argument
// it reads fields off, which is why a tag written inside a script works at all.
//
// The cast is because `Spliceable` does not admit a function yet: the rule is
// the bundler's, and the type has still to catch up — until it does, a script
// cannot call one by name either.
const splicedFunction = cs.create(
  [14, 25, 14, 80],
  {
    version: "0.0.0",
    filePath: "splicedFunction.tsx",
    fileHash: "2lvq3p0iyw07t",
    splices: { $0splice0: { value: (n) => n, params: [] } },
    captures: [],
  },
  () => ({
    kind: "=>",
    loc: [14, 28, 14, 79],
    parameters: [],
    body: {
      kind: "splice",
      loc: [14, 34, 14, 79],
      key: "$0splice0",
    },
  }),
);
