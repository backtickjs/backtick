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
    "aria-busy": schema.enum({ values: ["true", "false"] }),
    "aria-label": schema.string(),
    role: ariaRole,
  },
});

const events = schema.interface({
  name: "events",
  properties: {
    onclick: schema.handler(),
    oninput: schema.handler(),
  },
});

// What it builds on is held rather than spelled: a name that does not exist is
// a binding that does not exist, and a declaration written where a type goes is
// the reference to it.
const globalAttributes = schema.interface({
  name: "globalAttributes",
  extends: [ariaAttributes, events],
  properties: {
    class: schema.string(),
    hidden: schema.boolean(),
    id: schema.string(),
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
        disabled: schema.boolean(),
        name: schema.string(),
        type: schema.enum({ values: ["text", "number", "checkbox", "radio"] }),
        value: schema.union({ of: [schema.string(), schema.number()] }),
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
    schema.object({ properties: { translateX: schema.number() } }),
    schema.object({ properties: { translateY: schema.number() } }),
    schema.object({ properties: { rotate: schema.string() } }),
  ],
});

const layoutStyle = schema.object({
  name: "layoutStyle",
  properties: {
    height: dimension,
    padding: dimension,
    width: dimension,
  },
});

const viewStyle = schema.object({
  name: "viewStyle",
  includes: [layoutStyle],
  properties: {
    backgroundColor: color,
    opacity: schema.number(),
    transform: schema.list({ of: transform }),
  },
});

export const portable = schema("portable", {
  types: [color, dimension, transform, layoutStyle, viewStyle],
  elements: {
    Text: schema.element({
      properties: {
        onLayout: schema.handler({
          params: [schema.number(), schema.number()],
        }),
        onPress: schema.handler(),
        style: viewStyle,
        testID: schema.string(),
      },
      children: "text",
    }),
    View: schema.element({
      properties: { style: viewStyle },
      children: "elements",
    }),
  },
});
