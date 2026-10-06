import type { Cell, Column, Row } from "./components/Comparison.js";

// What the page says about the tools Backtick is mistaken for. Claims about
// Expo follow its docs: docs.expo.dev/guides/server-components. Claims about
// Next.js follow its App Router docs: nextjs.org/docs/app.

export const EXPO_COLUMNS: Column[] = [
  { name: "EAS Update", summary: "Ships the app's whole JS bundle" },
  { name: "Expo Router RSC", summary: "Ships server-rendered output" },
  {
    name: "Backtick",
    summary: "Ships one screen, client code and data included",
  },
];

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
// A question that doesn't apply to that tool.
const none = (verdict: string, detail = ""): Cell => ({
  verdict,
  detail,
  tone: "none",
});

export const EXPO_ROWS: Row[] = [
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
    label: "Server and client code ship together?",
    values: [
      none("—", "It ships client code only"),
      bad("No", "Two deploys to keep in sync"),
      good("Yes", "In one request"),
    ],
  },
  {
    label: "When changes take effect",
    values: [
      partial("Next app launch"),
      good("Next request or navigation"),
      good("Each time a screen is drawn"),
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
      partial(
        "Per screen",
        "Server screens need a network. Keep offline-critical screens in React Native, or fall back to one when the server can't be reached",
      ),
    ],
  },
  {
    label: "Needs a server?",
    values: [good("No"), partial("Yes"), partial("Yes")],
  },
];

export const NEXT_COLUMNS: Column[] = [
  {
    name: "Next.js (App Router)",
    summary: "Server components for the web, on Next's router",
  },
  {
    name: "Backtick",
    summary: "Server components for any framework",
  },
];

export const NEXT_ROWS: Row[] = [
  {
    label: "Framework",
    values: [
      partial("Next.js", "On its router and its server"),
      good("Any", "React, React Native or Solid, on Node or Bun"),
    ],
  },
  {
    label: "Client code in a server component?",
    values: [
      bad("No", 'State, effects and browser APIs go in a "use client" file'),
      good("Yes", "In the script it returns"),
    ],
  },
  {
    label: "The server/client boundary",
    values: [
      partial("Per file", '"use client" reaches everything the file imports'),
      good(
        "Per expression",
        "cs`…` marks client code and each $ a value crossing, type-checked",
      ),
    ],
  },
  {
    label: "What crosses to the client",
    values: [
      good("Data and server functions", "Server actions cross as references"),
      partial("Plain data", "No class instances or server functions"),
    ],
  },
  {
    label: "Streaming",
    values: [
      good("Yes", "Suspense streams slow parts in"),
      bad("No", "A screen arrives whole"),
    ],
  },
  {
    label: "Caching",
    values: [
      good("Built in", "Static rendering and a data cache"),
      partial("Yours", "Put a cache in front of the route"),
    ],
  },
  {
    label: "Native apps",
    values: [
      bad("No", "The web only"),
      good("Yes", "React Native, with client code shipped per request"),
    ],
  },
];

// The idea in one table: the web's deploy model, which native apps lack.
export const MODEL_COLUMNS: Column[] = [
  { name: "The web", summary: "Pages served by your server" },
  { name: "A native app", summary: "Screens built into the binary" },
  {
    name: "React Native with Backtick",
    summary: "Screens served by your server",
  },
];

export const MODEL_ROWS: Row[] = [
  {
    label: "Where a screen's code lives",
    values: [
      good("Your server"),
      bad("The app binary", "On every phone, as it was built"),
      good("Your server"),
    ],
  },
  {
    label: "An API for each screen?",
    values: [
      good("No", "The server renders with the data"),
      bad("Yes", "An endpoint or query, and a client cache"),
      good("No", "The server renders with the data"),
    ],
  },
  {
    label: "A change reaches users",
    values: [
      good("The next time they load it"),
      bad("After review, as they update", "Over days or weeks"),
      good("The next time they open it"),
    ],
  },
  {
    label: "Can differ per user?",
    values: [
      good("Yes", "Built per request"),
      bad("No", "One build for everyone"),
      good("Yes", "Built per request"),
    ],
  },
  {
    label: "Shipping a new button",
    values: [good("A deploy"), bad("A store release"), good("A deploy")],
  },
];

export const XHP_COLUMNS: Column[] = [
  { name: "XHP and Javelin", summary: "Facebook's server-rendered UI" },
  { name: "Backtick", summary: "Server components with inline scripts" },
];

export const XHP_ROWS: Row[] = [
  {
    label: "An API for each screen?",
    values: [
      good("No", "The server renders with the data"),
      good("No", "The server renders with the data"),
    ],
  },
  {
    label: "Where client code lives",
    values: [
      bad("A separate JavaScript file"),
      good("Inline", "In the server component that uses it"),
    ],
  },
  {
    label: "How the two sides are joined",
    values: [
      bad("A string name", "A typo is found at runtime"),
      good("The script itself", "There's no name to keep in sync"),
    ],
  },
  {
    label: "What crosses",
    values: [
      bad("Untyped JSON config"),
      good("$ splices", "Type-checked on both sides"),
    ],
  },
  {
    label: "Shipping new client code",
    values: [
      partial("A JavaScript release", "Kept in step with the server"),
      good("With the screen", "Per request, from the same deploy"),
    ],
  },
];
