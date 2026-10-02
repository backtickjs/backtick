import { cs } from "@backtickjs/core";
import { createSignal, For, onCleanup, onMount } from "@backtickjs/solid-js";
import { GameCard } from "./GameCard.js";
import { load, POLL_MS, SLATE_PATH } from "./scores.js";
import type { Slate } from "./scores.js";

const page =
  "display: grid; gap: 12px; padding: 24px; max-width: 460px;" +
  " font-family: system-ui";

const head =
  "display: flex; justify-content: space-between; align-items: baseline";

export async function Scoreboard() {
  // The first slate is fetched here, on the server, while bundling — so the
  // page arrives with scores already in it rather than with a spinner.
  const { games, asOf } = await load();

  return cs`{
    const rows = $createSignal($games);
    const stamp = $createSignal($asOf);
    const trouble = $createSignal("");
    const timer = $createSignal(0);

    // The refresh asks this page's own host, which answers with the rows it
    // bundled above — so a score changes by replacing an array, and nothing
    // below has to know a scoreboard API exists.
    //
    // A status this cannot use is failed by throwing, which reaches the
    // \`catch\`.
    const refresh = () => {
      window
        .fetch($SLATE_PATH, { signal: window.AbortSignal.timeout(4000) })
        .then((response: Response) => {
          if (response.status !== 200) {
            throw "the host answered " + response.status;
          }
          return response.json();
        })
        .then((slate: Slate) => {
          rows[1](slate.games);
          stamp[1](slate.asOf);
          trouble[1]("");
        })
        .catch((error: unknown) => {
          // The last good slate stays on screen. A board that empties itself
          // because one poll missed is worse than a board a minute behind.
          trouble[1]("not updating — " + String(error));
        });
    };

    // A script that draws cannot have effects, so the polling starts once this
    // drawing is in place, and stops when it is taken away.
    $onMount(() => timer[1](window.setInterval(refresh, $POLL_MS)));
    $onCleanup(() => window.clearInterval(timer[0]()));

    return (
      <div style={$page}>
        <div style={$head}>
          <h1 style="margin: 0; font-size: 24px">Top 25</h1>
          <span style="font-size: 13px; color: #71717a">
            {rows[0]().length + " games"}
          </span>
        </div>

        <ul style="display: grid; gap: 8px; margin: 0; padding: 0; list-style: none">
          <For each={rows[0]()}>
            {(game) => ${<GameCard game={cs`game`} />}}
          </For>
        </ul>

        <p style="margin: 0; font-size: 12px; color: #a1a1aa">
          {trouble[0]() === "" ? stamp[0]() : trouble[0]()}
        </p>
      </div>
    );
  }`;
}
