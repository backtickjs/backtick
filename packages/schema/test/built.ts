import { schema } from "@backtickjs/schema";

// The samples in `samples.ts`, written with the builder instead of by hand.
// That they are the same data is what the builder has to be right about, and
// `built.test.ts` asserts exactly that.

// A vocabulary a codebase already has, which the schema reads rather than
// restates: `values` takes the object and its members are written down.
const AriaRole = {
  Button: "button",
  Dialog: "dialog",
  Navigation: "navigation",
} as const;

const ariaRole = schema.enum({ name: "ariaRole", values: AriaRole });

const ariaAttributes = schema.interface({
  name: "ariaAttributes",
  properties: {
    "aria-busy": schema.enum({ values: ["true", "false"] }).optional(),
    "aria-label": schema.string().optional(),
    role: ariaRole.optional(),
  },
});

const events = schema.interface({
  name: "events",
  properties: {
    onclick: schema.function().optional(),
    oninput: schema.function().optional(),
  },
});

// What it builds on is held rather than spelled: a name that does not exist is
// a binding that does not exist, and a declaration written where a type goes is
// the reference to it.
const globalAttributes = schema.interface({
  name: "globalAttributes",
  extends: [ariaAttributes, events],
  properties: {
    class: schema.string().optional(),
    hidden: schema.boolean().optional(),
    id: schema.string().optional(),
  },
});

export const web = schema("web", {
  types: [ariaRole, ariaAttributes, events, globalAttributes],
  elements: {
    br: schema.element({ extends: [globalAttributes], children: "none" }),
    div: schema.element({ extends: [globalAttributes], children: "content" }),
    input: schema.element({
      extends: [globalAttributes],
      properties: {
        disabled: schema.boolean().optional(),
        name: schema
          .string()
          .describe(
            "Submitted with the form; an input without one submits nothing.",
          ),
        type: schema
          .enum({ values: ["text", "number", "checkbox", "radio"] })
          .optional(),
        value: schema
          .union({ of: [schema.string(), schema.number()] })
          .optional(),
      },
      children: "none",
    }),
  },
});

const color = schema.string({ name: "color" });

const dimension = schema.union({
  name: "dimension",
  of: [schema.number(), schema.string()],
});

const transform = schema.union({
  name: "transform",
  of: [
    schema.object({
      properties: { translateX: schema.number().optional() },
    }),
    schema.object({
      properties: { translateY: schema.number().optional() },
    }),
    schema.object({
      properties: { rotate: schema.string().optional() },
    }),
  ],
});

const layoutStyle = schema.object({
  name: "layoutStyle",
  properties: {
    height: dimension.optional(),
    padding: dimension.optional(),
    width: dimension.optional(),
  },
});

const viewStyle = schema.object({
  name: "viewStyle",
  includes: [layoutStyle],
  properties: {
    backgroundColor: color.optional(),
    opacity: schema.number().optional(),
    transform: schema.list({ of: transform }).optional(),
  },
});

export const portable = schema("portable", {
  types: [color, dimension, transform, layoutStyle, viewStyle],
  elements: {
    Text: schema.element({
      properties: {
        onLayout: schema
          .function({
            params: [
              { name: "width", type: schema.number() },
              { name: "height", type: schema.number(), nullable: true },
            ],
          })
          .optional(),
        onPress: schema.function().optional(),
        style: viewStyle.optional(),
        testID: schema.string().optional(),
      },
      children: "text",
    }),
    View: schema.element({
      properties: { style: viewStyle.optional() },
      children: "elements",
    }),
  },
});
