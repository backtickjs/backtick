import { type Client, cs } from "@backtickjs/core";
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
  // Text, or a script when it breaks where the text alone wouldn't.
  title: string | Client<JSX.Element>;
  // Text, or a script when it holds code to set apart.
  lede?: string | Client<JSX.Element>;
  // What the section shows below its heading, if anything.
  children?: JSX.Element;
}) {
  const ledeOrNull = lede ?? null;
  const childrenOrNull = children ?? null;
  return cs`(
    <section id={$id} class="pt-20">
      <p class="mb-3.5 font-mono text-xs tracking-[0.12em] text-react uppercase">
        {$eyebrow}
      </p>
      <h2 class="max-w-[18em] text-[clamp(30px,4.6vw,44px)] leading-[1.1] font-bold tracking-[-0.03em]">
        {$title}
      </h2>
      {$ledeOrNull === null ? null : (
        <p class="mt-[18px] max-w-[36em] text-lg text-muted">{$ledeOrNull}</p>
      )}
      {$childrenOrNull === null ? null : (
        <div class="mt-10">{$childrenOrNull}</div>
      )}
    </section>
  )`;
}
