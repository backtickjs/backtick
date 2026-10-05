import type { Cell, Row } from "./components/Comparison.js";

// What the page says about the tools Backtick is mistaken for. Claims about
// Expo follow its docs: docs.expo.dev/guides/server-components.

export const COLUMNS = ["EAS Update", "Expo Router RSC", "Backtick"];

// How a cell reads for someone choosing: what they'd want, a trade-off, or
// something missing. A verdict first, then the detail behind it, if any.
const good = (verdict: string, detail = ""): Cell => ({
  verdict,
  detail,
  tone: "good",
});
const partial = (verdict: string, detail = ""): Cell => ({
  verdict,
  detail,
  tone: "partial",
});
const bad = (verdict: string, detail = ""): Cell => ({
  verdict,
  detail,
  tone: "bad",
});
// A description, with no verdict to give.
const plain = (detail: string): Cell => ({ verdict: "", detail, tone: "none" });

export const ROWS: Row[] = [
  {
    label: "What changes",
    values: [
      plain("The app's entire JS bundle and assets"),
      plain("Server-rendered output only"),
      plain("One screen: its client components and data"),
    ],
  },
  {
    label: "Can differ per user?",
    values: [
      bad("No", "Same update for everyone on a channel"),
      good("Yes", "Rendered per request"),
      good("Yes", "Assembled per request"),
    ],
  },
  {
    label: "Can add new client components?",
    values: [
      good("Yes", "In the next update"),
      bad("No", "They must already be in the installed bundle"),
      good("Yes", "They ship with the screen"),
    ],
  },
  {
    label: "When changes take effect",
    values: [
      partial("Next app launch"),
      good("Next request or navigation"),
      good("Next request or navigation"),
    ],
  },
  {
    label: "Works offline?",
    values: [
      good("Yes", "Once downloaded"),
      partial(
        "Partly",
        "Client components yes; server content needs a network",
      ),
      bad("No", "Screens need a network"),
    ],
  },
  {
    label: "Needs a server?",
    values: [good("No"), partial("Yes"), partial("Yes")],
  },
];
