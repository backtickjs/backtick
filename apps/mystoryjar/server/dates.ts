/**
 * The start of the day `date` falls on in `timeZone`, as the website dates
 * a story: midnight where it was written.
 */
export function midnightIn(timeZone: string, date: Date = new Date()): Date {
  const day = date.toLocaleDateString("en-CA", { timeZone });
  // the zone's offset that day, "GMT-04:00", or "GMT" for UTC itself
  const offset =
    new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "longOffset" })
      .formatToParts(new Date(`${day}T12:00:00Z`))
      .find((part) => part.type === "timeZoneName")!
      .value.slice(3) || "Z";
  return new Date(`${day}T00:00:00${offset}`);
}
