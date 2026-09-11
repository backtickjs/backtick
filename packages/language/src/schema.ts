import { Type, type Schema } from "@backtickjs/schema";

/**
 * What every client can do, whatever it draws with.
 *
 * A target's schema says what a browser or a phone or a display offers; this
 * says what all of them do, because the language reaches these names in a
 * script and every client has to answer for them. A target extends this rather
 * than repeating it.
 *
 * A name is written whole — `Math.floor`, not a `Math` holding a `floor` —
 * because that is how a script reaches it and how the compiler recognises it.
 */
export const schema: Schema = {
  // Where what this comes to is published, which is not where this is: a
  // schema is a declaration and needs nothing, where the declarations it
  // generates are written beside `Client` and `Prop`, which no schema says.
  // See `@backtickjs/language`.
  package: "@backtickjs/language",

  namespace: "Language",

  extends: [],

  types: {
    ReadonlyState: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface([Type.Ref("ClientHandle")], {
        read: Type.Function([], Type.Ref("T")),
      }),
      {
        description:
          "Storage a script may read but not replace.\n\n" +
          "What a position is in a list is one of these, and so is a cell handed to a component that only displays it: the signature says which way the value travels, and a `State` goes wherever one of these is wanted.",
      },
    ),

    State: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface([Type.Apply(Type.Ref("ReadonlyState"), [Type.Ref("T")])], {
        write: Type.Function(
          [Type.FunctionParameter("value", Type.Ref("T"))],
          Type.Void(),
        ),
        update: Type.Function(
          [
            Type.FunctionParameter(
              "updater",
              Type.Function(
                [Type.FunctionParameter("value", Type.Ref("T"))],
                Type.Ref("T"),
              ),
            ),
          ],
          Type.Void(),
        ),
      }),
      {
        description:
          "A cell as a script reads it.\n\n" +
          "What makes one is not here: `state` is a client function a script imports and splices, so a cell is what calling it answers with. This is the half that reaches the client.",
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
          "What may cross between a host and a client: data, a function, or a handle to something the client owns.\n\n`null` is what a script writes for nothing and `undefined` is what a total read answers with where there is none — an index past the end, a member a value does not hold. Neither can be spliced: `null` is what crosses.",
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
          "The bundler's wire format, as plain data — what ships is exactly the JSON of one of these. This is the contract an interpreter implements: evaluate `root` against the `functions` table. Computation ships as ASTs, so nothing here needs a JavaScript parser.\n\nOpaque to a script, which is a different question from what it is made of: a script may hold one and hand it back — to `<backtick>`, which draws it — and never read into it. What a client keeps behind one is the client's.\n\nWhat it comes to is carried and never read. A client has nothing to check it against; it is what a host writes down so that what a bundle answers with is known where the bundle is handed over.",
      },
    ),

    BundleFunctionLabel: Type.String(),
    BundleElement: Type.Tuple({
      kind: Type.Literal("el"),
      id: Type.String(),
      props: Type.Record(Type.String(), Type.Ref("BundleExpression")),
      children: Type.Ref("BundleExpression"),
    }),
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
    BundleObjectLiteral: Type.Tuple({
      kind: Type.Literal("obj"),
      entries: Type.Array(Type.Ref("BundleObjectEntry")),
    }),
    BundlePropertyAssignment: Type.Tuple({
      kind: Type.Literal(":"),
      name: Type.String(),
      value: Type.Ref("BundleExpression"),
    }),
    BundleObjectEntry: Type.Union([
      Type.Ref("BundlePropertyAssignment"),
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
      Type.Ref("BundleCall"),
      Type.Ref("BundleOptionalCall"),
      Type.Ref("BundlePropertyAccess"),
      Type.Ref("BundleOptionalPropertyAccess"),
      Type.Ref("BundleElementAccess"),
      Type.Ref("BundleAssignment"),
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
      Type.Ref("BundleConditional"),
      Type.Ref("BundleArrowFunction"),
      Type.Ref("BundleObjectLiteral"),
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

    HttpConfig: Type.Object(
      {
        headers: Type.Optional(Type.Record(Type.String(), Type.String())),
        params: Type.Optional(
          Type.Record(Type.String(), Type.String(), {
            description:
              "Added to the URL's query, in order. Each key and value is percent-encoded as UTF-8, everything but `A-Z a-z 0-9 - _ . ! ~ * ' ( )`.",
          }),
        ),
        timeout: Type.Optional(
          Type.Number({
            description:
              "How long to wait before failing, in milliseconds. Where omitted, as long as the client waits.",
          }),
        ),
      },
      { description: "How to make an `http` request." },
    ),

    HttpResponse: Type.Object(
      {
        status: Type.Number({ readOnly: true }),
        data: Type.String({
          readOnly: true,
          description:
            "The body, decoded as UTF-8: invalid bytes become U+FFFD and a leading byte order mark is dropped. A script reads JSON with `JSON.parse`.",
        }),
      },
      { description: "What answered, body and all." },
    ),

    Vm: Type.Interface(
      [Type.Ref("ClientHandle")],
      {
        eval: Type.Generic(
          [Type.GenericParameter("T", Type.Ref("ClientUnknown"))],
          Type.Function(
            [
              Type.FunctionParameter(
                "bundle",
                Type.Apply(Type.Ref("Bundle"), [Type.Ref("T")]),
              ),
            ],
            Type.Ref("T"),
          ),
          {
            description:
              "What a bundle holds: its `root` evaluated against its `functions`, here.\n\n" +
              "Each call evaluates it again, so two calls are two drawings with cells of their own.",
          },
        ),
      },
      {
        description:
          "The machine a client runs bundles on. A bundle is data — a program for this — and nothing here reads JavaScript.",
      },
    ),

    Http: Type.Interface(
      [Type.Ref("ClientHandle")],
      {
        get: Type.Function(
          [
            Type.FunctionParameter("url", Type.String()),
            Type.FunctionParameter(
              "onResponse",
              Type.Function(
                [Type.FunctionParameter("response", Type.Ref("HttpResponse"))],
                Type.Void(),
              ),
            ),
            Type.FunctionParameter(
              "onFailure",
              Type.Function(
                [Type.FunctionParameter("message", Type.String())],
                Type.Void(),
              ),
              {
                description:
                  "Called with why nothing answered, or with the string `onResponse` threw.",
              },
            ),
            Type.Optional(
              Type.FunctionParameter("config", Type.Ref("HttpConfig")),
            ),
          ],
          Type.Void(),
          { description: "Asks for what is at `url`." },
        ),
        post: Type.Function(
          [
            Type.FunctionParameter("url", Type.String()),
            Type.FunctionParameter("data", Type.String(), {
              description:
                "Sent as it is, encoded as UTF-8. A script sends JSON with `JSON.stringify` and a `content-type` header.",
            }),
            Type.FunctionParameter(
              "onResponse",
              Type.Function(
                [Type.FunctionParameter("response", Type.Ref("HttpResponse"))],
                Type.Void(),
              ),
            ),
            Type.FunctionParameter(
              "onFailure",
              Type.Function(
                [Type.FunctionParameter("message", Type.String())],
                Type.Void(),
              ),
              {
                description:
                  "Called with why nothing answered, or with the string `onResponse` threw.",
              },
            ),
            Type.Optional(
              Type.FunctionParameter("config", Type.Ref("HttpConfig")),
            ),
          ],
          Type.Void(),
          { description: "Sends `data` to `url`." },
        ),
      },
      {
        description:
          "Requests the way axios makes them, answering through handlers because a script has no `await`.\n\n" +
          "`onResponse` is called with every answer, whatever its status, and a throw from it is handed to `onFailure` — so a script fails on a status by throwing. `onFailure` is also called where nothing answered. Neither is called before the call returns, or more than once.\n\n" +
          "Redirects are followed, and the body is read before either handler is called.",
      },
    ),

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

  /**
   * Every name a script reaches, written whole, with a member of a value
   * keyed as the client answers for it: `string.charAt(self, pos)`.
   *
   * The prefix is written as the thing it stands for is: `string.indexOf` is a
   * member of a string, where `Array.from` is a name of its own. Keeping the
   * two apart is what one namespace is for — a prefix meaning both a kind of
   * value and a place to hang statics is a name that means two things.
   *
   * The receiver is written down because this document is read by clients that
   * have no `this` — a member of a value is a call the value is handed to, and
   * saying so is the schema's job rather than a host's convention. A member
   * holding a value takes nothing: `string.length` is a number, and the prefix
   * already says which value it is read off.
   *
   * Nothing is written under `[]`. An index signature is reached by the
   * operator rather than by a name, and what a client does with it is the
   * language's own rule rather than a member it looks up — so there is no name
   * here and nothing for a client to answer.
   */
  builtins: {
    "boolean.valueOf": Type.Function(
      [
        Type.FunctionParameter("self", Type.Boolean(), {
          description: "The value the member is reached off.",
        }),
      ],
      Type.Boolean(),
      { description: "Returns the primitive value of the specified object." },
    ),
    "number.toString": Type.Function(
      [
        Type.FunctionParameter("self", Type.Number(), {
          description: "The value the member is reached off.",
        }),
        Type.Optional(
          Type.FunctionParameter("radix", Type.Number(), {
            description:
              "Specifies a radix for converting numeric values to strings. This value is only used for numbers.",
          }),
        ),
      ],
      Type.String(),
      { description: "Returns a string representation of an object." },
    ),
    "number.toFixed": Type.Function(
      [
        Type.FunctionParameter("self", Type.Number(), {
          description: "The value the member is reached off.",
        }),
        Type.Optional(
          Type.FunctionParameter("fractionDigits", Type.Number(), {
            description:
              "Number of digits after the decimal point. Must be in the range 0 - 20, inclusive.",
          }),
        ),
      ],
      Type.String(),
      {
        description:
          "Returns a string representing a number in fixed-point notation.",
      },
    ),
    "number.toExponential": Type.Function(
      [
        Type.FunctionParameter("self", Type.Number(), {
          description: "The value the member is reached off.",
        }),
        Type.Optional(
          Type.FunctionParameter("fractionDigits", Type.Number(), {
            description:
              "Number of digits after the decimal point. Must be in the range 0 - 20, inclusive.",
          }),
        ),
      ],
      Type.String(),
      {
        description:
          "Returns a string containing a number represented in exponential notation.",
      },
    ),
    "number.toPrecision": Type.Function(
      [
        Type.FunctionParameter("self", Type.Number(), {
          description: "The value the member is reached off.",
        }),
        Type.Optional(
          Type.FunctionParameter("precision", Type.Number(), {
            description:
              "Number of significant digits. Must be in the range 1 - 21, inclusive.",
          }),
        ),
      ],
      Type.String(),
      {
        description:
          "Returns a string containing a number represented either in exponential or fixed-point notation with a specified number of digits.",
      },
    ),
    "number.valueOf": Type.Function(
      [
        Type.FunctionParameter("self", Type.Number(), {
          description: "The value the member is reached off.",
        }),
      ],
      Type.Number(),
      { description: "Returns the primitive value of the specified object." },
    ),
    "string.toString": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
      ],
      Type.String(),
      { description: "Returns a string representation of a string." },
    ),
    "string.charAt": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
        Type.FunctionParameter("pos", Type.Number(), {
          description: "The zero-based index of the desired character.",
        }),
      ],
      Type.String(),
      { description: "Returns the character at the specified index." },
    ),
    "string.charCodeAt": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
        Type.FunctionParameter("index", Type.Number(), {
          description:
            "The zero-based index of the desired character. If there is no character at the specified index, NaN is returned.",
        }),
      ],
      Type.Number(),
      {
        description:
          "Returns the Unicode value of the character at the specified location.",
      },
    ),
    "string.concat": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
        Type.Rest(
          Type.FunctionParameter("strings", Type.String(), {
            description: "The strings to append to the end of the string.",
          }),
        ),
      ],
      Type.String(),
      {
        description:
          "Returns a string that contains the concatenation of two or more strings.",
      },
    ),
    "string.indexOf": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
        Type.FunctionParameter("searchString", Type.String(), {
          description: "The substring to search for in the string",
        }),
        Type.Optional(
          Type.FunctionParameter("position", Type.Number(), {
            description:
              "The index at which to begin searching the String object. If omitted, search starts at the beginning of the string.",
          }),
        ),
      ],
      Type.Number(),
      {
        description:
          "Returns the position of the first occurrence of a substring, or -1 if it is not present.",
      },
    ),
    "string.lastIndexOf": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
        Type.FunctionParameter("searchString", Type.String(), {
          description: "The substring to search for.",
        }),
        Type.Optional(
          Type.FunctionParameter("position", Type.Number(), {
            description:
              "The index at which to begin searching. If omitted, the search begins at the end of the string.",
          }),
        ),
      ],
      Type.Number(),
      {
        description:
          "Returns the last occurrence of a substring in the string, or -1 if it is not present.",
      },
    ),
    "string.localeCompare": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
        Type.FunctionParameter("that", Type.String(), {
          description: "String to compare to target string",
        }),
      ],
      Type.Number(),
      {
        description:
          "Determines whether two strings are equivalent in the current locale.",
      },
    ),
    "string.replace": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
        Type.FunctionParameter("searchValue", Type.String(), {
          description: "A string to search for.",
        }),
        Type.FunctionParameter(
          "replaceValue",
          Type.Union([
            Type.String(),
            Type.Function(
              [
                Type.FunctionParameter("substring", Type.String()),
                Type.FunctionParameter("offset", Type.Number()),
                Type.FunctionParameter("string", Type.String()),
              ],
              Type.String(),
            ),
          ]),
          {
            description:
              "The text to replace it with, or a function answering with that text. Only the first match of `searchValue` is replaced.",
          },
        ),
      ],
      Type.String(),
      { description: "Replaces text in a string, using a search string." },
    ),
    "string.slice": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
        Type.Optional(
          Type.FunctionParameter("start", Type.Number(), {
            description:
              "The index to the beginning of the specified portion of stringObj.",
          }),
        ),
        Type.Optional(
          Type.FunctionParameter("end", Type.Number(), {
            description:
              "The index to the end of the specified portion of stringObj. The substring includes the characters up to, but not including, the character indicated by end. If this value is not specified, the substring continues to the end of stringObj.",
          }),
        ),
      ],
      Type.String(),
      { description: "Returns a section of a string." },
    ),
    "string.split": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
        Type.FunctionParameter("separator", Type.String(), {
          description:
            "A string that identifies character or characters to use in separating the string. If omitted, a single-element array containing the entire string is returned.",
        }),
        Type.Optional(
          Type.FunctionParameter("limit", Type.Number(), {
            description:
              "A value used to limit the number of elements returned in the array.",
          }),
        ),
      ],
      Type.Array(Type.String()),
      {
        description:
          "Split a string into substrings using the specified separator and return them as an array.",
      },
    ),
    "string.substring": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
        Type.FunctionParameter("start", Type.Number(), {
          description:
            "The zero-based index number indicating the beginning of the substring.",
        }),
        Type.Optional(
          Type.FunctionParameter("end", Type.Number(), {
            description:
              "Zero-based index number indicating the end of the substring. The substring includes the characters up to, but not including, the character indicated by end. If end is omitted, the characters from start through the end of the original string are returned.",
          }),
        ),
      ],
      Type.String(),
      {
        description:
          "Returns the substring at the specified location within a String object.",
      },
    ),
    "string.toLowerCase": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
      ],
      Type.String(),
      {
        description:
          "Converts all the alphabetic characters in a string to lowercase.",
      },
    ),
    "string.toLocaleLowerCase": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
        Type.Optional(
          Type.FunctionParameter(
            "locales",
            Type.Union([Type.String(), Type.Array(Type.String())]),
          ),
        ),
      ],
      Type.String(),
      {
        description:
          "Converts all alphabetic characters to lowercase, taking into account the host environment's current locale.",
      },
    ),
    "string.toUpperCase": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
      ],
      Type.String(),
      {
        description:
          "Converts all the alphabetic characters in a string to uppercase.",
      },
    ),
    "string.toLocaleUpperCase": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
        Type.Optional(
          Type.FunctionParameter(
            "locales",
            Type.Union([Type.String(), Type.Array(Type.String())]),
          ),
        ),
      ],
      Type.String(),
      {
        description:
          "Returns a string where all alphabetic characters have been converted to uppercase, taking into account the host environment's current locale.",
      },
    ),
    "string.trim": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
      ],
      Type.String(),
      {
        description:
          "Removes the leading and trailing white space and line terminator characters from a string.",
      },
    ),
    "string.length": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
      ],
      Type.Number(),
      {
        getter: true,
        description: "Returns the length of a String object.",
      },
    ),
    "string.valueOf": Type.Function(
      [
        Type.FunctionParameter("self", Type.String(), {
          description: "The value the member is reached off.",
        }),
      ],
      Type.String(),
      { description: "Returns the primitive value of the specified object." },
    ),
    "array.length": Type.Generic(
      [Type.GenericParameter("T")],
      Type.Function(
        [
          Type.FunctionParameter("self", Type.Array(Type.Ref("T")), {
            description: "The value the member is reached off.",
          }),
        ],
        Type.Number(),
        { getter: true },
      ),
      {
        description:
          "Gets the length of the array. This is a number one higher than the highest index in the array.",
      },
    ),
    "array.concat": Type.Generic(
      [Type.GenericParameter("T")],
      Type.Function(
        [
          Type.FunctionParameter("self", Type.Array(Type.Ref("T")), {
            description: "The value the member is reached off.",
          }),
          Type.Rest(
            Type.FunctionParameter(
              "items",
              Type.Union([
                Type.Ref("T"),
                Type.Array(Type.Ref("T"), { readOnly: true }),
              ]),
              {
                description:
                  "Additional arrays and/or items to add to the end of the array.",
              },
            ),
          ),
        ],
        Type.Array(Type.Ref("T")),
      ),
      {
        description:
          "Combines two or more arrays. This method returns a new array without modifying any existing arrays.",
      },
    ),
    "array.join": Type.Generic(
      [Type.GenericParameter("T")],
      Type.Function(
        [
          Type.FunctionParameter("self", Type.Array(Type.Ref("T")), {
            description: "The value the member is reached off.",
          }),
          Type.Optional(
            Type.FunctionParameter("separator", Type.String(), {
              description:
                "A string used to separate one element of the array from the next in the resulting string. If omitted, the array elements are separated with a comma.",
            }),
          ),
        ],
        Type.String(),
      ),
      {
        description:
          "Adds all the elements of an array into a string, separated by the specified separator string.",
      },
    ),
    "array.slice": Type.Generic(
      [Type.GenericParameter("T")],
      Type.Function(
        [
          Type.FunctionParameter("self", Type.Array(Type.Ref("T")), {
            description: "The value the member is reached off.",
          }),
          Type.Optional(
            Type.FunctionParameter("start", Type.Number(), {
              description:
                "The beginning index of the specified portion of the array. If start is undefined, then the slice begins at index 0.",
            }),
          ),
          Type.Optional(
            Type.FunctionParameter("end", Type.Number(), {
              description:
                "The end index of the specified portion of the array. This is exclusive of the element at the index 'end'. If end is undefined, then the slice extends to the end of the array.",
            }),
          ),
        ],
        Type.Array(Type.Ref("T")),
      ),
      { description: "Returns a copy of a section of an array." },
    ),
    "array.indexOf": Type.Generic(
      [Type.GenericParameter("T")],
      Type.Function(
        [
          Type.FunctionParameter("self", Type.Array(Type.Ref("T")), {
            description: "The value the member is reached off.",
          }),
          Type.FunctionParameter("searchElement", Type.Ref("T"), {
            description: "The value to locate in the array.",
          }),
          Type.Optional(
            Type.FunctionParameter("fromIndex", Type.Number(), {
              description:
                "The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.",
            }),
          ),
        ],
        Type.Number(),
      ),
      {
        description:
          "Returns the index of the first occurrence of a value in an array, or -1 if it is not present.",
      },
    ),
    "array.includes": Type.Generic(
      [Type.GenericParameter("T")],
      Type.Function(
        [
          Type.FunctionParameter("self", Type.Array(Type.Ref("T")), {
            description: "The value the member is reached off.",
          }),
          Type.FunctionParameter("searchElement", Type.Ref("T"), {
            description: "The element to search for.",
          }),
          Type.Optional(
            Type.FunctionParameter("fromIndex", Type.Number(), {
              description:
                "The position in this array at which to begin searching for searchElement.",
            }),
          ),
        ],
        Type.Boolean(),
      ),
      {
        description:
          "Determines whether an array includes a certain element, returning true or false as appropriate.",
      },
    ),
    "array.map": Type.Generic(
      [Type.GenericParameter("T"), Type.GenericParameter("U")],
      Type.Function(
        [
          Type.FunctionParameter("self", Type.Array(Type.Ref("T")), {
            description: "The value the member is reached off.",
          }),
          Type.FunctionParameter(
            "callbackfn",
            Type.Function(
              [
                Type.FunctionParameter("value", Type.Ref("T")),
                Type.FunctionParameter("index", Type.Number()),
              ],
              Type.Ref("U"),
            ),
            {
              description:
                "A function that accepts up to two arguments. The map method calls the callbackfn function one time for each element in the array.",
            },
          ),
        ],
        Type.Array(Type.Ref("U")),
      ),
      {
        description:
          "Calls a defined callback function on each element of an array, and returns an array that contains the results.",
      },
    ),
    "array.reduce": Type.Generic(
      [Type.GenericParameter("T"), Type.GenericParameter("U")],
      Type.Function(
        [
          Type.FunctionParameter("self", Type.Array(Type.Ref("T")), {
            description: "The value the member is reached off.",
          }),
          Type.FunctionParameter(
            "callbackfn",
            Type.Function(
              [
                Type.FunctionParameter("previousValue", Type.Ref("U")),
                Type.FunctionParameter("currentValue", Type.Ref("T")),
                Type.FunctionParameter("currentIndex", Type.Number()),
              ],
              Type.Ref("U"),
            ),
            {
              description:
                "A function that accepts up to three arguments. The reduce method calls the callbackfn function one time for each element in the array.",
            },
          ),
          Type.FunctionParameter("initialValue", Type.Ref("U"), {
            description:
              "It is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.",
          }),
        ],
        Type.Ref("U"),
      ),
      {
        description:
          "Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.\n\nThe initial value is required, where the standard library makes it optional: without one the first call is handed an element rather than an accumulator, and an empty array has nothing to hand it and throws. Both are rules a host would have to reproduce exactly to agree, and naming the starting value is the same work.",
      },
    ),
    "array.filter": Type.Generic(
      [Type.GenericParameter("T")],
      Type.Function(
        [
          Type.FunctionParameter("self", Type.Array(Type.Ref("T")), {
            description: "The value the member is reached off.",
          }),
          Type.FunctionParameter(
            "predicate",
            Type.Function(
              [
                Type.FunctionParameter("value", Type.Ref("T")),
                Type.FunctionParameter("index", Type.Number()),
              ],
              Type.Boolean(),
            ),
            {
              description:
                "A function that accepts up to two arguments. The filter method calls the predicate function one time for each element in the array.",
            },
          ),
        ],
        Type.Array(Type.Ref("T")),
      ),
      {
        description:
          "Returns the elements of an array that meet the condition specified in a callback function.",
      },
    ),
    "array.with": Type.Generic(
      [Type.GenericParameter("T")],
      Type.Function(
        [
          Type.FunctionParameter("self", Type.Array(Type.Ref("T")), {
            description: "The value the member is reached off.",
          }),
          Type.FunctionParameter("index", Type.Number(), {
            description:
              "The index of the value to overwrite. If the index is negative, then it replaces from the end of the array.",
          }),
          Type.FunctionParameter("value", Type.Ref("T"), {
            description: "The value to write into the copied array.",
          }),
        ],
        Type.Array(Type.Ref("T")),
      ),
      {
        description:
          "Copies an array, then overwrites the value at the provided index with the\ngiven value. If the index is negative, then it replaces from the end\nof the array.",
      },
    ),
    "array.toSorted": Type.Generic(
      [Type.GenericParameter("T")],
      Type.Function(
        [
          Type.FunctionParameter("self", Type.Array(Type.Ref("T")), {
            description: "The value the member is reached off.",
          }),
          Type.FunctionParameter(
            "compareFn",
            Type.Function(
              [
                Type.FunctionParameter("a", Type.Ref("T")),
                Type.FunctionParameter("b", Type.Ref("T")),
              ],
              Type.Number(),
            ),
            {
              description:
                "Function used to determine the order of the elements. It is expected to return a negative value if the first argument is less than the second argument, zero if they're equal, and a positive value otherwise.",
            },
          ),
        ],
        Type.Array(Type.Ref("T")),
      ),
      {
        description:
          "Returns a copy of an array with its elements sorted.\n\nThe comparator is required, where the standard library makes it optional:\nsorting without one compares the elements as strings, which is a rule of\nJavaScript's rather than of this language, and every other host would have\nto reproduce it to agree. Saying how to order two elements is the same\nwork and it ports.",
      },
    ),
    "array.toReversed": Type.Generic(
      [Type.GenericParameter("T")],
      Type.Function(
        [
          Type.FunctionParameter("self", Type.Array(Type.Ref("T")), {
            description: "The value the member is reached off.",
          }),
        ],
        Type.Array(Type.Ref("T")),
      ),
      {
        description:
          "Returns a copy of an array with its elements in reverse order.",
      },
    ),
    "array.toSpliced": Type.Generic(
      [Type.GenericParameter("T")],
      Type.Function(
        [
          Type.FunctionParameter("self", Type.Array(Type.Ref("T")), {
            description: "The value the member is reached off.",
          }),
          Type.FunctionParameter("start", Type.Number(), {
            description:
              "The zero-based location in the array from which to start removing elements.",
          }),
          Type.FunctionParameter("deleteCount", Type.Number(), {
            description: "The number of elements to remove.",
          }),
          Type.Rest(
            Type.FunctionParameter("items", Type.Ref("T"), {
              description:
                "Elements to insert into the copied array in place of the deleted elements.",
            }),
          ),
        ],
        Type.Array(Type.Ref("T")),
      ),
      {
        description:
          "Copies an array and removes elements while, if necessary, inserting new elements in their place, returning the remaining elements.",
      },
    ),
    "JSON.parse": Type.Function(
      [
        Type.FunctionParameter("text", Type.String(), {
          description: "A valid JSON string.",
        }),
      ],
      Type.Any(),
      {
        description:
          "Converts a JSON string into the value it describes. Throws if the" +
          " text is not JSON.",
      },
    ),
    "JSON.stringify": Type.Function(
      [
        Type.FunctionParameter("value", Type.Ref("ClientValue"), {
          description: "A value to convert.",
        }),
      ],
      Type.String(),
      {
        description: "Converts a value to the JSON string that describes it.",
      },
    ),
    "Math.E": Type.Number({
      description:
        "The mathematical constant e. This is Euler's number, the base of natural logarithms.",
    }),
    "Math.LN10": Type.Number({
      description: "The natural logarithm of 10.",
    }),
    "Math.LN2": Type.Number({
      description: "The natural logarithm of 2.",
    }),
    "Math.LOG2E": Type.Number({
      description: "The base-2 logarithm of e.",
    }),
    "Math.LOG10E": Type.Number({
      description: "The base-10 logarithm of e.",
    }),
    "Math.PI": Type.Number({
      description:
        "Pi. This is the ratio of the circumference of a circle to its diameter.",
    }),
    "Math.SQRT1_2": Type.Number({
      description:
        "The square root of 0.5, or, equivalently, one divided by the square root of 2.",
    }),
    "Math.SQRT2": Type.Number({
      description: "The square root of 2.",
    }),
    "Math.abs": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description:
            "A numeric expression for which the absolute value is needed.",
        }),
      ],
      Type.Number(),
      {
        description:
          "Returns the absolute value of a number (the value without regard to whether it is positive or negative).\nFor example, the absolute value of -5 is the same as the absolute value of 5.",
      },
    ),
    "Math.acos": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "A numeric expression.",
        }),
      ],
      Type.Number(),
      {
        description: "Returns the arc cosine (or inverse cosine) of a number.",
      },
    ),
    "Math.asin": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "A numeric expression.",
        }),
      ],
      Type.Number(),
      { description: "Returns the arcsine of a number." },
    ),
    "Math.atan": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description:
            "A numeric expression for which the arctangent is needed.",
        }),
      ],
      Type.Number(),
      { description: "Returns the arctangent of a number." },
    ),
    "Math.atan2": Type.Function(
      [
        Type.FunctionParameter("y", Type.Number(), {
          description:
            "A numeric expression representing the cartesian y-coordinate.",
        }),
        Type.FunctionParameter("x", Type.Number(), {
          description:
            "A numeric expression representing the cartesian x-coordinate.",
        }),
      ],
      Type.Number(),
      {
        description:
          "Returns the angle (in radians) between the X axis and the line going through both the origin and the given point.",
      },
    ),
    "Math.ceil": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "A numeric expression.",
        }),
      ],
      Type.Number(),
      {
        description:
          "Returns the smallest integer greater than or equal to its numeric argument.",
      },
    ),
    "Math.cos": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description:
            "A numeric expression that contains an angle measured in radians.",
        }),
      ],
      Type.Number(),
      { description: "Returns the cosine of a number." },
    ),
    "Math.exp": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "A numeric expression representing the power of e.",
        }),
      ],
      Type.Number(),
      {
        description:
          "Returns e (the base of natural logarithms) raised to a power.",
      },
    ),
    "Math.floor": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "A numeric expression.",
        }),
      ],
      Type.Number(),
      {
        description:
          "Returns the greatest integer less than or equal to its numeric argument.",
      },
    ),
    "Math.log": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "A numeric expression.",
        }),
      ],
      Type.Number(),
      {
        description: "Returns the natural logarithm (base e) of a number.",
      },
    ),
    "Math.max": Type.Function(
      [
        Type.Rest(
          Type.FunctionParameter("values", Type.Number(), {
            description: "Numeric expressions to be evaluated.",
          }),
        ),
      ],
      Type.Number(),
      {
        description:
          "Returns the larger of a set of supplied numeric expressions.\n\nCalling this with no arguments is a client error rather than an answer: the standard library takes none and answers `-Infinity`, which is not a value this language has.",
      },
    ),
    "Math.min": Type.Function(
      [
        Type.Rest(
          Type.FunctionParameter("values", Type.Number(), {
            description: "Numeric expressions to be evaluated.",
          }),
        ),
      ],
      Type.Number(),
      {
        description:
          "Returns the smaller of a set of supplied numeric expressions.\n\nCalling this with no arguments is a client error rather than an answer: the standard library takes none and answers `Infinity`, which is not a value this language has.",
      },
    ),
    "Math.pow": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "The base value of the expression.",
        }),
        Type.FunctionParameter("y", Type.Number(), {
          description: "The exponent value of the expression.",
        }),
      ],
      Type.Number(),
      {
        description:
          "Returns the value of a base expression taken to a specified power.",
      },
    ),
    "Math.random": Type.Function([], Type.Number(), {
      description: "Returns a pseudorandom number between 0 and 1.",
    }),
    "Math.round": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "The value to be rounded to the nearest integer.",
        }),
      ],
      Type.Number(),
      {
        description:
          "Returns a supplied numeric expression rounded to the nearest integer.",
      },
    ),
    "Math.sin": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description:
            "A numeric expression that contains an angle measured in radians.",
        }),
      ],
      Type.Number(),
      { description: "Returns the sine of a number." },
    ),
    "Math.sqrt": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "A numeric expression.",
        }),
      ],
      Type.Number(),
      { description: "Returns the square root of a number." },
    ),
    "Math.tan": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description:
            "A numeric expression that contains an angle measured in radians.",
        }),
      ],
      Type.Number(),
      { description: "Returns the tangent of a number." },
    ),
    "Math.clz32": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "A numeric expression.",
        }),
      ],
      Type.Number(),
      {
        description:
          "Returns the number of leading zero bits in the 32-bit binary representation of a number.",
      },
    ),
    "Math.imul": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "First number",
        }),
        Type.FunctionParameter("y", Type.Number(), {
          description: "Second number",
        }),
      ],
      Type.Number(),
      {
        description:
          "Returns the result of 32-bit multiplication of two numbers.",
      },
    ),
    "Math.sign": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "The numeric expression to test",
        }),
      ],
      Type.Number(),
      {
        description:
          "Returns the sign of the x, indicating whether x is positive, negative or zero.",
      },
    ),
    "Math.log10": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "A numeric expression.",
        }),
      ],
      Type.Number(),
      { description: "Returns the base 10 logarithm of a number." },
    ),
    "Math.log2": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "A numeric expression.",
        }),
      ],
      Type.Number(),
      { description: "Returns the base 2 logarithm of a number." },
    ),
    "Math.log1p": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "A numeric expression.",
        }),
      ],
      Type.Number(),
      { description: "Returns the natural logarithm of 1 + x." },
    ),
    "Math.expm1": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "A numeric expression.",
        }),
      ],
      Type.Number(),
      {
        description:
          "Returns the result of (e^x - 1), which is an implementation-dependent approximation to\nsubtracting 1 from the exponential function of x (e raised to the power of x, where e\nis the base of the natural logarithms).",
      },
    ),
    "Math.cosh": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description:
            "A numeric expression that contains an angle measured in radians.",
        }),
      ],
      Type.Number(),
      { description: "Returns the hyperbolic cosine of a number." },
    ),
    "Math.sinh": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description:
            "A numeric expression that contains an angle measured in radians.",
        }),
      ],
      Type.Number(),
      { description: "Returns the hyperbolic sine of a number." },
    ),
    "Math.tanh": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description:
            "A numeric expression that contains an angle measured in radians.",
        }),
      ],
      Type.Number(),
      { description: "Returns the hyperbolic tangent of a number." },
    ),
    "Math.acosh": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description:
            "A numeric expression that contains an angle measured in radians.",
        }),
      ],
      Type.Number(),
      { description: "Returns the inverse hyperbolic cosine of a number." },
    ),
    "Math.asinh": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description:
            "A numeric expression that contains an angle measured in radians.",
        }),
      ],
      Type.Number(),
      { description: "Returns the inverse hyperbolic sine of a number." },
    ),
    "Math.atanh": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description:
            "A numeric expression that contains an angle measured in radians.",
        }),
      ],
      Type.Number(),
      {
        description: "Returns the inverse hyperbolic tangent of a number.",
      },
    ),
    "Math.hypot": Type.Function(
      [
        Type.Rest(
          Type.FunctionParameter("values", Type.Number(), {
            description:
              "Values to compute the square root for. If no arguments are passed, the result is +0. If there is only one argument, the result is the absolute value. If any argument is +Infinity or -Infinity, the result is +Infinity. If any argument is NaN, the result is NaN. If all arguments are either +0 or −0, the result is +0.",
          }),
        ),
      ],
      Type.Number(),
      {
        description:
          "Returns the square root of the sum of squares of its arguments.",
      },
    ),
    "Math.trunc": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "A numeric expression.",
        }),
      ],
      Type.Number(),
      {
        description:
          "Returns the integral part of the numeric expression x, removing any fractional digits.\nIf x is already an integer, the result is x.",
      },
    ),
    "Math.fround": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "A numeric expression.",
        }),
      ],
      Type.Number(),
      {
        description:
          "Returns the nearest single precision float representation of a number.",
      },
    ),
    "Math.cbrt": Type.Function(
      [
        Type.FunctionParameter("x", Type.Number(), {
          description: "A numeric expression.",
        }),
      ],
      Type.Number(),
      {
        description:
          "Returns an implementation-dependent approximation to the cube root of number.",
      },
    ),
    "Array.from": Type.Generic(
      [
        Type.GenericParameter("T", Type.Ref("ClientValue")),
        Type.GenericParameter("U", Type.Ref("ClientValue")),
      ],
      Type.Function(
        [
          Type.FunctionParameter(
            "arrayLike",
            Type.Apply(Type.Ref("ArrayLike"), [Type.Ref("T")]),
            {
              description: "An array-like object to convert to an array.",
            },
          ),
          Type.FunctionParameter(
            "mapfn",
            Type.Function(
              [
                Type.FunctionParameter("v", Type.Ref("T")),
                Type.FunctionParameter("k", Type.Number()),
              ],
              Type.Ref("U"),
            ),
            {
              description:
                "A mapping function to call on every element of the array.",
            },
          ),
        ],
        Type.Array(Type.Ref("U")),
      ),
      {
        description:
          "Creates an array from an array-like object.\n\n" +
          "The mapper is required, where the standard library makes it optional: without one, a source that names only a length answers with holes, and a hole reads as `undefined` — which this language has no value for.",
      },
    ),
    "Array.of": Type.Generic(
      [Type.GenericParameter("T", Type.Ref("ClientValue"))],
      Type.Function(
        [
          Type.Rest(
            Type.FunctionParameter("items", Type.Ref("T"), {
              description:
                "A set of elements to include in the new array object.",
            }),
          ),
        ],
        Type.Array(Type.Ref("T")),
      ),
      {
        description: "Returns a new array from a set of elements.",
      },
    ),
    "Number.EPSILON": Type.Number({
      description:
        "The value of Number.EPSILON is the difference between 1 and the smallest value greater than 1 that is representable as a Number value, which is approximately: 2.2204460492503130808472633361816 x 10−16.",
    }),
    "Number.isFinite": Type.Function(
      [
        Type.FunctionParameter("number", Type.Ref("ClientValue"), {
          description: "A numeric value.",
        }),
      ],
      Type.Boolean(),
      {
        description:
          "Returns true if passed value is finite. Unlike the global isFinite, Number.isFinite doesn't forcibly convert the parameter to a number. Only finite values of the type number, result in true.",
      },
    ),
    "Number.isInteger": Type.Function(
      [
        Type.FunctionParameter("number", Type.Ref("ClientValue"), {
          description: "A numeric value.",
        }),
      ],
      Type.Boolean(),
      {
        description:
          "Returns true if the value passed is an integer, false otherwise.",
      },
    ),
    "Number.parseFloat": Type.Function(
      [
        Type.FunctionParameter("string", Type.String(), {
          description: "A string that contains a floating-point number.",
        }),
      ],
      Type.Number(),
      { description: "Converts a string to a floating-point number." },
    ),
    "Number.parseInt": Type.Function(
      [
        Type.FunctionParameter("string", Type.String(), {
          description: "A string to convert into a number.",
        }),
        Type.Optional(
          Type.FunctionParameter("radix", Type.Number(), {
            description:
              "A value between 2 and 36 that specifies the base of the number in `string`. If this argument is not supplied, strings with a prefix of '0x' are considered hexadecimal. All other strings are considered decimal.",
          }),
        ),
      ],
      Type.Number(),
      { description: "Converts A string to an integer." },
    ),
    "String.fromCodePoint": Type.Function(
      [Type.Rest(Type.FunctionParameter("codePoints", Type.Number()))],
      Type.String(),
      {
        description:
          "Return the String value whose elements are, in order, the elements in the List elements. If length is 0, the empty string is returned.",
      },
    ),
    "Object.entries": Type.Generic(
      [Type.GenericParameter("T", Type.Ref("ClientValue"))],
      Type.Function(
        [
          Type.FunctionParameter(
            "o",
            Type.Record(Type.String(), Type.Ref("T"), { readOnly: true }),
            { description: "An object whose members to list." },
          ),
        ],
        Type.Array(Type.Tuple({ key: Type.String(), value: Type.Ref("T") })),
      ),
      {
        description:
          "Returns an array of an object's members, each as a key and its value, in the order `JSON.stringify` writes them.",
      },
    ),
    "Object.fromEntries": Type.Generic(
      [Type.GenericParameter("T", Type.Ref("ClientValue"))],
      Type.Function(
        [
          Type.FunctionParameter(
            "entries",
            Type.Array(
              Type.Tuple({ key: Type.String(), value: Type.Ref("T") }),
              { readOnly: true },
            ),
            { description: "Keys and their values." },
          ),
        ],
        Type.Record(Type.String(), Type.Ref("T")),
      ),
      {
        description:
          "Returns an object holding each key with its value. A key written twice holds the later value.",
      },
    ),
    http: Type.Ref("Http"),
    state: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Function(
        [Type.FunctionParameter("initial", Type.Ref("T"))],
        Type.Apply(Type.Ref("State"), [Type.Ref("T")]),
      ),
    ),
    vm: Type.Ref("Vm"),
  },
};
