import assert from "node:assert/strict";
import type { JSX } from "@backtickjs/solid-js/jsx-runtime";
import { draw } from "@backtickjs/solid-js/testing";
import { render } from "@solidjs/testing-library";

// The behavior side of per-instance state: a write has to persist, move
// everything that read the cell, and leave every other instance alone.
//
// The nodes are built once and never rebuilt, so the ones these tests hold are
// the ones a write moves: reading a prop again after a write is reading what
// the host was told, which is the whole of what a host would have drawn.

// What an element drew, as the one element it put in the page.
export async function drawn(value: JSX.Element): Promise<Element> {
  const { container } = render(await draw(value));
  const node = container.firstElementChild;
  assert.ok(node !== null, "expected a rendered element");
  return node;
}

// The size a node's style names. The web's `style` is the attribute HTML has —
// a string — so what a cell holds is read back out of the CSS rather than off
// a member.
export function fontSize(node: Element): unknown {
  const style = node.getAttribute("style");
  assert.equal(typeof style, "string", "expected a style");
  const found = /font-size:\s*(\d+)px/.exec(style as string);
  return found === null ? undefined : Number(found[1]);
}

// What a node says, as the document holds it.
export function text(node: Node): unknown {
  return node.firstChild?.nodeValue;
}

export function children(node: Element): Element[] {
  const held = [...node.children];
  assert.ok(held.length > 0, "expected several children");
  return held;
}
