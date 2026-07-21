import { cs } from "@backtickjs/core";
// `?` marks a nullable parameter: an omitted argument binds as null — the
// language's absent value; `undefined` never arises.
const greet = cs.create(
  [5, 15, 7, 3],
  {
    filePath: "optional-parameter.ts",
    fileHash: "izttd0h87sqs",
    splices: {},
    captures: [],
    declarations: ["name$izttd0h87sqs$0"],
  },
  (v) =>
    v.arrow(
      [5, 18, 7, 2],
      [v.identifier([5, 19, 5, 23], "name", "name$izttd0h87sqs$0")],
      v.block(
        [5, 37, 7, 2],
        [
          v.return(
            [6, 3, 6, 28],
            v.call(
              [6, 10, 6, 27],
              v.propertyAccess(
                [6, 10, 6, 22],
                v.identifier([6, 10, 6, 14], "name", "name$izttd0h87sqs$0"),
                "concat",
                true,
              ),
              [v.string([6, 23, 6, 26], "!")],
            ),
          ),
        ],
      ),
    ),
);
export default cs.create(
  [9, 16, 13, 4],
  {
    filePath: "optional-parameter.ts",
    fileHash: "izttd0h87sqs",
    splices: { $greet: greet },
    captures: [],
    declarations: [],
  },
  (v) =>
    v.object([9, 20, 13, 2], {
      named: v.call([10, 10, 10, 22], v.splice([10, 10, 10, 16], "$greet"), [
        v.string([10, 17, 10, 21], "hi"),
      ]),
      omitted: v.call(
        [11, 12, 11, 20],
        v.splice([11, 12, 11, 18], "$greet"),
        [],
      ),
      explicit: v.call([12, 13, 12, 25], v.splice([12, 13, 12, 19], "$greet"), [
        v.null([12, 20, 12, 24]),
      ]),
    }),
);
