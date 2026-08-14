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

  // `State` and the classes a value autoboxes to are named here and declared
  // in the phase that generates them: a type a target inherits is a type its
  // `jsx-runtime` would emit, and those belong to `cs-runtime`, which already
  // writes them by hand.
  types: {},

  // `for` is not here. It is a list rather than a tag today, recognised by the
  // value `For` and lowered to its own node kind, so declaring it as an element
  // would make `<for each={…}>` typecheck and then draw an element named "for".
  // It lands with the lowering that makes it true.
  elements: {},

  builtins: {
    /** Storage a script may read and write, holding what it was given. */
    state: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Function(
        [Type.FunctionParameter("initial", Type.Ref("T"))],
        Type.Apply(Type.Ref("State"), [Type.Ref("T")]),
      ),
    ),

    /** The ratio of the circumference of a circle to its diameter. */
    "Math.PI": Type.Number(),

    /** Euler's number, the base of the natural logarithms. */
    "Math.E": Type.Number(),

    // What IEEE 754 fixes the result of, and nothing else. `sin`, `cos`, `tan`,
    // `exp`, `log`, `pow` and `atan2` are absent because two conforming
    // implementations may differ in the last place, and a format specified
    // against a reference client cannot promise "whatever JavaScript did".
    "Math.abs": Type.Function(
      [Type.FunctionParameter("x", Type.Number())],
      Type.Number(),
    ),
    "Math.sign": Type.Function(
      [Type.FunctionParameter("x", Type.Number())],
      Type.Number(),
    ),
    "Math.floor": Type.Function(
      [Type.FunctionParameter("x", Type.Number())],
      Type.Number(),
    ),
    "Math.ceil": Type.Function(
      [Type.FunctionParameter("x", Type.Number())],
      Type.Number(),
    ),
    "Math.trunc": Type.Function(
      [Type.FunctionParameter("x", Type.Number())],
      Type.Number(),
    ),
    "Math.sqrt": Type.Function(
      [Type.FunctionParameter("x", Type.Number())],
      Type.Number(),
    ),
    "Math.fround": Type.Function(
      [Type.FunctionParameter("x", Type.Number())],
      Type.Number(),
    ),

    /**
     * A number rounded to the nearest integer, ties **up**.
     *
     * JavaScript's rule rather than the one most languages use: `round(-0.5)`
     * is `-0` and not `-1`. Written down because a host that rounded
     * half-to-even would disagree with every bundle that used this.
     */
    "Math.round": Type.Function(
      [Type.FunctionParameter("x", Type.Number())],
      Type.Number(),
    ),

    /**
     * The smaller of its arguments, of which at least one is required.
     *
     * The standard library takes none and answers `Infinity` — an empty answer
     * that is not this language's one absent value, and so not an answer it
     * should be able to produce.
     */
    "Math.min": Type.Function(
      [
        Type.FunctionParameter("first", Type.Number()),
        Type.Rest(Type.FunctionParameter("rest", Type.Number())),
      ],
      Type.Number(),
    ),

    /** The larger of its arguments, of which at least one is required. */
    "Math.max": Type.Function(
      [
        Type.FunctionParameter("first", Type.Number()),
        Type.Rest(Type.FunctionParameter("rest", Type.Number())),
      ],
      Type.Number(),
    ),

    /**
     * A pseudorandom number between 0 (inclusive) and 1 (exclusive).
     *
     * The one name here that is not a function of its arguments: two calls
     * disagree, two hosts disagree, and two runs of one bundle disagree, so a
     * bundle that reaches this cannot be snapshotted or compared against a
     * previous run of itself. Admitted because the alternative is that no
     * script can be random at all.
     */
    "Math.random": Type.Function([], Type.Number()),

    /**
     * An array of `length` members, each the result of calling the mapper for
     * its index.
     *
     * The one thing the language cannot do for itself: produce a sequence of a
     * given length. The mapper is required, where the standard library makes it
     * optional and answers with holes — and a hole reads as `undefined`, which
     * is the one thing this language has no value for. Its first argument is
     * always null, because against a `{ length }` source there is no element to
     * hand it.
     */
    "Array.from": Type.Generic(
      [Type.GenericParameter("T")],
      Type.Function(
        [
          Type.FunctionParameter(
            "source",
            Type.Object({ length: Type.Number() }),
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
          ),
        ],
        Type.Array(Type.Ref("T")),
      ),
    ),
  },
};
