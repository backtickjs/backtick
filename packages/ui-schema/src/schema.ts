import { schema as language } from "@backtickjs/language-schema/schema";
import { Type } from "@backtickjs/schema";
import type { Schema } from "@backtickjs/schema";

export const schema: Schema = {
  package: "@backtickjs/ui-schema",

  namespace: "Ui",

  extends: [language],

  types: {
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

    BacktickProps: Type.Interface([], {
      bundle: Type.Union([Type.String(), Type.Null()], {
        description:
          "The bundle to draw, as the text it is on the wire — what `response.text` answers with, and what a document carries.\n\n" +
          "Null draws nothing, which is what a page with no bundle yet has to say. It is admitted here because a cell that is sometimes empty cannot be narrowed on its way in: a script reads a cell where it stands, and a read moved out to a `const` to be narrowed is a read that happens once and never again. So a page that wants something in the meantime writes the condition it already has — `held.read() === null ? … : <backtick bundle={held.read()} />` — and a page that wants nothing writes the tag and lets the null through.",
      }),
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

    backtick: Type.Ref("BacktickProps", {
      description:
        "A bundle, drawn here.\n\n" +
        "One a script was handed rather than one the page was built with — fetched, stored, passed in. Every client evaluates bundles already, which is why this is the language's and not a target's: what draws it is the same client that drew the one it stands in.",
    }),
  },

  builtins: {},
};
