import { cs, For, state } from "@backtickjs/core";
import { ink, line, mono, muted, paper, wash } from "../theme.js";

const DEMO =
  "display: grid; gap: 20px; padding: 28px; justify-items: start;" +
  ` background: ${wash}; border: 1px solid ${line};` +
  " border-radius: 12px";

const TALLY =
  "margin: 0; font-size: 46px; font-weight: 700; line-height: 1;" +
  " letter-spacing: -0.03em; font-variant-numeric: tabular-nums";

const ROW = "display: flex; flex-wrap: wrap; gap: 10px; align-items: center";

const KEY =
  `padding: 8px 16px; border-radius: 8px; font-family: ${mono};` +
  " font-size: 14px; cursor: pointer; border: 1px solid ";

// Spliced whole rather than assembled in the script: the server knows both
// spellings, so what crosses is two strings and a choice, not the concatenation
// that would make them.
const KEY_OFF = KEY + `${line}; background: ${paper}; color: ${ink}`;
const KEY_ON = KEY + `${ink}; background: ${ink}; color: ${paper}`;

const LABEL = `font-size: 14px; color: ${muted}`;

// The one interactive thing on the page, and the one thing on it that ships as
// a script. `start` is a server value: the script below never receives a number
// to read, it is compiled with this one already in it.
export async function Counter({ start }: { start: number }) {
  return cs`{
    const count = $state($start);
    const step = $state(1);

    const nudge = (direction: number) => {
      count.update((total) => total + direction * step.read());
    };

    return (
      <div style={$DEMO}>
        <p style={$TALLY}>{count.read()}</p>

        <div style={$ROW}>
          <button style={$KEY_OFF} onclick={() => nudge(-1)}>
            {"−"}
          </button>
          <button style={$KEY_OFF} onclick={() => nudge(1)}>
            {"+"}
          </button>
        </div>

        <div style={$ROW}>
          <span style={$LABEL}>step</span>
          <For each={[1, 5, 10]}>
            {(size: number) => (
              <button
                style={step.read() === size ? $KEY_ON : $KEY_OFF}
                onclick={() => step.write(size)}
              >
                {size}
              </button>
            )}
          </For>
        </div>
      </div>
    );
  }`;
}
