import { cs } from "@backtickjs/core";
import type { JSX } from "@backtickjs/solid-js";

// A picture of something a server screen does that one built into the app
// can't, as a pair of panels: without Backtick, then with it.

const Pair = cs`(props: {
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

// App size: the app's download as the product grows, stacked on the floor
// every React Native app has. Heights are percentages of the chart.
const BASE = 50;
const SIZES = [
  { screens: 10, bundled: 5 },
  { screens: 50, bundled: 20 },
  { screens: 100, bundled: 40 },
];

type Segment = { name: string; color: string };

const RUNTIME: Segment = {
  name: "React Native, Hermes, native modules",
  color: "bg-line",
};

const Columns = cs`(props: { top: Segment; heights: number[] }) => (
  <div class="grid gap-3">
    <span class="font-mono text-xs text-muted">
      App download size, illustrative
    </span>
    <div class="flex h-36 items-end gap-4 border-b border-line">
      {props.heights.map((height) => (
        <div class="flex flex-1 flex-col">
          <div
            class={"min-h-[3px] rounded-t-md " + props.top.color}
            style={{ height: (height / 100) * 144 + "px" }}
          />
          <div
            class={$RUNTIME.color}
            style={{ height: ($BASE / 100) * 144 + "px" }}
          />
        </div>
      ))}
    </div>
    <div class="flex gap-4 font-mono text-xs text-muted">
      {$SIZES.map((size) => (
        <span class="flex-1 text-center">{size.screens} screens</span>
      ))}
    </div>
    <div class="grid gap-1.5 text-[13.5px] text-muted">
      {[props.top, $RUNTIME].map((segment) => (
        <span class="flex items-center gap-2">
          <span class={"size-2.5 shrink-0 rounded-sm " + segment.color} />
          {segment.name}
        </span>
      ))}
    </div>
  </div>
)`;

export const AppSizeVisual = cs`() => (
  <$Pair
    without={
      <$Columns
        top={{ name: "Screens, in the JS bundle", color: "bg-muted" }}
        heights={$SIZES.map((size) => size.bundled)}
      />
    }
    withoutCaption="Every screen you write ends up in the JS bundle, so that slice grows with the product."
    backtick={
      <$Columns
        top={{ name: "Backtick client, under 1 KB", color: "bg-react" }}
        heights={$SIZES.map(() => 0)}
      />
    }
    backtickCaption="Screens are fetched as JavaScript when they're opened, like an over-the-air update for one screen."
  />
)`;
