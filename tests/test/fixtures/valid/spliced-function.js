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
export default cs.create(
  [14, 16, 14, 71],
  {
    version: "0.0.0",
    filePath: "spliced-function.tsx",
    fileHash: "g4po9i26hpjc",
    splices: { $0splice0: { value: (n) => n, params: [] } },
    captures: [],
  },
  () => ({
    kind: 220,
    loc: [14, 19, 14, 70],
    parameters: [],
    body: {
      kind: 1000,
      loc: [14, 25, 14, 70],
      key: "$0splice0",
    },
  }),
);
