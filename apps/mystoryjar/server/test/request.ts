import { builds } from "../builds.js";
import type { ScreenRequest } from "../request.js";

/** A request as the app in the simulator makes one. */
export const request: ScreenRequest = {
  origin: "http://localhost:3000",
  timeZone: "America/New_York",
  user: null,
  session: null,
  theme: "light",
  query: {},
  // the web build's, which tests draw with
  modules: builds.installed("web"),
};
