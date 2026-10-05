import { cs } from "@backtickjs/core";

// Filled or outlined, which is the only thing a caller decides — a page with
// two ways of saying the same button is a page with two of everything.
export async function Button({
  href,
  solid,
  label,
}: {
  href: string;
  solid?: boolean;
  label: string;
}) {
  // Decided here, so only the look in use is bundled.
  const look = solid === true ? "bg-ink text-paper" : "text-ink";

  return cs`(
    <a
      href={$href}
      class={
        "inline-block rounded-full border border-ink px-[22px] py-[13px] text-[15.5px] font-semibold no-underline transition hover:-translate-y-px hover:shadow-lg " +
        $look
      }
    >
      {$label}
    </a>
  )`;
}
