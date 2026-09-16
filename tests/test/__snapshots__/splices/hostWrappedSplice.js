import { cs } from "@backtickjs/core";
// Splices that arrive through host code — the case a hole can never be resolved
// from source, because what the compiler sees at the hole is a call expression
// and not a template.
//
// Two shapes, and the second is the one that matters. `foo` builds a new script,
// written at its own location outside the enclosing one, so nothing about it
// looks lexical. `same` hands back the template it was given: the script that
// lands at the hole *is* written inside the enclosing script's span, and still
// can't be read off that span, because only running `same` says it goes there.
// Anything that resolves a hole by comparing spans gets this one wrong.
function wrap(start) {
  return cs.create(
    [14, 10, 20, 5],
    {
      version: "0.0.0",
      filePath: "hostWrappedSplice.tsx",
      fileHash: "35km2ev2ik2j8",
      splices: {
        $start: { value: start, params: [] },
        $0splice0: {
          value: foo(
            cs.create(
              [16, 18, 19, 7],
              {
                version: "0.0.0",
                filePath: "hostWrappedSplice.tsx",
                fileHash: "35km2ev2ik2j8",
                splices: {
                  $0splice0: {
                    value: same(
                      cs.create(
                        [18, 30, 18, 39],
                        {
                          version: "0.0.0",
                          filePath: "hostWrappedSplice.tsx",
                          fileHash: "35km2ev2ik2j8",
                          splices: {},
                          captures: ["outer$35km2ev2ik2j8$0"],
                        },
                        () => ({
                          kind: "id",
                          loc: [18, 33, 18, 38],
                          text: "outer",
                          bindingKey: "outer$35km2ev2ik2j8$0",
                        }),
                      ),
                    ),
                    params: [],
                  },
                },
                captures: ["outer$35km2ev2ik2j8$0"],
              },
              () => ({
                kind: "{}",
                loc: [16, 21, 19, 6],
                statements: [
                  {
                    kind: "const",
                    loc: [17, 7, 17, 25],
                    name: {
                      kind: "id",
                      loc: [17, 13, 17, 19],
                      text: "middle",
                      bindingKey: "middle$35km2ev2ik2j8$1",
                    },
                    initializer: {
                      kind: "number",
                      loc: [17, 22, 17, 24],
                      value: 10,
                    },
                  },
                  {
                    kind: "return",
                    loc: [18, 7, 18, 42],
                    expression: {
                      kind: "binop",
                      loc: [18, 14, 18, 41],
                      left: {
                        kind: "id",
                        loc: [18, 14, 18, 20],
                        text: "middle",
                        bindingKey: "middle$35km2ev2ik2j8$1",
                      },
                      operatorToken: "+",
                      right: {
                        kind: "splice",
                        loc: [18, 23, 18, 41],
                        key: "$0splice0",
                      },
                    },
                  },
                ],
              }),
            ),
          ),
          params: ["outer$35km2ev2ik2j8$0"],
        },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [14, 13, 20, 4],
      statements: [
        {
          kind: "const",
          loc: [15, 5, 15, 26],
          name: {
            kind: "id",
            loc: [15, 11, 15, 16],
            text: "outer",
            bindingKey: "outer$35km2ev2ik2j8$0",
          },
          initializer: {
            kind: "splice",
            loc: [15, 19, 15, 25],
            key: "$start",
          },
        },
        {
          kind: "return",
          loc: [16, 5, 19, 10],
          expression: {
            kind: "splice",
            loc: [16, 12, 19, 9],
            key: "$0splice0",
          },
        },
      ],
    }),
  );
}
function foo(start) {
  return cs.create(
    [24, 10, 24, 24],
    {
      version: "0.0.0",
      filePath: "hostWrappedSplice.tsx",
      fileHash: "35km2ev2ik2j8",
      splices: { $start: { value: start, params: [] } },
      captures: [],
    },
    () => ({
      kind: "binop",
      loc: [24, 13, 24, 23],
      left: {
        kind: "splice",
        loc: [24, 13, 24, 19],
        key: "$start",
      },
      operatorToken: "+",
      right: {
        kind: "number",
        loc: [24, 22, 24, 23],
        value: 1,
      },
    }),
  );
}
function same(script) {
  return script;
}
const hostWrappedSplice = cs.create(
  [31, 27, 31, 62],
  {
    version: "0.0.0",
    filePath: "hostWrappedSplice.tsx",
    fileHash: "35km2ev2ik2j8",
    splices: {
      $0splice0: {
        value: wrap(
          cs.create(
            [31, 37, 31, 42],
            {
              version: "0.0.0",
              filePath: "hostWrappedSplice.tsx",
              fileHash: "35km2ev2ik2j8",
              splices: {},
              captures: [],
            },
            () => ({
              kind: "number",
              loc: [31, 40, 31, 41],
              value: 1,
            }),
          ),
        ),
        params: [],
      },
      $0splice1: {
        value: wrap(
          cs.create(
            [31, 54, 31, 59],
            {
              version: "0.0.0",
              filePath: "hostWrappedSplice.tsx",
              fileHash: "35km2ev2ik2j8",
              splices: {},
              captures: [],
            },
            () => ({
              kind: "number",
              loc: [31, 57, 31, 58],
              value: 2,
            }),
          ),
        ),
        params: [],
      },
    },
    captures: [],
  },
  () => ({
    kind: "binop",
    loc: [31, 30, 31, 61],
    left: {
      kind: "splice",
      loc: [31, 30, 31, 44],
      key: "$0splice0",
    },
    operatorToken: "+",
    right: {
      kind: "splice",
      loc: [31, 47, 31, 61],
      key: "$0splice1",
    },
  }),
);
