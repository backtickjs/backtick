import { cs } from "@backtickjs/core";
// Narrowing must survive the boolean-condition checks: the tested condition
// stays in place in the virtual code (its check reads a sequenced
// duplicate), so `text !== undefined` still narrows `text` in the branch it
// guards and from a `&&` left operand into the right. The conditions cover
// each checked shape: a bare boolean identifier, a braced splice (whose
// duplicate re-renders the host expression), and comparison/`&&` forms that
// are boolean by construction and need no check.
const flags = {
  strict: cs.create(
    [10, 25, 10, 33],
    {
      filePath: "condition-narrowing.ts",
      fileHash: "1du55g5uewjgv",
      splices: {},
      captures: [],
      declarations: [],
    },
    (v) => v.boolean([10, 28, 10, 32], true),
  ),
};
const label = cs.create(
  [12, 77, 23, 3],
  {
    filePath: "condition-narrowing.ts",
    fileHash: "1du55g5uewjgv",
    splices: { $0splice0: flags.strict },
    captures: ["undefined"],
    declarations: ["text$1du55g5uewjgv$0", "upper$1du55g5uewjgv$1"],
  },
  (v) =>
    v.arrow(
      [12, 80, 23, 2],
      [
        v.identifier([13, 3, 13, 7], "text", "text$1du55g5uewjgv$0"),
        v.identifier([14, 3, 14, 8], "upper", "upper$1du55g5uewjgv$1"),
      ],
      v.block(
        [15, 6, 23, 2],
        [
          v.if(
            [16, 3, 18, 4],
            v.binop(
              [16, 7, 16, 34],
              v.identifier([16, 7, 16, 12], "upper", "upper$1du55g5uewjgv$1"),
              "&&",
              v.binop(
                [16, 16, 16, 34],
                v.identifier([16, 16, 16, 20], "text", "text$1du55g5uewjgv$0"),
                "!==",
                v.identifier([16, 25, 16, 34], "undefined", "undefined"),
              ),
            ),
            v.block(
              [16, 36, 18, 4],
              [
                v.return(
                  [17, 5, 17, 31],
                  v.call(
                    [17, 12, 17, 30],
                    v.propertyAccess(
                      [17, 12, 17, 28],
                      v.identifier(
                        [17, 12, 17, 16],
                        "text",
                        "text$1du55g5uewjgv$0",
                      ),
                      "toUpperCase",
                    ),
                    [],
                  ),
                ),
              ],
            ),
            null,
          ),
          v.if(
            [19, 3, 21, 4],
            v.binop(
              [19, 7, 19, 70],
              v.binop(
                [19, 7, 19, 44],
                v.splice([19, 7, 19, 22], "$0splice0"),
                "&&",
                v.binop(
                  [19, 26, 19, 44],
                  v.identifier(
                    [19, 26, 19, 30],
                    "text",
                    "text$1du55g5uewjgv$0",
                  ),
                  "!==",
                  v.identifier([19, 35, 19, 44], "undefined", "undefined"),
                ),
              ),
              "&&",
              v.binop(
                [19, 48, 19, 70],
                v.call(
                  [19, 48, 19, 62],
                  v.propertyAccess(
                    [19, 48, 19, 59],
                    v.identifier(
                      [19, 48, 19, 52],
                      "text",
                      "text$1du55g5uewjgv$0",
                    ),
                    "charAt",
                  ),
                  [v.number([19, 60, 19, 61], 0)],
                ),
                "===",
                v.string([19, 67, 19, 70], "!"),
              ),
            ),
            v.block(
              [19, 72, 21, 4],
              [
                v.return(
                  [20, 5, 20, 29],
                  v.call(
                    [20, 12, 20, 28],
                    v.propertyAccess(
                      [20, 12, 20, 23],
                      v.identifier(
                        [20, 12, 20, 16],
                        "text",
                        "text$1du55g5uewjgv$0",
                      ),
                      "concat",
                    ),
                    [v.string([20, 24, 20, 27], "?")],
                  ),
                ),
              ],
            ),
            null,
          ),
          v.return([22, 3, 22, 17], v.string([22, 10, 22, 16], "none")),
        ],
      ),
    ),
);
export default cs.create(
  [25, 16, 30, 4],
  {
    filePath: "condition-narrowing.ts",
    fileHash: "1du55g5uewjgv",
    splices: { $label: label },
    captures: ["undefined"],
    declarations: [],
  },
  (v) =>
    v.object([25, 20, 30, 2], {
      missing: v.call([26, 12, 26, 35], v.splice([26, 12, 26, 18], "$label"), [
        v.identifier([26, 19, 26, 28], "undefined", "undefined"),
        v.boolean([26, 30, 26, 34], true),
      ]),
      loud: v.call([27, 9, 27, 28], v.splice([27, 9, 27, 15], "$label"), [
        v.string([27, 16, 27, 21], "!hi"),
        v.boolean([27, 23, 27, 27], true),
      ]),
      quiet: v.call([28, 10, 28, 30], v.splice([28, 10, 28, 16], "$label"), [
        v.string([28, 17, 28, 22], "!hi"),
        v.boolean([28, 24, 28, 29], false),
      ]),
      plain: v.call([29, 10, 29, 29], v.splice([29, 10, 29, 16], "$label"), [
        v.string([29, 17, 29, 21], "zz"),
        v.boolean([29, 23, 29, 28], false),
      ]),
    }),
);
