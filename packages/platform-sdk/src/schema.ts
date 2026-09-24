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
  },
};
