import { cs } from "@backtickjs/core";
import { createSignal, For } from "@backtickjs/solid-js";
import { Day } from "./Day.js";
import { load, locationName } from "./forecast.js";

const page =
  "display: grid; gap: 12px; padding: 24px; justify-items: start;" +
  " max-width: 360px; font-family: system-ui";

export async function WeatherCard() {
  // The fetch happens here, on the server, while bundling. The client never
  // learns the API exists — what reaches it is the week, already shaped.
  const { days, median, isWarm, isLive } = await load();

  // The server knows which of these is true, so only one of them is bundled.
  // Splicing `isWarm` instead and testing it in the script below would ship
  // both sentences and the test between them; here the branch is spent before
  // the bundle exists.
  const summary = isWarm
    ? cs`"Warmer than usual. The week's median high is " + $median + "°C."`
    : cs`"Cooler than usual. The week's median high is " + $median + "°C."`;

  const source = isLive ? "open-meteo.com" : "sample week (offline)";

  return cs`{
    const [unit, setUnit] = $createSignal("C");

    // Only Celsius crosses the wire. Fahrenheit is arithmetic on numbers the
    // client already holds, so the toggle costs no request.
    const show = (celsius: number) => {
      return unit() === "F"
        ? Math.round((celsius * 9) / 5 + 32)
        : Math.round(celsius);
    };

    return (
      <div style={$page}>
        <h1 style="margin: 0; font-size: 24px">{$locationName}</h1>

        <p style="margin: 0; font-size: 15px; color: #52525b">{$summary}</p>

        <div style="display: flex; gap: 14px">
          <$For each={["C", "F"]}>
            {(value: string) => (
              <button
                id={"unit-" + value}
                onclick={() => setUnit(value)}
                style={
                  "background: none; border: 0; padding: 0; cursor: pointer;" +
                  " font-size: 15px; font-weight: " +
                  (unit() === value ? "700" : "400") +
                  "; color: " +
                  (unit() === value ? "#18181b" : "#71717a")
                }
              >
                {"°" + value}
              </button>
            )}
          </$For>
        </div>

        <ul style="margin: 0; padding: 0; list-style: none; align-self: stretch">
          {/* The array the server fetched, drawn directly. The median is a
              number the server worked out, handed to each row as it is. */}
          <$For each={$days}>
            {(day) =>
              ${(<Day day={cs`day`} show={cs`show`} median={median} />)}
            }
          </$For>
        </ul>

        <p style="margin: 0; font-size: 13px; color: #a1a1aa">{$source}</p>
      </div>
    );
  }`;
}
