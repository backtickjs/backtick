import { drawFrom } from "@backtickjs/web-sdk";

// The page draws what its own path says to draw. Asking for anything but HTML
// gives a list of targets and the bundles for them — the same request, and the
// same answer, a phone would get.
await drawFrom();
