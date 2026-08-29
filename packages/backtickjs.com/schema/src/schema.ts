import { schema as web } from "@backtickjs/web-schema/schema";
import { Type } from "@backtickjs/schema";
import type { Schema } from "@backtickjs/schema";

/**
 * What this site's own client answers for, beside what the web does.
 *
 * One name. Compiling is the thing a bundle cannot do for itself: it wants a
 * parser, somewhere to run what the parser emitted, and a bundler to fold what
 * that drew — and of those four steps only the two ends are values a script can
 * hold. Source is a string and a bundle is a string; a module's exports and a
 * drawing are neither. So the seam falls where the values are data, and what
 * crosses it is one call.
 *
 * `builtinsOf` is where this arrives: it merges what a target answers for with
 * what the language already does, and throws if the two collide. Adding is a
 * target's to do, and this is a target adding one.
 *
 * Nothing here says how. A client may answer with a frame on an origin of its
 * own, a worker, or a round trip to a server, and neither this nor the pages
 * written against it would change.
 */
export const schema: Schema = {
  package: "@backtickjs.com/schema",

  namespace: "Site",

  extends: [web],

  // Nothing: what this adds is a name to call, not a type to write.
  publishes: [],

  types: {
    Diagnostic: Type.Interface(
      [],
      {
        message: Type.String({ readOnly: true }),
        // Where it is, when it is somewhere. Code that failed while it ran
        // rather than while it compiled has no span to point at, and says so by
        // leaving these out instead of pointing at the first character.
        start: Type.Union([Type.Number(), Type.Null()], { readOnly: true }),
        length: Type.Union([Type.Number(), Type.Null()], { readOnly: true }),
      },
      {
        description:
          "Something the compiler had to say about what was written, and" +
          " where in it. The word the rest of this repository uses.",
      },
    ),
  },

  elements: {},

  builtins: {
    compile: Type.Function(
      [
        Type.FunctionParameter("source", Type.String(), {
          description: "What somebody wrote.",
        }),
        Type.FunctionParameter(
          "onBundle",
          Type.Function(
            [Type.FunctionParameter("bundle", Type.String())],
            Type.Void(),
          ),
          {
            description:
              "Called with the bundle, when there is one. Measuring it is the" +
              " caller's: a string knows its own length.",
          },
        ),
        Type.FunctionParameter(
          "onDiagnostics",
          Type.Function(
            [
              Type.FunctionParameter(
                "diagnostics",
                Type.Array(Type.Ref("Diagnostic")),
              ),
            ],
            Type.Void(),
          ),
          {
            description:
              "Called instead, with what the compiler had to say. Not an" +
              " error: a half-written line answers this way, and the call did" +
              " what it was asked.",
          },
        ),
      ],
      Type.Void(),
      {
        description:
          "Compiles Backtick source to a bundle. One of the two callbacks is" +
          " called, once. Callbacks rather than something to wait on, because" +
          " waiting is not a thing this language does.",
      },
    ),
  },
};
