/** The day `date` falls on in `timeZone`, as "2026-10-12". */
export function dayIn(timeZone: string, date: Date = new Date()): string {
  return date.toLocaleDateString("en-CA", { timeZone });
}

// How far `timeZone` is ahead of UTC at `instant`, in milliseconds.
function offsetAt(timeZone: string, instant: number): number {
  const name = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "longOffset",
  })
    .formatToParts(instant)
    .find((part) => part.type === "timeZoneName")!.value;
  // "GMT-04:00", or "GMT" for UTC itself
  const [, sign, hours, minutes] = /GMT([+-])(\d\d):(\d\d)/.exec(name) ?? [];
  return sign === undefined
    ? 0
    : (sign === "-" ? -1 : 1) * (Number(hours) * 60 + Number(minutes)) * 60_000;
}

/**
 * The start of `day`, "2026-10-12", in `timeZone`, as the website dates a
 * story: midnight where it was written. The offset is the one in force at
 * that midnight, which on a day the clocks change differs from noon's.
 */
export function startOfDay(timeZone: string, day: string): Date {
  const utcMidnight = Date.parse(`${day}T00:00:00Z`);
  const guess = utcMidnight - offsetAt(timeZone, utcMidnight);
  return new Date(utcMidnight - offsetAt(timeZone, guess));
}

/** The start of the day `date` falls on in `timeZone`. */
export function midnightIn(timeZone: string, date: Date = new Date()): Date {
  return startOfDay(timeZone, dayIn(timeZone, date));
}
