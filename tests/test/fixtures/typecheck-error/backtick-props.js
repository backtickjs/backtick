import { jsx as _jsx } from "@backtickjs/web/jsx-runtime";
import { bundler } from "@backtickjs/bundler";
import { Backtick, BacktickWithProps, cs } from "@backtickjs/core";
// Built rather than written out: what a bundle looks like is the bundler's, and
// a fixture that spelled one would pin the format twice. The claim about what
// each takes is still written, because that is what is under test.
async function Row({ count }) {
  return cs.create(
    [16, 10, 16, 41],
    {
      version: "0.0.0",
      filePath: "backtick-props.tsx",
      fileHash: "389651qohfifh",
      splices: { $count: { value: count, params: [] } },
      captures: [],
    },
    () => ({
      kind: "jsx",
      loc: [16, 13, 16, 40],
      type: {
        kind: "string",
        loc: [16, 14, 16, 16],
        text: "em",
      },
      attributes: [],
      children: [
        {
          kind: "binop",
          loc: [16, 18, 16, 34],
          left: {
            kind: "string",
            loc: [16, 18, 16, 25],
            text: "rows ",
          },
          operatorToken: "+",
          right: {
            kind: "splice",
            loc: [16, 28, 16, 34],
            key: "$count",
          },
        },
      ],
    }),
  );
}
async function Nothing() {
  return cs.create(
    [20, 10, 20, 45],
    {
      version: "0.0.0",
      filePath: "backtick-props.tsx",
      fileHash: "389651qohfifh",
      splices: {},
      captures: [],
    },
    () => ({
      kind: "jsx",
      loc: [20, 13, 20, 44],
      type: {
        kind: "string",
        loc: [20, 14, 20, 16],
        text: "em",
      },
      attributes: [],
      children: [
        {
          kind: "string",
          loc: [20, 18, 20, 38],
          text: "nothing to hand it",
        },
      ],
    }),
  );
}
const rows = await bundler.run(
  cs.create(
    [23, 33, 25, 4],
    {
      version: "0.0.0",
      filePath: "backtick-props.tsx",
      fileHash: "389651qohfifh",
      splices: {
        $0splice0: {
          value: _jsx(Row, {
            count: cs.create(
              [24, 15, 24, 30],
              {
                version: "0.0.0",
                filePath: "backtick-props.tsx",
                fileHash: "389651qohfifh",
                splices: {},
                captures: ["props$389651qohfifh$0"],
              },
              () => ({
                kind: ".",
                loc: [24, 18, 24, 29],
                expression: {
                  kind: "id",
                  loc: [24, 18, 24, 23],
                  text: "props",
                  bindingKey: "props$389651qohfifh$0",
                },
                name: "count",
              }),
            ),
          }),
          params: ["props$389651qohfifh$0"],
        },
      },
      captures: [],
    },
    () => ({
      kind: "=>",
      loc: [23, 36, 25, 3],
      parameters: [
        {
          kind: "param",
          loc: [23, 37, 23, 61],
          name: {
            kind: "id",
            loc: [23, 37, 23, 42],
            text: "props",
            bindingKey: "props$389651qohfifh$0",
          },
        },
      ],
      body: {
        kind: "splice",
        loc: [23, 66, 25, 3],
        key: "$0splice0",
      },
    }),
  ),
);
const empty = await bundler.run(_jsx(Nothing, {}));
// Right: what the bundle takes, and a drawing, which takes nothing.
export const drawn = _jsx(BacktickWithProps, {
  bundle: rows,
  props: { count: 1 },
});
export const bare = _jsx(Backtick, { bundle: empty });
// Wrong: the wrong type, a name it hasn't got, and none at all.
export const wrongType = _jsx(BacktickWithProps, {
  bundle: rows,
  props: { count: "one" },
});
export const wrongName = _jsx(BacktickWithProps, {
  bundle: rows,
  props: { nope: 1 },
});
export const missing = _jsx(BacktickWithProps, { bundle: rows });
// Null draws nothing, and a plain string is not a claim, so it is not a bundle.
export const nothing = _jsx(Backtick, { bundle: null });
export const text = _jsx(Backtick, { bundle: JSON.stringify({}) });
// A drawing, handed props anyway. A drawing is finished — there is no call for
// arguments to reach, so the component that takes them does not take it.
export const handedAnyway = _jsx(BacktickWithProps, {
  bundle: empty,
  props: { count: 1 },
});
export default cs.create(
  [53, 16, 53, 21],
  {
    version: "0.0.0",
    filePath: "backtick-props.tsx",
    fileHash: "389651qohfifh",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "number",
    loc: [53, 19, 53, 20],
    value: 1,
  }),
);
