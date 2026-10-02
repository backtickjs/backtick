import type { JSX } from "solid-js";
import { insert } from "solid-js/web";

// A component a third-party Solid library ships, as its build would be: plain
// Solid, typed with Solid's own types.
export function Button(props: {
  variant: "primary" | "ghost";
  onClick: () => void;
  icon?: JSX.Element;
  children: JSX.Element;
}): JSX.Element {
  const button = document.createElement("button");
  button.className = props.variant;
  button.addEventListener("click", () => props.onClick());
  insert(button, () => props.icon);
  insert(button, () => props.children);
  return button;
}
