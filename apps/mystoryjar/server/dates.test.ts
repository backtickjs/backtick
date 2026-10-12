import assert from "node:assert/strict";
import { it } from "node:test";
import { midnightIn } from "./dates.js";

it("is midnight where the story was written, daylight saving included", () => {
  const summer = new Date("2026-07-04T15:00:00Z");
  const winter = new Date("2026-01-04T15:00:00Z");
  assert.equal(
    midnightIn("America/New_York", summer).toISOString(),
    "2026-07-04T04:00:00.000Z",
  );
  assert.equal(
    midnightIn("America/New_York", winter).toISOString(),
    "2026-01-04T05:00:00.000Z",
  );
  assert.equal(
    midnightIn("UTC", summer).toISOString(),
    "2026-07-04T00:00:00.000Z",
  );
});

it("is the day it already is there, not here", () => {
  // 1 a.m. on the 5th in Tokyo is still the 4th in UTC
  const late = new Date("2026-07-04T16:00:00Z");
  assert.equal(
    midnightIn("Asia/Tokyo", late).toISOString(),
    "2026-07-04T15:00:00.000Z",
  );
});
