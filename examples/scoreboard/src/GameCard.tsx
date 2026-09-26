import { cs } from "@backtickjs/core";
import type { Prop } from "@backtickjs/solid-js/jsx-runtime";
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
// third quarter and a final, because which of those it is arrives in `clock`
// and changes under it between polls.
export async function GameCard({
  awayRank,
  awayName,
  awayScore,
  homeRank,
  homeName,
  homeScore,
  clock,
  isLive,
  possession,
  detail,
}: {
  awayRank: Prop<number>;
  awayName: Prop<string>;
  awayScore: Prop<number>;
  homeRank: Prop<number>;
  homeName: Prop<string>;
  homeScore: Prop<number>;
  clock: Prop<string>;
  isLive: Prop<boolean>;
  possession: Prop<string>;
  detail: Prop<string>;
}) {
  return (
    <li style={cs`$card + ($isLive ? "#86efac" : "#e4e4e7")`}>
      <div style="display: grid; gap: 5px; flex: 1">
        <TeamLine
          rank={awayRank}
          name={awayName}
          score={awayScore}
          hasBall={cs`$possession === "away"`}
          isTrailing={cs`$awayScore < $homeScore`}
        />
        <TeamLine
          rank={homeRank}
          name={homeName}
          score={homeScore}
          hasBall={cs`$possession === "home"`}
          isTrailing={cs`$homeScore < $awayScore`}
        />
      </div>

      <div style="display: grid; gap: 3px; justify-items: end; text-align: right">
        {/* Time remaining, in the colour that says whether it is running. */}
        <span
          style={cs`"font-size: 13px; font-variant-numeric: tabular-nums;" +
            " color: " +
            ($isLive ? "#15803d" : "#71717a")`}
        >
          {clock}
        </span>
        <span style="font-size: 12px; color: #a1a1aa">{detail}</span>
      </div>
    </li>
  );
}
