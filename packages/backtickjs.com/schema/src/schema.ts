import { schema as web } from "@backtickjs/web-schema/schema";
import { Type } from "@backtickjs/schema";
import type { Schema } from "@backtickjs/schema";

/**
 * What this site's own client answers for, beside what the web does.
 *
 * Only strings cross: a module's exports and a drawing are not values a script
 * can hold, so the pipeline is reachable at its ends and nowhere in between.
 *
 * Nothing here says how. A frame, a worker, a server — a client picks, and
 * neither this nor the pages written against it would change.
 */
export const schema: Schema = {
  package: "@backtickjs.com/schema",

  namespace: "Site",

  extends: [web],

  // Nothing: what this adds is a name to call, not a type to write.

  types: {
    Diagnostic: Type.Interface(
      [],
      {
        message: Type.String({ readOnly: true }),
        // Null where there is nowhere to point: code that failed while it ran
        // did not fail at a place in the text.
        start: Type.Union([Type.Number(), Type.Null()], { readOnly: true }),
        length: Type.Union([Type.Number(), Type.Null()], { readOnly: true }),
      },
      {
        description:
          "Something the compiler had to say, and where in the source.",
      },
    ),
  },

  elements: {},

  builtins: {
    compile: Type.Function(
      [
        Type.FunctionParameter("fileName", Type.String(), {
          description:
            "What to call it. It reaches a reader in a complaint, and it is" +
            " what decides whether the text is read as `.ts` or `.tsx`.",
        }),
        Type.FunctionParameter("sourceText", Type.String(), {
          description: "What somebody wrote.",
        }),
        Type.FunctionParameter(
          "onJavascript",
          Type.Function(
            [Type.FunctionParameter("javascript", Type.String())],
            Type.Void(),
          ),
          {
            description:
              "Called with the javascript, in `require`/`exports` form." +
              " Nothing has run it yet.",
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
              "Called instead. Not an error: a half-written line answers this" +
              " way, and the call did what it was asked.",
          },
        ),
      ],
      Type.Void(),
      {
        description:
          "Backtick source, compiled to javascript. One callback is called," +
          " once — callbacks because waiting is not a thing this language does.",
      },
    ),

    bundle: Type.Function(
      [
        Type.FunctionParameter("javascript", Type.String(), {
          description: "What `compile` answered with.",
        }),
        Type.FunctionParameter(
          "onBundle",
          Type.Function(
            [Type.FunctionParameter("bundle", Type.String())],
            Type.Void(),
          ),
          {
            description:
              "Called with the bundle. Measuring it is the caller's.",
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
              "Called instead, when what was written threw while it ran or" +
              " drew nothing. Spans are null here — it failed afterwards.",
          },
        ),
      ],
      Type.Void(),
      {
        description:
          "Javascript, run for the drawing it makes, and that drawing folded" +
          " into a bundle.\n\n" +
          "Running it is `eval`, which a page saying `default-src 'self'`" +
          " cannot do — so where this happens is somewhere the page is not," +
          " and that is a client's to arrange.\n\n" +
          "Apart from `compile` because the two fail differently: a" +
          " half-written line is the compiler speaking, and code that throws" +
          " while it runs is not.",
      },
    ),
  },
};
