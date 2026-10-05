import type { Row } from "./components/Comparison.js";

// What the page says about the tools Backtick is mistaken for. Claims about
// Expo follow its docs: docs.expo.dev/guides/server-components.

export const EAS_UPDATE: Row[] = [
  {
    label: "What ships",
    other: "The whole app's JavaScript bundle",
    backtick: "One screen at a time",
  },
  {
    label: "Who gets what",
    other: "Everyone on a channel gets the same bundle",
    backtick: "Each request can get its own screen: per user, region or flag",
  },
  {
    label: "When it's built",
    other: "Once, at publish time, by Metro",
    backtick: "At request time, by your server components",
  },
  {
    label: "Data",
    other: "Fetched by the app after it loads",
    backtick: "Already in the screen when it arrives",
  },
  {
    label: "When it's live",
    other: "Usually on the next launch",
    backtick: "On the next fetch of that screen, no restart",
  },
  {
    label: "Offline",
    other: "The cached bundle runs offline",
    backtick: "Needs your server to load a screen",
  },
];

export const EXPO_RSC: Row[] = [
  {
    label: "Client components",
    other: "Compiled into the app binary at build time",
    backtick:
      "Ship with the screen, so new interactive code needs no app update",
  },
  {
    label: "What the server sends",
    other: "An RSC payload: a serialized tree of elements",
    backtick: "A JavaScript bundle, with the data inlined",
  },
  {
    label: "Where it works",
    other: "Expo Router apps, behind an experimental flag",
    backtick: "Any React Native app, through one component",
  },
  {
    label: "Status",
    other: "Experimental; production use not recommended yet",
    backtick: "Alpha",
  },
  {
    label: "Offline",
    other: "Client components start without a network",
    backtick: "Needs your server to load a screen",
  },
];
