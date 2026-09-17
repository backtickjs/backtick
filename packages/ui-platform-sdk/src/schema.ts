import { schema as language } from "@backtickjs/platform-sdk/schema";
import { Type } from "@backtickjs/schema";
import type { Schema } from "@backtickjs/schema";

export const schema: Schema = {
  package: "@backtickjs/ui-platform-sdk",

  namespace: "UiPlatform",

  extends: [language],

  types: {
    BacktickElement: Type.Interface(
      [Type.Ref("ClientHandle")],
      {},
      {
        description:
          "A drawing, as either side names one.\n\nOpaque, and that is the whole of it: what a drawing is made of belongs to whichever side made it. A server builds one from a tag and props, and a script evaluates to one — neither reads into the other's.",
      },
    ),

    BacktickNode: Type.Union(
      [
        Type.Ref("BacktickElement"),
        Type.String(),
        Type.Number(),
        Type.Null(),
        Type.Array(Type.Ref("BacktickNode"), { readOnly: true }),
      ],
      {
        description:
          "What may stand where a drawing does: one drawing, several, or nothing.\n\nText and numbers stand for themselves and `null` for nothing, so a client draws these in order and skips the nothings. Nested because a drawing's children may be gathered before they are handed over.\n\nThat a host may write a script in any of these positions is the host language's and is not said here: what a client meets is a drawing, some text, or several of those.",
      },
    ),

    ForProps: Type.Generic(
      [Type.GenericParameter("T", Type.Ref("ClientValue"))],
      Type.Interface([], {
        each: Type.Array(Type.Ref("T"), {
          readOnly: true,
          description: "The array to draw one thing per member of.",
        }),
        children: Type.Function(
          [
            Type.FunctionParameter("member", Type.Ref("T")),
            Type.FunctionParameter(
              "index",
              Type.Apply(Type.Ref("ReadonlyState"), [Type.Number()]),
              {
                description:
                  "Where the member is, as storage rather than a number: a position moves without the member changing, so a number read once would go stale.",
              },
            ),
          ],
          Type.Ref("BacktickElement"),
        ),
      }),
    ),

    FragmentProps: Type.Interface([], {
      children: Type.Optional(Type.Ref("BacktickNode")),
    }),
  },

  // The elements declared away from the target that draws them, because a list
  // holds whatever its child script draws where a `<div>` holds a target's own
  // elements. A target reaches it through its own schema's `Elements`, which
  // extends this one's.
  elements: {
    for: Type.Apply(Type.Ref("ForProps"), [Type.Ref("ClientValue")], {
      description:
        "An array, and what to draw for one member of it.\n\n" +
        "`children` is a script whose value is a function, so the client walks " +
        "the array itself: it draws only the members that are new and moves " +
        "the rest rather than rebuilding them. A member is named by its own " +
        "identity — there is no key.\n\n" +
        "A member is `ClientValue` here where it is `T` on the props, because " +
        "a tag has nowhere to bind a type parameter. Write `<For />` to have " +
        "the child checked against what `each` holds.",
    }),

    Fragment: Type.Ref("FragmentProps", {
      description:
        "Children with no element of their own: what it holds goes where it stands.\n\n" +
        "What it is for is the position. A drawing that is not an element has nowhere to be watched — a conditional standing at a block's root is read inside whatever computation asked for it, and the write that answers the conditional runs the block again. Under a fragment the conditional is a child, and a child position is watched on its own.\n\n" +
        "Written `<>`, which TypeScript resolves to this name. Capitalized where `for` is not, because a lowercase first letter is what makes a tag a target's own — so no target can declare an element named this.",
    }),
  },

  builtins: {
    onMount: Type.Function(
      [
        Type.FunctionParameter("fn", Type.Function([], Type.Void()), {
          description: "What to run once the drawing is in place.",
        }),
      ],
      Type.Void(),
      {
        description:
          "Runs something once, after the drawing the calling script belongs to is in place — the moment to start a timer or listen on the window.\n\n" +
          "Called from a script that draws, as a statement before its `return`. Called from a handler, the drawing is already in place and it runs straight away.",
      },
    ),
  },
};
