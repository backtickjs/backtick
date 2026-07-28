import { cs } from "@backtickjs/core";
// `?` on a property means omittable: an absent member reads as null — the
// language's absent value; `undefined` never arises — and `?.` composes on
// top for the nullable reads.
const read = cs.create(
  [6, 14, 8, 3],
  {
    version: "0.0.0",
    filePath: "optional-property.ts",
    fileHash: "10vcjd80vhoob",
    kind: "value",
    splices: {},
    captures: [],
    declarations: ["o$10vcjd80vhoob$0"],
    spliceScopes: {},
  },
  (v) =>
    v.arrow(
      [6, 17, 8, 2],
      [v.identifier([6, 18, 6, 19], "o", "o$10vcjd80vhoob$0")],
      v.block(
        [6, 67, 8, 2],
        [
          v.return(
            [7, 3, 7, 37],
            v.array(
              [7, 10, 7, 36],
              [
                v.propertyAccess(
                  [7, 11, 7, 18],
                  v.identifier([7, 11, 7, 12], "o", "o$10vcjd80vhoob$0"),
                  "label",
                ),
                v.binop(
                  [7, 20, 7, 35],
                  v.propertyAccess(
                    [7, 20, 7, 30],
                    v.propertyAccess(
                      [7, 20, 7, 27],
                      v.identifier([7, 20, 7, 21], "o", "o$10vcjd80vhoob$0"),
                      "inner",
                    ),
                    "z",
                    true,
                  ),
                  "??",
                  v.number([7, 34, 7, 35], 0),
                ),
              ],
            ),
          ),
        ],
      ),
    ),
);
export default cs.create(
  [10, 16, 14, 4],
  {
    version: "0.0.0",
    filePath: "optional-property.ts",
    fileHash: "10vcjd80vhoob",
    kind: "value",
    splices: { $read: read },
    captures: [],
    declarations: [],
    spliceScopes: { $read: [] },
  },
  (v) =>
    v.object([10, 20, 14, 2], {
      present: v.call([11, 12, 11, 50], v.splice([11, 12, 11, 17], "$read"), [
        v.object([11, 18, 11, 49], {
          label: v.string([11, 27, 11, 30], "a"),
          inner: v.object([11, 39, 11, 47], {
            z: v.number([11, 44, 11, 45], 3),
          }),
        }),
      ]),
      partial: v.call([12, 12, 12, 44], v.splice([12, 12, 12, 17], "$read"), [
        v.object([12, 18, 12, 43], {
          label: v.string([12, 27, 12, 30], "b"),
          inner: v.object([12, 39, 12, 41], {}),
        }),
      ]),
      omitted: v.call([13, 12, 13, 33], v.splice([13, 12, 13, 17], "$read"), [
        v.object([13, 18, 13, 32], { label: v.string([13, 27, 13, 30], "c") }),
      ]),
    }),
);
