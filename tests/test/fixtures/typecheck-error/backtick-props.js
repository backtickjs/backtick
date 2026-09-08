import { jsx as _jsx } from "@backtickjs/web-schema/jsx-runtime";
import { bundler } from "@backtickjs/bundler";
import { Backtick, BacktickWithProps, cs } from "@backtickjs/core";
// Built rather than written out: what a bundle looks like is the bundler's, and
// a fixture that spelled one would pin the format twice. The claim about what
// each takes is still written, because that is what is under test.
async function Row({ count }) {
  return cs.create(
    [20, 10, 20, 41],
    {
      version: "0.0.0",
      filePath: "backtick-props.tsx",
      fileHash: "3ag2kasswkjyg",
      splices: { $count: { value: count, params: [] } },
      captures: [],
    },
    () => ({
      kind: "jsx",
      loc: [20, 13, 20, 40],
      type: {
        kind: "string",
        loc: [20, 14, 20, 16],
        text: "em",
      },
      attributes: [],
      children: [
        {
          kind: "binop",
          loc: [20, 18, 20, 34],
          left: {
            kind: "string",
            loc: [20, 18, 20, 25],
            text: "rows ",
          },
          operatorToken: "+",
          right: {
            kind: "splice",
            loc: [20, 28, 20, 34],
            key: "$count",
          },
        },
      ],
    }),
  );
}
async function Nothing() {
  return cs.create(
    [24, 10, 24, 45],
    {
      version: "0.0.0",
      filePath: "backtick-props.tsx",
      fileHash: "3ag2kasswkjyg",
      splices: {},
      captures: [],
    },
    () => ({
      kind: "jsx",
      loc: [24, 13, 24, 44],
      type: {
        kind: "string",
        loc: [24, 14, 24, 16],
        text: "em",
      },
      attributes: [],
      children: [
        {
          kind: "string",
          loc: [24, 18, 24, 38],
          text: "nothing to hand it",
        },
      ],
    }),
  );
}
const rows = JSON.stringify(
  await bundler.run(
    cs.create(
      [28, 21, 30, 6],
      {
        version: "0.0.0",
        filePath: "backtick-props.tsx",
        fileHash: "3ag2kasswkjyg",
        splices: {
          $0splice0: {
            value: _jsx(Row, {
              count: cs.create(
                [29, 17, 29, 32],
                {
                  version: "0.0.0",
                  filePath: "backtick-props.tsx",
                  fileHash: "3ag2kasswkjyg",
                  splices: {},
                  captures: ["props$3ag2kasswkjyg$0"],
                },
                () => ({
                  kind: ".",
                  loc: [29, 20, 29, 31],
                  expression: {
                    kind: "id",
                    loc: [29, 20, 29, 25],
                    text: "props",
                    bindingKey: "props$3ag2kasswkjyg$0",
                  },
                  name: "count",
                }),
              ),
            }),
            params: ["props$3ag2kasswkjyg$0"],
          },
        },
        captures: [],
      },
      () => ({
        kind: "=>",
        loc: [28, 24, 30, 5],
        parameters: [
          {
            kind: "param",
            loc: [28, 25, 28, 49],
            name: {
              kind: "id",
              loc: [28, 25, 28, 30],
              text: "props",
              bindingKey: "props$3ag2kasswkjyg$0",
            },
          },
        ],
        body: {
          kind: "splice",
          loc: [28, 54, 30, 5],
          key: "$0splice0",
        },
      }),
    ),
  ),
);
const empty = JSON.stringify(await bundler.run(_jsx(Nothing, {})));
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
  [59, 16, 59, 21],
  {
    version: "0.0.0",
    filePath: "backtick-props.tsx",
    fileHash: "3ag2kasswkjyg",
    splices: {},
    captures: [],
  },
  () => ({
    kind: "number",
    loc: [59, 19, 59, 20],
    value: 1,
  }),
);
