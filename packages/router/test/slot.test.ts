import assert from "node:assert/strict";
import { test } from "node:test";
import { createElement, type ReactElement } from "react";
import { slotted } from "../dist/slot.js";

function Pressable(_: object) {
  return null;
}

type Props = {
  children: unknown;
  onPress: (event: never) => void;
  style: unknown;
  role?: string;
  hitSlop?: number;
};

const child = (props: object) =>
  createElement(Pressable, props, "contents") as ReactElement;

test("the child keeps its own contents: it isn't nested in itself", () => {
  const element = slotted(child({}), { onPress() {} });
  assert.equal(element.type, Pressable);
  assert.equal((element.props as Props).children, "contents");
});

test("both onPress run, the child's first", () => {
  const calls: string[] = [];
  const element = slotted(child({ onPress: () => calls.push("child") }), {
    onPress: () => calls.push("link"),
  });
  (element.props as Props).onPress(undefined as never);
  assert.deepEqual(calls, ["child", "link"]);
});

test("styles merge, and the child's own props win", () => {
  const element = slotted(child({ style: { padding: 1 }, hitSlop: 1 }), {
    onPress() {},
    style: { margin: 2 },
    hitSlop: 2,
    role: "link",
  } as never);
  const props = element.props as Props;
  assert.deepEqual(props.style, [{ padding: 1 }, { margin: 2 }]);
  assert.equal(props.hitSlop, 1);
  assert.equal(props.role, "link");
});

test("more than one child is refused", () => {
  assert.throws(() => slotted(["a", "b"], { onPress() {} }));
});
