import { Type, type ClientSchema } from "@backtickjs/schema";

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
export const schema: ClientSchema = {
  extends: [],

  types: {
    Math: Type.Class({
      E: Type.Number({
        description:
          "The mathematical constant e. This is Euler's number, the base of natural logarithms.",
      }),
      LN10: Type.Number({
        description: "The natural logarithm of 10.",
      }),
      LN2: Type.Number({
        description: "The natural logarithm of 2.",
      }),
      LOG2E: Type.Number({
        description: "The base-2 logarithm of e.",
      }),
      LOG10E: Type.Number({
        description: "The base-10 logarithm of e.",
      }),
      PI: Type.Number({
        description:
          "Pi. This is the ratio of the circumference of a circle to its diameter.",
      }),
      SQRT1_2: Type.Number({
        description:
          "The square root of 0.5, or, equivalently, one divided by the square root of 2.",
      }),
      SQRT2: Type.Number({
        description: "The square root of 2.",
      }),
      abs: Type.Function(
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
      acos: Type.Function(
        [
          Type.FunctionParameter("x", Type.Number(), {
            description: "A numeric expression.",
          }),
        ],
        Type.Number(),
        {
          description:
            "Returns the arc cosine (or inverse cosine) of a number.",
        },
      ),
      asin: Type.Function(
        [
          Type.FunctionParameter("x", Type.Number(), {
            description: "A numeric expression.",
          }),
        ],
        Type.Number(),
        { description: "Returns the arcsine of a number." },
      ),
      atan: Type.Function(
        [
          Type.FunctionParameter("x", Type.Number(), {
            description:
              "A numeric expression for which the arctangent is needed.",
          }),
        ],
        Type.Number(),
        { description: "Returns the arctangent of a number." },
      ),
      atan2: Type.Function(
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
      ceil: Type.Function(
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
      cos: Type.Function(
        [
          Type.FunctionParameter("x", Type.Number(), {
            description:
              "A numeric expression that contains an angle measured in radians.",
          }),
        ],
        Type.Number(),
        { description: "Returns the cosine of a number." },
      ),
      exp: Type.Function(
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
      floor: Type.Function(
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
      log: Type.Function(
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
      max: Type.Function(
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
      min: Type.Function(
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
      pow: Type.Function(
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
      random: Type.Function([], Type.Number(), {
        description:
          "Returns a pseudorandom number between 0 and 1.\n\nThe one member here that is not a function of its arguments. Two calls disagree, two hosts disagree, and two runs of the same bundle disagree — so a bundle that reaches this cannot be snapshotted, cached by its output, or compared against a previous run of itself.",
      }),
      round: Type.Function(
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
      sin: Type.Function(
        [
          Type.FunctionParameter("x", Type.Number(), {
            description:
              "A numeric expression that contains an angle measured in radians.",
          }),
        ],
        Type.Number(),
        { description: "Returns the sine of a number." },
      ),
      sqrt: Type.Function(
        [
          Type.FunctionParameter("x", Type.Number(), {
            description: "A numeric expression.",
          }),
        ],
        Type.Number(),
        { description: "Returns the square root of a number." },
      ),
      tan: Type.Function(
        [
          Type.FunctionParameter("x", Type.Number(), {
            description:
              "A numeric expression that contains an angle measured in radians.",
          }),
        ],
        Type.Number(),
        { description: "Returns the tangent of a number." },
      ),
      clz32: Type.Function(
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
      imul: Type.Function(
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
      sign: Type.Function(
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
      log10: Type.Function(
        [
          Type.FunctionParameter("x", Type.Number(), {
            description: "A numeric expression.",
          }),
        ],
        Type.Number(),
        { description: "Returns the base 10 logarithm of a number." },
      ),
      log2: Type.Function(
        [
          Type.FunctionParameter("x", Type.Number(), {
            description: "A numeric expression.",
          }),
        ],
        Type.Number(),
        { description: "Returns the base 2 logarithm of a number." },
      ),
      log1p: Type.Function(
        [
          Type.FunctionParameter("x", Type.Number(), {
            description: "A numeric expression.",
          }),
        ],
        Type.Number(),
        { description: "Returns the natural logarithm of 1 + x." },
      ),
      expm1: Type.Function(
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
      cosh: Type.Function(
        [
          Type.FunctionParameter("x", Type.Number(), {
            description:
              "A numeric expression that contains an angle measured in radians.",
          }),
        ],
        Type.Number(),
        { description: "Returns the hyperbolic cosine of a number." },
      ),
      sinh: Type.Function(
        [
          Type.FunctionParameter("x", Type.Number(), {
            description:
              "A numeric expression that contains an angle measured in radians.",
          }),
        ],
        Type.Number(),
        { description: "Returns the hyperbolic sine of a number." },
      ),
      tanh: Type.Function(
        [
          Type.FunctionParameter("x", Type.Number(), {
            description:
              "A numeric expression that contains an angle measured in radians.",
          }),
        ],
        Type.Number(),
        { description: "Returns the hyperbolic tangent of a number." },
      ),
      acosh: Type.Function(
        [
          Type.FunctionParameter("x", Type.Number(), {
            description:
              "A numeric expression that contains an angle measured in radians.",
          }),
        ],
        Type.Number(),
        { description: "Returns the inverse hyperbolic cosine of a number." },
      ),
      asinh: Type.Function(
        [
          Type.FunctionParameter("x", Type.Number(), {
            description:
              "A numeric expression that contains an angle measured in radians.",
          }),
        ],
        Type.Number(),
        { description: "Returns the inverse hyperbolic sine of a number." },
      ),
      atanh: Type.Function(
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
      hypot: Type.Function(
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
      trunc: Type.Function(
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
      fround: Type.Function(
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
      cbrt: Type.Function(
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
    }),
    ArrayConstructor: Type.Class(
      {
        from: Type.Generic(
          [Type.GenericParameter("T")],
          Type.Function(
            [
              Type.FunctionParameter(
                "source",
                Type.Object({ length: Type.Number({ readOnly: true }) }),
                {
                  description:
                    "How many elements to build, as an object naming its length.",
                },
              ),
              Type.FunctionParameter(
                "map",
                Type.Function(
                  [
                    Type.FunctionParameter("value", Type.Null()),
                    Type.FunctionParameter("index", Type.Number()),
                  ],
                  Type.Ref("T"),
                ),
                {
                  description:
                    "Called once per index, with `null` and that index.",
                },
              ),
            ],
            Type.Array(Type.Ref("T")),
          ),
          {
            description:
              "Builds an array of `length` elements, each the result of calling `map` for its index.\n\n" +
              "The mapper is required, where the standard library makes it optional. Without one this answers with an array of holes, and a hole reads as `undefined` \u2014 which is the one thing this language has no value for.\n\n" +
              "The mapper's first argument is always `null`. The standard library passes the element it found, and against a `{ length }` source there is none.",
          },
        ),
      },
      {
        description:
          "The client `Array` API: the static side of the global, as against `ClientArray`, which is what a script reaches on an array it already has.\n\n" +
          "One member, because there is one thing the language cannot do for itself: produce a sequence of a given length. It can transform one \u2014 `map`, `filter`, `slice` \u2014 but the only way to get to a thousand elements without this is to double a throwaway array until it is long enough.\n\n" +
          "`of`, `isArray` and the rest are absent: an array literal is `of`, and a script's types already say what is an array.",
      },
    ),
  },

  // `for` is not here. It is a list rather than a tag today, recognised by the
  // value `For` and lowered to its own node kind, so declaring it as an element
  // would make `<for each={…}>` typecheck and then draw an element named "for".
  // It lands with the lowering that makes it true.
  elements: {},

  // What `declare var Math: Math` and `declare var Array: ArrayConstructor`
  // say in the lib: the name a script reaches, and the type it has. `Array`
  // needs a separate name for its type because `Array` is a type already —
  // the generic array type, which is the instance side.
  //
  // The lib is what declares these names; what is written here is which of
  // their members a script may reach.
  globals: {
    Math: Type.Ref("Math"),
    Array: Type.Ref("ArrayConstructor"),
  },

  builtins: {
    /** Storage a script may read and write, holding what it was given. */
    state: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Function(
        [Type.FunctionParameter("initial", Type.Ref("T"))],
        Type.Apply(Type.Ref("State"), [Type.Ref("T")]),
      ),
    ),
  },
};
