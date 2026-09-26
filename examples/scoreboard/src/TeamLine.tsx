import { cs } from "@backtickjs/core";
import type { Prop } from "@backtickjs/solid-js/jsx-runtime";

const line =
  "display: grid; grid-template-columns: 20px 1fr auto; gap: 9px;" +
  " align-items: baseline";

const rankStyle =
  "font-size: 12px; font-weight: 600; color: #a1a1aa; text-align: right;" +
  " font-variant-numeric: tabular-nums";

// One team's line. Its props are `Prop<T>`, so a caller may hand each one a
// written value or a script — and every one of these arrives as a script,
// because the board around it redraws from a poll.
export async function TeamLine({
  rank,
  name,
  score,
  hasBall,
  isTrailing,
}: {
  rank: Prop<number>;
  name: Prop<string>;
  score: Prop<number>;
  hasBall: Prop<boolean>;
  isTrailing: Prop<boolean>;
}) {
  return (
    <div style={line}>
      {/* Unranked teams play ranked ones, and the column stays for them. */}
      <span style={rankStyle}>{cs`$rank === 0 ? "" : "" + $rank`}</span>

      {/* Possession is drawn beside the name rather than in a column of its
          own: it belongs to a team, and there is only ever one ball. */}
      <span style="font-size: 15px">{cs`$name + ($hasBall ? " 🏈" : "")`}</span>

      <span
        style={cs`"font-size: 17px; font-weight: 600;" +
          " font-variant-numeric: tabular-nums; color: " +
          ($isTrailing ? "#a1a1aa" : "#18181b")`}
      >
        {score}
      </span>
    </div>
  );
}
