import { cs } from "@backtickjs/core";
// A nullable parameter is not an optional argument: omitting it would put
// `undefined` in the function's type, so the caller passes `null`.
const greet = cs.create(
  [5, 15, 7, 3],
  {
    version: "0.0.0",
    filePath: "omitted-argument.ts",
    fileHash: "1gqqin78x7yev",
    kind: "value",
    splices: {},
    captures: [],
    declarations: ["name$1gqqin78x7yev$0"],
    captured: [],
  },
  (v) =>
    v.arrow(
      [5, 18, 7, 2],
      [v.identifier([5, 19, 5, 23], "name", "name$1gqqin78x7yev$0")],
      v.block(
        [5, 37, 7, 2],
        [
          v.return(
            [6, 3, 6, 28],
            v.call(
              [6, 10, 6, 27],
              v.propertyAccess(
                [6, 10, 6, 22],
                v.identifier([6, 10, 6, 14], "name", "name$1gqqin78x7yev$0"),
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
  [9, 16, 11, 3],
  {
    version: "0.0.0",
    filePath: "omitted-argument.ts",
    fileHash: "1gqqin78x7yev",
    kind: "value",
    splices: { $greet: greet },
    captures: [],
    declarations: [],
    captured: [],
  },
  (v) =>
    v.block(
      [9, 19, 11, 2],
      [
        v.return(
          [10, 3, 10, 19],
          v.call([10, 10, 10, 18], v.splice([10, 10, 10, 16], "$greet"), []),
        ),
      ],
    ),
);
