import { cs } from "@backtickjs/core";
import type { JSX } from "@backtickjs/solid-js/jsx-runtime";

// One heading style for every section below the hero, so they read as a set.
export async function Section({
  id = "",
  eyebrow,
  title,
  lede,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  lede: string;
  children: JSX.Element;
}) {
  return cs`(
    <section id={$id} class="pt-24">
      <p class="mb-3.5 font-mono text-xs tracking-[0.12em] text-react uppercase">
        {$eyebrow}
      </p>
      <h2 class="max-w-[18em] text-[clamp(30px,4.6vw,44px)] leading-[1.1] font-bold tracking-[-0.03em]">
        {$title}
      </h2>
      <p class="mt-[18px] max-w-[36em] text-lg text-muted">{$lede}</p>
      <div class="mt-10">{$children}</div>
    </section>
  )`;
}
