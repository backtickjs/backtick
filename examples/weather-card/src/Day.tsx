import { cs } from "@backtickjs/core";
import type { Prop } from "@backtickjs/solid-js/jsx-runtime";

// One row of the week. Its props are `Prop<T>`, so a caller may hand each one
// a written value or a script. The temperatures arrive already converted, and
// the °C/°F toggle above redraws those two numbers and nothing else.
export async function Day({
  weekday,
  symbol,
  high,
  low,
  isAboveMedian,
}: {
  weekday: Prop<string>;
  symbol: Prop<string>;
  high: Prop<number>;
  low: Prop<number>;
  isAboveMedian: Prop<boolean>;
}) {
  return (
    <li style="display: grid; grid-template-columns: 44px 28px 1fr; align-items: center; gap: 12px; padding: 7px 0">
      <span style="font-size: 15px; color: #71717a">{weekday}</span>
      <span style="font-size: 17px">{symbol}</span>

      {/* The colour is a client value because what it depends on is: the row
          does not know which side of the week's median it falls on until the
          client compares them. */}
      <span
        style={cs`"font-size: 17px; font-variant-numeric: tabular-nums; color: " +
          ($isAboveMedian ? "#c2410c" : "#0369a1")`}
      >
        {cs`$high + "°"`}
        <span style="color: #a1a1aa">{cs`" / " + $low + "°"`}</span>
      </span>
    </li>
  );
}
