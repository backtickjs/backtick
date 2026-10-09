import { cs } from "@backtickjs/core";
import type { JSX } from "@backtickjs/solid-js";

// A picture of something a server screen does that one built into the app
// can't, as a pair of panels: without Backtick, then with it.
export const Pair = cs`(props: {
  without: JSX.Element;
  withoutCaption: string;
  backtick: JSX.Element;
  backtickCaption: string;
}) => (
  <div class="grid gap-4 md:grid-cols-2">
    {[
      {
        name: "Without Backtick",
        body: props.without,
        caption: props.withoutCaption,
        accent: "text-muted",
      },
      {
        name: "Backtick",
        body: props.backtick,
        caption: props.backtickCaption,
        accent: "text-react",
      },
    ].map((panel) => (
      <figure class="m-0 grid content-start gap-4 rounded-[20px] border border-line bg-wash p-5">
        <p
          class={
            "font-mono text-xs tracking-[0.12em] uppercase " + panel.accent
          }
        >
          {panel.name}
        </p>
        {panel.body}
        <figcaption class="text-[14.5px] text-muted">
          {panel.caption}
        </figcaption>
      </figure>
    ))}
  </div>
)`;
