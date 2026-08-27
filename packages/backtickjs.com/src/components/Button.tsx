import type { FragmentProps } from "@backtickjs/web-sdk/jsx-runtime";

const BASE =
  "display: inline-block; padding: 11px 20px; border-radius: 999px;" +
  " border: 1px solid var(--ink); font-size: 15px; font-weight: 500;" +
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
          ? BASE + "; background: var(--ink); color: var(--paper)"
          : BASE + "; color: var(--ink)"
      }
    >
      {children}
    </a>
  );
}
