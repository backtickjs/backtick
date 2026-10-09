import { cs } from "@backtickjs/core";
import type { JSX } from "@backtickjs/solid-js";
import { Pair } from "./Pair.js";

// App versions: what the API and the phones run over time, as bars that
// switch from v1 to v2. Positions are percentages of the bar.

// When you deploy, and when the last phone has v2: after an app update, or
// after the next time each user opens the screen.
const DEPLOY = 25;
const UPDATED = 75;
const OPENED = 32;

const Lane = cs`(props: { name: string; children: JSX.Element }) => (
  <div class="flex items-center gap-3">
    <span class="w-14 shrink-0 font-mono text-xs text-muted">{props.name}</span>
    <div class="relative h-7 flex-1">{props.children}</div>
  </div>
)`;

const Caption = cs`() => (
  <span class="mb-3 font-mono text-xs text-muted">
    Versions in use over time, illustrative
  </span>
)`;

const HATCH =
  "repeating-linear-gradient(-45deg, var(--color-warn) 0 2px, transparent 2px 6px)";

// Phones switch one at a time, so their switch is a fade.
const Fade = cs`(props: { to: number; color: string }) => (
  <div
    class="relative flex h-full items-center rounded-md font-mono text-xs"
    style={{
      background:
        "linear-gradient(to right, var(--color-line) " +
        $DEPLOY +
        "%, " +
        props.color +
        " " +
        props.to +
        "%)",
    }}
  >
    <span class="px-2 text-muted">v1</span>
    <span class="absolute px-2 text-paper" style={{ left: props.to + "%" }}>
      v2
    </span>
  </div>
)`;

export const OneDeployVisual = cs`() => (
  <$Pair
    without={
      <div class="mb-3 grid gap-3">
        <$Caption />
        <$Lane name="API">
          {/* The API serves both until the last phone has updated. */}
          <div class="flex h-full overflow-hidden rounded-md font-mono text-xs">
            <span
              class="flex items-center bg-line px-2 text-muted"
              style={{ width: $DEPLOY + "%" }}
            >
              v1
            </span>
            <span
              class="flex items-center bg-warn/10 px-2 font-medium text-warn"
              style={{
                width: $UPDATED - $DEPLOY + "%",
                "background-image": $HATCH,
              }}
            >
              <span class="rounded-sm bg-wash px-1">v1 + v2</span>
            </span>
            <span class="flex flex-1 items-center bg-muted px-2 text-paper">
              v2
            </span>
          </div>
        </$Lane>
        <$Lane name="phones">
          <$Fade to={$UPDATED} color="var(--color-muted)" />
        </$Lane>
      </div>
    }
    withoutCaption="Until every phone updates, your API has to keep serving v1 next to v2, so every breaking change leaves old code running."
    backtick={
      <div class="mb-3 grid gap-3">
        <$Caption />
        <$Lane name="API">
          <span class="flex h-full items-center font-mono text-xs text-muted">
            no API layer
          </span>
        </$Lane>
        <$Lane name="phones">
          <$Fade to={$OPENED} color="var(--color-react)" />
        </$Lane>
      </div>
    }
    backtickCaption="Screens are built on your server, where they read your database directly, and sent to the phone when opened. With no API in between, there's no v1 to keep running."
  />
)`;
