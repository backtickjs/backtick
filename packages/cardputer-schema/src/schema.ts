import { schema as ui } from "@backtickjs/ui-schema/schema";
import { Type } from "@backtickjs/schema";
import type { Schema } from "@backtickjs/schema";

/**
 * What a Cardputer draws, and what a script running on one may reach.
 *
 * One element per M5GFX call, and nothing this target cannot already do.
 * `<rect>` is `fillRect` and `drawRect`, told apart by a prop rather than by
 * two tags, because they are one shape drawn two ways — which is the only
 * place this reads M5GFX rather than copying it.
 *
 * A drawing is placed, not laid out. There is no layout engine behind a
 * 240×135 panel, so every element carries where it goes, and an app that wants
 * a column writes one. Saying it any other way would be promising a box model
 * this client has not got.
 *
 * Small on purpose. A browser's schema answers for a document — 176 elements,
 * because that is what a browser has. Growing this one is a decision per
 * element about what the client must then answer for.
 */

// Where a shape sits and what colour it is, which every one of them carries.
// `colour` is `0xRRGGBB`; the panel is 16-bit and the client narrows it.
const placed = {
  x: Type.Number(),
  y: Type.Number(),
  colour: Type.Optional(Type.Number()),
};

// Filled or outlined: M5GFX writes these as two calls — `fillRect` beside
// `drawRect` — and they are one shape either way. A prop rather than two tags,
// so an app that toggles it moves a value instead of swapping an element.
const filled = {
  fill: Type.Optional(Type.Boolean()),
};

export const schema: Schema = {
  package: "@backtickjs/cardputer-schema",

  namespace: "Cardputer",

  extends: [ui],

  types: {
    StringProps: Type.Interface(
      [],
      {
        ...placed,
        // 1 upwards, as `setTextSize` takes it.
        size: Type.Optional(Type.Number()),
        // What the x and y are measured from, as `setTextDatum` names them:
        // `top-left` through `bottom-right`, and `middle-centre` for the one
        // an app centring something wants.
        datum: Type.Optional(Type.String()),
        // `BacktickNode`, as every other target declares a children slot:
        // what stands inside an element is one thing, several, or a script
        // standing in for one, and a bare `string` would refuse the splice
        // that is the point of writing an app this way.
        children: Type.Optional(Type.Ref("BacktickNode")),
      },
      {
        description:
          "Text, as `drawString` draws it.\n\n" +
          "`children` is what it says. A number is written as the language " +
          "writes one, so a count needs no formatting to be drawn.",
      },
    ),

    RectProps: Type.Interface(
      [],
      {
        ...placed,
        ...filled,
        width: Type.Number(),
        height: Type.Number(),
        // Rounded where it is given, which is `fillRoundRect`.
        radius: Type.Optional(Type.Number()),
      },
      { description: "A rectangle, as `fillRect` and `drawRect` draw one." },
    ),

    CircleProps: Type.Interface(
      [],
      { ...placed, ...filled, radius: Type.Number() },
      { description: "A circle, as `fillCircle` and `drawCircle` draw one." },
    ),

    EllipseProps: Type.Interface(
      [],
      {
        ...placed,
        ...filled,
        width: Type.Number(),
        height: Type.Number(),
      },
      {
        description: "An ellipse, as `fillEllipse` and `drawEllipse` draw one.",
      },
    ),

    LineProps: Type.Interface(
      [],
      {
        ...placed,
        toX: Type.Number(),
        toY: Type.Number(),
      },
      {
        description:
          "A line from one point to another, as `drawLine` draws it.",
      },
    ),

    TriangleProps: Type.Interface(
      [],
      {
        ...placed,
        ...filled,
        x2: Type.Number(),
        y2: Type.Number(),
        x3: Type.Number(),
        y3: Type.Number(),
      },
      {
        description:
          "A triangle, as `fillTriangle` and `drawTriangle` draw one. `x` and " +
          "`y` are its first corner and the other two are named.",
      },
    ),

    PixelProps: Type.Interface([], placed, {
      description: "One pixel, as `drawPixel` draws it.",
    }),

    ArcProps: Type.Interface(
      [],
      {
        ...placed,
        ...filled,
        radius: Type.Number(),
        innerRadius: Type.Number(),
        start: Type.Number(),
        end: Type.Number(),
      },
      {
        description:
          "An arc between two angles in degrees, as `fillArc` and `drawArc` " +
          "draw one.",
      },
    ),
  },

  elements: {
    string: Type.Ref("StringProps"),
    rect: Type.Ref("RectProps"),
    circle: Type.Ref("CircleProps"),
    ellipse: Type.Ref("EllipseProps"),
    line: Type.Ref("LineProps"),
    triangle: Type.Ref("TriangleProps"),
    pixel: Type.Ref("PixelProps"),
    arc: Type.Ref("ArcProps"),
  },

  // What a script reaches that is not a thing to draw. Written as the names an
  // app imports, because that is what a builtin is: a value spliced under the
  // identifier it was imported as.
  builtins: {
    screenWidth: Type.Function([], Type.Number(), {
      description: "How wide the display is, in pixels. 240 on this device.",
    }),

    screenHeight: Type.Function([], Type.Number(), {
      description: "How tall the display is, in pixels. 135 on this device.",
    }),

    textWidth: Type.Function(
      [
        Type.FunctionParameter("text", Type.String(), {
          description: "What would be drawn.",
        }),
        Type.Optional(
          Type.FunctionParameter("size", Type.Number(), {
            description: "The size it would be drawn at. 1 where left out.",
          }),
        ),
      ],
      Type.Number(),
      {
        description:
          "How wide text would be, as `textWidth` measures it — for an app " +
          "placing something beside it.",
      },
    ),

    key: Type.Function([], Type.String(), {
      description:
        "The key pressed since this was last asked, or an empty string.\n\n" +
        "Asked rather than delivered: a script that wants to know reads it, " +
        "and one that does not is not interrupted. A printable key is itself; " +
        "the rest are named — `enter`, `backspace`, `up`, `down`, `left`, " +
        "`right`, `tab`, `escape`.",
    }),

    millis: Type.Function([], Type.Number(), {
      description:
        "How long the device has been awake, in milliseconds. What an app " +
        "animating something reads, since a frame is drawn when a value moves.",
    }),

    battery: Type.Function([], Type.Number(), {
      description: "What the battery holds, 0 to 100.",
    }),
  },
};
