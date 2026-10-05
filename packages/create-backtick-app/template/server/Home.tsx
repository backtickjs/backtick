import { cs } from "@backtickjs/core";
import { ScrollView, StatusBar, Text } from "@backtickjs/react-native";
import { Counter } from "./Counter.js";

// A server component: it runs on your server for every request, and hands the
// app its data and its client components. Edit it and save: the app redraws,
// with no new build.
export async function Home() {
  const fruits = ["Apples", "Pears", "Plums"];
  const drawnAt = new Date().toLocaleTimeString();
  // The whole layout is the screen's, safe areas included: iOS insets a root
  // scroll view itself, and Android draws under its status bar, so the screen
  // pads for it.
  return cs`(
    <$ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        padding: 24,
        paddingTop: ($StatusBar.currentHeight ?? 0) + 24,
        gap: 8,
      }}
    >
      <$Text style={{ fontSize: 28, fontWeight: "700" }}>
        Hello from Backtick
      </$Text>
      <$Text style={{ fontSize: 15, color: "#71717a" }}>
        Open up server/Home.tsx to start working on your screen. Drawn at{" "}
        {$drawnAt}.
      </$Text>
      {$fruits.map((label) => (
        <$Counter key={label} label={label} />
      ))}
    </$ScrollView>
  )`;
}
