import type { JSX } from "solid-js";
import { insert } from "solid-js/web";

// A module an app adds beside Solid, which a bundle imports by its specifier.
export const greet = (): string => "hello";

const held: Record<string, string> = { greeting: "hei" };
export const storage = {
  get: (key: string): string | null => held[key] ?? null,
};

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
