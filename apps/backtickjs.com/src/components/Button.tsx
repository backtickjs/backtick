import { cs } from "@backtickjs/core";
import { GitHubMark } from "./GitHubMark.js";

// Filled or outlined, which is the only thing a caller decides — a page with
// two ways of saying the same button is a page with two of everything.
export async function Button({
  href,
  solid,
  github,
  label,
}: {
  href: string;
  solid?: boolean;
  // The GitHub mark before the label, for a link to the repository.
  github?: boolean;
  label: string;
}) {
  // Decided here, so only the look in use is bundled.
  const look = solid === true ? "bg-ink text-paper" : "text-ink";
  const mark = github === true ? <GitHubMark size={18} /> : null;

  return cs`(
    <a
      href={$href}
      class={
        "inline-flex items-center gap-2 rounded-full border border-ink px-[22px] py-[13px] text-[15.5px] font-semibold no-underline transition hover:-translate-y-px hover:shadow-lg " +
        $look
      }
    >
      {$mark}
      {$label}
    </a>
  )`;
}
