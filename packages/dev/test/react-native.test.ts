import "global-jsdom/register";
import assert from "node:assert/strict";
import { it } from "node:test";
import type { UIAction } from "../dist/supervisor.js";

// React DevTools' hook, as React Native installs it in development: what
// renderers register with, and the roots they commit.
const roots = new Map<number, Set<unknown>>();
Object.assign(globalThis, {
  __REACT_DEVTOOLS_GLOBAL_HOOK__: {
    renderers: new Map(),
    supportsFiber: true,
    inject(renderer: unknown) {
      const id = this.renderers.size + 1;
      this.renderers.set(id, renderer);
      roots.set(id, new Set());
      return id;
    },
    onCommitFiberRoot(id: number, root: unknown) {
      roots.get(id)!.add(root);
    },
    onCommitFiberUnmount() {},
    onPostCommitFiberRoot() {},
    onScheduleFiberRoot() {},
    checkDCE() {},
    getFiberRoots: (id: number) => roots.get(id)!,
  },
});

const React = await import("react");
const { createRoot } = await import("react-dom/client");
const { reactNativeUI } = await import("../dist/react-native.js");
const h = React.createElement;

// React Native's shapes: a component that takes `onPress`; a TextInput whose
// inner input takes its `onChangeText` too; a list that wraps another
// scrollable; each drawing native views.
function Pressable(props: {
  onPress: () => void;
  disabled?: boolean;
  children?: unknown;
}) {
  return h("div", null, props.children as never);
}
function Inner(props: { value: string; onChangeText: (text: string) => void }) {
  return h("input", { value: props.value, readOnly: true });
}
function TextInput(props: {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
}) {
  return h(Inner, props);
}
class ScrollView extends React.Component<{ children?: unknown }> {
  scrollTo() {}
  render() {
    return h("div", null, this.props.children as never);
  }
}
const scrolledTo: number[] = [];
class List extends React.Component<{ children?: unknown }> {
  _listRef = { _scrollMetrics: { offset: 100, visibleLength: 500 } };
  scrollToOffset({ offset }: { offset: number }) {
    scrolledTo.push(offset);
  }
  render() {
    return h(ScrollView, null, this.props.children as never);
  }
}

function Feed() {
  const [likes, setLikes] = React.useState(0);
  const [text, setText] = React.useState("");
  return h(
    "div",
    null,
    h("span", null, "Feed"),
    // two text nodes, one line
    h("span", null, likes, " liked"),
    h(
      List,
      null,
      h("span", null, "Ada"),
      // nested text, one line
      h("p", null, h("b", null, "Grace"), " ", "Sunset over the harbour"),
      h(Pressable, { onPress: () => setLikes((n) => n + 1) }, `♡ ${likes}`),
      h(TextInput, {
        value: text,
        placeholder: "Add a comment",
        onChangeText: setText,
      }),
      h(Pressable, { onPress: () => {}, disabled: text === "" }, "Send"),
    ),
  );
}

Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: false });
createRoot(document.body.appendChild(document.createElement("div"))).render(
  h(Feed),
);
const settle = () => new Promise((resolve) => setTimeout(resolve, 20));
await settle();
const ui = (action: UIAction) => reactNativeUI(action);

it("outlines what's drawn, a number on each element", async () => {
  assert.equal(
    await ui({ kind: "inspect" }),
    [
      '"Feed"',
      '"0 liked"',
      "[1] scroll",
      '  "Ada"',
      '  "Grace Sunset over the harbour"',
      '  [2] press "♡ 0"',
      '  [3] input "" placeholder "Add a comment"',
      '  [4] press "Send" (disabled)',
    ].join("\n"),
  );
});

it("presses, types and scrolls, as the outline names them", async () => {
  assert.equal(
    await ui({ kind: "press", target: 2 }),
    'Pressed [2] press "♡ 0".',
  );
  assert.equal(
    await ui({ kind: "type", target: 3, text: "Nice" }),
    'Typed "Nice" into [3] input "" placeholder "Add a comment".',
  );
  await settle();
  const outline = await ui({ kind: "inspect" });
  assert.match(outline, /\[2\] press "♡ 1"/);
  assert.match(outline, /^"1 liked"$/m);
  assert.match(outline, /\[3\] input "Nice"/);
  assert.match(outline, /\[4\] press "Send"$/m);
  assert.equal(
    await ui({ kind: "scroll", target: 1, direction: "down" }),
    "Scrolled [1] scroll down.",
  );
  assert.deepEqual(scrolledTo, [100 + 500 * 0.8]);
});

it("says what it can't do", async () => {
  await ui({ kind: "type", target: 3, text: "" });
  await settle();
  await assert.rejects(
    ui({ kind: "press", target: 4 }),
    /^Error: \[4\] press "Send" \(disabled\) is disabled\.$/,
  );
  await assert.rejects(
    ui({ kind: "press", target: 3 }),
    /\[3\] is input, not press/,
  );
  await assert.rejects(ui({ kind: "press", target: 9 }), /There's no \[9\]/);
});
