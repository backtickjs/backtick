// The fetch, and the shaping that follows it. Everything here runs on the
// server, once, while bundling — so the client is handed a row it can draw
// rather than the API's parallel arrays.

const LOCATION = { name: "Paris", latitude: 48.8566, longitude: 2.3522 };

// What the week's highs are judged against. A real app would look this up per
// place and month; a constant is enough to show the server deciding something.
const NORMAL_HIGH = 25;

// A type alias rather than an interface: what is spliced into a script has to
// answer as a plain record of client values, and an interface does not.
export type Day = {
  weekday: string;
  symbol: string;
  high: number;
  low: number;
};

export interface Forecast {
  days: Day[];
  // The week's middle high, in Celsius. Rounded here because the client shows
  // it as text and never does arithmetic with it.
  median: number;
  isWarm: boolean;
  isLive: boolean;
}

// WMO weather codes, grouped to the few cases a card this size can show.
function symbolFor(code: number): string {
  if (code === 0) return "☀️";
  if (code <= 2) return "🌤️";
  if (code === 3) return "☁️";
  if (code <= 49) return "🌫️";
  if (code <= 69) return "🌧️";
  if (code <= 79) return "🌨️";
  if (code <= 84) return "🌧️";
  return "⛈️";
}

function weekdayFor(date: string): string {
  return new Date(date + "T12:00:00Z").toLocaleDateString("en-US", {
    weekday: "short",
    timeZone: "UTC",
  });
}

// A week of plausible weather, used when the network is not there. The example
// is meant to run on a plane.
const SAMPLE: Day[] = [
  { weekday: "Mon", symbol: "☀️", high: 27, low: 17 },
  { weekday: "Tue", symbol: "🌤️", high: 26, low: 16 },
  { weekday: "Wed", symbol: "☁️", high: 22, low: 15 },
  { weekday: "Thu", symbol: "🌧️", high: 19, low: 14 },
  { weekday: "Fri", symbol: "🌧️", high: 20, low: 13 },
  { weekday: "Sat", symbol: "🌤️", high: 24, low: 15 },
  { weekday: "Sun", symbol: "☀️", high: 28, low: 18 },
];

async function fetchDays(): Promise<Day[]> {
  const url =
    "https://api.open-meteo.com/v1/forecast" +
    `?latitude=${LOCATION.latitude}&longitude=${LOCATION.longitude}` +
    "&daily=temperature_2m_max,temperature_2m_min,weather_code" +
    "&forecast_days=7&timezone=UTC";

  const response = await fetch(url, { signal: AbortSignal.timeout(3000) });
  if (!response.ok) throw new Error(`Open-Meteo answered ${response.status}`);

  const daily = (await response.json()).daily;
  return daily.time.map((date: string, index: number) => ({
    weekday: weekdayFor(date),
    symbol: symbolFor(daily.weather_code[index]),
    high: daily.temperature_2m_max[index],
    low: daily.temperature_2m_min[index],
  }));
}

export const locationName = LOCATION.name;

export async function load(): Promise<Forecast> {
  let days: Day[];
  let isLive: boolean;

  try {
    days = await fetchDays();
    isLive = true;
  } catch {
    days = SAMPLE;
    isLive = false;
  }

  const highs = days.map((day) => day.high).sort((a, b) => a - b);
  const median = Math.round(highs[(highs.length - 1) >> 1]);

  return { days, median, isWarm: median > NORMAL_HIGH, isLive };
}
