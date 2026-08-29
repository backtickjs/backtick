import { schema as ui } from "@backtickjs/ui-schema/schema";
import { Type } from "@backtickjs/schema";
import type { Schema } from "@backtickjs/schema";

// What a browser's elements accept, as a schema. `elements.ts` is generated
// from this and is not written by hand — run `pnpm generate`.

export const schema: Schema = {
  package: "@backtickjs/web-schema",

  namespace: "Web",

  extends: [ui],

  publishes: [],

  types: {
    /**
     * What a handler is handed, and what it is handed it by.
     *
     * The names, the shapes and the inheritance are the DOM's, taken from
     * `lib.dom.d.ts` rather than chosen here: a target's schema says what that
     * target does, and what this one does is the web. Which event a handler is
     * handed is the DOM's decision too — `click` is a `PointerEvent` and
     * `input` is an `InputEvent`, whatever either sounds like.
     *
     * An event is generic in what it happened to, so `currentTarget` is the
     * element the handler is on rather than an opaque `EventTarget`. That is a
     * deviation, and a deliberate one: the DOM types it opaque and expects a
     * cast, and this language has no casts — without this, reading the value of
     * the field a handler is attached to would be unsayable.
     *
     * A property whose type is one this schema does not declare is left out
     * rather than guessed at. It is absent because it is not written yet, not
     * because the DOM does not have it.
     */
    EventTarget: Type.Interface(
      [Type.Ref("ClientHandle")],
      {},
      {
        description:
          "What an event happened to, and what a listener is attached to.",
      },
    ),
    Window: Type.Interface(
      [Type.Ref("ClientHandle")],
      {
        performance: Type.Ref("Performance", {
          description: "The clock, for measuring how long something took.",
        }),
        console: Type.Ref("Console", {
          description: "Somewhere to say something while writing a script.",
        }),
        addEventListener: Type.Generic(
          [
            Type.GenericParameter(
              "E",
              Type.Apply(Type.Ref("Event"), [Type.Ref("EventTarget")]),
              Type.Apply(Type.Ref("Event"), [Type.Ref("EventTarget")]),
            ),
          ],
          Type.Function(
            [
              Type.FunctionParameter("type", Type.String(), {
                description:
                  "Which event to listen for, named as the DOM names it.",
              }),
              Type.FunctionParameter(
                "listener",
                Type.Function(
                  [Type.FunctionParameter("event", Type.Ref("E"))],
                  Type.Void(),
                ),
              ),
            ],
            Type.Void(),
          ),
          {
            description:
              "Listens for an event nothing drawn here is the target of — a key pressed anywhere, a message arriving. What an element's own events are is a prop on that element, and this is the rest.",
          },
        ),
        removeEventListener: Type.Generic(
          [
            Type.GenericParameter(
              "E",
              Type.Apply(Type.Ref("Event"), [Type.Ref("EventTarget")]),
              Type.Apply(Type.Ref("Event"), [Type.Ref("EventTarget")]),
            ),
          ],
          Type.Function(
            [
              Type.FunctionParameter("type", Type.String(), {
                description:
                  "Which event to listen for, named as the DOM names it.",
              }),
              Type.FunctionParameter(
                "listener",
                Type.Function(
                  [Type.FunctionParameter("event", Type.Ref("E"))],
                  Type.Void(),
                ),
              ),
            ],
            Type.Void(),
          ),
          {
            description:
              "Stops listening. The listener has to be the same one that was handed to `addEventListener` — the DOM matches by identity, so a second closure that does the same thing removes nothing.",
          },
        ),
        postMessage: Type.Generic(
          [Type.GenericParameter("T")],
          Type.Function(
            [
              Type.FunctionParameter("message", Type.Ref("T"), {
                description: "What to send. It is copied, not shared.",
              }),
              Type.FunctionParameter("targetOrigin", Type.String(), {
                description:
                  "Which origin may receive it, or `*` for any. A frame" +
                  " sandboxed without `allow-same-origin` has an origin no" +
                  " sender can name, so `*` is the only thing there is to say.",
              }),
            ],
            Type.Void(),
          ),
        ),
      },
      {
        description:
          "A window — this one, or the one inside a frame. What a script may" +
          " reach that is not an element's own is here, because that is where" +
          " the DOM keeps it.",
      },
    ),
    Event: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface([Type.Ref("ClientHandle")], {
        bubbles: Type.Boolean({ readOnly: true }),
        cancelable: Type.Boolean({ readOnly: true }),
        composed: Type.Boolean({ readOnly: true }),
        currentTarget: Type.Ref("T", { readOnly: true }),
        defaultPrevented: Type.Boolean({ readOnly: true }),
        eventPhase: Type.Number({ readOnly: true }),
        isTrusted: Type.Boolean({ readOnly: true }),
        srcElement: Type.Union([Type.Ref("EventTarget"), Type.Null()], {
          readOnly: true,
        }),
        target: Type.Union([Type.Ref("EventTarget"), Type.Null()], {
          readOnly: true,
        }),
        type: Type.String({ readOnly: true }),
        timeStamp: Type.Number({ readOnly: true }),
        preventDefault: Type.Function([], Type.Void()),
        stopPropagation: Type.Function([], Type.Void()),
        stopImmediatePropagation: Type.Function([], Type.Void()),
      }),
      {
        description:
          "Anything that happens to an element, and what every other event here is one of.",
      },
    ),
    UIEvent: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface([Type.Apply(Type.Ref("Event"), [Type.Ref("T")])], {
        detail: Type.Number({ readOnly: true }),
        which: Type.Number({ readOnly: true }),
      }),
      {
        description:
          "An event that came from the interface rather than from the page's own code.",
      },
    ),
    MouseEvent: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface([Type.Apply(Type.Ref("UIEvent"), [Type.Ref("T")])], {
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
        relatedTarget: Type.Union([Type.Ref("EventTarget"), Type.Null()], {
          readOnly: true,
        }),
        screenX: Type.Number({ readOnly: true }),
        screenY: Type.Number({ readOnly: true }),
        shiftKey: Type.Boolean({ readOnly: true }),
        x: Type.Number({ readOnly: true }),
        y: Type.Number({ readOnly: true }),
      }),
      {
        description:
          "A pointing device did something, and where it was when it did.",
      },
    ),
    PointerEvent: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface([Type.Apply(Type.Ref("MouseEvent"), [Type.Ref("T")])], {
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
      }),
      {
        description:
          "A mouse, a pen or a finger \u2014 what the DOM hands a click, whichever it was.",
      },
    ),
    DragEvent: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface([Type.Apply(Type.Ref("MouseEvent"), [Type.Ref("T")])], {}),
      { description: "Something is being dragged." },
    ),
    WheelEvent: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface([Type.Apply(Type.Ref("MouseEvent"), [Type.Ref("T")])], {
        deltaMode: Type.Number({ readOnly: true }),
        deltaX: Type.Number({ readOnly: true }),
        deltaY: Type.Number({ readOnly: true }),
        deltaZ: Type.Number({ readOnly: true }),
      }),
      { description: "A wheel turned, and by how much in which units." },
    ),
    KeyboardEvent: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface([Type.Apply(Type.Ref("UIEvent"), [Type.Ref("T")])], {
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
      }),
      { description: "A key went down or came up, and which key it was." },
    ),
    InputEvent: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface([Type.Apply(Type.Ref("UIEvent"), [Type.Ref("T")])], {
        data: Type.Union([Type.String(), Type.Null()], { readOnly: true }),
        inputType: Type.String({ readOnly: true }),
        isComposing: Type.Boolean({ readOnly: true }),
      }),
      { description: "The value of an editable element changed, and how." },
    ),
    CompositionEvent: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface([Type.Apply(Type.Ref("UIEvent"), [Type.Ref("T")])], {
        data: Type.String({ readOnly: true }),
      }),
      {
        description:
          "Text is being composed \u2014 an input method is part-way through a character.",
      },
    ),
    FocusEvent: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface([Type.Apply(Type.Ref("UIEvent"), [Type.Ref("T")])], {
        relatedTarget: Type.Union([Type.Ref("EventTarget"), Type.Null()], {
          readOnly: true,
        }),
      }),
      { description: "Focus arrived or left." },
    ),
    TouchEvent: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface([Type.Apply(Type.Ref("UIEvent"), [Type.Ref("T")])], {
        altKey: Type.Boolean({ readOnly: true }),
        ctrlKey: Type.Boolean({ readOnly: true }),
        metaKey: Type.Boolean({ readOnly: true }),
        shiftKey: Type.Boolean({ readOnly: true }),
      }),
      { description: "Fingers on a screen." },
    ),
    ClipboardEvent: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface([Type.Apply(Type.Ref("Event"), [Type.Ref("T")])], {}),
      { description: "A copy, cut or paste." },
    ),
    SubmitEvent: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface([Type.Apply(Type.Ref("Event"), [Type.Ref("T")])], {}),
      { description: "A form was submitted." },
    ),
    ToggleEvent: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface([Type.Apply(Type.Ref("Event"), [Type.Ref("T")])], {
        newState: Type.String({ readOnly: true }),
        oldState: Type.String({ readOnly: true }),
      }),
      { description: "Something that opens and closes did." },
    ),
    AnimationEvent: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface([Type.Apply(Type.Ref("Event"), [Type.Ref("T")])], {
        animationName: Type.String({ readOnly: true }),
        elapsedTime: Type.Number({ readOnly: true }),
        pseudoElement: Type.String({ readOnly: true }),
      }),
      { description: "A CSS animation reached one of its edges." },
    ),
    TransitionEvent: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface([Type.Apply(Type.Ref("Event"), [Type.Ref("T")])], {
        elapsedTime: Type.Number({ readOnly: true }),
        propertyName: Type.String({ readOnly: true }),
        pseudoElement: Type.String({ readOnly: true }),
      }),
      { description: "A CSS transition reached one of its edges." },
    ),
    ProgressEvent: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface([Type.Apply(Type.Ref("Event"), [Type.Ref("T")])], {
        lengthComputable: Type.Boolean({ readOnly: true }),
        loaded: Type.Number({ readOnly: true }),
        total: Type.Number({ readOnly: true }),
      }),
      { description: "Something loading said how far it had got." },
    ),
    MessageEvent: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface(
        [Type.Apply(Type.Ref("Event"), [Type.Ref("EventTarget")])],
        {
          data: Type.Ref("T", { readOnly: true }),
          lastEventId: Type.String({ readOnly: true }),
          origin: Type.String({ readOnly: true }),
          source: Type.Union([Type.Ref("Window"), Type.Null()], {
            readOnly: true,
          }),
        },
      ),
      {
        description:
          "Something another window posted. The parameter is what was posted," +
          " rather than what the event happened to: a message is always the" +
          " window's, so there is nothing else to say about its target.",
      },
    ),
    ErrorEvent: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface([Type.Apply(Type.Ref("Event"), [Type.Ref("T")])], {
        colno: Type.Number({ readOnly: true }),
        filename: Type.String({ readOnly: true }),
        lineno: Type.Number({ readOnly: true }),
        message: Type.String({ readOnly: true }),
      }),
      { description: "Something failed, and said where." },
    ),

    /**
     * The elements themselves, so `currentTarget` is worth reading.
     *
     * Extracted from `lib.dom.d.ts` with its own inheritance: an
     * `HTMLInputElement` is an `HTMLElement` is an `Element` is a `Node` is an
     * `EventTarget`, and a member is declared where the DOM declares it.
     */
    Node: Type.Interface([Type.Ref("EventTarget")], {
      baseURI: Type.String({ readOnly: true }),
      isConnected: Type.Boolean({ readOnly: true }),
      nodeName: Type.String({ readOnly: true }),
      nodeType: Type.Number({ readOnly: true }),
      nodeValue: Type.Union([Type.String(), Type.Null()], {}),
      textContent: Type.Union([Type.String(), Type.Null()], {}),
    }),
    Element: Type.Interface([Type.Ref("Node")], {
      className: Type.String({}),
      scrollTo: Type.Function(
        [
          Type.FunctionParameter("x", Type.Number(), {
            description: "How far along, counted in pixels.",
          }),
          Type.FunctionParameter("y", Type.Number(), {
            description: "How far down.",
          }),
        ],
        Type.Void(),
        { description: "Scrolls to a position, rather than by an amount." },
      ),
      clientHeight: Type.Number({ readOnly: true }),
      clientLeft: Type.Number({ readOnly: true }),
      clientTop: Type.Number({ readOnly: true }),
      clientWidth: Type.Number({ readOnly: true }),
      currentCSSZoom: Type.Number({ readOnly: true }),
      id: Type.String({}),
      innerHTML: Type.String({}),
      localName: Type.String({ readOnly: true }),
      namespaceURI: Type.Union([Type.String(), Type.Null()], {
        readOnly: true,
      }),
      outerHTML: Type.String({}),
      prefix: Type.Union([Type.String(), Type.Null()], { readOnly: true }),
      scrollHeight: Type.Number({ readOnly: true }),
      scrollLeft: Type.Number({}),
      scrollTop: Type.Number({}),
      scrollWidth: Type.Number({ readOnly: true }),
      slot: Type.String({}),
      tagName: Type.String({ readOnly: true }),
    }),
    Performance: Type.Interface(
      [Type.Ref("ClientHandle")],
      {
        now: Type.Function([], Type.Number()),
      },
      {
        description:
          "A clock that only measures. Milliseconds since the page began, as a fraction — what it is for is the difference between two of them, not the time of day.",
      },
    ),

    Console: Type.Interface(
      [Type.Ref("ClientHandle")],
      {
        log: Type.Function(
          [
            Type.Rest(
              Type.FunctionParameter("values", Type.Ref("ClientValue")),
            ),
          ],
          Type.Void(),
        ),
        warn: Type.Function(
          [
            Type.Rest(
              Type.FunctionParameter("values", Type.Ref("ClientValue")),
            ),
          ],
          Type.Void(),
        ),
        error: Type.Function(
          [
            Type.Rest(
              Type.FunctionParameter("values", Type.Ref("ClientValue")),
            ),
          ],
          Type.Void(),
        ),
      },
      {
        description:
          "Somewhere to say something while writing a script. What a host does with it is the host's own business — a client with no console answers for these and drops them.",
      },
    ),

    SVGElement: Type.Interface([Type.Ref("Element")], {}),

    HTMLElement: Type.Interface(
      [Type.Ref("Element"), Type.Ref("HTMLOrSVGElement")],
      {
        accessKey: Type.String({}),
        accessKeyLabel: Type.String({ readOnly: true }),
        autocapitalize: Type.String({}),
        autocorrect: Type.Boolean({}),
        dir: Type.String({}),
        draggable: Type.Boolean({}),
        inert: Type.Boolean({}),
        innerText: Type.String({}),
        lang: Type.String({}),
        offsetHeight: Type.Number({ readOnly: true }),
        offsetLeft: Type.Number({ readOnly: true }),
        offsetTop: Type.Number({ readOnly: true }),
        offsetWidth: Type.Number({ readOnly: true }),
        outerText: Type.String({}),
        popover: Type.Union([Type.String(), Type.Null()], {}),
        spellcheck: Type.Boolean({}),
        title: Type.String({}),
        translate: Type.Boolean({}),
        writingSuggestions: Type.String({}),
      },
    ),
    HTMLAnchorElement: Type.Interface(
      [Type.Ref("HTMLElement"), Type.Ref("HTMLHyperlinkElementUtils")],
      {
        charset: Type.String({}),
        coords: Type.String({}),
        download: Type.String({}),
        hreflang: Type.String({}),
        name: Type.String({}),
        ping: Type.String({}),
        referrerPolicy: Type.String({}),
        rel: Type.String({}),
        rev: Type.String({}),
        shape: Type.String({}),
        target: Type.String({}),
        text: Type.String({}),
        type: Type.String({}),
      },
    ),
    HTMLAreaElement: Type.Interface(
      [Type.Ref("HTMLElement"), Type.Ref("HTMLHyperlinkElementUtils")],
      {
        alt: Type.String({}),
        coords: Type.String({}),
        download: Type.String({}),
        noHref: Type.Boolean({}),
        ping: Type.String({}),
        referrerPolicy: Type.String({}),
        rel: Type.String({}),
        shape: Type.String({}),
        target: Type.String({}),
      },
    ),
    HTMLAudioElement: Type.Interface([Type.Ref("HTMLMediaElement")], {}),
    HTMLBRElement: Type.Interface([Type.Ref("HTMLElement")], {
      clear: Type.String({}),
    }),
    HTMLBaseElement: Type.Interface([Type.Ref("HTMLElement")], {
      href: Type.String({}),
      target: Type.String({}),
    }),
    HTMLBodyElement: Type.Interface([Type.Ref("HTMLElement")], {
      aLink: Type.String({}),
      background: Type.String({}),
      bgColor: Type.String({}),
      link: Type.String({}),
      text: Type.String({}),
      vLink: Type.String({}),
    }),
    HTMLButtonElement: Type.Interface([Type.Ref("HTMLElement")], {
      command: Type.String({}),
      disabled: Type.Boolean({}),
      formAction: Type.String({}),
      formEnctype: Type.String({}),
      formMethod: Type.String({}),
      formNoValidate: Type.Boolean({}),
      formTarget: Type.String({}),
      name: Type.String({}),
      validationMessage: Type.String({ readOnly: true }),
      value: Type.String({}),
      willValidate: Type.Boolean({ readOnly: true }),
    }),
    HTMLCanvasElement: Type.Interface([Type.Ref("HTMLElement")], {
      height: Type.Number({}),
      width: Type.Number({}),
    }),
    HTMLDListElement: Type.Interface([Type.Ref("HTMLElement")], {
      compact: Type.Boolean({}),
    }),
    HTMLDataElement: Type.Interface([Type.Ref("HTMLElement")], {
      value: Type.String({}),
    }),
    HTMLDataListElement: Type.Interface([Type.Ref("HTMLElement")], {}),
    HTMLDetailsElement: Type.Interface([Type.Ref("HTMLElement")], {
      name: Type.String({}),
      open: Type.Boolean({}),
    }),
    HTMLDialogElement: Type.Interface([Type.Ref("HTMLElement")], {
      closedBy: Type.String({}),
      open: Type.Boolean({}),
      returnValue: Type.String({}),
    }),
    HTMLDivElement: Type.Interface([Type.Ref("HTMLElement")], {
      align: Type.String({}),
    }),
    HTMLEmbedElement: Type.Interface([Type.Ref("HTMLElement")], {
      align: Type.String({}),
      height: Type.String({}),
      name: Type.String({}),
      src: Type.String({}),
      type: Type.String({}),
      width: Type.String({}),
    }),
    HTMLFieldSetElement: Type.Interface([Type.Ref("HTMLElement")], {
      disabled: Type.Boolean({}),
      name: Type.String({}),
      type: Type.String({ readOnly: true }),
      validationMessage: Type.String({ readOnly: true }),
      willValidate: Type.Boolean({ readOnly: true }),
    }),
    HTMLFormElement: Type.Interface([Type.Ref("HTMLElement")], {
      acceptCharset: Type.String({}),
      action: Type.String({}),
      encoding: Type.String({}),
      enctype: Type.String({}),
      length: Type.Number({ readOnly: true }),
      method: Type.String({}),
      name: Type.String({}),
      noValidate: Type.Boolean({}),
      rel: Type.String({}),
      target: Type.String({}),
    }),
    HTMLHRElement: Type.Interface([Type.Ref("HTMLElement")], {
      align: Type.String({}),
      color: Type.String({}),
      noShade: Type.Boolean({}),
      size: Type.String({}),
      width: Type.String({}),
    }),
    HTMLHeadElement: Type.Interface([Type.Ref("HTMLElement")], {}),
    HTMLHeadingElement: Type.Interface([Type.Ref("HTMLElement")], {
      align: Type.String({}),
    }),
    HTMLHtmlElement: Type.Interface([Type.Ref("HTMLElement")], {
      version: Type.String({}),
    }),
    HTMLIFrameElement: Type.Interface([Type.Ref("HTMLElement")], {
      align: Type.String({}),
      contentWindow: Type.Union([Type.Ref("Window"), Type.Null()], {
        readOnly: true,
      }),
      allow: Type.String({}),
      allowFullscreen: Type.Boolean({}),
      frameBorder: Type.String({}),
      height: Type.String({}),
      longDesc: Type.String({}),
      marginHeight: Type.String({}),
      marginWidth: Type.String({}),
      name: Type.String({}),
      scrolling: Type.String({}),
      src: Type.String({}),
      srcdoc: Type.String({}),
      width: Type.String({}),
    }),
    HTMLImageElement: Type.Interface([Type.Ref("HTMLElement")], {
      align: Type.String({}),
      alt: Type.String({}),
      border: Type.String({}),
      complete: Type.Boolean({ readOnly: true }),
      crossOrigin: Type.Union([Type.String(), Type.Null()], {}),
      currentSrc: Type.String({ readOnly: true }),
      height: Type.Number({}),
      hspace: Type.Number({}),
      isMap: Type.Boolean({}),
      longDesc: Type.String({}),
      lowsrc: Type.String({}),
      name: Type.String({}),
      naturalHeight: Type.Number({ readOnly: true }),
      naturalWidth: Type.Number({ readOnly: true }),
      referrerPolicy: Type.String({}),
      sizes: Type.String({}),
      src: Type.String({}),
      srcset: Type.String({}),
      useMap: Type.String({}),
      vspace: Type.Number({}),
      width: Type.Number({}),
      x: Type.Number({ readOnly: true }),
      y: Type.Number({ readOnly: true }),
    }),
    HTMLInputElement: Type.Interface([Type.Ref("HTMLElement")], {
      setSelectionRange: Type.Function(
        [
          Type.FunctionParameter("start", Type.Number(), {
            description: "Where the selection begins, counted in characters.",
          }),
          Type.FunctionParameter("end", Type.Number(), {
            description: "Where it ends.",
          }),
        ],
        Type.Void(),
        {
          description:
            "Selects part of what is typed here, and puts the caret at the end of it.",
        },
      ),
      select: Type.Function([], Type.Void(), {
        description: "Selects all of it.",
      }),
      accept: Type.String({}),
      align: Type.String({}),
      alt: Type.String({}),
      capture: Type.String({}),
      checked: Type.Boolean({}),
      defaultChecked: Type.Boolean({}),
      defaultValue: Type.String({}),
      dirName: Type.String({}),
      disabled: Type.Boolean({}),
      formAction: Type.String({}),
      formEnctype: Type.String({}),
      formMethod: Type.String({}),
      formNoValidate: Type.Boolean({}),
      formTarget: Type.String({}),
      height: Type.Number({}),
      indeterminate: Type.Boolean({}),
      max: Type.String({}),
      maxLength: Type.Number({}),
      min: Type.String({}),
      minLength: Type.Number({}),
      multiple: Type.Boolean({}),
      name: Type.String({}),
      pattern: Type.String({}),
      placeholder: Type.String({}),
      readOnly: Type.Boolean({}),
      required: Type.Boolean({}),
      size: Type.Number({}),
      src: Type.String({}),
      step: Type.String({}),
      type: Type.String({}),
      useMap: Type.String({}),
      validationMessage: Type.String({ readOnly: true }),
      value: Type.String({}),
      valueAsNumber: Type.Number({}),
      webkitdirectory: Type.Boolean({}),
      width: Type.Number({}),
      willValidate: Type.Boolean({ readOnly: true }),
    }),
    HTMLLIElement: Type.Interface([Type.Ref("HTMLElement")], {
      type: Type.String({}),
      value: Type.Number({}),
    }),
    HTMLLabelElement: Type.Interface([Type.Ref("HTMLElement")], {
      htmlFor: Type.String({}),
    }),
    HTMLLegendElement: Type.Interface([Type.Ref("HTMLElement")], {
      align: Type.String({}),
    }),
    HTMLLinkElement: Type.Interface([Type.Ref("HTMLElement")], {
      as: Type.String({}),
      charset: Type.String({}),
      crossOrigin: Type.Union([Type.String(), Type.Null()], {}),
      disabled: Type.Boolean({}),
      href: Type.String({}),
      hreflang: Type.String({}),
      imageSizes: Type.String({}),
      imageSrcset: Type.String({}),
      integrity: Type.String({}),
      media: Type.String({}),
      referrerPolicy: Type.String({}),
      rel: Type.String({}),
      rev: Type.String({}),
      target: Type.String({}),
      type: Type.String({}),
    }),
    HTMLMapElement: Type.Interface([Type.Ref("HTMLElement")], {
      name: Type.String({}),
    }),
    HTMLMenuElement: Type.Interface([Type.Ref("HTMLElement")], {
      compact: Type.Boolean({}),
    }),
    HTMLMetaElement: Type.Interface([Type.Ref("HTMLElement")], {
      content: Type.String({}),
      httpEquiv: Type.String({}),
      media: Type.String({}),
      name: Type.String({}),
      scheme: Type.String({}),
    }),
    HTMLMeterElement: Type.Interface([Type.Ref("HTMLElement")], {
      high: Type.Number({}),
      low: Type.Number({}),
      max: Type.Number({}),
      min: Type.Number({}),
      optimum: Type.Number({}),
      value: Type.Number({}),
    }),
    HTMLModElement: Type.Interface([Type.Ref("HTMLElement")], {
      cite: Type.String({}),
      dateTime: Type.String({}),
    }),
    HTMLOListElement: Type.Interface([Type.Ref("HTMLElement")], {
      compact: Type.Boolean({}),
      reversed: Type.Boolean({}),
      start: Type.Number({}),
      type: Type.String({}),
    }),
    HTMLObjectElement: Type.Interface([Type.Ref("HTMLElement")], {
      align: Type.String({}),
      archive: Type.String({}),
      border: Type.String({}),
      code: Type.String({}),
      codeBase: Type.String({}),
      codeType: Type.String({}),
      data: Type.String({}),
      declare: Type.Boolean({}),
      height: Type.String({}),
      hspace: Type.Number({}),
      name: Type.String({}),
      standby: Type.String({}),
      type: Type.String({}),
      useMap: Type.String({}),
      validationMessage: Type.String({ readOnly: true }),
      vspace: Type.Number({}),
      width: Type.String({}),
      willValidate: Type.Boolean({ readOnly: true }),
    }),
    HTMLOptGroupElement: Type.Interface([Type.Ref("HTMLElement")], {
      disabled: Type.Boolean({}),
      label: Type.String({}),
    }),
    HTMLOptionElement: Type.Interface([Type.Ref("HTMLElement")], {
      defaultSelected: Type.Boolean({}),
      disabled: Type.Boolean({}),
      index: Type.Number({ readOnly: true }),
      label: Type.String({}),
      selected: Type.Boolean({}),
      text: Type.String({}),
      value: Type.String({}),
    }),
    HTMLOutputElement: Type.Interface([Type.Ref("HTMLElement")], {
      defaultValue: Type.String({}),
      name: Type.String({}),
      type: Type.String({ readOnly: true }),
      validationMessage: Type.String({ readOnly: true }),
      value: Type.String({}),
      willValidate: Type.Boolean({ readOnly: true }),
    }),
    HTMLParagraphElement: Type.Interface([Type.Ref("HTMLElement")], {
      align: Type.String({}),
    }),
    HTMLPictureElement: Type.Interface([Type.Ref("HTMLElement")], {}),
    HTMLPreElement: Type.Interface([Type.Ref("HTMLElement")], {
      width: Type.Number({}),
    }),
    HTMLProgressElement: Type.Interface([Type.Ref("HTMLElement")], {
      max: Type.Number({}),
      position: Type.Number({ readOnly: true }),
      value: Type.Number({}),
    }),
    HTMLQuoteElement: Type.Interface([Type.Ref("HTMLElement")], {
      cite: Type.String({}),
    }),
    HTMLScriptElement: Type.Interface([Type.Ref("HTMLElement")], {
      async: Type.Boolean({}),
      charset: Type.String({}),
      crossOrigin: Type.Union([Type.String(), Type.Null()], {}),
      defer: Type.Boolean({}),
      event: Type.String({}),
      htmlFor: Type.String({}),
      integrity: Type.String({}),
      noModule: Type.Boolean({}),
      referrerPolicy: Type.String({}),
      src: Type.String({}),
      text: Type.String({}),
      type: Type.String({}),
    }),
    HTMLSelectElement: Type.Interface([Type.Ref("HTMLElement")], {
      disabled: Type.Boolean({}),
      length: Type.Number({}),
      multiple: Type.Boolean({}),
      name: Type.String({}),
      required: Type.Boolean({}),
      selectedIndex: Type.Number({}),
      size: Type.Number({}),
      validationMessage: Type.String({ readOnly: true }),
      value: Type.String({}),
      willValidate: Type.Boolean({ readOnly: true }),
    }),
    HTMLSlotElement: Type.Interface([Type.Ref("HTMLElement")], {
      name: Type.String({}),
    }),
    HTMLSourceElement: Type.Interface([Type.Ref("HTMLElement")], {
      height: Type.Number({}),
      media: Type.String({}),
      sizes: Type.String({}),
      src: Type.String({}),
      srcset: Type.String({}),
      type: Type.String({}),
      width: Type.Number({}),
    }),
    HTMLSpanElement: Type.Interface([Type.Ref("HTMLElement")], {}),
    HTMLStyleElement: Type.Interface([Type.Ref("HTMLElement")], {
      disabled: Type.Boolean({}),
      media: Type.String({}),
      type: Type.String({}),
    }),
    HTMLTableCaptionElement: Type.Interface([Type.Ref("HTMLElement")], {
      align: Type.String({}),
    }),
    HTMLTableCellElement: Type.Interface([Type.Ref("HTMLElement")], {
      abbr: Type.String({}),
      align: Type.String({}),
      axis: Type.String({}),
      bgColor: Type.String({}),
      cellIndex: Type.Number({ readOnly: true }),
      ch: Type.String({}),
      chOff: Type.String({}),
      colSpan: Type.Number({}),
      headers: Type.String({}),
      height: Type.String({}),
      noWrap: Type.Boolean({}),
      rowSpan: Type.Number({}),
      scope: Type.String({}),
      vAlign: Type.String({}),
      width: Type.String({}),
    }),
    HTMLTableColElement: Type.Interface([Type.Ref("HTMLElement")], {
      align: Type.String({}),
      ch: Type.String({}),
      chOff: Type.String({}),
      span: Type.Number({}),
      vAlign: Type.String({}),
      width: Type.String({}),
    }),
    HTMLTableElement: Type.Interface([Type.Ref("HTMLElement")], {
      align: Type.String({}),
      bgColor: Type.String({}),
      border: Type.String({}),
      cellPadding: Type.String({}),
      cellSpacing: Type.String({}),
      frame: Type.String({}),
      rules: Type.String({}),
      summary: Type.String({}),
      width: Type.String({}),
    }),
    HTMLTableRowElement: Type.Interface([Type.Ref("HTMLElement")], {
      align: Type.String({}),
      bgColor: Type.String({}),
      ch: Type.String({}),
      chOff: Type.String({}),
      rowIndex: Type.Number({ readOnly: true }),
      sectionRowIndex: Type.Number({ readOnly: true }),
      vAlign: Type.String({}),
    }),
    HTMLTableSectionElement: Type.Interface([Type.Ref("HTMLElement")], {
      align: Type.String({}),
      ch: Type.String({}),
      chOff: Type.String({}),
      vAlign: Type.String({}),
    }),
    HTMLTemplateElement: Type.Interface([Type.Ref("HTMLElement")], {
      shadowRootClonable: Type.Boolean({}),
      shadowRootCustomElementRegistry: Type.String({}),
      shadowRootDelegatesFocus: Type.Boolean({}),
      shadowRootMode: Type.String({}),
      shadowRootSerializable: Type.Boolean({}),
    }),
    HTMLTextAreaElement: Type.Interface([Type.Ref("HTMLElement")], {
      setSelectionRange: Type.Function(
        [
          Type.FunctionParameter("start", Type.Number(), {
            description: "Where the selection begins, counted in characters.",
          }),
          Type.FunctionParameter("end", Type.Number(), {
            description: "Where it ends.",
          }),
        ],
        Type.Void(),
        {
          description:
            "Selects part of what is typed here, and puts the caret at the end of it.",
        },
      ),
      select: Type.Function([], Type.Void(), {
        description: "Selects all of it.",
      }),
      cols: Type.Number({}),
      defaultValue: Type.String({}),
      dirName: Type.String({}),
      disabled: Type.Boolean({}),
      maxLength: Type.Number({}),
      minLength: Type.Number({}),
      name: Type.String({}),
      placeholder: Type.String({}),
      readOnly: Type.Boolean({}),
      required: Type.Boolean({}),
      rows: Type.Number({}),
      selectionEnd: Type.Number({}),
      selectionStart: Type.Number({}),
      textLength: Type.Number({ readOnly: true }),
      type: Type.String({ readOnly: true }),
      validationMessage: Type.String({ readOnly: true }),
      value: Type.String({}),
      willValidate: Type.Boolean({ readOnly: true }),
      wrap: Type.String({}),
    }),
    HTMLTimeElement: Type.Interface([Type.Ref("HTMLElement")], {
      dateTime: Type.String({}),
    }),
    HTMLTitleElement: Type.Interface([Type.Ref("HTMLElement")], {
      text: Type.String({}),
    }),
    HTMLTrackElement: Type.Interface([Type.Ref("HTMLElement")], {
      default: Type.Boolean({}),
      kind: Type.String({}),
      label: Type.String({}),
      readyState: Type.Number({ readOnly: true }),
      src: Type.String({}),
      srclang: Type.String({}),
    }),
    HTMLUListElement: Type.Interface([Type.Ref("HTMLElement")], {
      compact: Type.Boolean({}),
      type: Type.String({}),
    }),
    HTMLVideoElement: Type.Interface([Type.Ref("HTMLMediaElement")], {
      disablePictureInPicture: Type.Boolean({}),
      height: Type.Number({}),
      playsInline: Type.Boolean({}),
      poster: Type.String({}),
      videoHeight: Type.Number({ readOnly: true }),
      videoWidth: Type.Number({ readOnly: true }),
      width: Type.Number({}),
    }),
    HTMLMediaElement: Type.Interface([Type.Ref("HTMLElement")], {
      autoplay: Type.Boolean({}),
      controls: Type.Boolean({}),
      crossOrigin: Type.Union([Type.String(), Type.Null()], {}),
      currentSrc: Type.String({ readOnly: true }),
      currentTime: Type.Number({}),
      defaultMuted: Type.Boolean({}),
      defaultPlaybackRate: Type.Number({}),
      disableRemotePlayback: Type.Boolean({}),
      duration: Type.Number({ readOnly: true }),
      ended: Type.Boolean({ readOnly: true }),
      loop: Type.Boolean({}),
      muted: Type.Boolean({}),
      networkState: Type.Number({ readOnly: true }),
      paused: Type.Boolean({ readOnly: true }),
      playbackRate: Type.Number({}),
      preservesPitch: Type.Boolean({}),
      readyState: Type.Number({ readOnly: true }),
      seeking: Type.Boolean({ readOnly: true }),
      sinkId: Type.String({ readOnly: true }),
      src: Type.String({}),
      volume: Type.Number({}),
    }),
    HTMLHyperlinkElementUtils: Type.Interface([Type.Ref("EventTarget")], {
      hash: Type.String({}),
      host: Type.String({}),
      hostname: Type.String({}),
      href: Type.String({}),
      origin: Type.String({ readOnly: true }),
      password: Type.String({}),
      pathname: Type.String({}),
      port: Type.String({}),
      protocol: Type.String({}),
      search: Type.String({}),
      username: Type.String({}),
    }),
    HTMLOrSVGElement: Type.Interface([Type.Ref("EventTarget")], {
      autofocus: Type.Boolean({}),
      focus: Type.Function([], Type.Void(), {
        description:
          "Gives this the keyboard, as clicking it would. What was focused before loses it.",
      }),
      blur: Type.Function([], Type.Void(), {
        description: "Takes the keyboard away from this.",
      }),
      nonce: Type.String({}),
      tabIndex: Type.Number({}),
    }),
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
    Events: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface([], {
        oncopy: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("ClipboardEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        oncut: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("ClipboardEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onpaste: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("ClipboardEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        oncompositionend: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("CompositionEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        oncompositionstart: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("CompositionEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        oncompositionupdate: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("CompositionEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onblur: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("FocusEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onfocus: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("FocusEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onfocusin: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("FocusEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onfocusout: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("FocusEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onbeforeinput: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("InputEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onchange: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("Event"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        oninput: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("InputEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        oninvalid: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("Event"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onreset: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("Event"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onselect: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("Event"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onsubmit: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("SubmitEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onerror: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("ErrorEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onload: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("Event"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onkeydown: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("KeyboardEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onkeypress: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("KeyboardEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onkeyup: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("KeyboardEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onabort: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("UIEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        oncanplay: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("Event"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        oncanplaythrough: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("Event"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        ondurationchange: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("Event"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onemptied: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("Event"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onended: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("Event"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onloadeddata: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("Event"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onloadedmetadata: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("Event"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onloadstart: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("Event"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onpause: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("Event"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onplay: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("Event"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onplaying: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("Event"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onprogress: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("ProgressEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onratechange: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("Event"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onseeked: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("Event"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onseeking: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("Event"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onstalled: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("Event"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onsuspend: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("Event"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        ontimeupdate: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("Event"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onvolumechange: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("Event"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onwaiting: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("Event"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onauxclick: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("PointerEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onclick: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("PointerEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        oncontextmenu: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("PointerEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        ondblclick: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("MouseEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onmousedown: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("MouseEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onmouseenter: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("MouseEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onmouseleave: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("MouseEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onmousemove: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("MouseEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onmouseout: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("MouseEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onmouseover: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("MouseEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onmouseup: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("MouseEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        ondrag: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("DragEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        ondragend: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("DragEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        ondragenter: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("DragEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        ondragleave: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("DragEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        ondragover: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("DragEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        ondragstart: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("DragEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        ondrop: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("DragEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        ontouchcancel: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("TouchEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        ontouchend: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("TouchEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        ontouchmove: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("TouchEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        ontouchstart: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("TouchEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        ongotpointercapture: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("PointerEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onlostpointercapture: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("PointerEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onpointercancel: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("PointerEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onpointerdown: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("PointerEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onpointerenter: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("PointerEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onpointerleave: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("PointerEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onpointermove: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("PointerEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onpointerout: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("PointerEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onpointerover: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("PointerEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onpointerup: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("PointerEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onscroll: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("Event"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onscrollend: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("Event"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onwheel: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("WheelEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onanimationend: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("AnimationEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onanimationiteration: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("AnimationEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onanimationstart: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("AnimationEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        ontransitioncancel: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("TransitionEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        ontransitionend: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("TransitionEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        ontransitionrun: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("TransitionEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        ontransitionstart: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("TransitionEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        onbeforetoggle: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("ToggleEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
        ontoggle: Type.Optional(
          Type.Function(
            [
              Type.FunctionParameter(
                "event",
                Type.Apply(Type.Ref("ToggleEvent"), [Type.Ref("T")]),
              ),
            ],
            Type.Void(),
          ),
        ),
      }),
    ),
    GlobalAttributes: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface(
        [
          Type.Ref("AriaAttributes"),
          Type.Apply(Type.Ref("Events"), [Type.Ref("T")]),
        ],
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
    ),
    VoidProps: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface(
        [Type.Apply(Type.Ref("GlobalAttributes"), [Type.Ref("T")])],
        {},
      ),
    ),
    HtmlProps: Type.Generic(
      [Type.GenericParameter("T")],
      Type.Interface(
        [Type.Apply(Type.Ref("GlobalAttributes"), [Type.Ref("T")])],
        {
          children: Type.Optional(Type.Ref("HtmlNode")),
        },
      ),
    ),
    AnchorProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLAnchorElement")])],
      {
        download: Type.Optional(Type.Union([Type.String(), Type.Boolean()])),
        href: Type.Optional(Type.String()),
        hreflang: Type.Optional(Type.String()),
        media: Type.Optional(Type.String()),
        ping: Type.Optional(Type.String()),
        referrerpolicy: Type.Optional(Type.Ref("ReferrerPolicy")),
        rel: Type.Optional(Type.String()),
        target: Type.Optional(Type.Ref("Target")),
        type: Type.Optional(Type.String()),
      },
    ),
    AreaProps: Type.Interface(
      [Type.Apply(Type.Ref("VoidProps"), [Type.Ref("HTMLAreaElement")])],
      {
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
      },
    ),
    BaseProps: Type.Interface(
      [Type.Apply(Type.Ref("VoidProps"), [Type.Ref("HTMLBaseElement")])],
      {
        href: Type.Optional(Type.String()),
        target: Type.Optional(Type.Ref("Target")),
      },
    ),
    BlockquoteProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLQuoteElement")])],
      {
        cite: Type.Optional(Type.String()),
      },
    ),
    ButtonProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLButtonElement")])],
      {
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
      },
    ),
    CanvasProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLCanvasElement")])],
      {
        height: Type.Optional(Type.Ref("Numeric")),
        width: Type.Optional(Type.Ref("Numeric")),
      },
    ),
    ColProps: Type.Interface(
      [Type.Apply(Type.Ref("VoidProps"), [Type.Ref("HTMLTableColElement")])],
      {
        span: Type.Optional(Type.Number()),
        width: Type.Optional(Type.Ref("Numeric")),
      },
    ),
    ColgroupProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLTableColElement")])],
      {
        span: Type.Optional(Type.Number()),
      },
    ),
    DataProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLDataElement")])],
      {
        value: Type.Optional(Type.Union([Type.String(), Type.Number()])),
      },
    ),
    DelProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLModElement")])],
      {
        cite: Type.Optional(Type.String()),
        datetime: Type.Optional(Type.String()),
      },
    ),
    DetailsProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLDetailsElement")])],
      {
        name: Type.Optional(Type.String()),
        open: Type.Optional(Type.Boolean()),
      },
    ),
    DialogProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLDialogElement")])],
      {
        closedby: Type.Optional(
          Type.Union([
            Type.Literal("any"),
            Type.Literal("closerequest"),
            Type.Literal("none"),
          ]),
        ),
        open: Type.Optional(Type.Boolean()),
      },
    ),
    EmbedProps: Type.Interface(
      [Type.Apply(Type.Ref("VoidProps"), [Type.Ref("HTMLEmbedElement")])],
      {
        height: Type.Optional(Type.Ref("Numeric")),
        src: Type.Optional(Type.String()),
        type: Type.Optional(Type.String()),
        width: Type.Optional(Type.Ref("Numeric")),
      },
    ),
    FieldsetProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLFieldSetElement")])],
      {
        disabled: Type.Optional(Type.Boolean()),
        form: Type.Optional(Type.String()),
        name: Type.Optional(Type.String()),
      },
    ),
    FormProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLFormElement")])],
      {
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
      },
    ),
    HtmlElementProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLHtmlElement")])],
      {
        manifest: Type.Optional(Type.String()),
      },
    ),
    IframeProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLIFrameElement")])],
      {
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
      },
    ),
    ImgProps: Type.Interface(
      [Type.Apply(Type.Ref("VoidProps"), [Type.Ref("HTMLImageElement")])],
      {
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
      },
    ),
    InputProps: Type.Interface(
      [Type.Apply(Type.Ref("VoidProps"), [Type.Ref("HTMLInputElement")])],
      {
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
      },
    ),
    InsProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLModElement")])],
      {
        cite: Type.Optional(Type.String()),
        datetime: Type.Optional(Type.String()),
      },
    ),
    LabelProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLLabelElement")])],
      {
        for: Type.Optional(Type.String()),
        form: Type.Optional(Type.String()),
      },
    ),
    LiProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLLIElement")])],
      {
        value: Type.Optional(Type.Number()),
      },
    ),
    LinkProps: Type.Interface(
      [Type.Apply(Type.Ref("VoidProps"), [Type.Ref("HTMLLinkElement")])],
      {
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
      },
    ),
    MapProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLMapElement")])],
      {
        name: Type.Optional(Type.String()),
      },
    ),
    MediaProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLAudioElement")])],
      {
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
      },
    ),
    MetaProps: Type.Interface(
      [Type.Apply(Type.Ref("VoidProps"), [Type.Ref("HTMLMetaElement")])],
      {
        charset: Type.Optional(Type.String()),
        content: Type.Optional(Type.String()),
        "http-equiv": Type.Optional(Type.String()),
        media: Type.Optional(Type.String()),
        name: Type.Optional(Type.String()),
      },
    ),
    MeterProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLMeterElement")])],
      {
        form: Type.Optional(Type.String()),
        high: Type.Optional(Type.Number()),
        low: Type.Optional(Type.Number()),
        max: Type.Optional(Type.Ref("Numeric")),
        min: Type.Optional(Type.Ref("Numeric")),
        optimum: Type.Optional(Type.Number()),
        value: Type.Optional(Type.Union([Type.String(), Type.Number()])),
      },
    ),
    ObjectProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLObjectElement")])],
      {
        data: Type.Optional(Type.String()),
        form: Type.Optional(Type.String()),
        height: Type.Optional(Type.Ref("Numeric")),
        name: Type.Optional(Type.String()),
        type: Type.Optional(Type.String()),
        usemap: Type.Optional(Type.String()),
        width: Type.Optional(Type.Ref("Numeric")),
      },
    ),
    OlProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLOListElement")])],
      {
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
      },
    ),
    OptgroupProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLOptGroupElement")])],
      {
        disabled: Type.Optional(Type.Boolean()),
        label: Type.Optional(Type.String()),
      },
    ),
    OptionProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLOptionElement")])],
      {
        disabled: Type.Optional(Type.Boolean()),
        label: Type.Optional(Type.String()),
        selected: Type.Optional(Type.Boolean()),
        value: Type.Optional(Type.Union([Type.String(), Type.Number()])),
      },
    ),
    OutputProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLOutputElement")])],
      {
        for: Type.Optional(Type.String()),
        form: Type.Optional(Type.String()),
        name: Type.Optional(Type.String()),
      },
    ),
    ProgressProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLProgressElement")])],
      {
        max: Type.Optional(Type.Ref("Numeric")),
        value: Type.Optional(Type.Union([Type.String(), Type.Number()])),
      },
    ),
    QuoteProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLQuoteElement")])],
      {
        cite: Type.Optional(Type.String()),
      },
    ),
    ScriptProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLScriptElement")])],
      {
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
      },
    ),
    SelectProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLSelectElement")])],
      {
        autocomplete: Type.Optional(Type.String()),
        disabled: Type.Optional(Type.Boolean()),
        form: Type.Optional(Type.String()),
        multiple: Type.Optional(Type.Boolean()),
        name: Type.Optional(Type.String()),
        required: Type.Optional(Type.Boolean()),
        size: Type.Optional(Type.Number()),
        value: Type.Optional(Type.Union([Type.String(), Type.Number()])),
      },
    ),
    SlotProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLSlotElement")])],
      {
        name: Type.Optional(Type.String()),
      },
    ),
    SourceProps: Type.Interface(
      [Type.Apply(Type.Ref("VoidProps"), [Type.Ref("HTMLSourceElement")])],
      {
        height: Type.Optional(Type.Ref("Numeric")),
        media: Type.Optional(Type.String()),
        sizes: Type.Optional(Type.String()),
        src: Type.Optional(Type.String()),
        srcset: Type.Optional(Type.String()),
        type: Type.Optional(Type.String()),
        width: Type.Optional(Type.Ref("Numeric")),
      },
    ),
    StyleProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLStyleElement")])],
      {
        media: Type.Optional(Type.String()),
        type: Type.Optional(Type.String()),
      },
    ),
    TableProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLTableElement")])],
      {
        summary: Type.Optional(Type.String()),
        width: Type.Optional(Type.Ref("Numeric")),
      },
    ),
    TdProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLTableCellElement")])],
      {
        colspan: Type.Optional(Type.Number()),
        headers: Type.Optional(Type.String()),
        rowspan: Type.Optional(Type.Number()),
      },
    ),
    ThProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLTableCellElement")])],
      {
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
      },
    ),
    TextareaProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLTextAreaElement")])],
      {
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
      },
    ),
    TimeProps: Type.Interface(
      [Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLTimeElement")])],
      {
        datetime: Type.Optional(Type.String()),
      },
    ),
    TrackProps: Type.Interface(
      [Type.Apply(Type.Ref("VoidProps"), [Type.Ref("HTMLTrackElement")])],
      {
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
      },
    ),
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
    SvgProps: Type.Interface(
      [
        Type.Ref("AriaAttributes"),
        Type.Apply(Type.Ref("Events"), [Type.Ref("SVGElement")]),
      ],
      {
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
      },
    ),
  },

  // Keyed by the name a script writes, which is also the id the wire carries
  // and the string `createElement` receives. What each holds is what it
  // accepts, and most of them accept the same shape — which is why this is a
  // map onto interfaces rather than 175 declarations.
  elements: {
    a: Type.Ref("AnchorProps"),
    abbr: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    address: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    area: Type.Ref("AreaProps"),
    article: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    aside: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    audio: Type.Ref("MediaProps"),
    b: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    base: Type.Ref("BaseProps"),
    bdi: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    bdo: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    blockquote: Type.Ref("BlockquoteProps"),
    body: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLBodyElement")]),
    br: Type.Apply(Type.Ref("VoidProps"), [Type.Ref("HTMLBRElement")]),
    button: Type.Ref("ButtonProps"),
    canvas: Type.Ref("CanvasProps"),
    caption: Type.Apply(Type.Ref("HtmlProps"), [
      Type.Ref("HTMLTableCaptionElement"),
    ]),
    cite: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    code: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    col: Type.Ref("ColProps"),
    colgroup: Type.Ref("ColgroupProps"),
    data: Type.Ref("DataProps"),
    datalist: Type.Apply(Type.Ref("HtmlProps"), [
      Type.Ref("HTMLDataListElement"),
    ]),
    dd: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    del: Type.Ref("DelProps"),
    details: Type.Ref("DetailsProps"),
    dfn: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    dialog: Type.Ref("DialogProps"),
    div: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLDivElement")]),
    dl: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLDListElement")]),
    dt: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    em: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    embed: Type.Ref("EmbedProps"),
    fieldset: Type.Ref("FieldsetProps"),
    figcaption: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    figure: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    footer: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    form: Type.Ref("FormProps"),
    h1: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLHeadingElement")]),
    h2: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLHeadingElement")]),
    h3: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLHeadingElement")]),
    h4: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLHeadingElement")]),
    h5: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLHeadingElement")]),
    h6: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLHeadingElement")]),
    head: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLHeadElement")]),
    header: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    hgroup: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    hr: Type.Apply(Type.Ref("VoidProps"), [Type.Ref("HTMLHRElement")]),
    html: Type.Ref("HtmlElementProps"),
    i: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    iframe: Type.Ref("IframeProps"),
    img: Type.Ref("ImgProps"),
    input: Type.Ref("InputProps"),
    ins: Type.Ref("InsProps"),
    kbd: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    label: Type.Ref("LabelProps"),
    legend: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLLegendElement")]),
    li: Type.Ref("LiProps"),
    link: Type.Ref("LinkProps"),
    main: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    map: Type.Ref("MapProps"),
    mark: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    menu: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLMenuElement")]),
    meta: Type.Ref("MetaProps"),
    meter: Type.Ref("MeterProps"),
    nav: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    noscript: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    object: Type.Ref("ObjectProps"),
    ol: Type.Ref("OlProps"),
    optgroup: Type.Ref("OptgroupProps"),
    option: Type.Ref("OptionProps"),
    output: Type.Ref("OutputProps"),
    p: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLParagraphElement")]),
    picture: Type.Apply(Type.Ref("HtmlProps"), [
      Type.Ref("HTMLPictureElement"),
    ]),
    pre: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLPreElement")]),
    progress: Type.Ref("ProgressProps"),
    q: Type.Ref("QuoteProps"),
    rp: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    rt: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    ruby: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    s: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    samp: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    script: Type.Ref("ScriptProps"),
    search: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    section: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    select: Type.Ref("SelectProps"),
    slot: Type.Ref("SlotProps"),
    small: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    source: Type.Ref("SourceProps"),
    span: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLSpanElement")]),
    strong: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    style: Type.Ref("StyleProps"),
    sub: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    summary: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    sup: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    table: Type.Ref("TableProps"),
    tbody: Type.Apply(Type.Ref("HtmlProps"), [
      Type.Ref("HTMLTableSectionElement"),
    ]),
    td: Type.Ref("TdProps"),
    template: Type.Apply(Type.Ref("HtmlProps"), [
      Type.Ref("HTMLTemplateElement"),
    ]),
    textarea: Type.Ref("TextareaProps"),
    tfoot: Type.Apply(Type.Ref("HtmlProps"), [
      Type.Ref("HTMLTableSectionElement"),
    ]),
    th: Type.Ref("ThProps"),
    thead: Type.Apply(Type.Ref("HtmlProps"), [
      Type.Ref("HTMLTableSectionElement"),
    ]),
    time: Type.Ref("TimeProps"),
    title: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLTitleElement")]),
    tr: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLTableRowElement")]),
    track: Type.Ref("TrackProps"),
    u: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    ul: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLUListElement")]),
    var: Type.Apply(Type.Ref("HtmlProps"), [Type.Ref("HTMLElement")]),
    video: Type.Ref("VideoProps"),
    wbr: Type.Apply(Type.Ref("VoidProps"), [Type.Ref("HTMLElement")]),

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

  /**
   * What this target answers for, beside the language's own.
   *
   * A name here is one a script splices and a client hands over — `state` is
   * the same arrangement one layer down. The language's names are closed and a
   * target may lengthen the list but not edit it: `builtinsOf` throws on a
   * collision rather than letting one client answer a bundle differently from
   * every other.
   */
  builtins: {
    window: Type.Ref("Window", {
      description:
        "The window a script is drawn in. Imported and spliced — `$window` —" +
        " rather than written as a bare name: a target's vocabulary is a value" +
        " it hands over, not a word the compiler knows.",
    }),
  },
};
