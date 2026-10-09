import { cs } from "@backtickjs/core";
import type { JSX } from "@backtickjs/solid-js";

// One heading style for every section below the hero, so they read as a set.
export const Section = cs`(props: {
  id?: string;
  eyebrow: string;
  // Without one, the eyebrow labels what follows directly.
  title?: JSX.Element;
  lede?: JSX.Element;
  // What the section shows below its heading, if anything.
  children?: JSX.Element;
}) => (
  <section id={props.id} class="pt-20">
    <p class="mb-3.5 font-mono text-xs tracking-[0.12em] text-react uppercase">
      {props.eyebrow}
    </p>
    {props.title === undefined ? null : (
      <h2 class="max-w-[15.75em] text-[clamp(30px,4.6vw,44px)] text-pretty leading-[1.1] font-bold tracking-[-0.03em]">
        {props.title}
      </h2>
    )}
    {props.lede === undefined ? null : (
      <p class="mt-[18px] max-w-[720px] text-lg text-muted">{props.lede}</p>
    )}
    {props.children === undefined ? null : (
      <div class={props.title === undefined ? "" : "mt-10"}>
        {props.children}
      </div>
    )}
  </section>
)`;
