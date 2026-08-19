import { schema as language } from "@backtickjs/language-schema";
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
                  "Where the member is, as storage: a position moves without the member changing, so a drawing handed the number would hold the one it was drawn at.",
              },
            ),
          ],
          Type.Ref("ClientElement"),
        ),
      }),
    ),
  },

  // The one element declared away from the target that draws it: what a list
  // holds is whatever its child script draws, where what a fragment or a `<div>`
  // holds is a target's own elements. So this sits with the language of drawing
  // rather than with any one thing drawn, and a target reaches it through its
  // own schema's `Elements`, which extends this one's.
  elements: {
    for: Type.Apply(Type.Ref("ForProps"), [Type.Ref("ClientValue")], {
      description:
        "An array, and what to draw for one member of it.\n\n" +
        "`children` is a script whose value is a function, so the client is " +
        "what walks the array: it draws only the members that are new, and " +
        "moves rather than rebuilds the ones that are not. A member is named " +
        "by its own identity — there is no key, and a value replaced is a " +
        "member replaced.\n\n" +
        "A member is `ClientValue` here where it is `T` on the props: an " +
        "intrinsic tag has nowhere to bind a type parameter from a prop, so " +
        "the child's parameter is checked against the language's whole value " +
        "domain rather than against what `each` holds.",
    }),
  },

  builtins: {},
};
