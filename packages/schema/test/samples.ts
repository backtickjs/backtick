import type { SchemaDocument } from "@backtickjs/schema";

// Two documents holding the cases the two real vocabularies were surveyed for.
// Neither is a target — they are here to find out what the vocabulary cannot
// say — and they are hand-written because the builder's test is that the same
// document comes back out of it.

// An interface extending two interfaces, a union of primitives, a void element,
// and a handler.
export const web: SchemaDocument = {
  name: "web",
  types: {
    ariaRole: {
      kind: "enum",
      values: ["button", "dialog", "navigation"],
    },
    ariaAttributes: {
      kind: "interface",
      extends: [],
      properties: {
        // ARIA reads the words, so this is not the present-or-absent kind of
        // boolean an HTML attribute is.
        "aria-busy": { kind: "enum", values: ["true", "false"] },
        "aria-label": { kind: "string" },
        role: { kind: "reference", name: "ariaRole" },
      },
    },
    events: {
      kind: "interface",
      extends: [],
      properties: {
        onclick: { kind: "handler", params: [] },
        oninput: { kind: "handler", params: [] },
      },
    },
    globalAttributes: {
      kind: "interface",
      extends: ["ariaAttributes", "events"],
      properties: {
        class: { kind: "string" },
        hidden: { kind: "boolean" },
        id: { kind: "string" },
      },
    },
  },
  elements: {
    br: { extends: ["globalAttributes"], properties: {}, children: "none" },
    div: { extends: ["globalAttributes"], properties: {}, children: "content" },
    input: {
      extends: ["globalAttributes"],
      properties: {
        disabled: { kind: "boolean" },
        name: { kind: "string" },
        type: {
          kind: "enum",
          values: ["text", "number", "checkbox", "radio"],
        },
        // A size is logical pixels or a percentage, and HTML takes either.
        value: { kind: "union", of: [{ kind: "string" }, { kind: "number" }] },
      },
      children: "none",
    },
    Fragment: { extends: [], properties: {}, children: "content" },
  },
};

// Named aliases used everywhere, a value object composed of another, a union of
// single-key objects, and a callback handed arguments.
export const portable: SchemaDocument = {
  name: "portable",
  types: {
    // A named color, #hex, rgb()/rgba(), hsl()/hsla(), or "transparent".
    color: { kind: "string" },
    // A length: logical pixels (number) or a percentage string like "50%".
    dimension: {
      kind: "union",
      of: [{ kind: "number" }, { kind: "string" }],
    },
    transform: {
      kind: "union",
      of: [
        {
          kind: "object",
          includes: [],
          properties: { translateX: { kind: "number" } },
        },
        {
          kind: "object",
          includes: [],
          properties: { translateY: { kind: "number" } },
        },
        {
          kind: "object",
          includes: [],
          properties: { rotate: { kind: "string" } },
        },
      ],
    },
    layoutStyle: {
      kind: "object",
      includes: [],
      properties: {
        height: { kind: "reference", name: "dimension" },
        padding: { kind: "reference", name: "dimension" },
        width: { kind: "reference", name: "dimension" },
      },
    },
    viewStyle: {
      kind: "object",
      includes: ["layoutStyle"],
      properties: {
        backgroundColor: { kind: "reference", name: "color" },
        opacity: { kind: "number" },
        transform: {
          kind: "list",
          of: { kind: "reference", name: "transform" },
        },
      },
    },
  },
  elements: {
    Text: {
      extends: [],
      properties: {
        // Numbers rather than `dimension`s: a union of primitives cannot
        // stand in a parameter list.
        onLayout: {
          kind: "handler",
          params: [{ kind: "number" }, { kind: "number" }],
        },
        onPress: { kind: "handler", params: [] },
        style: { kind: "reference", name: "viewStyle" },
        testID: { kind: "string" },
      },
      children: "text",
    },
    View: {
      extends: [],
      properties: { style: { kind: "reference", name: "viewStyle" } },
      children: "elements",
    },
  },
};
