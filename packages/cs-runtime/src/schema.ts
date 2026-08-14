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
    Math: Type.Class(
      {
        PI: Type.Number({
          description:
            "The ratio of the circumference of a circle to its diameter.",
        }),
        E: Type.Number({
          description: "Euler's number, the base of the natural logarithms.",
        }),
        abs: Type.Function(
          [Type.FunctionParameter("x", Type.Number())],
          Type.Number(),
          {
            description: "Returns the absolute value of a number.",
          },
        ),
        random: Type.Function([], Type.Number(), {
          description:
            "Returns a pseudorandom number between 0 (inclusive) and 1 (exclusive).\n\n" +
            "The one member here that is not a function of its arguments. Two calls disagree, two hosts disagree, and two runs of the same bundle disagree \u2014 so a bundle that reaches this cannot be snapshotted, cached by its output, or compared against a previous run of itself.",
        }),
        sign: Type.Function(
          [Type.FunctionParameter("x", Type.Number())],
          Type.Number(),
          {
            description:
              "Returns the sign of a number, indicating whether it is positive (1), negative (-1) or zero (0).",
          },
        ),
        floor: Type.Function(
          [Type.FunctionParameter("x", Type.Number())],
          Type.Number(),
          {
            description:
              "Returns the greatest integer less than or equal to its numeric argument.",
          },
        ),
        ceil: Type.Function(
          [Type.FunctionParameter("x", Type.Number())],
          Type.Number(),
          {
            description:
              "Returns the smallest integer greater than or equal to its numeric argument.",
          },
        ),
        round: Type.Function(
          [Type.FunctionParameter("x", Type.Number())],
          Type.Number(),
          {
            description:
              "Returns a number rounded to the nearest integer.\n\n" +
              "Ties round **up**, towards positive infinity, which is JavaScript's rule rather than the one most languages use: `round(-0.5)` is `-0` and not `-1`, and `round(2.5)` is `3` while `round(-2.5)` is `-2`. Written down here because a host that rounds half-to-even would disagree with every bundle that used this.",
          },
        ),
        trunc: Type.Function(
          [Type.FunctionParameter("x", Type.Number())],
          Type.Number(),
          {
            description:
              "Returns the integer part of a number by removing any fractional digits.",
          },
        ),
        min: Type.Function(
          [
            Type.FunctionParameter("first", Type.Number()),
            Type.Rest(Type.FunctionParameter("rest", Type.Number())),
          ],
          Type.Number(),
          {
            description:
              "Returns the smaller of its arguments.\n\n" +
              "At least one is required, where the standard library takes none and answers `Infinity` \u2014 an empty answer that isn't this language's one absent value, and so not an answer it should be able to produce.",
          },
        ),
        max: Type.Function(
          [
            Type.FunctionParameter("first", Type.Number()),
            Type.Rest(Type.FunctionParameter("rest", Type.Number())),
          ],
          Type.Number(),
          {
            description:
              "Returns the larger of its arguments.\n\n" +
              "At least one is required, for the reason `min` gives.",
          },
        ),
        sqrt: Type.Function(
          [Type.FunctionParameter("x", Type.Number())],
          Type.Number(),
          {
            description:
              "Returns the square root of a number. Correctly rounded, which IEEE 754 requires of it and of nothing else here.",
          },
        ),
        fround: Type.Function(
          [Type.FunctionParameter("x", Type.Number())],
          Type.Number(),
          {
            description:
              "Returns the nearest single precision float representation of a number.",
          },
        ),
      },
      {
        description:
          "The client `Math` API: what a script may reach on the one global this language has. Curated from the standard library, and curated harder than the rest of it, because a bundle is read by hosts that are not JavaScript and every member here has to mean the same thing on all of them.\n\n" +
          'What that rules out is most of `Math`. IEEE 754 fixes the result of `sqrt` and of the roundings, but says nothing about `sin`, `cos`, `tan`, `exp`, `log`, `pow` or `atan2` \u2014 two conforming implementations may differ in the last place, and V8 has changed its own answers between versions. A format specified against a reference client cannot promise "whatever JavaScript did", so those are absent rather than approximately right.\n\n' +
          "`random` is the exception, and it is here deliberately. Every other member answers the same on every host and on every run; this one answers differently each time it is called, so a bundle that reaches it draws something new on each read and cannot be compared against itself. It is admitted because the alternative is that no script can be random at all, and a seeded generator \u2014 which would keep its seed in the bundle, and would be reproducible \u2014 is not written yet.",
      },
    ),

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
