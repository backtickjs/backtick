import { schema as core } from "@backtickjs/core-schema";
import { Type } from "@backtickjs/schema";
import type { Schema } from "@backtickjs/schema";

/**
 * What every client that draws has, whatever it draws with.
 *
 * Between core's — the names a script reaches whether anything is drawn or not
 * — and a target's, which is a browser's tags or a phone's. A list is the one
 * thing here so far: every client draws one, and none of them writes it.
 */
export const schema: Schema = {
  package: "@backtickjs/ui-schema",

  extends: [core],

  types: {
    /**
     * An array, and what to draw for one member of it.
     *
     * `T` is what the array holds and what the child is handed, so the two are
     * one decision here rather than two that have to agree. What the tag does
     * with it is the open question: an intrinsic tag binds no type parameter
     * from a prop, so `for` pins this to something until that is answered.
     */
    ForProps: Type.Generic(
      [Type.GenericParameter("T")],
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
          Type.Element(),
        ),
      }),
    ),
  },

  tags: {},

  builtins: {},
};
