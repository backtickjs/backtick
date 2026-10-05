import { cs } from "@backtickjs/core";

// A label next to the mark. Tinted rather than filled, so the pill never
// becomes the brightest thing in the header. The wordmark fills its own box
// top to bottom, so centring against that box needs no optical nudge.
export async function Badge({ label }: { label: string }) {
  return cs`(
    <span class="inline-block whitespace-nowrap rounded-full border border-violet-500/25 bg-violet-500/10 px-2 py-0.5 font-mono text-[10.5px] font-medium leading-snug tracking-[0.09em] text-brand">
      {$label}
    </span>
  )`;
}
