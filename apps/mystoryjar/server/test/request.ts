import type { ScreenRequest } from "../request.js";

/** A request as the app in the simulator makes one. */
export const request: ScreenRequest = {
  origin: "http://localhost:3000",
  timeZone: "America/New_York",
  user: null,
  session: null,
  theme: "light",
  query: {},
};
