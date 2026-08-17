import { schema as core } from "@backtickjs/core-schema";
import { Type } from "@backtickjs/schema";
import type { Schema } from "@backtickjs/schema";

export const schema: Schema = {
  package: "@backtickjs/ui-schema",

  extends: [core],

  publishes: ["Prop", "Children"],

  types: {
    ClientElement: Type.Interface([Type.Ref("ClientHandle")], {}),

    Renderable: Type.Union([
      Type.Null(),
      Type.Boolean(),
      Type.Number(),
      Type.String(),
    ]),

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
          Type.Ref("ClientElement"),
        ),
      }),
    ),
  },

  elements: {},

  builtins: {},
};
