import { schema as language } from "@backtickjs/language/schema";
import { Type } from "@backtickjs/schema";
import type { Schema } from "@backtickjs/schema";

export const schema: Schema = {
  package: "@backtickjs/ui",

  namespace: "Ui",

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

    BacktickProps: Type.Interface([], {
      props: Type.Optional(
        Type.Record(Type.String(), Type.Ref("ClientValue"), {
          description:
            "What the bundle is handed, under the name `props`.\n\n" +
            "A bundle written elsewhere reads it the way any script reads a name it did not write. A live value stays live: reading a splice is calling it, so a drawing handed a cell redraws when the cell changes rather than being built again.\n\n" +
            "Unchecked here where `<Backtick />` checks it against what the bundle takes, for the reason `<For />` exists: a tag has nowhere to bind a type parameter.",
        }),
      ),
      bundle: Type.Union(
        [
          Type.Apply(Type.Ref("Bundle"), [Type.Ref("ClientUnknown")]),
          Type.Null(),
        ],
        {
          description:
            "The bundle to draw. Opaque, so nothing here says whether a client keeps the text that came over the wire or a document it parsed — a script holds one and hands it back either way. A script that fetched the text writes `JSON.parse(text) as Bundle<BacktickElement>`, which is what an assertion is for.\n\n" +
            "Null draws nothing, which is what a page with no bundle yet has to say. It is admitted here because a cell that is sometimes empty cannot be narrowed on its way in: a script reads a cell where it stands, and a read moved out to a `const` to be narrowed is a read that happens once and never again. So a page that wants something in the meantime writes the condition it already has — `held.read() === null ? … : <backtick bundle={held.read()} />` — and a page that wants nothing writes the tag and lets the null through.",
        },
      ),
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
        "Written `<>`, which TypeScript resolves to this name. Capitalized where the other two are not, because a lowercase first letter is what makes a tag a target's own — so no target can declare an element named this.",
    }),

    backtick: Type.Ref("BacktickProps", {
      description:
        "A bundle, drawn here.\n\n" +
        "One a script was handed rather than one the page was built with — fetched, stored, passed in. Every client evaluates bundles already, which is why this is the language's and not a target's: what draws it is the same client that drew the one it stands in.",
    }),
  },

  builtins: {},
};
