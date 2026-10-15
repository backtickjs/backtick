// The UI of a React Native app, for an agent: `ui: reactNativeUI` in
// `startDevChannel`'s options. It reads the app's React tree through React
// DevTools' hook, which React Native installs in development, and acts as a
// touch would, by calling the handlers it finds: `onPress`, `onChangeText`,
// and a list's own scrolling.
import type { UIAction } from "./supervisor.js";

// The part of a React fiber this reads.
interface Fiber {
  tag: number;
  type: unknown;
  memoizedProps: Record<string, unknown> | null;
  stateNode: Record<string, unknown> | null;
  child: Fiber | null;
  sibling: Fiber | null;
}

// React's tags for a native view, and for text.
const hostComponent = 5;
const hostText = 6;

type Kind = "press" | "input" | "scroll";

// What can be done to `fiber`, if it's a component that does it itself.
function kindOf(fiber: Fiber): Kind | undefined {
  if (fiber.tag === hostComponent || fiber.tag === hostText) return undefined;
  const props = fiber.memoizedProps ?? {};
  if (typeof props.onPress === "function") return "press";
  if (typeof props.onChangeText === "function") return "input";
  const instance = fiber.stateNode ?? {};
  if (
    typeof instance.scrollToOffset === "function" ||
    typeof instance.scrollTo === "function"
  ) {
    return "scroll";
  }
  return undefined;
}

// The app's trees, as React DevTools' hook keeps them.
function roots(): Fiber[] {
  const hook = (globalThis as { __REACT_DEVTOOLS_GLOBAL_HOOK__?: Hook })
    .__REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (hook?.getFiberRoots === undefined) {
    throw new Error(
      "React DevTools' hook isn't here: the UI can only be read in development.",
    );
  }
  return [...hook.renderers.keys()].flatMap((renderer) =>
    [...hook.getFiberRoots!(renderer)].map((root) => root.current),
  );
}

interface Hook {
  renderers: Map<number, unknown>;
  getFiberRoots?(renderer: number): Set<{ current: Fiber }>;
}

// An element that can be acted on, numbered in the order it's found.
interface Element {
  number: number;
  kind: Kind;
  fiber: Fiber;
  // Drawn wholly outside the screen: in a list, beyond what it shows.
  offScreen: boolean;
}

interface Rect {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

// React Native's renderer, which measures any native view by its node:
// `[x, y, width, height]` on the screen.
interface FabricUIManager {
  getBoundingClientRect(
    node: unknown,
    includeTransform: boolean,
  ): readonly [number, number, number, number] | null | undefined;
}

// Where `fiber`'s first native view is drawn. Undefined where it can't be
// measured: outside React Native's new architecture.
function rectOf(fiber: Fiber | null): Rect | undefined {
  for (; fiber !== null; fiber = fiber.sibling) {
    if (fiber.tag === hostComponent) {
      const { nativeFabricUIManager } = globalThis as {
        nativeFabricUIManager?: FabricUIManager;
      };
      const node = (fiber.stateNode as { node?: unknown } | null)?.node;
      const box =
        node === undefined
          ? undefined
          : nativeFabricUIManager?.getBoundingClientRect(node, true);
      if (box == null) return undefined;
      const [left, top, width, height] = box;
      return { top, left, bottom: top + height, right: left + width };
    }
    const rect = rectOf(fiber.child);
    if (rect !== undefined) return rect;
  }
  return undefined;
}

// Whether `rect` is drawn wholly outside `screen`. Neither measured, or
// either of no size, as under a test's DOM, isn't.
function outside(rect: Rect | undefined, screen: Rect | undefined): boolean {
  if (rect === undefined || screen === undefined) return false;
  const sized = (each: Rect) =>
    each.right > each.left && each.bottom > each.top;
  if (!sized(rect) || !sized(screen)) return false;
  return (
    rect.bottom <= screen.top ||
    rect.top >= screen.bottom ||
    rect.right <= screen.left ||
    rect.left >= screen.right
  );
}

const offScreen = " (off screen)";

// The app's UI as lines of text, each element numbered, and the elements.
function outline(): { lines: string[]; elements: Element[] } {
  const lines: string[] = [];
  const elements: Element[] = [];
  // `wrapped`: the kinds a component above already is, until a native view:
  // FlatList wraps a VirtualizedList, which wraps a ScrollView, and a
  // TextInput's inner input takes its `onChangeText`. `label`: where text
  // goes, for an element that names itself by it.
  // `screen`: where the root's first native view is drawn, which the app's
  // root view covers.
  let screen: Rect | undefined;
  const visit = (
    fiber: Fiber | null,
    depth: number,
    wrapped: ReadonlySet<Kind>,
    label: string[] | undefined,
  ) => {
    for (; fiber !== null; fiber = fiber.sibling) {
      // A run of text: one line, joined as written, then trimmed.
      if (fiber.tag === hostText || holdsText(fiber)) {
        const text = textOf(fiber).trim();
        if (text === "") continue;
        if (label !== undefined) {
          label.push(text);
          continue;
        }
        const where = outside(rectOf(fiber), screen) ? offScreen : "";
        lines.push(`${"  ".repeat(depth)}${JSON.stringify(text)}${where}`);
        continue;
      }
      const kind = kindOf(fiber);
      if (kind !== undefined && !wrapped.has(kind)) {
        const element = {
          number: elements.length + 1,
          kind,
          fiber,
          offScreen: outside(rectOf(fiber.child), screen),
        };
        elements.push(element);
        const at = lines.push("") - 1;
        const own = kind === "scroll" ? label : [];
        visit(fiber.child, depth + 1, new Set([...wrapped, kind]), own);
        const named = describe(element, kind === "scroll" ? [] : own!);
        lines[at] = `${"  ".repeat(depth)}${named}`;
        continue;
      }
      const host = fiber.tag === hostComponent;
      visit(fiber.child, depth, host ? new Set() : wrapped, label);
    }
  };
  for (const root of roots()) {
    screen = rectOf(root.child);
    visit(root.child, 0, new Set(), undefined);
  }
  return { lines, elements };
}

// Whether `fiber` is a native view holding text itself, as a `Text` does:
// what's under it is one run, nested text included, as `{count} liked`'s two
// text nodes, or a bold name before a caption. A view holding only other
// views of text, each its own run, doesn't.
function holdsText(fiber: Fiber): boolean {
  if (fiber.tag !== hostComponent) return false;
  if (fiber.child === null) return lone(fiber) !== undefined;
  for (let child: Fiber | null = fiber.child; child; child = child.sibling) {
    if (child.tag === hostText) return true;
  }
  return false;
}

// A native view's text as React DOM holds a lone string: in its props, with
// no text node.
function lone(fiber: Fiber): string | undefined {
  const children = fiber.memoizedProps?.children;
  return typeof children === "string" || typeof children === "number"
    ? String(children)
    : undefined;
}

// All the text under `fiber`, joined as written.
function textOf(fiber: Fiber): string {
  if (fiber.tag === hostText) return String(fiber.memoizedProps ?? "");
  if (fiber.tag === hostComponent && fiber.child === null) {
    return lone(fiber) ?? "";
  }
  let text = "";
  for (let child: Fiber | null = fiber.child; child; child = child.sibling) {
    text += textOf(child);
  }
  return text;
}

// `[3] press "♡ 0"`, `[4] input "" placeholder "Add a comment"`.
function describe(element: Element, label: string[]): string {
  const { number, kind, fiber } = element;
  const props = fiber.memoizedProps ?? {};
  const parts = [`[${number}]`, kind];
  if (kind === "input") {
    parts.push(JSON.stringify(String(props.value ?? props.defaultValue ?? "")));
    if (props.placeholder !== undefined) {
      parts.push("placeholder", JSON.stringify(String(props.placeholder)));
    }
  } else if (label.length > 0) {
    parts.push(JSON.stringify(label.join(" ")));
  }
  if (props.disabled === true || props.editable === false) {
    parts.push("(disabled)");
  }
  if (element.offScreen) parts.push(offScreen.trim());
  return parts.join(" ");
}

// The element numbered `target` in the outline as it is now.
function find(target: number, kind: Kind): Element {
  const element = outline().elements.find((each) => each.number === target);
  if (element === undefined) {
    throw new Error(`There's no [${target}]: inspect the app again.`);
  }
  if (element.kind !== kind) {
    throw new Error(
      `[${target}] is ${element.kind}, not ${kind}: inspect the app again.`,
    );
  }
  return element;
}

// What scrolling a list moves by: most of what it shows.
const page = 0.8;

/**
 * Answers an agent's UI action, by its outline of the app: `inspect`, then
 * `press`, `type` or `scroll` the element a number names. Each answers what
 * it did, naming the element as `inspect` did, so a stale number shows.
 */
export async function reactNativeUI(action: UIAction): Promise<string> {
  if (action.kind === "inspect") {
    const { lines } = outline();
    return lines.length === 0 ? "Nothing is drawn." : lines.join("\n");
  }
  const kind = action.kind === "type" ? "input" : action.kind;
  const element = find(action.target, kind);
  const props = element.fiber.memoizedProps ?? {};
  const { lines } = outline();
  const named = lines.find((line) =>
    line.trimStart().startsWith(`[${action.target}]`),
  )!;
  if (props.disabled === true || props.editable === false) {
    throw new Error(`${named.trim()} is disabled.`);
  }
  if (element.offScreen && action.kind !== "scroll") {
    throw new Error(`${named.trim()} is off screen: scroll to it first.`);
  }
  if (action.kind === "press") {
    (props.onPress as (event: unknown) => void)(touch());
    return `Pressed ${named.trim()}.`;
  }
  if (action.kind === "type") {
    (props.onChangeText as (text: string) => void)(action.text);
    return `Typed ${JSON.stringify(action.text)} into ${named.trim()}.`;
  }
  scroll(element.fiber.stateNode!, action.direction);
  return `Scrolled ${named.trim()} ${action.direction}.`;
}

// A list's own scrolling, by most of what it shows: FlatList's and
// VirtualizedList's, which know where they are, or a ScrollView's, to its
// end or its start.
function scroll(instance: Record<string, unknown>, direction: "up" | "down") {
  const list = (instance._listRef ?? instance) as {
    _scrollMetrics?: { offset: number; visibleLength: number };
  };
  const metrics = list._scrollMetrics;
  if (typeof instance.scrollToOffset === "function" && metrics !== undefined) {
    const by = metrics.visibleLength * page * (direction === "down" ? 1 : -1);
    (instance.scrollToOffset as (to: object) => void)({
      offset: Math.max(0, metrics.offset + by),
      animated: true,
    });
  } else if (
    direction === "down" &&
    typeof instance.scrollToEnd === "function"
  ) {
    (instance.scrollToEnd as (options: object) => void)({ animated: true });
  } else {
    (instance.scrollTo as (to: object) => void)({ y: 0, animated: true });
  }
}

// What a press hands its handler, as React Native's touch would, in part.
function touch() {
  return {
    nativeEvent: { timestamp: Date.now(), pageX: 0, pageY: 0 },
    persist() {},
    preventDefault() {},
    stopPropagation() {},
  };
}
