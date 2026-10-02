import { type Client, cs } from "@backtickjs/core";
import type { Game } from "./scores.js";
import { TeamLine } from "./TeamLine.js";

// Left open on purpose: the card's border colour is the one thing about it the
// server cannot know, so the colour is concatenated on below.
const card =
  "display: flex; justify-content: space-between; align-items: center;" +
  " gap: 16px; padding: 11px 14px; border-radius: 12px; border: 1px solid ";

// One game. Away over home, the way a scoreboard reads, with the clock and the
// down on the right.
//
// Nothing here is decided on the server: the same card draws a kickoff time, a
// third quarter and a final, because which of those it is arrives in `game`
// and changes under it between polls.
export async function GameCard({ game }: { game: Client<Game> }) {
  return cs`<li style={$card + ($game.isLive ? "#86efac" : "#e4e4e7")}>
    <div style="display: grid; gap: 5px; flex: 1">
      {${(
        <TeamLine
          rank={cs`$game.awayRank`}
          name={cs`$game.awayName`}
          score={cs`$game.awayScore`}
          hasBall={cs`$game.possession === "away"`}
          isTrailing={cs`$game.awayScore < $game.homeScore`}
        />
      )}}
      {${(
        <TeamLine
          rank={cs`$game.homeRank`}
          name={cs`$game.homeName`}
          score={cs`$game.homeScore`}
          hasBall={cs`$game.possession === "home"`}
          isTrailing={cs`$game.homeScore < $game.awayScore`}
        />
      )}}
    </div>

    <div style="display: grid; gap: 3px; justify-items: end; text-align: right">
      <span
        style={"font-size: 13px; font-variant-numeric: tabular-nums; color: " +
          ($game.isLive ? "#15803d" : "#71717a")}
      >
        {$game.clock}
      </span>
      <span style="font-size: 12px; color: #a1a1aa">{$game.detail}</span>
    </div>
  </li>`;
}
