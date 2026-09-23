import { JSDOM } from "jsdom";

// A page as a browser loads one: its scripts run as they are parsed, which a
// document written with `innerHTML` never does.
export async function pageOf(
  body: string,
): Promise<Window & typeof globalThis> {
  const { window } = new JSDOM(`<!doctype html><body>${body}</body>`, {
    runScripts: "dangerously",
  });
  if (window.document.readyState === "loading") {
    await new Promise((resolve) =>
      window.addEventListener("DOMContentLoaded", resolve, { once: true }),
    );
  }
  return window;
}
