import { schema as ui } from "@backtickjs/ui-schema/schema";
import { Type } from "@backtickjs/schema";
import type { Schema } from "@backtickjs/schema";

// What a browser's elements accept, as a schema. `elements.ts` is generated
// from this and is not written by hand — run `pnpm generate`.

export const schema: Schema = {
  package: "@backtickjs/web-sdk",

  extends: [ui],

  publishes: [],

  types: {
    /**
     * What a handler is handed.
     *
     * The names and the shapes are the DOM's, taken from `lib.dom.d.ts` rather
     * than chosen here: a target's schema says what that target does, and what
     * this one does is the web. Which event a handler is handed is the DOM's
     * decision too — `click` is a `PointerEvent` and `input` is an
     * `InputEvent`, whatever either sounds like.
     *
     * A property whose type is one this schema does not declare — a
     * `DataTransfer`, a `TouchList`, an `HTMLElement` — is left out rather than
     * guessed at. It is absent because it is not written yet, not because the
     * DOM does not have it.
     */
    EventTarget: Type.Interface([Type.Ref("ClientHandle")], {}, {
      description:
        "What an event happened to.\n\nOpaque, as the DOM has it: reaching an element's own members through one needs a cast, and this language has none. That is the gap to close next, not a thing to paper over here.",
    }),
    Event: Type.Interface(
      [Type.Ref("ClientHandle")],
      {
        bubbles: Type.Boolean({ readOnly: true }),
        cancelable: Type.Boolean({ readOnly: true }),
        composed: Type.Boolean({ readOnly: true }),
        currentTarget: Type.Union([Type.Ref("EventTarget"), Type.Null()], { readOnly: true }),
        defaultPrevented: Type.Boolean({ readOnly: true }),
        eventPhase: Type.Number({ readOnly: true }),
        isTrusted: Type.Boolean({ readOnly: true }),
        srcElement: Type.Union([Type.Ref("EventTarget"), Type.Null()], { readOnly: true }),
        target: Type.Union([Type.Ref("EventTarget"), Type.Null()], { readOnly: true }),
        type: Type.String({ readOnly: true }),
        timeStamp: Type.Number({ readOnly: true }),
        preventDefault: Type.Function([], Type.Void()),
        stopPropagation: Type.Function([], Type.Void()),
        stopImmediatePropagation: Type.Function([], Type.Void()),
      },
      { description: "Anything that happens to an element, and what every other event here is one of." },
    ),
    UIEvent: Type.Interface(
      [Type.Ref("Event")],
      {
        detail: Type.Number({ readOnly: true }),
        which: Type.Number({ readOnly: true }),
      },
      { description: "An event that came from the interface rather than from the page's own code." },
    ),
    MouseEvent: Type.Interface(
      [Type.Ref("UIEvent")],
      {
        altKey: Type.Boolean({ readOnly: true }),
        button: Type.Number({ readOnly: true }),
        buttons: Type.Number({ readOnly: true }),
        clientX: Type.Number({ readOnly: true }),
        clientY: Type.Number({ readOnly: true }),
        ctrlKey: Type.Boolean({ readOnly: true }),
        layerX: Type.Number({ readOnly: true }),
        layerY: Type.Number({ readOnly: true }),
        metaKey: Type.Boolean({ readOnly: true }),
        movementX: Type.Number({ readOnly: true }),
        movementY: Type.Number({ readOnly: true }),
        offsetX: Type.Number({ readOnly: true }),
        offsetY: Type.Number({ readOnly: true }),
        pageX: Type.Number({ readOnly: true }),
        pageY: Type.Number({ readOnly: true }),
        relatedTarget: Type.Union([Type.Ref("EventTarget"), Type.Null()], { readOnly: true }),
        screenX: Type.Number({ readOnly: true }),
        screenY: Type.Number({ readOnly: true }),
        shiftKey: Type.Boolean({ readOnly: true }),
        x: Type.Number({ readOnly: true }),
        y: Type.Number({ readOnly: true }),
      },
      { description: "A pointing device did something, and where it was when it did." },
    ),
    PointerEvent: Type.Interface(
      [Type.Ref("MouseEvent")],
      {
        altitudeAngle: Type.Number({ readOnly: true }),
        azimuthAngle: Type.Number({ readOnly: true }),
        height: Type.Number({ readOnly: true }),
        isPrimary: Type.Boolean({ readOnly: true }),
        persistentDeviceId: Type.Number({ readOnly: true }),
        pointerId: Type.Number({ readOnly: true }),
        pointerType: Type.String({ readOnly: true }),
        pressure: Type.Number({ readOnly: true }),
        tangentialPressure: Type.Number({ readOnly: true }),
        tiltX: Type.Number({ readOnly: true }),
        tiltY: Type.Number({ readOnly: true }),
        twist: Type.Number({ readOnly: true }),
        width: Type.Number({ readOnly: true }),
      },
      { description: "A mouse, a pen or a finger \u2014 what the DOM hands a click, whichever it was." },
    ),
    DragEvent: Type.Interface(
      [Type.Ref("MouseEvent")],
      {
      },
      { description: "Something is being dragged. What is being carried is a `DataTransfer`, which this schema does not declare." },
    ),
    WheelEvent: Type.Interface(
      [Type.Ref("MouseEvent")],
      {
        deltaMode: Type.Number({ readOnly: true }),
        deltaX: Type.Number({ readOnly: true }),
        deltaY: Type.Number({ readOnly: true }),
        deltaZ: Type.Number({ readOnly: true }),
      },
      { description: "A wheel turned, and by how much in which units." },
    ),
    KeyboardEvent: Type.Interface(
      [Type.Ref("UIEvent")],
      {
        altKey: Type.Boolean({ readOnly: true }),
        charCode: Type.Number({ readOnly: true }),
        code: Type.String({ readOnly: true }),
        ctrlKey: Type.Boolean({ readOnly: true }),
        isComposing: Type.Boolean({ readOnly: true }),
        key: Type.String({ readOnly: true }),
        keyCode: Type.Number({ readOnly: true }),
        location: Type.Number({ readOnly: true }),
        metaKey: Type.Boolean({ readOnly: true }),
        repeat: Type.Boolean({ readOnly: true }),
        shiftKey: Type.Boolean({ readOnly: true }),
      },
      { description: "A key went down or came up, and which key it was." },
    ),
    InputEvent: Type.Interface(
      [Type.Ref("UIEvent")],
      {
        data: Type.Union([Type.String(), Type.Null()], { readOnly: true }),
        inputType: Type.String({ readOnly: true }),
        isComposing: Type.Boolean({ readOnly: true }),
      },
      { description: "The value of an editable element changed, and how." },
    ),
    CompositionEvent: Type.Interface(
      [Type.Ref("UIEvent")],
      {
        data: Type.String({ readOnly: true }),
      },
      { description: "Text is being composed \u2014 an input method is part-way through a character." },
    ),
    FocusEvent: Type.Interface(
      [Type.Ref("UIEvent")],
      {
        relatedTarget: Type.Union([Type.Ref("EventTarget"), Type.Null()], { readOnly: true }),
      },
      { description: "Focus arrived or left." },
    ),
    TouchEvent: Type.Interface(
      [Type.Ref("UIEvent")],
      {
        altKey: Type.Boolean({ readOnly: true }),
        ctrlKey: Type.Boolean({ readOnly: true }),
        metaKey: Type.Boolean({ readOnly: true }),
        shiftKey: Type.Boolean({ readOnly: true }),
      },
      { description: "Fingers on a screen. The lists of touches are `TouchList`s, which this schema does not declare." },
    ),
    ClipboardEvent: Type.Interface(
      [Type.Ref("Event")],
      {
      },
      { description: "A copy, cut or paste. What is on the clipboard is a `DataTransfer`, which this schema does not declare." },
    ),
    SubmitEvent: Type.Interface(
      [Type.Ref("Event")],
      {
      },
      { description: "A form was submitted. The submitter is an `HTMLElement`, which this schema does not declare." },
    ),
    ToggleEvent: Type.Interface(
      [Type.Ref("Event")],
      {
        newState: Type.String({ readOnly: true }),
        oldState: Type.String({ readOnly: true }),
      },
      { description: "Something that opens and closes did." },
    ),
    AnimationEvent: Type.Interface(
      [Type.Ref("Event")],
      {
        animationName: Type.String({ readOnly: true }),
        elapsedTime: Type.Number({ readOnly: true }),
        pseudoElement: Type.String({ readOnly: true }),
      },
      { description: "A CSS animation reached one of its edges." },
    ),
    TransitionEvent: Type.Interface(
      [Type.Ref("Event")],
      {
        elapsedTime: Type.Number({ readOnly: true }),
        propertyName: Type.String({ readOnly: true }),
        pseudoElement: Type.String({ readOnly: true }),
      },
      { description: "A CSS transition reached one of its edges." },
    ),
    ProgressEvent: Type.Interface(
      [Type.Ref("Event")],
      {
        lengthComputable: Type.Boolean({ readOnly: true }),
        loaded: Type.Number({ readOnly: true }),
        total: Type.Number({ readOnly: true }),
      },
      { description: "Something loading said how far it had got." },
    ),
    ErrorEvent: Type.Interface(
      [Type.Ref("Event")],
      {
        colno: Type.Number({ readOnly: true }),
        filename: Type.String({ readOnly: true }),
        lineno: Type.Number({ readOnly: true }),
        message: Type.String({ readOnly: true }),
      },
      { description: "Something failed, and said where." },
    ),
    HtmlNode: Type.Union([
      Type.Ref("ClientElement"),
      Type.String(),
      Type.Number(),
      Type.Null(),
    ]),

    Booleanish: Type.Union([
      Type.Boolean(),
      Type.Literal("true"),
      Type.Literal("false"),
    ]),
    Numeric: Type.Union([Type.Number(), Type.String()]),
    AriaRole: Type.Union([
      Type.Literal("alert"),
      Type.Literal("alertdialog"),
      Type.Literal("application"),
      Type.Literal("article"),
      Type.Literal("banner"),
      Type.Literal("button"),
      Type.Literal("cell"),
      Type.Literal("checkbox"),
      Type.Literal("columnheader"),
      Type.Literal("combobox"),
      Type.Literal("complementary"),
      Type.Literal("contentinfo"),
      Type.Literal("definition"),
      Type.Literal("dialog"),
      Type.Literal("directory"),
      Type.Literal("document"),
      Type.Literal("feed"),
      Type.Literal("figure"),
      Type.Literal("form"),
      Type.Literal("grid"),
      Type.Literal("gridcell"),
      Type.Literal("group"),
      Type.Literal("heading"),
      Type.Literal("img"),
      Type.Literal("link"),
      Type.Literal("list"),
      Type.Literal("listbox"),
      Type.Literal("listitem"),
      Type.Literal("log"),
      Type.Literal("main"),
      Type.Literal("marquee"),
      Type.Literal("math"),
      Type.Literal("menu"),
      Type.Literal("menubar"),
      Type.Literal("menuitem"),
      Type.Literal("menuitemcheckbox"),
      Type.Literal("menuitemradio"),
      Type.Literal("navigation"),
      Type.Literal("none"),
      Type.Literal("note"),
      Type.Literal("option"),
      Type.Literal("presentation"),
      Type.Literal("progressbar"),
      Type.Literal("radio"),
      Type.Literal("radiogroup"),
      Type.Literal("region"),
      Type.Literal("row"),
      Type.Literal("rowgroup"),
      Type.Literal("rowheader"),
      Type.Literal("scrollbar"),
      Type.Literal("search"),
      Type.Literal("searchbox"),
      Type.Literal("separator"),
      Type.Literal("slider"),
      Type.Literal("spinbutton"),
      Type.Literal("status"),
      Type.Literal("switch"),
      Type.Literal("tab"),
      Type.Literal("table"),
      Type.Literal("tablist"),
      Type.Literal("tabpanel"),
      Type.Literal("term"),
      Type.Literal("textbox"),
      Type.Literal("timer"),
      Type.Literal("toolbar"),
      Type.Literal("tooltip"),
      Type.Literal("tree"),
      Type.Literal("treegrid"),
      Type.Literal("treeitem"),
    ]),
    ReferrerPolicy: Type.Union([
      Type.Literal(""),
      Type.Literal("no-referrer"),
      Type.Literal("no-referrer-when-downgrade"),
      Type.Literal("origin"),
      Type.Literal("origin-when-cross-origin"),
      Type.Literal("same-origin"),
      Type.Literal("strict-origin"),
      Type.Literal("strict-origin-when-cross-origin"),
      Type.Literal("unsafe-url"),
    ]),
    CrossOrigin: Type.Union([
      Type.Literal("anonymous"),
      Type.Literal("use-credentials"),
      Type.Literal(""),
    ]),
    Target: Type.Union([
      Type.Literal("_self"),
      Type.Literal("_blank"),
      Type.Literal("_parent"),
      Type.Literal("_top"),
    ]),
    AriaAttributes: Type.Interface([], {
      "aria-activedescendant": Type.Optional(Type.String()),
      "aria-atomic": Type.Optional(Type.Ref("Booleanish")),
      "aria-autocomplete": Type.Optional(
        Type.Union([
          Type.Literal("none"),
          Type.Literal("inline"),
          Type.Literal("list"),
          Type.Literal("both"),
        ]),
      ),
      "aria-braillelabel": Type.Optional(Type.String()),
      "aria-brailleroledescription": Type.Optional(Type.String()),
      "aria-busy": Type.Optional(Type.Ref("Booleanish")),
      "aria-checked": Type.Optional(
        Type.Union([
          Type.Boolean(),
          Type.Literal("false"),
          Type.Literal("mixed"),
          Type.Literal("true"),
        ]),
      ),
      "aria-colcount": Type.Optional(Type.Number()),
      "aria-colindex": Type.Optional(Type.Number()),
      "aria-colindextext": Type.Optional(Type.String()),
      "aria-colspan": Type.Optional(Type.Number()),
      "aria-controls": Type.Optional(Type.String()),
      "aria-current": Type.Optional(
        Type.Union([
          Type.Boolean(),
          Type.Literal("false"),
          Type.Literal("true"),
          Type.Literal("page"),
          Type.Literal("step"),
          Type.Literal("location"),
          Type.Literal("date"),
          Type.Literal("time"),
        ]),
      ),
      "aria-describedby": Type.Optional(Type.String()),
      "aria-description": Type.Optional(Type.String()),
      "aria-details": Type.Optional(Type.String()),
      "aria-disabled": Type.Optional(Type.Ref("Booleanish")),
      "aria-errormessage": Type.Optional(Type.String()),
      "aria-expanded": Type.Optional(Type.Ref("Booleanish")),
      "aria-flowto": Type.Optional(Type.String()),
      "aria-haspopup": Type.Optional(
        Type.Union([
          Type.Boolean(),
          Type.Literal("false"),
          Type.Literal("true"),
          Type.Literal("menu"),
          Type.Literal("listbox"),
          Type.Literal("tree"),
          Type.Literal("grid"),
          Type.Literal("dialog"),
        ]),
      ),
      "aria-hidden": Type.Optional(Type.Ref("Booleanish")),
      "aria-invalid": Type.Optional(
        Type.Union([
          Type.Boolean(),
          Type.Literal("false"),
          Type.Literal("true"),
          Type.Literal("grammar"),
          Type.Literal("spelling"),
        ]),
      ),
      "aria-keyshortcuts": Type.Optional(Type.String()),
      "aria-label": Type.Optional(Type.String()),
      "aria-labelledby": Type.Optional(Type.String()),
      "aria-level": Type.Optional(Type.Number()),
      "aria-live": Type.Optional(
        Type.Union([
          Type.Literal("off"),
          Type.Literal("assertive"),
          Type.Literal("polite"),
        ]),
      ),
      "aria-modal": Type.Optional(Type.Ref("Booleanish")),
      "aria-multiline": Type.Optional(Type.Ref("Booleanish")),
      "aria-multiselectable": Type.Optional(Type.Ref("Booleanish")),
      "aria-orientation": Type.Optional(
        Type.Union([Type.Literal("horizontal"), Type.Literal("vertical")]),
      ),
      "aria-owns": Type.Optional(Type.String()),
      "aria-placeholder": Type.Optional(Type.String()),
      "aria-posinset": Type.Optional(Type.Number()),
      "aria-pressed": Type.Optional(
        Type.Union([
          Type.Boolean(),
          Type.Literal("false"),
          Type.Literal("mixed"),
          Type.Literal("true"),
        ]),
      ),
      "aria-readonly": Type.Optional(Type.Ref("Booleanish")),
      "aria-relevant": Type.Optional(
        Type.Union([
          Type.Literal("additions"),
          Type.Literal("additions removals"),
          Type.Literal("additions text"),
          Type.Literal("all"),
          Type.Literal("removals"),
          Type.Literal("removals additions"),
          Type.Literal("removals text"),
          Type.Literal("text"),
          Type.Literal("text additions"),
          Type.Literal("text removals"),
        ]),
      ),
      "aria-required": Type.Optional(Type.Ref("Booleanish")),
      "aria-roledescription": Type.Optional(Type.String()),
      "aria-rowcount": Type.Optional(Type.Number()),
      "aria-rowindex": Type.Optional(Type.Number()),
      "aria-rowindextext": Type.Optional(Type.String()),
      "aria-rowspan": Type.Optional(Type.Number()),
      "aria-selected": Type.Optional(Type.Ref("Booleanish")),
      "aria-setsize": Type.Optional(Type.Number()),
      "aria-sort": Type.Optional(
        Type.Union([
          Type.Literal("none"),
          Type.Literal("ascending"),
          Type.Literal("descending"),
          Type.Literal("other"),
        ]),
      ),
      "aria-valuemax": Type.Optional(Type.Number()),
      "aria-valuemin": Type.Optional(Type.Number()),
      "aria-valuenow": Type.Optional(Type.Number()),
      "aria-valuetext": Type.Optional(Type.String()),
    }),
    Events: Type.Interface([], {
      oncopy: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("ClipboardEvent"))],
          Type.Void(),
        ),
      ),
      oncut: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("ClipboardEvent"))],
          Type.Void(),
        ),
      ),
      onpaste: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("ClipboardEvent"))],
          Type.Void(),
        ),
      ),
      oncompositionend: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("CompositionEvent"))],
          Type.Void(),
        ),
      ),
      oncompositionstart: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("CompositionEvent"))],
          Type.Void(),
        ),
      ),
      oncompositionupdate: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("CompositionEvent"))],
          Type.Void(),
        ),
      ),
      onblur: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("FocusEvent"))],
          Type.Void(),
        ),
      ),
      onfocus: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("FocusEvent"))],
          Type.Void(),
        ),
      ),
      onfocusin: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("FocusEvent"))],
          Type.Void(),
        ),
      ),
      onfocusout: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("FocusEvent"))],
          Type.Void(),
        ),
      ),
      onbeforeinput: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("InputEvent"))],
          Type.Void(),
        ),
      ),
      onchange: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("Event"))],
          Type.Void(),
        ),
      ),
      oninput: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("InputEvent"))],
          Type.Void(),
        ),
      ),
      oninvalid: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("Event"))],
          Type.Void(),
        ),
      ),
      onreset: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("Event"))],
          Type.Void(),
        ),
      ),
      onselect: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("Event"))],
          Type.Void(),
        ),
      ),
      onsubmit: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("SubmitEvent"))],
          Type.Void(),
        ),
      ),
      onerror: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("ErrorEvent"))],
          Type.Void(),
        ),
      ),
      onload: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("Event"))],
          Type.Void(),
        ),
      ),
      onkeydown: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("KeyboardEvent"))],
          Type.Void(),
        ),
      ),
      onkeypress: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("KeyboardEvent"))],
          Type.Void(),
        ),
      ),
      onkeyup: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("KeyboardEvent"))],
          Type.Void(),
        ),
      ),
      onabort: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("UIEvent"))],
          Type.Void(),
        ),
      ),
      oncanplay: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("Event"))],
          Type.Void(),
        ),
      ),
      oncanplaythrough: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("Event"))],
          Type.Void(),
        ),
      ),
      ondurationchange: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("Event"))],
          Type.Void(),
        ),
      ),
      onemptied: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("Event"))],
          Type.Void(),
        ),
      ),
      onended: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("Event"))],
          Type.Void(),
        ),
      ),
      onloadeddata: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("Event"))],
          Type.Void(),
        ),
      ),
      onloadedmetadata: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("Event"))],
          Type.Void(),
        ),
      ),
      onloadstart: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("Event"))],
          Type.Void(),
        ),
      ),
      onpause: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("Event"))],
          Type.Void(),
        ),
      ),
      onplay: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("Event"))],
          Type.Void(),
        ),
      ),
      onplaying: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("Event"))],
          Type.Void(),
        ),
      ),
      onprogress: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("ProgressEvent"))],
          Type.Void(),
        ),
      ),
      onratechange: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("Event"))],
          Type.Void(),
        ),
      ),
      onseeked: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("Event"))],
          Type.Void(),
        ),
      ),
      onseeking: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("Event"))],
          Type.Void(),
        ),
      ),
      onstalled: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("Event"))],
          Type.Void(),
        ),
      ),
      onsuspend: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("Event"))],
          Type.Void(),
        ),
      ),
      ontimeupdate: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("Event"))],
          Type.Void(),
        ),
      ),
      onvolumechange: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("Event"))],
          Type.Void(),
        ),
      ),
      onwaiting: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("Event"))],
          Type.Void(),
        ),
      ),
      onauxclick: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("PointerEvent"))],
          Type.Void(),
        ),
      ),
      onclick: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("PointerEvent"))],
          Type.Void(),
        ),
      ),
      oncontextmenu: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("PointerEvent"))],
          Type.Void(),
        ),
      ),
      ondblclick: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("MouseEvent"))],
          Type.Void(),
        ),
      ),
      onmousedown: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("MouseEvent"))],
          Type.Void(),
        ),
      ),
      onmouseenter: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("MouseEvent"))],
          Type.Void(),
        ),
      ),
      onmouseleave: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("MouseEvent"))],
          Type.Void(),
        ),
      ),
      onmousemove: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("MouseEvent"))],
          Type.Void(),
        ),
      ),
      onmouseout: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("MouseEvent"))],
          Type.Void(),
        ),
      ),
      onmouseover: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("MouseEvent"))],
          Type.Void(),
        ),
      ),
      onmouseup: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("MouseEvent"))],
          Type.Void(),
        ),
      ),
      ondrag: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("DragEvent"))],
          Type.Void(),
        ),
      ),
      ondragend: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("DragEvent"))],
          Type.Void(),
        ),
      ),
      ondragenter: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("DragEvent"))],
          Type.Void(),
        ),
      ),
      ondragleave: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("DragEvent"))],
          Type.Void(),
        ),
      ),
      ondragover: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("DragEvent"))],
          Type.Void(),
        ),
      ),
      ondragstart: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("DragEvent"))],
          Type.Void(),
        ),
      ),
      ondrop: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("DragEvent"))],
          Type.Void(),
        ),
      ),
      ontouchcancel: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("TouchEvent"))],
          Type.Void(),
        ),
      ),
      ontouchend: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("TouchEvent"))],
          Type.Void(),
        ),
      ),
      ontouchmove: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("TouchEvent"))],
          Type.Void(),
        ),
      ),
      ontouchstart: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("TouchEvent"))],
          Type.Void(),
        ),
      ),
      ongotpointercapture: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("PointerEvent"))],
          Type.Void(),
        ),
      ),
      onlostpointercapture: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("PointerEvent"))],
          Type.Void(),
        ),
      ),
      onpointercancel: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("PointerEvent"))],
          Type.Void(),
        ),
      ),
      onpointerdown: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("PointerEvent"))],
          Type.Void(),
        ),
      ),
      onpointerenter: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("PointerEvent"))],
          Type.Void(),
        ),
      ),
      onpointerleave: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("PointerEvent"))],
          Type.Void(),
        ),
      ),
      onpointermove: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("PointerEvent"))],
          Type.Void(),
        ),
      ),
      onpointerout: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("PointerEvent"))],
          Type.Void(),
        ),
      ),
      onpointerover: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("PointerEvent"))],
          Type.Void(),
        ),
      ),
      onpointerup: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("PointerEvent"))],
          Type.Void(),
        ),
      ),
      onscroll: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("Event"))],
          Type.Void(),
        ),
      ),
      onscrollend: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("Event"))],
          Type.Void(),
        ),
      ),
      onwheel: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("WheelEvent"))],
          Type.Void(),
        ),
      ),
      onanimationend: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("AnimationEvent"))],
          Type.Void(),
        ),
      ),
      onanimationiteration: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("AnimationEvent"))],
          Type.Void(),
        ),
      ),
      onanimationstart: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("AnimationEvent"))],
          Type.Void(),
        ),
      ),
      ontransitioncancel: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("TransitionEvent"))],
          Type.Void(),
        ),
      ),
      ontransitionend: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("TransitionEvent"))],
          Type.Void(),
        ),
      ),
      ontransitionrun: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("TransitionEvent"))],
          Type.Void(),
        ),
      ),
      ontransitionstart: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("TransitionEvent"))],
          Type.Void(),
        ),
      ),
      onbeforetoggle: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("ToggleEvent"))],
          Type.Void(),
        ),
      ),
      ontoggle: Type.Optional(
        Type.Function(
          [Type.FunctionParameter("event", Type.Ref("ToggleEvent"))],
          Type.Void(),
        ),
      ),
    }),
    GlobalAttributes: Type.Interface(
      [Type.Ref("AriaAttributes"), Type.Ref("Events")],
      {
        accesskey: Type.Optional(Type.String()),
        autocapitalize: Type.Optional(
          Type.Union([
            Type.Literal("off"),
            Type.Literal("none"),
            Type.Literal("on"),
            Type.Literal("sentences"),
            Type.Literal("words"),
            Type.Literal("characters"),
          ]),
        ),
        autocorrect: Type.Optional(
          Type.Union([Type.Literal("on"), Type.Literal("off")]),
        ),
        autofocus: Type.Optional(Type.Boolean()),
        class: Type.Optional(Type.String()),
        contenteditable: Type.Optional(
          Type.Union([
            Type.Ref("Booleanish"),
            Type.Literal("inherit"),
            Type.Literal("plaintext-only"),
          ]),
        ),
        dir: Type.Optional(
          Type.Union([
            Type.Literal("ltr"),
            Type.Literal("rtl"),
            Type.Literal("auto"),
          ]),
        ),
        draggable: Type.Optional(Type.Ref("Booleanish")),
        enterkeyhint: Type.Optional(
          Type.Union([
            Type.Literal("enter"),
            Type.Literal("done"),
            Type.Literal("go"),
            Type.Literal("next"),
            Type.Literal("previous"),
            Type.Literal("search"),
            Type.Literal("send"),
          ]),
        ),
        exportparts: Type.Optional(Type.String()),
        hidden: Type.Optional(
          Type.Union([Type.Boolean(), Type.Literal("until-found")]),
        ),
        id: Type.Optional(Type.String()),
        inert: Type.Optional(Type.Boolean()),
        inputmode: Type.Optional(
          Type.Union([
            Type.Literal("none"),
            Type.Literal("text"),
            Type.Literal("tel"),
            Type.Literal("url"),
            Type.Literal("email"),
            Type.Literal("numeric"),
            Type.Literal("decimal"),
            Type.Literal("search"),
          ]),
        ),
        is: Type.Optional(Type.String()),
        itemid: Type.Optional(Type.String()),
        itemprop: Type.Optional(Type.String()),
        itemref: Type.Optional(Type.String()),
        itemscope: Type.Optional(Type.Boolean()),
        itemtype: Type.Optional(Type.String()),
        lang: Type.Optional(Type.String()),
        nonce: Type.Optional(Type.String()),
        part: Type.Optional(Type.String()),
        popover: Type.Optional(
          Type.Union([
            Type.Literal(""),
            Type.Literal("auto"),
            Type.Literal("manual"),
            Type.Literal("hint"),
          ]),
        ),
        role: Type.Optional(Type.Ref("AriaRole")),
        // Every `.svg` file's root carries it, so every paste does.
        xmlns: Type.Optional(Type.String()),
        slot: Type.Optional(Type.String()),
        spellcheck: Type.Optional(Type.Ref("Booleanish")),
        style: Type.Optional(Type.String()),
        tabindex: Type.Optional(Type.Number()),
        title: Type.Optional(Type.String()),
        translate: Type.Optional(
          Type.Union([Type.Literal("yes"), Type.Literal("no")]),
        ),
      },
    ),
    VoidProps: Type.Interface([Type.Ref("GlobalAttributes")], {}),
    HtmlProps: Type.Interface([Type.Ref("GlobalAttributes")], {
      children: Type.Optional(Type.Ref("HtmlNode")),
    }),
    AnchorProps: Type.Interface([Type.Ref("HtmlProps")], {
      download: Type.Optional(Type.Union([Type.String(), Type.Boolean()])),
      href: Type.Optional(Type.String()),
      hreflang: Type.Optional(Type.String()),
      media: Type.Optional(Type.String()),
      ping: Type.Optional(Type.String()),
      referrerpolicy: Type.Optional(Type.Ref("ReferrerPolicy")),
      rel: Type.Optional(Type.String()),
      target: Type.Optional(Type.Ref("Target")),
      type: Type.Optional(Type.String()),
    }),
    AreaProps: Type.Interface([Type.Ref("VoidProps")], {
      alt: Type.Optional(Type.String()),
      coords: Type.Optional(Type.String()),
      download: Type.Optional(Type.Union([Type.String(), Type.Boolean()])),
      href: Type.Optional(Type.String()),
      referrerpolicy: Type.Optional(Type.Ref("ReferrerPolicy")),
      rel: Type.Optional(Type.String()),
      shape: Type.Optional(
        Type.Union([
          Type.Literal("rect"),
          Type.Literal("circle"),
          Type.Literal("poly"),
          Type.Literal("default"),
        ]),
      ),
      target: Type.Optional(Type.Ref("Target")),
    }),
    BaseProps: Type.Interface([Type.Ref("VoidProps")], {
      href: Type.Optional(Type.String()),
      target: Type.Optional(Type.Ref("Target")),
    }),
    BlockquoteProps: Type.Interface([Type.Ref("HtmlProps")], {
      cite: Type.Optional(Type.String()),
    }),
    ButtonProps: Type.Interface([Type.Ref("HtmlProps")], {
      disabled: Type.Optional(Type.Boolean()),
      form: Type.Optional(Type.String()),
      formaction: Type.Optional(Type.String()),
      formenctype: Type.Optional(Type.String()),
      formmethod: Type.Optional(
        Type.Union([
          Type.Literal("get"),
          Type.Literal("post"),
          Type.Literal("dialog"),
        ]),
      ),
      formnovalidate: Type.Optional(Type.Boolean()),
      formtarget: Type.Optional(Type.Ref("Target")),
      name: Type.Optional(Type.String()),
      popovertarget: Type.Optional(Type.String()),
      popovertargetaction: Type.Optional(
        Type.Union([
          Type.Literal("toggle"),
          Type.Literal("show"),
          Type.Literal("hide"),
        ]),
      ),
      type: Type.Optional(
        Type.Union([
          Type.Literal("submit"),
          Type.Literal("reset"),
          Type.Literal("button"),
        ]),
      ),
      value: Type.Optional(Type.Union([Type.String(), Type.Number()])),
    }),
    CanvasProps: Type.Interface([Type.Ref("HtmlProps")], {
      height: Type.Optional(Type.Ref("Numeric")),
      width: Type.Optional(Type.Ref("Numeric")),
    }),
    ColProps: Type.Interface([Type.Ref("VoidProps")], {
      span: Type.Optional(Type.Number()),
      width: Type.Optional(Type.Ref("Numeric")),
    }),
    ColgroupProps: Type.Interface([Type.Ref("HtmlProps")], {
      span: Type.Optional(Type.Number()),
    }),
    DataProps: Type.Interface([Type.Ref("HtmlProps")], {
      value: Type.Optional(Type.Union([Type.String(), Type.Number()])),
    }),
    DelProps: Type.Interface([Type.Ref("HtmlProps")], {
      cite: Type.Optional(Type.String()),
      datetime: Type.Optional(Type.String()),
    }),
    DetailsProps: Type.Interface([Type.Ref("HtmlProps")], {
      name: Type.Optional(Type.String()),
      open: Type.Optional(Type.Boolean()),
    }),
    DialogProps: Type.Interface([Type.Ref("HtmlProps")], {
      closedby: Type.Optional(
        Type.Union([
          Type.Literal("any"),
          Type.Literal("closerequest"),
          Type.Literal("none"),
        ]),
      ),
      open: Type.Optional(Type.Boolean()),
    }),
    EmbedProps: Type.Interface([Type.Ref("VoidProps")], {
      height: Type.Optional(Type.Ref("Numeric")),
      src: Type.Optional(Type.String()),
      type: Type.Optional(Type.String()),
      width: Type.Optional(Type.Ref("Numeric")),
    }),
    FieldsetProps: Type.Interface([Type.Ref("HtmlProps")], {
      disabled: Type.Optional(Type.Boolean()),
      form: Type.Optional(Type.String()),
      name: Type.Optional(Type.String()),
    }),
    FormProps: Type.Interface([Type.Ref("HtmlProps")], {
      "accept-charset": Type.Optional(Type.String()),
      action: Type.Optional(Type.String()),
      autocomplete: Type.Optional(
        Type.Union([Type.Literal("on"), Type.Literal("off")]),
      ),
      enctype: Type.Optional(Type.String()),
      method: Type.Optional(
        Type.Union([
          Type.Literal("get"),
          Type.Literal("post"),
          Type.Literal("dialog"),
        ]),
      ),
      name: Type.Optional(Type.String()),
      novalidate: Type.Optional(Type.Boolean()),
      rel: Type.Optional(Type.String()),
      target: Type.Optional(Type.Ref("Target")),
    }),
    HtmlElementProps: Type.Interface([Type.Ref("HtmlProps")], {
      manifest: Type.Optional(Type.String()),
    }),
    IframeProps: Type.Interface([Type.Ref("HtmlProps")], {
      allow: Type.Optional(Type.String()),
      allowfullscreen: Type.Optional(Type.Boolean()),
      height: Type.Optional(Type.Ref("Numeric")),
      loading: Type.Optional(
        Type.Union([Type.Literal("eager"), Type.Literal("lazy")]),
      ),
      name: Type.Optional(Type.String()),
      referrerpolicy: Type.Optional(Type.Ref("ReferrerPolicy")),
      sandbox: Type.Optional(Type.String()),
      src: Type.Optional(Type.String()),
      srcdoc: Type.Optional(Type.String()),
      width: Type.Optional(Type.Ref("Numeric")),
    }),
    ImgProps: Type.Interface([Type.Ref("VoidProps")], {
      alt: Type.Optional(Type.String()),
      crossorigin: Type.Optional(Type.Ref("CrossOrigin")),
      decoding: Type.Optional(
        Type.Union([
          Type.Literal("async"),
          Type.Literal("auto"),
          Type.Literal("sync"),
        ]),
      ),
      fetchpriority: Type.Optional(
        Type.Union([
          Type.Literal("high"),
          Type.Literal("low"),
          Type.Literal("auto"),
        ]),
      ),
      height: Type.Optional(Type.Ref("Numeric")),
      loading: Type.Optional(
        Type.Union([Type.Literal("eager"), Type.Literal("lazy")]),
      ),
      referrerpolicy: Type.Optional(Type.Ref("ReferrerPolicy")),
      sizes: Type.Optional(Type.String()),
      src: Type.Optional(Type.String()),
      srcset: Type.Optional(Type.String()),
      usemap: Type.Optional(Type.String()),
      width: Type.Optional(Type.Ref("Numeric")),
    }),
    InputProps: Type.Interface([Type.Ref("VoidProps")], {
      accept: Type.Optional(Type.String()),
      alt: Type.Optional(Type.String()),
      autocomplete: Type.Optional(Type.String()),
      capture: Type.Optional(
        Type.Union([
          Type.Boolean(),
          Type.Literal("user"),
          Type.Literal("environment"),
        ]),
      ),
      checked: Type.Optional(Type.Boolean()),
      dirname: Type.Optional(Type.String()),
      disabled: Type.Optional(Type.Boolean()),
      form: Type.Optional(Type.String()),
      formaction: Type.Optional(Type.String()),
      formenctype: Type.Optional(Type.String()),
      formmethod: Type.Optional(
        Type.Union([
          Type.Literal("get"),
          Type.Literal("post"),
          Type.Literal("dialog"),
        ]),
      ),
      formnovalidate: Type.Optional(Type.Boolean()),
      formtarget: Type.Optional(Type.Ref("Target")),
      height: Type.Optional(Type.Ref("Numeric")),
      list: Type.Optional(Type.String()),
      max: Type.Optional(Type.Ref("Numeric")),
      maxlength: Type.Optional(Type.Number()),
      min: Type.Optional(Type.Ref("Numeric")),
      minlength: Type.Optional(Type.Number()),
      multiple: Type.Optional(Type.Boolean()),
      name: Type.Optional(Type.String()),
      pattern: Type.Optional(Type.String()),
      placeholder: Type.Optional(Type.String()),
      readonly: Type.Optional(Type.Boolean()),
      required: Type.Optional(Type.Boolean()),
      size: Type.Optional(Type.Number()),
      src: Type.Optional(Type.String()),
      step: Type.Optional(Type.Ref("Numeric")),
      type: Type.Optional(
        Type.Union([
          Type.Literal("button"),
          Type.Literal("checkbox"),
          Type.Literal("color"),
          Type.Literal("date"),
          Type.Literal("datetime-local"),
          Type.Literal("email"),
          Type.Literal("file"),
          Type.Literal("hidden"),
          Type.Literal("image"),
          Type.Literal("month"),
          Type.Literal("number"),
          Type.Literal("password"),
          Type.Literal("radio"),
          Type.Literal("range"),
          Type.Literal("reset"),
          Type.Literal("search"),
          Type.Literal("submit"),
          Type.Literal("tel"),
          Type.Literal("text"),
          Type.Literal("time"),
          Type.Literal("url"),
          Type.Literal("week"),
        ]),
      ),
      value: Type.Optional(Type.Union([Type.String(), Type.Number()])),
      width: Type.Optional(Type.Ref("Numeric")),
    }),
    InsProps: Type.Interface([Type.Ref("HtmlProps")], {
      cite: Type.Optional(Type.String()),
      datetime: Type.Optional(Type.String()),
    }),
    LabelProps: Type.Interface([Type.Ref("HtmlProps")], {
      for: Type.Optional(Type.String()),
      form: Type.Optional(Type.String()),
    }),
    LiProps: Type.Interface([Type.Ref("HtmlProps")], {
      value: Type.Optional(Type.Number()),
    }),
    LinkProps: Type.Interface([Type.Ref("VoidProps")], {
      as: Type.Optional(Type.String()),
      crossorigin: Type.Optional(Type.Ref("CrossOrigin")),
      fetchpriority: Type.Optional(
        Type.Union([
          Type.Literal("high"),
          Type.Literal("low"),
          Type.Literal("auto"),
        ]),
      ),
      href: Type.Optional(Type.String()),
      hreflang: Type.Optional(Type.String()),
      imagesizes: Type.Optional(Type.String()),
      imagesrcset: Type.Optional(Type.String()),
      integrity: Type.Optional(Type.String()),
      media: Type.Optional(Type.String()),
      referrerpolicy: Type.Optional(Type.Ref("ReferrerPolicy")),
      rel: Type.Optional(Type.String()),
      sizes: Type.Optional(Type.String()),
      type: Type.Optional(Type.String()),
    }),
    MapProps: Type.Interface([Type.Ref("HtmlProps")], {
      name: Type.Optional(Type.String()),
    }),
    MediaProps: Type.Interface([Type.Ref("HtmlProps")], {
      autoplay: Type.Optional(Type.Boolean()),
      controls: Type.Optional(Type.Boolean()),
      controlslist: Type.Optional(Type.String()),
      crossorigin: Type.Optional(Type.Ref("CrossOrigin")),
      loop: Type.Optional(Type.Boolean()),
      muted: Type.Optional(Type.Boolean()),
      preload: Type.Optional(
        Type.Union([
          Type.Literal("none"),
          Type.Literal("metadata"),
          Type.Literal("auto"),
          Type.Literal(""),
        ]),
      ),
      src: Type.Optional(Type.String()),
    }),
    MetaProps: Type.Interface([Type.Ref("VoidProps")], {
      charset: Type.Optional(Type.String()),
      content: Type.Optional(Type.String()),
      "http-equiv": Type.Optional(Type.String()),
      media: Type.Optional(Type.String()),
      name: Type.Optional(Type.String()),
    }),
    MeterProps: Type.Interface([Type.Ref("HtmlProps")], {
      form: Type.Optional(Type.String()),
      high: Type.Optional(Type.Number()),
      low: Type.Optional(Type.Number()),
      max: Type.Optional(Type.Ref("Numeric")),
      min: Type.Optional(Type.Ref("Numeric")),
      optimum: Type.Optional(Type.Number()),
      value: Type.Optional(Type.Union([Type.String(), Type.Number()])),
    }),
    ObjectProps: Type.Interface([Type.Ref("HtmlProps")], {
      data: Type.Optional(Type.String()),
      form: Type.Optional(Type.String()),
      height: Type.Optional(Type.Ref("Numeric")),
      name: Type.Optional(Type.String()),
      type: Type.Optional(Type.String()),
      usemap: Type.Optional(Type.String()),
      width: Type.Optional(Type.Ref("Numeric")),
    }),
    OlProps: Type.Interface([Type.Ref("HtmlProps")], {
      reversed: Type.Optional(Type.Boolean()),
      start: Type.Optional(Type.Number()),
      type: Type.Optional(
        Type.Union([
          Type.Literal("1"),
          Type.Literal("a"),
          Type.Literal("A"),
          Type.Literal("i"),
          Type.Literal("I"),
        ]),
      ),
    }),
    OptgroupProps: Type.Interface([Type.Ref("HtmlProps")], {
      disabled: Type.Optional(Type.Boolean()),
      label: Type.Optional(Type.String()),
    }),
    OptionProps: Type.Interface([Type.Ref("HtmlProps")], {
      disabled: Type.Optional(Type.Boolean()),
      label: Type.Optional(Type.String()),
      selected: Type.Optional(Type.Boolean()),
      value: Type.Optional(Type.Union([Type.String(), Type.Number()])),
    }),
    OutputProps: Type.Interface([Type.Ref("HtmlProps")], {
      for: Type.Optional(Type.String()),
      form: Type.Optional(Type.String()),
      name: Type.Optional(Type.String()),
    }),
    ProgressProps: Type.Interface([Type.Ref("HtmlProps")], {
      max: Type.Optional(Type.Ref("Numeric")),
      value: Type.Optional(Type.Union([Type.String(), Type.Number()])),
    }),
    QuoteProps: Type.Interface([Type.Ref("HtmlProps")], {
      cite: Type.Optional(Type.String()),
    }),
    ScriptProps: Type.Interface([Type.Ref("HtmlProps")], {
      async: Type.Optional(Type.Boolean()),
      crossorigin: Type.Optional(Type.Ref("CrossOrigin")),
      defer: Type.Optional(Type.Boolean()),
      fetchpriority: Type.Optional(
        Type.Union([
          Type.Literal("high"),
          Type.Literal("low"),
          Type.Literal("auto"),
        ]),
      ),
      integrity: Type.Optional(Type.String()),
      nomodule: Type.Optional(Type.Boolean()),
      referrerpolicy: Type.Optional(Type.Ref("ReferrerPolicy")),
      src: Type.Optional(Type.String()),
      type: Type.Optional(Type.String()),
    }),
    SelectProps: Type.Interface([Type.Ref("HtmlProps")], {
      autocomplete: Type.Optional(Type.String()),
      disabled: Type.Optional(Type.Boolean()),
      form: Type.Optional(Type.String()),
      multiple: Type.Optional(Type.Boolean()),
      name: Type.Optional(Type.String()),
      required: Type.Optional(Type.Boolean()),
      size: Type.Optional(Type.Number()),
      value: Type.Optional(Type.Union([Type.String(), Type.Number()])),
    }),
    SlotProps: Type.Interface([Type.Ref("HtmlProps")], {
      name: Type.Optional(Type.String()),
    }),
    SourceProps: Type.Interface([Type.Ref("VoidProps")], {
      height: Type.Optional(Type.Ref("Numeric")),
      media: Type.Optional(Type.String()),
      sizes: Type.Optional(Type.String()),
      src: Type.Optional(Type.String()),
      srcset: Type.Optional(Type.String()),
      type: Type.Optional(Type.String()),
      width: Type.Optional(Type.Ref("Numeric")),
    }),
    StyleProps: Type.Interface([Type.Ref("HtmlProps")], {
      media: Type.Optional(Type.String()),
      type: Type.Optional(Type.String()),
    }),
    TableProps: Type.Interface([Type.Ref("HtmlProps")], {
      summary: Type.Optional(Type.String()),
      width: Type.Optional(Type.Ref("Numeric")),
    }),
    TdProps: Type.Interface([Type.Ref("HtmlProps")], {
      colspan: Type.Optional(Type.Number()),
      headers: Type.Optional(Type.String()),
      rowspan: Type.Optional(Type.Number()),
    }),
    ThProps: Type.Interface([Type.Ref("HtmlProps")], {
      abbr: Type.Optional(Type.String()),
      colspan: Type.Optional(Type.Number()),
      headers: Type.Optional(Type.String()),
      rowspan: Type.Optional(Type.Number()),
      scope: Type.Optional(
        Type.Union([
          Type.Literal("row"),
          Type.Literal("col"),
          Type.Literal("rowgroup"),
          Type.Literal("colgroup"),
        ]),
      ),
    }),
    TextareaProps: Type.Interface([Type.Ref("HtmlProps")], {
      autocomplete: Type.Optional(Type.String()),
      cols: Type.Optional(Type.Number()),
      dirname: Type.Optional(Type.String()),
      disabled: Type.Optional(Type.Boolean()),
      form: Type.Optional(Type.String()),
      maxlength: Type.Optional(Type.Number()),
      minlength: Type.Optional(Type.Number()),
      name: Type.Optional(Type.String()),
      placeholder: Type.Optional(Type.String()),
      readonly: Type.Optional(Type.Boolean()),
      required: Type.Optional(Type.Boolean()),
      rows: Type.Optional(Type.Number()),
      value: Type.Optional(Type.Union([Type.String(), Type.Number()])),
      wrap: Type.Optional(
        Type.Union([
          Type.Literal("hard"),
          Type.Literal("soft"),
          Type.Literal("off"),
        ]),
      ),
    }),
    TimeProps: Type.Interface([Type.Ref("HtmlProps")], {
      datetime: Type.Optional(Type.String()),
    }),
    TrackProps: Type.Interface([Type.Ref("VoidProps")], {
      default: Type.Optional(Type.Boolean()),
      kind: Type.Optional(
        Type.Union([
          Type.Literal("subtitles"),
          Type.Literal("captions"),
          Type.Literal("descriptions"),
          Type.Literal("chapters"),
          Type.Literal("metadata"),
        ]),
      ),
      label: Type.Optional(Type.String()),
      src: Type.Optional(Type.String()),
      srclang: Type.Optional(Type.String()),
    }),
    VideoProps: Type.Interface([Type.Ref("MediaProps")], {
      disablepictureinpicture: Type.Optional(Type.Boolean()),
      disableremoteplayback: Type.Optional(Type.Boolean()),
      height: Type.Optional(Type.Ref("Numeric")),
      playsinline: Type.Optional(Type.Boolean()),
      poster: Type.Optional(Type.String()),
      width: Type.Optional(Type.Ref("Numeric")),
    }),

    // ---- SVG --------------------------------------------------------------
    //
    // A namespace of its own, and the ids say so: `svg:path` is a path in the
    // SVG namespace, where a bare `path` would be an HTML element no browser
    // knows. The prefix is what a client dispatches on — nothing else in the
    // format carries a namespace, and an id's meaning is the client's.
    //
    // Every tag is prefixed, the root included. One rule with no exception is
    // worth more than the four characters `svg:svg` costs: a client tests a
    // prefix and is done, and no reader has to remember which tag is special.
    //
    // It also settles the four names both languages use. React declares no SVG
    // `a`, `title`, `script` or `style` — its keys are flat, so HTML wins them
    // and its renderer sorts the namespace out at runtime. Prefixed, both are
    // sayable and nothing has to be resolved later.

    /** What every SVG element accepts.
     *
     * One bag rather than an interface per element, which is React's shape and
     * the reason a component written against its types checks here unchanged.
     * Looser than this file is elsewhere — a `circle` will take a `d` — and the
     * trade is deliberate: the alternative is 59 interfaces where a missing
     * attribute is a component that will not compile.
     *
     * The names are SVG's own, not React's: `stroke-width` where SVG spells
     * it with a hyphen, `viewBox` where SVG spells it camel. So a prop, the
     * name on the wire and the string handed to `setAttribute` are one name,
     * and no client carries a table to get from one to another.
     *
     * The cost is React's spelling: a component written against its types says
     * `strokeWidth` and has to be edited. An `.svg` file — which is what
     * anything drawing this actually starts from — pastes in unchanged. */
    SvgProps: Type.Interface([Type.Ref("AriaAttributes"), Type.Ref("Events")], {
      children: Type.Optional(Type.Ref("HtmlNode")),
      // The web schema's own, not a second spelling of them: SVG elements take
      // `class` and `onclick` because every element this target draws does.
      id: Type.Optional(Type.String()),
      class: Type.Optional(Type.String()),
      style: Type.Optional(Type.String()),
      lang: Type.Optional(Type.String()),
      tabindex: Type.Optional(Type.Number()),
      role: Type.Optional(Type.Ref("AriaRole")),
      // Every `.svg` file's root carries it, so every paste does.
      xmlns: Type.Optional(Type.String()),
      accentHeight: Type.Optional(Type.Ref("Numeric")),
      accumulate: Type.Optional(Type.String()),
      additive: Type.Optional(Type.String()),
      "alignment-baseline": Type.Optional(Type.String()),
      allowReorder: Type.Optional(Type.String()),
      alphabetic: Type.Optional(Type.Ref("Numeric")),
      amplitude: Type.Optional(Type.Ref("Numeric")),
      arabicForm: Type.Optional(Type.String()),
      ascent: Type.Optional(Type.Ref("Numeric")),
      attributeName: Type.Optional(Type.String()),
      attributeType: Type.Optional(Type.String()),
      autoReverse: Type.Optional(Type.Ref("Booleanish")),
      azimuth: Type.Optional(Type.Ref("Numeric")),
      baseFrequency: Type.Optional(Type.Ref("Numeric")),
      baseProfile: Type.Optional(Type.Ref("Numeric")),
      "baseline-shift": Type.Optional(Type.Ref("Numeric")),
      bbox: Type.Optional(Type.Ref("Numeric")),
      begin: Type.Optional(Type.Ref("Numeric")),
      bias: Type.Optional(Type.Ref("Numeric")),
      by: Type.Optional(Type.Ref("Numeric")),
      calcMode: Type.Optional(Type.Ref("Numeric")),
      capHeight: Type.Optional(Type.Ref("Numeric")),
      clip: Type.Optional(Type.Ref("Numeric")),
      "clip-path": Type.Optional(Type.String()),
      clipPathUnits: Type.Optional(Type.Ref("Numeric")),
      "clip-rule": Type.Optional(Type.Ref("Numeric")),
      color: Type.Optional(Type.String()),
      "color-interpolation": Type.Optional(Type.Ref("Numeric")),
      "color-interpolation-filters": Type.Optional(Type.String()),
      "color-profile": Type.Optional(Type.Ref("Numeric")),
      "color-rendering": Type.Optional(Type.Ref("Numeric")),
      contentScriptType: Type.Optional(Type.Ref("Numeric")),
      contentStyleType: Type.Optional(Type.Ref("Numeric")),
      crossOrigin: Type.Optional(Type.String()),
      cursor: Type.Optional(Type.Ref("Numeric")),
      cx: Type.Optional(Type.Ref("Numeric")),
      cy: Type.Optional(Type.Ref("Numeric")),
      d: Type.Optional(Type.String()),
      decelerate: Type.Optional(Type.Ref("Numeric")),
      descent: Type.Optional(Type.Ref("Numeric")),
      diffuseConstant: Type.Optional(Type.Ref("Numeric")),
      direction: Type.Optional(Type.Ref("Numeric")),
      display: Type.Optional(Type.Ref("Numeric")),
      divisor: Type.Optional(Type.Ref("Numeric")),
      "dominant-baseline": Type.Optional(Type.Ref("Numeric")),
      dur: Type.Optional(Type.Ref("Numeric")),
      dx: Type.Optional(Type.Ref("Numeric")),
      dy: Type.Optional(Type.Ref("Numeric")),
      edgeMode: Type.Optional(Type.Ref("Numeric")),
      elevation: Type.Optional(Type.Ref("Numeric")),
      "enable-background": Type.Optional(Type.Ref("Numeric")),
      end: Type.Optional(Type.Ref("Numeric")),
      exponent: Type.Optional(Type.Ref("Numeric")),
      externalResourcesRequired: Type.Optional(Type.Ref("Booleanish")),
      fill: Type.Optional(Type.String()),
      "fill-opacity": Type.Optional(Type.Ref("Numeric")),
      "fill-rule": Type.Optional(Type.String()),
      filter: Type.Optional(Type.String()),
      filterRes: Type.Optional(Type.Ref("Numeric")),
      filterUnits: Type.Optional(Type.Ref("Numeric")),
      "flood-color": Type.Optional(Type.Ref("Numeric")),
      "flood-opacity": Type.Optional(Type.Ref("Numeric")),
      focusable: Type.Optional(Type.String()),
      "font-family": Type.Optional(Type.String()),
      "font-size": Type.Optional(Type.Ref("Numeric")),
      "font-size-adjust": Type.Optional(Type.Ref("Numeric")),
      "font-stretch": Type.Optional(Type.Ref("Numeric")),
      "font-style": Type.Optional(Type.Ref("Numeric")),
      "font-variant": Type.Optional(Type.Ref("Numeric")),
      "font-weight": Type.Optional(Type.Ref("Numeric")),
      format: Type.Optional(Type.Ref("Numeric")),
      fr: Type.Optional(Type.Ref("Numeric")),
      from: Type.Optional(Type.Ref("Numeric")),
      fx: Type.Optional(Type.Ref("Numeric")),
      fy: Type.Optional(Type.Ref("Numeric")),
      g1: Type.Optional(Type.Ref("Numeric")),
      g2: Type.Optional(Type.Ref("Numeric")),
      glyphName: Type.Optional(Type.Ref("Numeric")),
      "glyph-orientation-horizontal": Type.Optional(Type.Ref("Numeric")),
      "glyph-orientation-vertical": Type.Optional(Type.Ref("Numeric")),
      glyphRef: Type.Optional(Type.Ref("Numeric")),
      gradientTransform: Type.Optional(Type.String()),
      gradientUnits: Type.Optional(Type.String()),
      hanging: Type.Optional(Type.Ref("Numeric")),
      height: Type.Optional(Type.Ref("Numeric")),
      horizAdvX: Type.Optional(Type.Ref("Numeric")),
      horizOriginX: Type.Optional(Type.Ref("Numeric")),
      href: Type.Optional(Type.String()),
      ideographic: Type.Optional(Type.Ref("Numeric")),
      "image-rendering": Type.Optional(Type.Ref("Numeric")),
      in: Type.Optional(Type.String()),
      in2: Type.Optional(Type.Ref("Numeric")),
      intercept: Type.Optional(Type.Ref("Numeric")),
      k: Type.Optional(Type.Ref("Numeric")),
      k1: Type.Optional(Type.Ref("Numeric")),
      k2: Type.Optional(Type.Ref("Numeric")),
      k3: Type.Optional(Type.Ref("Numeric")),
      k4: Type.Optional(Type.Ref("Numeric")),
      kernelMatrix: Type.Optional(Type.Ref("Numeric")),
      kernelUnitLength: Type.Optional(Type.Ref("Numeric")),
      kerning: Type.Optional(Type.Ref("Numeric")),
      keyPoints: Type.Optional(Type.Ref("Numeric")),
      keySplines: Type.Optional(Type.Ref("Numeric")),
      keyTimes: Type.Optional(Type.Ref("Numeric")),
      lengthAdjust: Type.Optional(Type.Ref("Numeric")),
      "letter-spacing": Type.Optional(Type.Ref("Numeric")),
      "lighting-color": Type.Optional(Type.Ref("Numeric")),
      limitingConeAngle: Type.Optional(Type.Ref("Numeric")),
      local: Type.Optional(Type.Ref("Numeric")),
      "marker-end": Type.Optional(Type.String()),
      markerHeight: Type.Optional(Type.Ref("Numeric")),
      "marker-mid": Type.Optional(Type.String()),
      "marker-start": Type.Optional(Type.String()),
      markerUnits: Type.Optional(Type.Ref("Numeric")),
      markerWidth: Type.Optional(Type.Ref("Numeric")),
      mask: Type.Optional(Type.String()),
      maskContentUnits: Type.Optional(Type.Ref("Numeric")),
      maskUnits: Type.Optional(Type.Ref("Numeric")),
      mathematical: Type.Optional(Type.Ref("Numeric")),
      max: Type.Optional(Type.Ref("Numeric")),
      media: Type.Optional(Type.String()),
      method: Type.Optional(Type.String()),
      min: Type.Optional(Type.Ref("Numeric")),
      mode: Type.Optional(Type.Ref("Numeric")),
      name: Type.Optional(Type.String()),
      numOctaves: Type.Optional(Type.Ref("Numeric")),
      offset: Type.Optional(Type.Ref("Numeric")),
      opacity: Type.Optional(Type.Ref("Numeric")),
      operator: Type.Optional(Type.Ref("Numeric")),
      order: Type.Optional(Type.Ref("Numeric")),
      orient: Type.Optional(Type.Ref("Numeric")),
      orientation: Type.Optional(Type.Ref("Numeric")),
      origin: Type.Optional(Type.Ref("Numeric")),
      overflow: Type.Optional(Type.Ref("Numeric")),
      "overline-position": Type.Optional(Type.Ref("Numeric")),
      "overline-thickness": Type.Optional(Type.Ref("Numeric")),
      "paint-order": Type.Optional(Type.Ref("Numeric")),
      panose1: Type.Optional(Type.Ref("Numeric")),
      path: Type.Optional(Type.String()),
      pathLength: Type.Optional(Type.Ref("Numeric")),
      patternContentUnits: Type.Optional(Type.String()),
      patternTransform: Type.Optional(Type.Ref("Numeric")),
      patternUnits: Type.Optional(Type.String()),
      "pointer-events": Type.Optional(Type.Ref("Numeric")),
      points: Type.Optional(Type.String()),
      pointsAtX: Type.Optional(Type.Ref("Numeric")),
      pointsAtY: Type.Optional(Type.Ref("Numeric")),
      pointsAtZ: Type.Optional(Type.Ref("Numeric")),
      preserveAlpha: Type.Optional(Type.Ref("Booleanish")),
      preserveAspectRatio: Type.Optional(Type.String()),
      primitiveUnits: Type.Optional(Type.Ref("Numeric")),
      r: Type.Optional(Type.Ref("Numeric")),
      radius: Type.Optional(Type.Ref("Numeric")),
      refX: Type.Optional(Type.Ref("Numeric")),
      refY: Type.Optional(Type.Ref("Numeric")),
      "rendering-intent": Type.Optional(Type.Ref("Numeric")),
      repeatCount: Type.Optional(Type.Ref("Numeric")),
      repeatDur: Type.Optional(Type.Ref("Numeric")),
      requiredExtensions: Type.Optional(Type.Ref("Numeric")),
      requiredFeatures: Type.Optional(Type.Ref("Numeric")),
      restart: Type.Optional(Type.Ref("Numeric")),
      result: Type.Optional(Type.String()),
      rotate: Type.Optional(Type.Ref("Numeric")),
      rx: Type.Optional(Type.Ref("Numeric")),
      ry: Type.Optional(Type.Ref("Numeric")),
      scale: Type.Optional(Type.Ref("Numeric")),
      seed: Type.Optional(Type.Ref("Numeric")),
      "shape-rendering": Type.Optional(Type.Ref("Numeric")),
      slope: Type.Optional(Type.Ref("Numeric")),
      spacing: Type.Optional(Type.Ref("Numeric")),
      specularConstant: Type.Optional(Type.Ref("Numeric")),
      specularExponent: Type.Optional(Type.Ref("Numeric")),
      speed: Type.Optional(Type.Ref("Numeric")),
      spreadMethod: Type.Optional(Type.String()),
      startOffset: Type.Optional(Type.Ref("Numeric")),
      stdDeviation: Type.Optional(Type.Ref("Numeric")),
      stemh: Type.Optional(Type.Ref("Numeric")),
      stemv: Type.Optional(Type.Ref("Numeric")),
      stitchTiles: Type.Optional(Type.Ref("Numeric")),
      "stop-color": Type.Optional(Type.String()),
      "stop-opacity": Type.Optional(Type.Ref("Numeric")),
      "strikethrough-position": Type.Optional(Type.Ref("Numeric")),
      "strikethrough-thickness": Type.Optional(Type.Ref("Numeric")),
      string: Type.Optional(Type.Ref("Numeric")),
      stroke: Type.Optional(Type.String()),
      "stroke-dasharray": Type.Optional(Type.Ref("Numeric")),
      "stroke-dashoffset": Type.Optional(Type.Ref("Numeric")),
      "stroke-linecap": Type.Optional(Type.String()),
      "stroke-linejoin": Type.Optional(Type.String()),
      "stroke-miterlimit": Type.Optional(Type.Ref("Numeric")),
      "stroke-opacity": Type.Optional(Type.Ref("Numeric")),
      "stroke-width": Type.Optional(Type.Ref("Numeric")),
      surfaceScale: Type.Optional(Type.Ref("Numeric")),
      systemLanguage: Type.Optional(Type.Ref("Numeric")),
      tableValues: Type.Optional(Type.Ref("Numeric")),
      target: Type.Optional(Type.String()),
      targetX: Type.Optional(Type.Ref("Numeric")),
      targetY: Type.Optional(Type.Ref("Numeric")),
      "text-anchor": Type.Optional(Type.String()),
      "text-decoration": Type.Optional(Type.Ref("Numeric")),
      textLength: Type.Optional(Type.Ref("Numeric")),
      "text-rendering": Type.Optional(Type.Ref("Numeric")),
      to: Type.Optional(Type.Ref("Numeric")),
      transform: Type.Optional(Type.String()),
      type: Type.Optional(Type.String()),
      u1: Type.Optional(Type.Ref("Numeric")),
      u2: Type.Optional(Type.Ref("Numeric")),
      "underline-position": Type.Optional(Type.Ref("Numeric")),
      "underline-thickness": Type.Optional(Type.Ref("Numeric")),
      unicode: Type.Optional(Type.Ref("Numeric")),
      "unicode-bidi": Type.Optional(Type.Ref("Numeric")),
      "unicode-range": Type.Optional(Type.Ref("Numeric")),
      "units-per-em": Type.Optional(Type.Ref("Numeric")),
      "v-alphabetic": Type.Optional(Type.Ref("Numeric")),
      "v-hanging": Type.Optional(Type.Ref("Numeric")),
      "v-ideographic": Type.Optional(Type.Ref("Numeric")),
      "v-mathematical": Type.Optional(Type.Ref("Numeric")),
      values: Type.Optional(Type.String()),
      "vector-effect": Type.Optional(Type.Ref("Numeric")),
      version: Type.Optional(Type.String()),
      "vert-adv-y": Type.Optional(Type.Ref("Numeric")),
      "vert-origin-x": Type.Optional(Type.Ref("Numeric")),
      "vert-origin-y": Type.Optional(Type.Ref("Numeric")),
      viewBox: Type.Optional(Type.String()),
      viewTarget: Type.Optional(Type.Ref("Numeric")),
      visibility: Type.Optional(Type.Ref("Numeric")),
      width: Type.Optional(Type.Ref("Numeric")),
      widths: Type.Optional(Type.Ref("Numeric")),
      "word-spacing": Type.Optional(Type.Ref("Numeric")),
      "writing-mode": Type.Optional(Type.Ref("Numeric")),
      x: Type.Optional(Type.Ref("Numeric")),
      x1: Type.Optional(Type.Ref("Numeric")),
      x2: Type.Optional(Type.Ref("Numeric")),
      xChannelSelector: Type.Optional(Type.String()),
      xHeight: Type.Optional(Type.Ref("Numeric")),
      xlinkActuate: Type.Optional(Type.String()),
      xlinkArcrole: Type.Optional(Type.String()),
      xlinkHref: Type.Optional(Type.String()),
      xlinkRole: Type.Optional(Type.String()),
      xlinkShow: Type.Optional(Type.String()),
      xlinkTitle: Type.Optional(Type.String()),
      xlinkType: Type.Optional(Type.String()),
      xmlBase: Type.Optional(Type.String()),
      xmlLang: Type.Optional(Type.String()),
      xmlSpace: Type.Optional(Type.String()),
      xmlnsXlink: Type.Optional(Type.String()),
      y: Type.Optional(Type.Ref("Numeric")),
      y1: Type.Optional(Type.Ref("Numeric")),
      y2: Type.Optional(Type.Ref("Numeric")),
      yChannelSelector: Type.Optional(Type.String()),
      z: Type.Optional(Type.Ref("Numeric")),
      zoomAndPan: Type.Optional(Type.String()),
    }),
  },

  // Keyed by the name a script writes, which is also the id the wire carries
  // and the string `createElement` receives. What each holds is what it
  // accepts, and most of them accept the same shape — which is why this is a
  // map onto interfaces rather than 175 declarations.
  elements: {
    a: Type.Ref("AnchorProps"),
    abbr: Type.Ref("HtmlProps"),
    address: Type.Ref("HtmlProps"),
    area: Type.Ref("AreaProps"),
    article: Type.Ref("HtmlProps"),
    aside: Type.Ref("HtmlProps"),
    audio: Type.Ref("MediaProps"),
    b: Type.Ref("HtmlProps"),
    base: Type.Ref("BaseProps"),
    bdi: Type.Ref("HtmlProps"),
    bdo: Type.Ref("HtmlProps"),
    blockquote: Type.Ref("BlockquoteProps"),
    body: Type.Ref("HtmlProps"),
    br: Type.Ref("VoidProps"),
    button: Type.Ref("ButtonProps"),
    canvas: Type.Ref("CanvasProps"),
    caption: Type.Ref("HtmlProps"),
    cite: Type.Ref("HtmlProps"),
    code: Type.Ref("HtmlProps"),
    col: Type.Ref("ColProps"),
    colgroup: Type.Ref("ColgroupProps"),
    data: Type.Ref("DataProps"),
    datalist: Type.Ref("HtmlProps"),
    dd: Type.Ref("HtmlProps"),
    del: Type.Ref("DelProps"),
    details: Type.Ref("DetailsProps"),
    dfn: Type.Ref("HtmlProps"),
    dialog: Type.Ref("DialogProps"),
    div: Type.Ref("HtmlProps"),
    dl: Type.Ref("HtmlProps"),
    dt: Type.Ref("HtmlProps"),
    em: Type.Ref("HtmlProps"),
    embed: Type.Ref("EmbedProps"),
    fieldset: Type.Ref("FieldsetProps"),
    figcaption: Type.Ref("HtmlProps"),
    figure: Type.Ref("HtmlProps"),
    footer: Type.Ref("HtmlProps"),
    form: Type.Ref("FormProps"),
    h1: Type.Ref("HtmlProps"),
    h2: Type.Ref("HtmlProps"),
    h3: Type.Ref("HtmlProps"),
    h4: Type.Ref("HtmlProps"),
    h5: Type.Ref("HtmlProps"),
    h6: Type.Ref("HtmlProps"),
    head: Type.Ref("HtmlProps"),
    header: Type.Ref("HtmlProps"),
    hgroup: Type.Ref("HtmlProps"),
    hr: Type.Ref("VoidProps"),
    html: Type.Ref("HtmlElementProps"),
    i: Type.Ref("HtmlProps"),
    iframe: Type.Ref("IframeProps"),
    img: Type.Ref("ImgProps"),
    input: Type.Ref("InputProps"),
    ins: Type.Ref("InsProps"),
    kbd: Type.Ref("HtmlProps"),
    label: Type.Ref("LabelProps"),
    legend: Type.Ref("HtmlProps"),
    li: Type.Ref("LiProps"),
    link: Type.Ref("LinkProps"),
    main: Type.Ref("HtmlProps"),
    map: Type.Ref("MapProps"),
    mark: Type.Ref("HtmlProps"),
    menu: Type.Ref("HtmlProps"),
    meta: Type.Ref("MetaProps"),
    meter: Type.Ref("MeterProps"),
    nav: Type.Ref("HtmlProps"),
    noscript: Type.Ref("HtmlProps"),
    object: Type.Ref("ObjectProps"),
    ol: Type.Ref("OlProps"),
    optgroup: Type.Ref("OptgroupProps"),
    option: Type.Ref("OptionProps"),
    output: Type.Ref("OutputProps"),
    p: Type.Ref("HtmlProps"),
    picture: Type.Ref("HtmlProps"),
    pre: Type.Ref("HtmlProps"),
    progress: Type.Ref("ProgressProps"),
    q: Type.Ref("QuoteProps"),
    rp: Type.Ref("HtmlProps"),
    rt: Type.Ref("HtmlProps"),
    ruby: Type.Ref("HtmlProps"),
    s: Type.Ref("HtmlProps"),
    samp: Type.Ref("HtmlProps"),
    script: Type.Ref("ScriptProps"),
    search: Type.Ref("HtmlProps"),
    section: Type.Ref("HtmlProps"),
    select: Type.Ref("SelectProps"),
    slot: Type.Ref("SlotProps"),
    small: Type.Ref("HtmlProps"),
    source: Type.Ref("SourceProps"),
    span: Type.Ref("HtmlProps"),
    strong: Type.Ref("HtmlProps"),
    style: Type.Ref("StyleProps"),
    sub: Type.Ref("HtmlProps"),
    summary: Type.Ref("HtmlProps"),
    sup: Type.Ref("HtmlProps"),
    table: Type.Ref("TableProps"),
    tbody: Type.Ref("HtmlProps"),
    td: Type.Ref("TdProps"),
    template: Type.Ref("HtmlProps"),
    textarea: Type.Ref("TextareaProps"),
    tfoot: Type.Ref("HtmlProps"),
    th: Type.Ref("ThProps"),
    thead: Type.Ref("HtmlProps"),
    time: Type.Ref("TimeProps"),
    title: Type.Ref("HtmlProps"),
    tr: Type.Ref("HtmlProps"),
    track: Type.Ref("TrackProps"),
    u: Type.Ref("HtmlProps"),
    ul: Type.Ref("HtmlProps"),
    var: Type.Ref("HtmlProps"),
    video: Type.Ref("VideoProps"),
    wbr: Type.Ref("VoidProps"),

    // SVG, prefixed. A client reads the prefix and puts the element in the SVG
    // namespace; without it `document.createElement("path")` is an unknown
    // element that draws nothing.
    // SVG, every tag prefixed — the root included. One rule with no
    // exception is worth more than the four characters `svg:svg` costs: a
    // client tests a prefix and is done, and no reader has to remember which
    // tag is special.
    //
    // It also settles the four names both languages use. React declares no SVG
    // `a`, `title`, `script` or `style` — its keys are flat, so HTML wins them
    // and its renderer sorts the namespace out while walking the tree. A
    // prefix says it in the bundle instead, where a client that never walks
    // one can still read it.
    "svg:a": Type.Ref("SvgProps"),
    "svg:animate": Type.Ref("SvgProps"),
    "svg:animateMotion": Type.Ref("SvgProps"),
    "svg:animateTransform": Type.Ref("SvgProps"),
    "svg:circle": Type.Ref("SvgProps"),
    "svg:clipPath": Type.Ref("SvgProps"),
    "svg:defs": Type.Ref("SvgProps"),
    "svg:desc": Type.Ref("SvgProps"),
    "svg:ellipse": Type.Ref("SvgProps"),
    "svg:feBlend": Type.Ref("SvgProps"),
    "svg:feColorMatrix": Type.Ref("SvgProps"),
    "svg:feComponentTransfer": Type.Ref("SvgProps"),
    "svg:feComposite": Type.Ref("SvgProps"),
    "svg:feConvolveMatrix": Type.Ref("SvgProps"),
    "svg:feDiffuseLighting": Type.Ref("SvgProps"),
    "svg:feDisplacementMap": Type.Ref("SvgProps"),
    "svg:feDistantLight": Type.Ref("SvgProps"),
    "svg:feDropShadow": Type.Ref("SvgProps"),
    "svg:feFlood": Type.Ref("SvgProps"),
    "svg:feFuncA": Type.Ref("SvgProps"),
    "svg:feFuncB": Type.Ref("SvgProps"),
    "svg:feFuncG": Type.Ref("SvgProps"),
    "svg:feFuncR": Type.Ref("SvgProps"),
    "svg:feGaussianBlur": Type.Ref("SvgProps"),
    "svg:feImage": Type.Ref("SvgProps"),
    "svg:feMerge": Type.Ref("SvgProps"),
    "svg:feMergeNode": Type.Ref("SvgProps"),
    "svg:feMorphology": Type.Ref("SvgProps"),
    "svg:feOffset": Type.Ref("SvgProps"),
    "svg:fePointLight": Type.Ref("SvgProps"),
    "svg:feSpecularLighting": Type.Ref("SvgProps"),
    "svg:feSpotLight": Type.Ref("SvgProps"),
    "svg:feTile": Type.Ref("SvgProps"),
    "svg:feTurbulence": Type.Ref("SvgProps"),
    "svg:filter": Type.Ref("SvgProps"),
    "svg:foreignObject": Type.Ref("SvgProps"),
    "svg:g": Type.Ref("SvgProps"),
    "svg:image": Type.Ref("SvgProps"),
    "svg:line": Type.Ref("SvgProps"),
    "svg:linearGradient": Type.Ref("SvgProps"),
    "svg:marker": Type.Ref("SvgProps"),
    "svg:mask": Type.Ref("SvgProps"),
    "svg:metadata": Type.Ref("SvgProps"),
    "svg:mpath": Type.Ref("SvgProps"),
    "svg:path": Type.Ref("SvgProps"),
    "svg:pattern": Type.Ref("SvgProps"),
    "svg:polygon": Type.Ref("SvgProps"),
    "svg:polyline": Type.Ref("SvgProps"),
    "svg:radialGradient": Type.Ref("SvgProps"),
    "svg:rect": Type.Ref("SvgProps"),
    "svg:script": Type.Ref("SvgProps"),
    "svg:set": Type.Ref("SvgProps"),
    "svg:stop": Type.Ref("SvgProps"),
    "svg:style": Type.Ref("SvgProps"),
    "svg:svg": Type.Ref("SvgProps"),
    "svg:switch": Type.Ref("SvgProps"),
    "svg:symbol": Type.Ref("SvgProps"),
    "svg:text": Type.Ref("SvgProps"),
    "svg:textPath": Type.Ref("SvgProps"),
    "svg:title": Type.Ref("SvgProps"),
    "svg:tspan": Type.Ref("SvgProps"),
    "svg:use": Type.Ref("SvgProps"),
    "svg:view": Type.Ref("SvgProps"),
  },

  builtins: {},
};
