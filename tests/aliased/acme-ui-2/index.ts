import type { JSX } from "solid-js";
import { insert } from "solid-js/web";

export type ButtonTone = "primary" | "quiet";

// acme-ui 2's Button: 1.x's `variant` is now `tone`.
export function Button(props: {
  tone: ButtonTone;
  onClick: () => void;
  children: JSX.Element;
}): JSX.Element {
  const button = document.createElement("button");
  button.className = props.tone;
  button.addEventListener("click", () => props.onClick());
  insert(button, () => props.children);
  return button;
}
