import type { SchemaDocument } from "@backtickjs/schema";

// Two documents holding the cases the two real vocabularies were surveyed for.
// Neither is a target — they are here to find out what the vocabulary cannot
// say — and they are hand-written because the builder's test is that the same
// document comes back out of it.

// An interface extending two interfaces, a union of primitives, a void element,
// and a function.
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
        "aria-busy": {
          type: { kind: "enum", values: ["true", "false"] },
          optional: true,
          description: null,
        },
        "aria-label": {
          type: { kind: "string" },
          optional: true,
          description: null,
        },
        role: {
          type: { kind: "reference", name: "ariaRole" },
          optional: true,
          description: null,
        },
      },
    },
    events: {
      kind: "interface",
      extends: [],
      properties: {
        onclick: {
          type: { kind: "function", params: [], returns: { kind: "void" } },
          optional: true,
          description: null,
        },
        oninput: {
          type: { kind: "function", params: [], returns: { kind: "void" } },
          optional: true,
          description: null,
        },
      },
    },
    globalAttributes: {
      kind: "interface",
      extends: ["ariaAttributes", "events"],
      properties: {
        class: { type: { kind: "string" }, optional: true, description: null },
        hidden: {
          type: { kind: "boolean" },
          optional: true,
          description: null,
        },
        id: { type: { kind: "string" }, optional: true, description: null },
      },
    },
  },
  elements: {
    br: {
      extends: ["globalAttributes"],
      properties: {},
      children: "none",
      description: null,
    },
    div: {
      extends: ["globalAttributes"],
      properties: {},
      children: "content",
      description: null,
    },
    input: {
      extends: ["globalAttributes"],
      properties: {
        disabled: {
          type: { kind: "boolean" },
          optional: true,
          description: null,
        },
        // The one property either vocabulary would call required: an input
        // without a name submits nothing.
        name: {
          type: { kind: "string" },
          optional: false,
          description:
            "Submitted with the form; an input without one submits nothing.",
        },
        type: {
          type: {
            kind: "enum",
            values: ["text", "number", "checkbox", "radio"],
          },
          optional: true,
          description: null,
        },
        // A size is logical pixels or a percentage, and HTML takes either.
        value: {
          type: { kind: "union", of: [{ kind: "string" }, { kind: "number" }] },
          optional: true,
          description: null,
        },
      },
      children: "none",
      description: null,
    },
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
          properties: {
            translateX: {
              type: { kind: "number" },
              optional: true,
              description: null,
            },
          },
        },
        {
          kind: "object",
          includes: [],
          properties: {
            translateY: {
              type: { kind: "number" },
              optional: true,
              description: null,
            },
          },
        },
        {
          kind: "object",
          includes: [],
          properties: {
            rotate: {
              type: { kind: "string" },
              optional: true,
              description: null,
            },
          },
        },
      ],
    },
    layoutStyle: {
      kind: "object",
      includes: [],
      properties: {
        height: {
          type: { kind: "reference", name: "dimension" },
          optional: true,
          description: null,
        },
        padding: {
          type: { kind: "reference", name: "dimension" },
          optional: true,
          description: null,
        },
        width: {
          type: { kind: "reference", name: "dimension" },
          optional: true,
          description: null,
        },
      },
    },
    viewStyle: {
      kind: "object",
      includes: ["layoutStyle"],
      properties: {
        backgroundColor: {
          type: { kind: "reference", name: "color" },
          optional: true,
          description: null,
        },
        opacity: {
          type: { kind: "number" },
          optional: true,
          description: null,
        },
        transform: {
          type: { kind: "list", of: { kind: "reference", name: "transform" } },
          optional: true,
          description: null,
        },
      },
    },
  },
  elements: {
    Text: {
      extends: [],
      properties: {
        // A callback handed something, where the web's are handed nothing: the
        // target decides what its clients pass back.
        //
        // Numbers rather than `dimension`s: a union of primitives cannot stand
        // in a parameter list.
        onLayout: {
          type: {
            kind: "function",
            params: [
              { name: "width", type: { kind: "number" }, nullable: false },
              { name: "height", type: { kind: "number" }, nullable: true },
            ],
            returns: { kind: "void" },
          },
          optional: true,
          description: null,
        },
        onPress: {
          type: { kind: "function", params: [], returns: { kind: "void" } },
          optional: true,
          description: null,
        },
        style: {
          type: { kind: "reference", name: "viewStyle" },
          optional: true,
          description: null,
        },
        testID: { type: { kind: "string" }, optional: true, description: null },
      },
      children: "text",
      description: null,
    },
    View: {
      extends: [],
      properties: {
        style: {
          type: { kind: "reference", name: "viewStyle" },
          optional: true,
          description: null,
        },
      },
      children: "elements",
      description: null,
    },
  },
};
