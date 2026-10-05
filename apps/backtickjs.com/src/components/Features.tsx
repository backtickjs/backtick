import { cs } from "@backtickjs/core";

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
    <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-3.5">
      {$FEATURES.map((feature) => (
        <div class="rounded-[20px] border border-line p-6">
          <code class="code-chip bg-wash">{feature.tag}</code>
          <p class="mt-3.5 mb-1.5 text-lg font-bold tracking-[-0.01em]">
            {feature.name}
          </p>
          <p class="text-[15px] text-muted">{feature.text}</p>
        </div>
      ))}
    </div>
  )`;
}
