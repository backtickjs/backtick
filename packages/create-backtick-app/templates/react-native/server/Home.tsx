import { cs } from "@backtickjs/core";
import {
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "@backtickjs/react-native";
import { HelloWave } from "./HelloWave.js";

// A server component: it runs on your server for every request, and hands the
// app its data and its client components.
export async function Home() {
  // Read here, on your server, and sent to the phone as plain values.
  const node = process.version;
  const assembledAt = new Date().toLocaleTimeString();

  // The whole layout is the screen's, safe areas included: iOS insets a root
  // scroll view itself, and Android draws under its status bar, so the screen
  // pads for it.
  return cs`{
    const styles = $StyleSheet.create({
      screen: {
        padding: 24,
        paddingTop: ($StatusBar.currentHeight ?? 0) + 24,
        gap: 24,
      },
      titleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
      title: { fontSize: 32, fontWeight: "bold", lineHeight: 32 },
      step: { gap: 8 },
      subtitle: { fontSize: 20, fontWeight: "bold" },
      body: { fontSize: 16, lineHeight: 24 },
      code: { fontWeight: "600" },
      link: { fontSize: 16, lineHeight: 30, color: "#0a7ea4" },
    });

    return (
      <$ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ backgroundColor: "#fff" }}
        contentContainerStyle={styles.screen}
      >
        <$View style={styles.titleRow}>
          <$Text style={styles.title}>Welcome!</$Text>
          <$HelloWave />
        </$View>

        <$View style={styles.step}>
          <$Text style={styles.subtitle}>Step 1: Try it</$Text>
          <$Text style={styles.body}>
            Edit <$Text style={styles.code}>server/Home.tsx</$Text> and save.
            This screen redraws without rebuilding the app.
          </$Text>
        </$View>

        <$View style={styles.step}>
          <$Text style={styles.subtitle}>Step 2: Server and client</$Text>
          <$Text style={styles.body}>
            Your server assembled this screen with Node {$node} at{" "}
            {$assembledAt}. The waving hand is a client component: its animation
            runs on your phone. Tap it.
          </$Text>
        </$View>

        <$View style={styles.step}>
          <$Text style={styles.subtitle}>Step 3: Get a fresh start</$Text>
          <$Text style={styles.body}>
            When you're ready, run{" "}
            <$Text style={styles.code}>npm run reset-project</$Text> for a blank{" "}
            <$Text style={styles.code}>server/Home.tsx</$Text>.
          </$Text>
        </$View>

        <$Text
          style={styles.link}
          onPress={() => $Linking.openURL("https://backtickjs.com/docs")}
        >
          Read the docs →
        </$Text>
      </$ScrollView>
    );
  }`;
}
