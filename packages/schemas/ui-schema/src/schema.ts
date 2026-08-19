import { schema as language } from "@backtickjs/language-schema/schema";
import { Type } from "@backtickjs/schema";
import type { Schema } from "@backtickjs/schema";

export const schema: Schema = {
  package: "@backtickjs/ui-schema",

  extends: [language],

  publishes: ["Prop", "Children"],

  types: {
    ClientElement: Type.Interface([Type.Ref("ClientHandle")], {}),

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
          Type.Ref("ClientElement"),
        ),
      }),
    ),
  },

  // The one element declared away from the target that draws it, because a list
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
  },

  builtins: {},
};
