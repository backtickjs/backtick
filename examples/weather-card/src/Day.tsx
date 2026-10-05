import { type Client, cs } from "@backtickjs/core";
import type { Day as DayData } from "./forecast.js";

// One row of the week, as a script. The temperatures are shown through `show`,
// so the °C/°F toggle above redraws those two numbers and nothing else.
export async function Day({
  day,
  show,
  median,
}: {
  day: Client<DayData>;
  show: Client<(celsius: number) => number>;
  median: number;
}) {
  return cs`(
    <li style="display: grid; grid-template-columns: 44px 28px 1fr; align-items: center; gap: 12px; padding: 7px 0">
      <span style="font-size: 15px; color: #71717a">{$day.weekday}</span>
      <span style="font-size: 17px">{$day.symbol}</span>
      <span
        style={
          "font-size: 17px; font-variant-numeric: tabular-nums; color: " +
          ($day.high > $median ? "#c2410c" : "#0369a1")
        }
      >
        {$show($day.high) + "°"}
        <span style="color: #a1a1aa">{" / " + $show($day.low) + "°"}</span>
      </span>
    </li>
  )`;
}
