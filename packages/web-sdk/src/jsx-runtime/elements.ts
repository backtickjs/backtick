import type {
  Children,
  Client,
  JsxElement,
  Key,
  Prop,
} from "@backtickjs/cs-runtime";

// What a browser's elements accept, as JSX writes them. Modelled on React's
// `@types/react`, element for element and attribute for attribute, with three
// deliberate differences:
//
//   - The names are HTML's, not the DOM's: `class`, `for`, `colspan`,
//     `maxlength`, `onclick`. A tag reaches the client as an element whose id
//     is the tag name and whose props are set as attributes, so what is
//     written here is what is rendered — see `../client/dom.ts`.
//   - Every value is a `Prop`, so a script may stand where a literal would.
//   - A handler takes nothing. A script has no event object to be handed, so
//     which event it is, is the prop's name.
//
// `data-*` is not declared and does not need to be: TypeScript exempts a JSX
// attribute whose name isn't a valid identifier from checking, which is the
// same rule that lets React accept it. The `aria-*` attributes below are
// declared anyway, so their values are checked — at the cost that a misspelled
// one is silently accepted, exactly as in React.
//
// SVG is not covered.

// One child or several, and a script in place of either.
export type Content = Children<JsxElement | string | number>;

// ARIA reads the words `true` and `false`, so a boolean attribute here is not
// the HTML kind that is present or absent.
type Booleanish = boolean | "true" | "false";

type Handler = Client<() => void>;

type Numeric = Prop<number | string>;

export type AriaRole =
  | "alert"
  | "alertdialog"
  | "application"
  | "article"
  | "banner"
  | "button"
  | "cell"
  | "checkbox"
  | "columnheader"
  | "combobox"
  | "complementary"
  | "contentinfo"
  | "definition"
  | "dialog"
  | "directory"
  | "document"
  | "feed"
  | "figure"
  | "form"
  | "grid"
  | "gridcell"
  | "group"
  | "heading"
  | "img"
  | "link"
  | "list"
  | "listbox"
  | "listitem"
  | "log"
  | "main"
  | "marquee"
  | "math"
  | "menu"
  | "menubar"
  | "menuitem"
  | "menuitemcheckbox"
  | "menuitemradio"
  | "navigation"
  | "none"
  | "note"
  | "option"
  | "presentation"
  | "progressbar"
  | "radio"
  | "radiogroup"
  | "region"
  | "row"
  | "rowgroup"
  | "rowheader"
  | "scrollbar"
  | "search"
  | "searchbox"
  | "separator"
  | "slider"
  | "spinbutton"
  | "status"
  | "switch"
  | "tab"
  | "table"
  | "tablist"
  | "tabpanel"
  | "term"
  | "textbox"
  | "timer"
  | "toolbar"
  | "tooltip"
  | "tree"
  | "treegrid"
  | "treeitem"
  // A role this list hasn't caught up with is still a role.
  | (string & {});

export interface AriaAttributes {
  "aria-activedescendant"?: Prop<string>;
  "aria-atomic"?: Prop<Booleanish>;
  "aria-autocomplete"?: Prop<"none" | "inline" | "list" | "both">;
  "aria-braillelabel"?: Prop<string>;
  "aria-brailleroledescription"?: Prop<string>;
  "aria-busy"?: Prop<Booleanish>;
  "aria-checked"?: Prop<boolean | "false" | "mixed" | "true">;
  "aria-colcount"?: Prop<number>;
  "aria-colindex"?: Prop<number>;
  "aria-colindextext"?: Prop<string>;
  "aria-colspan"?: Prop<number>;
  "aria-controls"?: Prop<string>;
  "aria-current"?: Prop<
    boolean | "false" | "true" | "page" | "step" | "location" | "date" | "time"
  >;
  "aria-describedby"?: Prop<string>;
  "aria-description"?: Prop<string>;
  "aria-details"?: Prop<string>;
  "aria-disabled"?: Prop<Booleanish>;
  "aria-errormessage"?: Prop<string>;
  "aria-expanded"?: Prop<Booleanish>;
  "aria-flowto"?: Prop<string>;
  "aria-haspopup"?: Prop<
    boolean | "false" | "true" | "menu" | "listbox" | "tree" | "grid" | "dialog"
  >;
  "aria-hidden"?: Prop<Booleanish>;
  "aria-invalid"?: Prop<boolean | "false" | "true" | "grammar" | "spelling">;
  "aria-keyshortcuts"?: Prop<string>;
  "aria-label"?: Prop<string>;
  "aria-labelledby"?: Prop<string>;
  "aria-level"?: Prop<number>;
  "aria-live"?: Prop<"off" | "assertive" | "polite">;
  "aria-modal"?: Prop<Booleanish>;
  "aria-multiline"?: Prop<Booleanish>;
  "aria-multiselectable"?: Prop<Booleanish>;
  "aria-orientation"?: Prop<"horizontal" | "vertical">;
  "aria-owns"?: Prop<string>;
  "aria-placeholder"?: Prop<string>;
  "aria-posinset"?: Prop<number>;
  "aria-pressed"?: Prop<boolean | "false" | "mixed" | "true">;
  "aria-readonly"?: Prop<Booleanish>;
  "aria-relevant"?: Prop<
    | "additions"
    | "additions removals"
    | "additions text"
    | "all"
    | "removals"
    | "removals additions"
    | "removals text"
    | "text"
    | "text additions"
    | "text removals"
  >;
  "aria-required"?: Prop<Booleanish>;
  "aria-roledescription"?: Prop<string>;
  "aria-rowcount"?: Prop<number>;
  "aria-rowindex"?: Prop<number>;
  "aria-rowindextext"?: Prop<string>;
  "aria-rowspan"?: Prop<number>;
  "aria-selected"?: Prop<Booleanish>;
  "aria-setsize"?: Prop<number>;
  "aria-sort"?: Prop<"none" | "ascending" | "descending" | "other">;
  "aria-valuemax"?: Prop<number>;
  "aria-valuemin"?: Prop<number>;
  "aria-valuenow"?: Prop<number>;
  "aria-valuetext"?: Prop<string>;
}

export interface Events {
  // Clipboard
  oncopy?: Handler;
  oncut?: Handler;
  onpaste?: Handler;

  // Composition
  oncompositionend?: Handler;
  oncompositionstart?: Handler;
  oncompositionupdate?: Handler;

  // Focus
  onblur?: Handler;
  onfocus?: Handler;
  onfocusin?: Handler;
  onfocusout?: Handler;

  // Form
  onbeforeinput?: Handler;
  onchange?: Handler;
  oninput?: Handler;
  oninvalid?: Handler;
  onreset?: Handler;
  onselect?: Handler;
  onsubmit?: Handler;

  // Loading
  onerror?: Handler;
  onload?: Handler;

  // Keyboard
  onkeydown?: Handler;
  onkeypress?: Handler;
  onkeyup?: Handler;

  // Media
  onabort?: Handler;
  oncanplay?: Handler;
  oncanplaythrough?: Handler;
  ondurationchange?: Handler;
  onemptied?: Handler;
  onended?: Handler;
  onloadeddata?: Handler;
  onloadedmetadata?: Handler;
  onloadstart?: Handler;
  onpause?: Handler;
  onplay?: Handler;
  onplaying?: Handler;
  onprogress?: Handler;
  onratechange?: Handler;
  onseeked?: Handler;
  onseeking?: Handler;
  onstalled?: Handler;
  onsuspend?: Handler;
  ontimeupdate?: Handler;
  onvolumechange?: Handler;
  onwaiting?: Handler;

  // Mouse
  onauxclick?: Handler;
  onclick?: Handler;
  oncontextmenu?: Handler;
  ondblclick?: Handler;
  onmousedown?: Handler;
  onmouseenter?: Handler;
  onmouseleave?: Handler;
  onmousemove?: Handler;
  onmouseout?: Handler;
  onmouseover?: Handler;
  onmouseup?: Handler;

  // Drag
  ondrag?: Handler;
  ondragend?: Handler;
  ondragenter?: Handler;
  ondragleave?: Handler;
  ondragover?: Handler;
  ondragstart?: Handler;
  ondrop?: Handler;

  // Touch
  ontouchcancel?: Handler;
  ontouchend?: Handler;
  ontouchmove?: Handler;
  ontouchstart?: Handler;

  // Pointer
  ongotpointercapture?: Handler;
  onlostpointercapture?: Handler;
  onpointercancel?: Handler;
  onpointerdown?: Handler;
  onpointerenter?: Handler;
  onpointerleave?: Handler;
  onpointermove?: Handler;
  onpointerout?: Handler;
  onpointerover?: Handler;
  onpointerup?: Handler;

  // Scroll and wheel
  onscroll?: Handler;
  onscrollend?: Handler;
  onwheel?: Handler;

  // Animation and transition
  onanimationend?: Handler;
  onanimationiteration?: Handler;
  onanimationstart?: Handler;
  ontransitioncancel?: Handler;
  ontransitionend?: Handler;
  ontransitionrun?: Handler;
  ontransitionstart?: Handler;

  // Popover and disclosure
  onbeforetoggle?: Handler;
  ontoggle?: Handler;
}

/**
 * The attributes every element carries.
 */
export interface GlobalAttributes extends AriaAttributes, Events {
  // `JSX.IntrinsicAttributes` is applied to components, not to tags, so a tag
  // that takes a key has to say so itself — which is why React's own element
  // props carry one too.
  key?: Key;
  accesskey?: Prop<string>;
  autocapitalize?: Prop<
    "off" | "none" | "on" | "sentences" | "words" | "characters"
  >;
  autocorrect?: Prop<"on" | "off">;
  autofocus?: Prop<boolean>;
  class?: Prop<string>;
  contenteditable?: Prop<Booleanish | "inherit" | "plaintext-only">;
  dir?: Prop<"ltr" | "rtl" | "auto">;
  draggable?: Prop<Booleanish>;
  enterkeyhint?: Prop<
    "enter" | "done" | "go" | "next" | "previous" | "search" | "send"
  >;
  exportparts?: Prop<string>;
  hidden?: Prop<boolean | "until-found">;
  id?: Prop<string>;
  inert?: Prop<boolean>;
  inputmode?: Prop<
    "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search"
  >;
  is?: Prop<string>;
  itemid?: Prop<string>;
  itemprop?: Prop<string>;
  itemref?: Prop<string>;
  itemscope?: Prop<boolean>;
  itemtype?: Prop<string>;
  lang?: Prop<string>;
  nonce?: Prop<string>;
  part?: Prop<string>;
  popover?: Prop<"" | "auto" | "manual" | "hint">;
  role?: Prop<AriaRole>;
  slot?: Prop<string>;
  spellcheck?: Prop<Booleanish>;
  // The attribute HTML has, not the object the native clients take: a web app
  // writes CSS.
  style?: Prop<string>;
  tabindex?: Prop<number>;
  title?: Prop<string>;
  translate?: Prop<"yes" | "no">;
}

/**
 * An element that holds nothing — `<br>`, `<img>`, `<input>`. Written closed
 * in JSX (`<br />`), and given children it is a type error rather than markup
 * a browser would silently drop.
 */
export interface VoidProps extends GlobalAttributes {}

/**
 * An element that holds children, which is most of them.
 */
export interface HtmlProps extends GlobalAttributes {
  children?: Content;
}

type ReferrerPolicy = Prop<
  | ""
  | "no-referrer"
  | "no-referrer-when-downgrade"
  | "origin"
  | "origin-when-cross-origin"
  | "same-origin"
  | "strict-origin"
  | "strict-origin-when-cross-origin"
  | "unsafe-url"
>;

type CrossOrigin = Prop<"anonymous" | "use-credentials" | "">;

type Target = Prop<"_self" | "_blank" | "_parent" | "_top" | (string & {})>;

export interface AnchorProps extends HtmlProps {
  download?: Prop<string | boolean>;
  href?: Prop<string>;
  hreflang?: Prop<string>;
  media?: Prop<string>;
  ping?: Prop<string>;
  referrerpolicy?: ReferrerPolicy;
  rel?: Prop<string>;
  target?: Target;
  type?: Prop<string>;
}

export interface AreaProps extends VoidProps {
  alt?: Prop<string>;
  coords?: Prop<string>;
  download?: Prop<string | boolean>;
  href?: Prop<string>;
  referrerpolicy?: ReferrerPolicy;
  rel?: Prop<string>;
  shape?: Prop<"rect" | "circle" | "poly" | "default">;
  target?: Target;
}

export interface BaseProps extends VoidProps {
  href?: Prop<string>;
  target?: Target;
}

export interface BlockquoteProps extends HtmlProps {
  cite?: Prop<string>;
}

export interface ButtonProps extends HtmlProps {
  disabled?: Prop<boolean>;
  form?: Prop<string>;
  formaction?: Prop<string>;
  formenctype?: Prop<string>;
  formmethod?: Prop<"get" | "post" | "dialog">;
  formnovalidate?: Prop<boolean>;
  formtarget?: Target;
  name?: Prop<string>;
  popovertarget?: Prop<string>;
  popovertargetaction?: Prop<"toggle" | "show" | "hide">;
  type?: Prop<"submit" | "reset" | "button">;
  value?: Prop<string | number>;
}

export interface CanvasProps extends HtmlProps {
  height?: Numeric;
  width?: Numeric;
}

export interface ColProps extends VoidProps {
  span?: Prop<number>;
  width?: Numeric;
}

export interface ColgroupProps extends HtmlProps {
  span?: Prop<number>;
}

export interface DataProps extends HtmlProps {
  value?: Prop<string | number>;
}

export interface DelProps extends HtmlProps {
  cite?: Prop<string>;
  datetime?: Prop<string>;
}

export interface DetailsProps extends HtmlProps {
  name?: Prop<string>;
  open?: Prop<boolean>;
}

export interface DialogProps extends HtmlProps {
  closedby?: Prop<"any" | "closerequest" | "none">;
  open?: Prop<boolean>;
}

export interface EmbedProps extends VoidProps {
  height?: Numeric;
  src?: Prop<string>;
  type?: Prop<string>;
  width?: Numeric;
}

export interface FieldsetProps extends HtmlProps {
  disabled?: Prop<boolean>;
  form?: Prop<string>;
  name?: Prop<string>;
}

export interface FormProps extends HtmlProps {
  "accept-charset"?: Prop<string>;
  action?: Prop<string>;
  autocomplete?: Prop<"on" | "off">;
  enctype?: Prop<string>;
  method?: Prop<"get" | "post" | "dialog">;
  name?: Prop<string>;
  novalidate?: Prop<boolean>;
  rel?: Prop<string>;
  target?: Target;
}

export interface HtmlElementProps extends HtmlProps {
  manifest?: Prop<string>;
}

export interface IframeProps extends HtmlProps {
  allow?: Prop<string>;
  allowfullscreen?: Prop<boolean>;
  height?: Numeric;
  loading?: Prop<"eager" | "lazy">;
  name?: Prop<string>;
  referrerpolicy?: ReferrerPolicy;
  sandbox?: Prop<string>;
  src?: Prop<string>;
  srcdoc?: Prop<string>;
  width?: Numeric;
}

export interface ImgProps extends VoidProps {
  alt?: Prop<string>;
  crossorigin?: CrossOrigin;
  decoding?: Prop<"async" | "auto" | "sync">;
  fetchpriority?: Prop<"high" | "low" | "auto">;
  height?: Numeric;
  loading?: Prop<"eager" | "lazy">;
  referrerpolicy?: ReferrerPolicy;
  sizes?: Prop<string>;
  src?: Prop<string>;
  srcset?: Prop<string>;
  usemap?: Prop<string>;
  width?: Numeric;
}

export interface InputProps extends VoidProps {
  accept?: Prop<string>;
  alt?: Prop<string>;
  autocomplete?: Prop<string>;
  capture?: Prop<boolean | "user" | "environment">;
  checked?: Prop<boolean>;
  dirname?: Prop<string>;
  disabled?: Prop<boolean>;
  form?: Prop<string>;
  formaction?: Prop<string>;
  formenctype?: Prop<string>;
  formmethod?: Prop<"get" | "post" | "dialog">;
  formnovalidate?: Prop<boolean>;
  formtarget?: Target;
  height?: Numeric;
  list?: Prop<string>;
  max?: Numeric;
  maxlength?: Prop<number>;
  min?: Numeric;
  minlength?: Prop<number>;
  multiple?: Prop<boolean>;
  name?: Prop<string>;
  pattern?: Prop<string>;
  placeholder?: Prop<string>;
  readonly?: Prop<boolean>;
  required?: Prop<boolean>;
  size?: Prop<number>;
  src?: Prop<string>;
  step?: Numeric;
  type?: Prop<
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week"
  >;
  value?: Prop<string | number>;
  width?: Numeric;
}

export interface InsProps extends HtmlProps {
  cite?: Prop<string>;
  datetime?: Prop<string>;
}

export interface LabelProps extends HtmlProps {
  for?: Prop<string>;
  form?: Prop<string>;
}

export interface LiProps extends HtmlProps {
  value?: Prop<number>;
}

export interface LinkProps extends VoidProps {
  as?: Prop<string>;
  crossorigin?: CrossOrigin;
  fetchpriority?: Prop<"high" | "low" | "auto">;
  href?: Prop<string>;
  hreflang?: Prop<string>;
  imagesizes?: Prop<string>;
  imagesrcset?: Prop<string>;
  integrity?: Prop<string>;
  media?: Prop<string>;
  referrerpolicy?: ReferrerPolicy;
  rel?: Prop<string>;
  sizes?: Prop<string>;
  type?: Prop<string>;
}

export interface MapProps extends HtmlProps {
  name?: Prop<string>;
}

export interface MediaProps extends HtmlProps {
  autoplay?: Prop<boolean>;
  controls?: Prop<boolean>;
  controlslist?: Prop<string>;
  crossorigin?: CrossOrigin;
  loop?: Prop<boolean>;
  muted?: Prop<boolean>;
  preload?: Prop<"none" | "metadata" | "auto" | "">;
  src?: Prop<string>;
}

export interface MetaProps extends VoidProps {
  charset?: Prop<string>;
  content?: Prop<string>;
  "http-equiv"?: Prop<string>;
  media?: Prop<string>;
  name?: Prop<string>;
}

export interface MeterProps extends HtmlProps {
  form?: Prop<string>;
  high?: Prop<number>;
  low?: Prop<number>;
  max?: Numeric;
  min?: Numeric;
  optimum?: Prop<number>;
  value?: Prop<string | number>;
}

export interface ObjectProps extends HtmlProps {
  data?: Prop<string>;
  form?: Prop<string>;
  height?: Numeric;
  name?: Prop<string>;
  type?: Prop<string>;
  usemap?: Prop<string>;
  width?: Numeric;
}

export interface OlProps extends HtmlProps {
  reversed?: Prop<boolean>;
  start?: Prop<number>;
  type?: Prop<"1" | "a" | "A" | "i" | "I">;
}

export interface OptgroupProps extends HtmlProps {
  disabled?: Prop<boolean>;
  label?: Prop<string>;
}

export interface OptionProps extends HtmlProps {
  disabled?: Prop<boolean>;
  label?: Prop<string>;
  selected?: Prop<boolean>;
  value?: Prop<string | number>;
}

export interface OutputProps extends HtmlProps {
  for?: Prop<string>;
  form?: Prop<string>;
  name?: Prop<string>;
}

export interface ProgressProps extends HtmlProps {
  max?: Numeric;
  value?: Prop<string | number>;
}

export interface QuoteProps extends HtmlProps {
  cite?: Prop<string>;
}

export interface ScriptProps extends HtmlProps {
  async?: Prop<boolean>;
  crossorigin?: CrossOrigin;
  defer?: Prop<boolean>;
  fetchpriority?: Prop<"high" | "low" | "auto">;
  integrity?: Prop<string>;
  nomodule?: Prop<boolean>;
  referrerpolicy?: ReferrerPolicy;
  src?: Prop<string>;
  type?: Prop<string>;
}

export interface SelectProps extends HtmlProps {
  autocomplete?: Prop<string>;
  disabled?: Prop<boolean>;
  form?: Prop<string>;
  multiple?: Prop<boolean>;
  name?: Prop<string>;
  required?: Prop<boolean>;
  size?: Prop<number>;
  value?: Prop<string | number>;
}

export interface SlotProps extends HtmlProps {
  name?: Prop<string>;
}

export interface SourceProps extends VoidProps {
  height?: Numeric;
  media?: Prop<string>;
  sizes?: Prop<string>;
  src?: Prop<string>;
  srcset?: Prop<string>;
  type?: Prop<string>;
  width?: Numeric;
}

export interface StyleProps extends HtmlProps {
  media?: Prop<string>;
  type?: Prop<string>;
}

export interface TableProps extends HtmlProps {
  summary?: Prop<string>;
  width?: Numeric;
}

export interface TdProps extends HtmlProps {
  colspan?: Prop<number>;
  headers?: Prop<string>;
  rowspan?: Prop<number>;
}

export interface ThProps extends HtmlProps {
  abbr?: Prop<string>;
  colspan?: Prop<number>;
  headers?: Prop<string>;
  rowspan?: Prop<number>;
  scope?: Prop<"row" | "col" | "rowgroup" | "colgroup">;
}

export interface TextareaProps extends HtmlProps {
  autocomplete?: Prop<string>;
  cols?: Prop<number>;
  dirname?: Prop<string>;
  disabled?: Prop<boolean>;
  form?: Prop<string>;
  maxlength?: Prop<number>;
  minlength?: Prop<number>;
  name?: Prop<string>;
  placeholder?: Prop<string>;
  readonly?: Prop<boolean>;
  required?: Prop<boolean>;
  rows?: Prop<number>;
  value?: Prop<string | number>;
  wrap?: Prop<"hard" | "soft" | "off">;
}

export interface TimeProps extends HtmlProps {
  datetime?: Prop<string>;
}

export interface TrackProps extends VoidProps {
  default?: Prop<boolean>;
  kind?: Prop<
    "subtitles" | "captions" | "descriptions" | "chapters" | "metadata"
  >;
  label?: Prop<string>;
  src?: Prop<string>;
  srclang?: Prop<string>;
}

export interface VideoProps extends MediaProps {
  disablepictureinpicture?: Prop<boolean>;
  disableremoteplayback?: Prop<boolean>;
  height?: Numeric;
  playsinline?: Prop<boolean>;
  poster?: Prop<string>;
  width?: Numeric;
}

/**
 * The tags a web app may write, and what each accepts.
 */
export interface IntrinsicElements {
  a: AnchorProps;
  abbr: HtmlProps;
  address: HtmlProps;
  area: AreaProps;
  article: HtmlProps;
  aside: HtmlProps;
  audio: MediaProps;
  b: HtmlProps;
  base: BaseProps;
  bdi: HtmlProps;
  bdo: HtmlProps;
  blockquote: BlockquoteProps;
  body: HtmlProps;
  br: VoidProps;
  button: ButtonProps;
  canvas: CanvasProps;
  caption: HtmlProps;
  cite: HtmlProps;
  code: HtmlProps;
  col: ColProps;
  colgroup: ColgroupProps;
  data: DataProps;
  datalist: HtmlProps;
  dd: HtmlProps;
  del: DelProps;
  details: DetailsProps;
  dfn: HtmlProps;
  dialog: DialogProps;
  div: HtmlProps;
  dl: HtmlProps;
  dt: HtmlProps;
  em: HtmlProps;
  embed: EmbedProps;
  fieldset: FieldsetProps;
  figcaption: HtmlProps;
  figure: HtmlProps;
  footer: HtmlProps;
  form: FormProps;
  h1: HtmlProps;
  h2: HtmlProps;
  h3: HtmlProps;
  h4: HtmlProps;
  h5: HtmlProps;
  h6: HtmlProps;
  head: HtmlProps;
  header: HtmlProps;
  hgroup: HtmlProps;
  hr: VoidProps;
  html: HtmlElementProps;
  i: HtmlProps;
  iframe: IframeProps;
  img: ImgProps;
  input: InputProps;
  ins: InsProps;
  kbd: HtmlProps;
  label: LabelProps;
  legend: HtmlProps;
  li: LiProps;
  link: LinkProps;
  main: HtmlProps;
  map: MapProps;
  mark: HtmlProps;
  menu: HtmlProps;
  meta: MetaProps;
  meter: MeterProps;
  nav: HtmlProps;
  noscript: HtmlProps;
  object: ObjectProps;
  ol: OlProps;
  optgroup: OptgroupProps;
  option: OptionProps;
  output: OutputProps;
  p: HtmlProps;
  picture: HtmlProps;
  pre: HtmlProps;
  progress: ProgressProps;
  q: QuoteProps;
  rp: HtmlProps;
  rt: HtmlProps;
  ruby: HtmlProps;
  s: HtmlProps;
  samp: HtmlProps;
  script: ScriptProps;
  search: HtmlProps;
  section: HtmlProps;
  select: SelectProps;
  slot: SlotProps;
  small: HtmlProps;
  source: SourceProps;
  span: HtmlProps;
  strong: HtmlProps;
  style: StyleProps;
  sub: HtmlProps;
  summary: HtmlProps;
  sup: HtmlProps;
  table: TableProps;
  tbody: HtmlProps;
  td: TdProps;
  template: HtmlProps;
  textarea: TextareaProps;
  tfoot: HtmlProps;
  th: ThProps;
  thead: HtmlProps;
  time: TimeProps;
  title: HtmlProps;
  tr: HtmlProps;
  track: TrackProps;
  u: HtmlProps;
  ul: HtmlProps;
  var: HtmlProps;
  video: VideoProps;
  wbr: VoidProps;
}
