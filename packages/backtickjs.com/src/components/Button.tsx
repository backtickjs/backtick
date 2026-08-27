import type { FragmentProps } from "@backtickjs/web-sdk/jsx-runtime";
import { ink, paper } from "../theme.js";

const BASE =
  "display: inline-block; padding: 11px 20px; border-radius: 999px;" +
  ` border: 1px solid ${ink}; font-size: 15px; font-weight: 500;` +
  " text-decoration: none";

// Filled or outlined, which is the only thing a caller decides — a page with
// two ways of saying the same button is a page with two of everything.
export async function Button({
  href,
  solid,
  children,
}: {
  href: string;
  solid?: boolean;
  children: NonNullable<FragmentProps["children"]>;
}) {
  return (
    <a
      href={href}
      style={
        solid === true
          ? BASE + `; background: ${ink}; color: ${paper}`
          : BASE + `; color: ${ink}`
      }
    >
      {children}
    </a>
  );
}
