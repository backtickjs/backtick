import { cs, For, onCleanup, onMount, state } from "@backtickjs/core";
import { window } from "@backtickjs/web-sdk";
import type { Response } from "@backtickjs/web-sdk";
import { GameCard } from "./GameCard.js";
import { load, POLL_MS, SLATE_PATH } from "./scores.js";
import type { Game, Slate } from "./scores.js";

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
    const rows = $state($games);
    const stamp = $state($asOf);
    const trouble = $state("");
    const timer = $state(0);

    // The refresh asks this page's own host, which answers with the rows it
    // bundled above — so a score changes by replacing an array, and nothing
    // below has to know a scoreboard API exists.
    //
    // A script has no \`await\`: an answer arrives at a handler, and a status
    // this cannot use is failed by throwing, which reaches the other one.
    const refresh = () => {
      $window.fetch(
        $SLATE_PATH,
        (response: Response) => {
          if (response.status !== 200) {
            throw "the host answered " + response.status;
          }
          const slate = JSON.parse(response.text) as Slate;
          rows.set(slate.games);
          stamp.set(slate.asOf);
          trouble.set("");
        },
        (message: string) => {
          // The last good slate stays on screen. A board that empties itself
          // because one poll missed is worse than a board a minute behind.
          trouble.set("not updating — " + message);
        },
        { timeout: 4000 },
      );
    };

    // A script that draws cannot have effects, so the polling starts once this
    // drawing is in place, and stops when it is taken away.
    $onMount(() => timer.set($window.setInterval(refresh, $POLL_MS)));
    $onCleanup(() => $window.clearInterval(timer.get()));

    return (
      <div style={$page}>
        <div style={$head}>
          <h1 style="margin: 0; font-size: 24px">Top 25</h1>
          <span style="font-size: 13px; color: #71717a">
            {rows.get().length + " games"}
          </span>
        </div>

        <ul style="display: grid; gap: 8px; margin: 0; padding: 0; list-style: none">
          <For each={rows.get()}>
            {(game: Game) => (
              <GameCard
                awayRank={game.awayRank}
                awayName={game.awayName}
                awayScore={game.awayScore}
                homeRank={game.homeRank}
                homeName={game.homeName}
                homeScore={game.homeScore}
                clock={game.clock}
                isLive={game.isLive}
                possession={game.possession}
                detail={game.detail}
              />
            )}
          </For>
        </ul>

        <p style="margin: 0; font-size: 12px; color: #a1a1aa">
          {trouble.get() === "" ? stamp.get() : trouble.get()}
        </p>
      </div>
    );
  }`;
}
