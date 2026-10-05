import { cs } from "@backtickjs/core";
import { line, mono, muted, radius } from "./theme.js";

const GRID =
  "display: grid; gap: 14px;" +
  " grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))";

const CARD = `padding: 24px; border-radius: ${radius}; border: 1px solid ${line}`;

const TAG =
  "display: inline-block; padding: 3px 8px; border-radius: 6px;" +
  ` font-family: ${mono}; font-size: 12px; background: #0d1117; color: #79c0ff`;

const NAME =
  "margin: 14px 0 6px; font-size: 18px; font-weight: 700; letter-spacing: -0.01em";
const TEXT = `margin: 0; font-size: 15px; color: ${muted}`;

type Feature = { tag: string; name: string; text: string };

const FEATURES: Feature[] = [
  {
    tag: "<$View> <$FlatList> <$Pressable>",
    name: "Every React Native export",
    text:
      "Components, StyleSheet, Animated, Platform, Linking: all of" +
      " react-native, name for name. Not a lookalike set of widgets.",
  },
  {
    tag: "$useState $useEffect",
    name: "Hooks on the device",
    text:
      "Client components keep their state on the phone. Typing, toggling" +
      " and scrolling never round-trip to your server.",
  },
  {
    tag: "Client<typeof View>",
    name: "Typed across the wire",
    text:
      "Every tag is checked against React Native's own types, from the" +
      " server that writes it to the phone that runs it.",
  },
  {
    tag: "await db.query()",
    name: "Data before the screen",
    text:
      "Server components fetch while the bundle is built, so a screen" +
      " arrives with its data in it, not with a spinner.",
  },
  {
    tag: "<Backtick url={…} />",
    name: "One component in your app",
    text:
      "Drop it into any screen of an existing app. Navigation, auth and" +
      " native modules stay exactly where they are.",
  },
  {
    tag: "save → reload",
    name: "Live from your editor",
    text:
      "In development, save on the server and the app on your phone" +
      " redraws. No Metro rebuild, no reinstall.",
  },
];

export async function Features() {
  return cs`(
    <div style={$GRID}>
      {$FEATURES.map((feature) => (
        <div style={$CARD}>
          <code style={$TAG}>{feature.tag}</code>
          <p style={$NAME}>{feature.name}</p>
          <p style={$TEXT}>{feature.text}</p>
        </div>
      ))}
    </div>
  )`;
}
