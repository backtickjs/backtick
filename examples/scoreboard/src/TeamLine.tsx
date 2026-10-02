import { type Client, cs } from "@backtickjs/core";

const line =
  "display: grid; grid-template-columns: 20px 1fr auto; gap: 9px;" +
  " align-items: baseline";

const rankStyle =
  "font-size: 12px; font-weight: 600; color: #a1a1aa; text-align: right;" +
  " font-variant-numeric: tabular-nums";

// One team's line. Every prop is a client value, because the board around it
// redraws from a poll.
export async function TeamLine({
  rank,
  name,
  score,
  hasBall,
  isTrailing,
}: {
  rank: Client<number>;
  name: Client<string>;
  score: Client<number>;
  hasBall: Client<boolean>;
  isTrailing: Client<boolean>;
}) {
  return cs`<div style={$line}>
    <span style={$rankStyle}>{$rank === 0 ? "" : "" + $rank}</span>

    <span style="font-size: 15px">{$name + ($hasBall ? " 🏈" : "")}</span>

    <span
      style={
        "font-size: 17px; font-weight: 600;" +
        " font-variant-numeric: tabular-nums; color: " +
        ($isTrailing ? "#a1a1aa" : "#18181b")
      }
    >
      {$score}
    </span>
  </div>`;
}
