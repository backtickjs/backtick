import { cs } from "@backtickjs/core";
import { StyleSheet, Text, View } from "@backtickjs/react-native";
import { Counter } from "./Counter.js";

// A server component: it runs on the server for every request, and hands the
// phone its data and its client components. Change it and reload the app: no
// new app build.
export async function Home() {
  const fruits = ["Apples", "Pears", "Plums", "test"];
  const drawnAt = new Date().toLocaleTimeString();
  return cs`<$View style={$StyleSheet.create({ screen: { padding: 24, gap: 8 } }).screen}>
    <$Text style={{ fontSize: 28, fontWeight: "700" }}>Hello from Backtick</$Text>
    <$Text style={{ fontSize: 15, color: "#71717a" }}>
      Drawn by the server at {$drawnAt}
    </$Text>
    {$fruits.map((label) => (
      <$Counter key={label} label={label} />
    ))}
  </$View>`;
}
