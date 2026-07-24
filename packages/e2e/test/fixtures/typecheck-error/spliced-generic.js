import { cs } from "@backtickjs/core";
class Point {
  "@backtickjs" = "ClientObject";
  x;
  constructor(x) {
    this.x = x;
  }
}
// A host helper generic over the client object it splices: `Spliced<T>`
// defers over the unresolved type parameter, so the annotated return type
// errors — the documented cost of `cs.splice` losing its `ClientObject`
// identity overload. A concretely typed splice reduces fine (see
// `spliced-param`), and the runtime is unaffected either way.
function wrap(value) {
  return cs.create(
    [20, 10, 20, 26],
    {
      version: "0.0.0",
      filePath: "spliced-generic.ts",
      fileHash: "2o6jybvu3qwcy",
      kind: "value",
      splices: { $value: value },
      captures: [],
      declarations: [],
    },
    (v) => v.arrow([20, 13, 20, 25], [], v.splice([20, 19, 20, 25], "$value")),
  );
}
export default cs.create(
  [23, 16, 23, 49],
  {
    version: "0.0.0",
    filePath: "spliced-generic.ts",
    fileHash: "2o6jybvu3qwcy",
    kind: "value",
    splices: {
      $0splice0: wrap(
        new Point(
          cs.create(
            [23, 36, 23, 41],
            {
              version: "0.0.0",
              filePath: "spliced-generic.ts",
              fileHash: "2o6jybvu3qwcy",
              kind: "value",
              splices: {},
              captures: [],
              declarations: [],
            },
            (v) => v.number([23, 39, 23, 40], 7),
          ),
        ),
      ),
    },
    captures: [],
    declarations: [],
  },
  (v) =>
    v.propertyAccess(
      [23, 19, 23, 48],
      v.call([23, 19, 23, 46], v.splice([23, 19, 23, 44], "$0splice0"), []),
      "x",
    ),
);
