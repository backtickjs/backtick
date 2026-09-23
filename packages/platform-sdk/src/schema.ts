import { Type, type Schema } from "@backtickjs/schema";

/**
 * What every client can do, whatever it draws with.
 *
 * A target's schema says what a browser or a phone or a display offers; this
 * says what all of them do, because the language reaches these names in a
 * script and every client has to answer for them. A target extends this rather
 * than repeating it.
 */
export const schema: Schema = {
  // Where what this comes to is published, which is not where this is: a
  // schema is a declaration and needs nothing, where the declarations it
  // generates are written beside `Client` and `Prop`, which no schema says.
  // See `@backtickjs/platform-sdk`.
  package: "@backtickjs/platform-sdk",

  namespace: "Platform",

  extends: [],

  types: {
    Signal: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface([Type.Ref("ClientHandle")], {
        get: Type.Function([], Type.Ref("T")),
      }),
      {
        description:
          "Storage a script may read but not replace.\n\n" +
          "What a position is in a list is one of these, and so is a cell handed to a component that only displays it: the signature says which way the value travels, and a `State` goes wherever one of these is wanted.",
      },
    ),

    State: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface([Type.Apply(Type.Ref("Signal"), [Type.Ref("T")])], {
        set: Type.Function(
          [Type.FunctionParameter("value", Type.Ref("T"))],
          Type.Void(),
        ),
      }),
      {
        description:
          "A cell as a script reads it.\n\n" +
          "What makes one is not here: `state` is a client function a script imports and splices, so a cell is what calling it answers with. This is the half that reaches the client.\n\n" +
          "`set` stores what it is given, a function included: it never calls it.",
      },
    ),

    SignalOptions: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface([], {
        equals: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter("previous", Type.Ref("T")),
              Type.FunctionParameter("next", Type.Ref("T")),
            ],
            Type.Boolean(),
            {
              description:
                "Whether `next` counts as the same value as `previous`. When it does, whatever reads the signal isn't updated. Compared with `===` when left out.",
            },
          ),
        ),
      }),
      {
        description: "How a signal decides that a new value is a change.",
      },
    ),

    ClientHandle: Type.Interface(
      [],
      {},
      {
        description:
          "Something the client owns, and that nothing here reads into.\n\nA script may hold one and hand it back and nothing else: what it is made of is the client's, and two clients need not agree on that to agree on this. Every opaque type is one — `State` is a handle, and so is anything a client answers with that this format does not describe.",
      },
    ),

    ClientFunction: Type.Function(
      [Type.Rest(Type.FunctionParameter("args", Type.Never()))],
      Type.Ref("ClientUnknown"),
      {
        description:
          "A function a client holds. What it takes is nothing this format describes — a client hands one what it was given — and what it answers with is a client value, or nothing.",
      },
    ),

    ClientUnknown: Type.Union([Type.Ref("ClientValue"), Type.Void()], {
      description:
        "A client value, or nothing. What an action answers with, where every other position takes a value.",
    }),

    ClientValue: Type.Union(
      [
        Type.Null(),
        Type.Undefined(),
        Type.Number(),
        Type.Boolean(),
        Type.String(),
        Type.Record(Type.String(), Type.Ref("ClientValue"), { readOnly: true }),
        Type.Array(Type.Ref("ClientValue"), { readOnly: true }),
        Type.Ref("ClientFunction"),
        Type.Ref("ClientHandle"),
      ],
      {
        description:
          "What may cross between a host and a client: data, a function, or a handle to something the client owns.",
      },
    ),

    Bundle: Type.Generic(
      [Type.GenericParameter("T", Type.Ref("ClientUnknown"))],
      Type.Interface([Type.Ref("ClientHandle")], {
        functions: Type.Record(
          Type.Ref("BundleFunctionLabel"),
          Type.Ref("BundleArrowFunction"),
        ),
        root: Type.Ref("BundleExpression"),
      }),
      {
        description:
          "The bundler's wire format, as plain data — what ships is exactly the JSON of one of these. This is the contract an interpreter implements: evaluate `root` against the `functions` table. Computation ships as ASTs, so nothing here needs a JavaScript parser.\n\nOpaque to a script, which is a different question from what it is made of: a script may hold one and hand it back — to `evaluate`, which evaluates it — and never read into it. What a client keeps behind one is the client's.\n\nWhat it comes to is carried and never read. A client has nothing to check it against; it is what a host writes down so that what a bundle answers with is known where the bundle is handed over.",
      },
    ),

    BundleFunctionLabel: Type.String(),
    BundleElement: Type.Tuple({
      kind: Type.Literal("el"),
      id: Type.String(),
      props: Type.Record(Type.String(), Type.Ref("BundleExpression")),
      children: Type.Ref("BundleExpression"),
    }),
    BundleComponentCall: Type.Tuple(
      {
        kind: Type.Literal("comp"),
        callee: Type.Ref("BundleExpression"),
        props: Type.Record(Type.String(), Type.Ref("BundleExpression")),
        children: Type.Ref("BundleExpression"),
      },
      {
        description:
          "A call of a component a script holds: the function called with one record of its props, each member evaluated when it is read, and `children` among them where the tag holds any. What a component's props are, for a function the bundler never saw.",
      },
    ),
    BundleArrayLiteral: Type.Tuple({
      kind: Type.Literal("arr"),
      members: Type.Array(Type.Ref("BundleArrayElement")),
    }),
    BundleSpreadElement: Type.Tuple({
      kind: Type.Literal("..."),
      expression: Type.Ref("BundleExpression"),
    }),
    BundleUndefined: Type.Tuple({
      kind: Type.Literal("undef"),
    }),
    BundleBuiltin: Type.Tuple({
      kind: Type.Literal("bltn"),
      name: Type.String(),
    }),
    BundleArrayElement: Type.Union([
      Type.Ref("BundleExpression"),
      Type.Ref("BundleSpreadElement"),
    ]),
    BundleExpression: Type.Union([
      Type.Null(),
      Type.Boolean(),
      Type.Number(),
      Type.String(),
      Type.Record(Type.String(), Type.Ref("BundleExpression"), {
        readOnly: true,
      }),
      Type.Ref("BundleUndefined"),
      Type.Ref("BundleArrayLiteral"),
      Type.Ref("BundleIdentifier"),
      Type.Ref("BundleFunctionReference"),
      Type.Ref("BundleElement"),
      Type.Ref("BundleComponentCall"),
      Type.Ref("BundleCall"),
      Type.Ref("BundleOptionalCall"),
      Type.Ref("BundlePropertyAccess"),
      Type.Ref("BundleOptionalPropertyAccess"),
      Type.Ref("BundleElementAccess"),
      Type.Ref("BundleAssignment"),
      Type.Ref("BundleAdditionAssignment"),
      Type.Ref("BundleSubtractionAssignment"),
      Type.Ref("BundleMultiplicationAssignment"),
      Type.Ref("BundleDivisionAssignment"),
      Type.Ref("BundleRemainderAssignment"),
      Type.Ref("BundleLogicalAnd"),
      Type.Ref("BundleLogicalOr"),
      Type.Ref("BundleNullishCoalescing"),
      Type.Ref("BundleAddition"),
      Type.Ref("BundleSubtraction"),
      Type.Ref("BundleMultiplication"),
      Type.Ref("BundleDivision"),
      Type.Ref("BundleRemainder"),
      Type.Ref("BundleStrictEquality"),
      Type.Ref("BundleStrictInequality"),
      Type.Ref("BundleLessThan"),
      Type.Ref("BundleLessThanOrEqual"),
      Type.Ref("BundleGreaterThan"),
      Type.Ref("BundleGreaterThanOrEqual"),
      Type.Ref("BundleLogicalNot"),
      Type.Ref("BundleNegation"),
      Type.Ref("BundleTypeOf"),
      Type.Ref("BundlePrefixIncrement"),
      Type.Ref("BundlePrefixDecrement"),
      Type.Ref("BundlePostfixIncrement"),
      Type.Ref("BundlePostfixDecrement"),
      Type.Ref("BundleConditional"),
      Type.Ref("BundleArrowFunction"),
      Type.Ref("BundleBuiltin"),
    ]),
    BundleStatement: Type.Union([
      Type.Ref("BundleExpression"),
      Type.Ref("BundleBlock"),
      Type.Ref("BundleConstDeclaration"),
      Type.Ref("BundleLetDeclaration"),
      Type.Ref("BundleIf"),
      Type.Ref("BundleWhile"),
      Type.Ref("BundleFor"),
      Type.Ref("BundleBreak"),
      Type.Ref("BundleContinue"),
      Type.Ref("BundleReturn"),
      Type.Ref("BundleThrow"),
      Type.Ref("BundleTry"),
    ]),
    BundleBody: Type.Union([
      Type.Ref("BundleExpression"),
      Type.Ref("BundleBlock"),
    ]),
    BundleIdentifier: Type.Tuple({
      kind: Type.Literal("id"),
      text: Type.String(),
    }),
    BundleFunctionReference: Type.Tuple({
      kind: Type.Literal("fn"),
      label: Type.Ref("BundleFunctionLabel"),
    }),
    BundleCall: Type.Tuple({
      kind: Type.Literal("()"),
      expression: Type.Ref("BundleExpression"),
      args: Type.Array(Type.Ref("BundleArrayElement")),
    }),
    BundleOptionalCall: Type.Tuple({
      kind: Type.Literal("?.()"),
      expression: Type.Ref("BundleExpression"),
      args: Type.Array(Type.Ref("BundleArrayElement")),
    }),
    BundlePropertyAccess: Type.Tuple({
      kind: Type.Literal("."),
      expression: Type.Ref("BundleExpression"),
      name: Type.String(),
    }),
    BundleOptionalPropertyAccess: Type.Tuple({
      kind: Type.Literal("?."),
      expression: Type.Ref("BundleExpression"),
      name: Type.String(),
    }),
    BundleElementAccess: Type.Tuple({
      kind: Type.Literal("[]"),
      expression: Type.Ref("BundleExpression"),
      argumentExpression: Type.Ref("BundleExpression"),
    }),
    BundleAssignment: Type.Tuple({
      kind: Type.Literal("="),
      target: Type.Ref("BundleIdentifier"),
      value: Type.Ref("BundleExpression"),
    }),
    // A compound assignment: `x += y` assigns what `x + y` answers, with `x`
    // read before `y` is evaluated, and answers the value assigned.
    BundleAdditionAssignment: Type.Tuple({
      kind: Type.Literal("+="),
      target: Type.Ref("BundleIdentifier"),
      value: Type.Ref("BundleExpression"),
    }),
    BundleSubtractionAssignment: Type.Tuple({
      kind: Type.Literal("-="),
      target: Type.Ref("BundleIdentifier"),
      value: Type.Ref("BundleExpression"),
    }),
    BundleMultiplicationAssignment: Type.Tuple({
      kind: Type.Literal("*="),
      target: Type.Ref("BundleIdentifier"),
      value: Type.Ref("BundleExpression"),
    }),
    BundleDivisionAssignment: Type.Tuple({
      kind: Type.Literal("/="),
      target: Type.Ref("BundleIdentifier"),
      value: Type.Ref("BundleExpression"),
    }),
    BundleRemainderAssignment: Type.Tuple({
      kind: Type.Literal("%="),
      target: Type.Ref("BundleIdentifier"),
      value: Type.Ref("BundleExpression"),
    }),
    BundleLogicalAnd: Type.Tuple({
      kind: Type.Literal("&&"),
      left: Type.Ref("BundleExpression"),
      right: Type.Ref("BundleExpression"),
    }),
    BundleLogicalOr: Type.Tuple({
      kind: Type.Literal("||"),
      left: Type.Ref("BundleExpression"),
      right: Type.Ref("BundleExpression"),
    }),
    BundleNullishCoalescing: Type.Tuple({
      kind: Type.Literal("??"),
      left: Type.Ref("BundleExpression"),
      right: Type.Ref("BundleExpression"),
    }),
    BundleAddition: Type.Tuple({
      kind: Type.Literal("+"),
      left: Type.Ref("BundleExpression"),
      right: Type.Ref("BundleExpression"),
    }),
    BundleSubtraction: Type.Tuple({
      kind: Type.Literal("-"),
      left: Type.Ref("BundleExpression"),
      right: Type.Ref("BundleExpression"),
    }),
    BundleMultiplication: Type.Tuple({
      kind: Type.Literal("*"),
      left: Type.Ref("BundleExpression"),
      right: Type.Ref("BundleExpression"),
    }),
    BundleDivision: Type.Tuple({
      kind: Type.Literal("/"),
      left: Type.Ref("BundleExpression"),
      right: Type.Ref("BundleExpression"),
    }),
    BundleRemainder: Type.Tuple({
      kind: Type.Literal("%"),
      left: Type.Ref("BundleExpression"),
      right: Type.Ref("BundleExpression"),
    }),
    BundleStrictEquality: Type.Tuple({
      kind: Type.Literal("==="),
      left: Type.Ref("BundleExpression"),
      right: Type.Ref("BundleExpression"),
    }),
    BundleStrictInequality: Type.Tuple({
      kind: Type.Literal("!=="),
      left: Type.Ref("BundleExpression"),
      right: Type.Ref("BundleExpression"),
    }),
    BundleLessThan: Type.Tuple({
      kind: Type.Literal("<"),
      left: Type.Ref("BundleExpression"),
      right: Type.Ref("BundleExpression"),
    }),
    BundleLessThanOrEqual: Type.Tuple({
      kind: Type.Literal("<="),
      left: Type.Ref("BundleExpression"),
      right: Type.Ref("BundleExpression"),
    }),
    BundleGreaterThan: Type.Tuple({
      kind: Type.Literal(">"),
      left: Type.Ref("BundleExpression"),
      right: Type.Ref("BundleExpression"),
    }),
    BundleGreaterThanOrEqual: Type.Tuple({
      kind: Type.Literal(">="),
      left: Type.Ref("BundleExpression"),
      right: Type.Ref("BundleExpression"),
    }),
    BundleLogicalNot: Type.Tuple({
      kind: Type.Literal("!"),
      operand: Type.Ref("BundleExpression"),
    }),
    BundleNegation: Type.Tuple({
      kind: Type.Literal("-x"),
      operand: Type.Ref("BundleExpression"),
    }),
    // The name of the kind of value the operand holds, as JavaScript names it,
    // since TypeScript narrows a script's types by those names:
    //
    //   undefined                     "undefined"
    //   null                          "object"
    //   a boolean                     "boolean"
    //   a number                      "number"
    //   a string                      "string"
    //   an array, an object           "object"
    //   anything a script can call    "function"
    //   any other value a host hands  "object"
    BundleTypeOf: Type.Tuple({
      kind: Type.Literal("typeof"),
      operand: Type.Ref("BundleExpression"),
    }),
    // A variable stepped by one. A prefix step answers the value after the
    // step, and a postfix step the value before it.
    BundlePrefixIncrement: Type.Tuple({
      kind: Type.Literal("++x"),
      target: Type.Ref("BundleIdentifier"),
    }),
    BundlePrefixDecrement: Type.Tuple({
      kind: Type.Literal("--x"),
      target: Type.Ref("BundleIdentifier"),
    }),
    BundlePostfixIncrement: Type.Tuple({
      kind: Type.Literal("x++"),
      target: Type.Ref("BundleIdentifier"),
    }),
    BundlePostfixDecrement: Type.Tuple({
      kind: Type.Literal("x--"),
      target: Type.Ref("BundleIdentifier"),
    }),
    BundleConditional: Type.Tuple({
      kind: Type.Literal("?:"),
      condition: Type.Ref("BundleExpression"),
      whenTrue: Type.Ref("BundleExpression"),
      whenFalse: Type.Ref("BundleExpression"),
    }),
    BundleArrowFunction: Type.Tuple({
      kind: Type.Literal("=>"),
      parameters: Type.Array(Type.Ref("BundleParameter")),
      body: Type.Ref("BundleBody"),
    }),
    BundleBlock: Type.Tuple({
      kind: Type.Literal("{}"),
      statements: Type.Array(Type.Ref("BundleStatement")),
    }),
    BundleConstDeclaration: Type.Tuple({
      kind: Type.Literal("const"),
      name: Type.String(),
      initializer: Type.Ref("BundleExpression"),
    }),
    BundleLetDeclaration: Type.Tuple({
      kind: Type.Literal("let"),
      name: Type.String(),
      initializer: Type.Ref("BundleExpression"),
    }),
    BundleIf: Type.Tuple({
      kind: Type.Literal("if"),
      expression: Type.Ref("BundleExpression"),
      thenStatement: Type.Ref("BundleStatement"),
      elseStatement: Type.Union([Type.Ref("BundleStatement"), Type.Null()]),
    }),
    BundleWhile: Type.Tuple({
      kind: Type.Literal("while"),
      expression: Type.Ref("BundleExpression"),
      statement: Type.Ref("BundleStatement"),
    }),
    BundleFor: Type.Tuple({
      kind: Type.Literal("for"),
      initializer: Type.Union([
        Type.Ref("BundleConstDeclaration"),
        Type.Ref("BundleLetDeclaration"),
        Type.Ref("BundleExpression"),
        Type.Null(),
      ]),
      condition: Type.Union([Type.Ref("BundleExpression"), Type.Null()]),
      incrementor: Type.Union([Type.Ref("BundleExpression"), Type.Null()]),
      statement: Type.Ref("BundleStatement"),
    }),
    BundleBreak: Type.Tuple({
      kind: Type.Literal("break"),
    }),
    BundleContinue: Type.Tuple({
      kind: Type.Literal("continue"),
    }),
    BundleReturn: Type.Tuple({
      kind: Type.Literal("return"),
      expression: Type.Ref("BundleExpression"),
    }),
    BundleThrow: Type.Tuple({
      kind: Type.Literal("throw"),
      expression: Type.Ref("BundleExpression"),
    }),
    BundleTry: Type.Tuple({
      kind: Type.Literal("try"),
      tryBlock: Type.Ref("BundleBlock"),
      catchClause: Type.Ref("BundleCatchClause"),
    }),
    BundleCatchClause: Type.Tuple({
      kind: Type.Literal("catch"),
      variableDeclaration: Type.Union([Type.String(), Type.Null()]),
      block: Type.Ref("BundleBlock"),
    }),
    BundleParameter: Type.Tuple({
      kind: Type.Literal("param"),
      name: Type.String(),
    }),

    ArrayLike: Type.Generic(
      [Type.GenericParameter("T", Type.Ref("ClientValue"))],
      Type.Interface([], {
        length: Type.Number({ readOnly: true }),
        n: Type.Index("n", Type.Number(), Type.Ref("T"), { readOnly: true }),
      }),
    ),
  },

  // The language draws nothing: what a list or an element accepts is a schema
  // built on this one, and this says only what a script reaches whether
  // anything is drawn or not.
  elements: {},

  // What the framework answers for beside the ECMAScript globals, which a
  // script reads off the client's own global.
  builtins: {
    state: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Function(
        [
          Type.FunctionParameter("initial", Type.Ref("T"), {
            description: "The value it holds until the first `set`.",
          }),
          Type.Optional(
            Type.FunctionParameter(
              "options",
              Type.Apply(Type.Ref("SignalOptions"), [Type.Ref("T")]),
            ),
          ),
        ],
        Type.Apply(Type.Ref("State"), [Type.Ref("T")]),
      ),
      {
        description:
          "Creates a `State`, a `Signal` a script can both `get` and `set`, and the foundation of Backtick's reactivity. Whatever reads it with `get` follows it — a prop, a child, a `computed` — and a `set` runs those readers again and nothing else. Reading is cheap and setting does the work, so a state suits values read often and set less often.\n\n" +
          "Created while a script draws, it lasts as long as that drawing.",
      },
    ),
    computed: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Function(
        [
          Type.FunctionParameter("fn", Type.Function([], Type.Ref("T")), {
            description: "Calculates the value from the signals it reads.",
          }),
          Type.Optional(
            Type.FunctionParameter(
              "options",
              Type.Apply(Type.Ref("SignalOptions"), [Type.Ref("T")]),
            ),
          ),
        ],
        Type.Apply(Type.Ref("Signal"), [Type.Ref("T")]),
      ),
      {
        description:
          "Creates a read-only `Signal` that derives its value from other signals. The calculated value is memoized: `fn` runs when the computed is created and again only when a signal it read changes, and every `get` reuses the result. If the new result equals the previous one (`===`, or `options.equals`), the computed doesn't update whatever reads it.\n\n" +
          "Created while a script draws, it lasts as long as that drawing.",
      },
    ),
    evaluate: Type.Generic(
      [Type.GenericParameter("T", Type.Ref("ClientUnknown"))],
      Type.Function(
        [
          Type.FunctionParameter(
            "bundle",
            Type.Apply(Type.Ref("Bundle"), [Type.Ref("T")]),
            {
              description:
                "A script that fetched the text writes `JSON.parse(text) as Bundle<BacktickElement>`, which is what an assertion is for.",
            },
          ),
        ],
        Type.Ref("T"),
      ),
      {
        description:
          "What a bundle holds: its `root` evaluated against its `functions`, here. A bundle is data — a program a client runs — and running one reads no JavaScript.\n\n" +
          "Each call evaluates it again, so two calls are two drawings with cells of their own. Evaluated untracked, as a component is run: what the bundle reads while its root is evaluated is read once, so a write to it evaluates nothing again. A caller that reads a cell to choose the bundle still follows that cell.",
      },
    ),
  },
};
