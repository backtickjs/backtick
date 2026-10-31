import { cs } from "@backtickjs/core";
import { highlight } from "./highlight.js";
import { palette } from "./look.js";
import { createClient } from "@supabase/supabase-js";
import { useSafeAreaInsets } from "react-native-safe-area-context" with {
  backtick: "client",
};
import {
  FlatList,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native" with {
  backtick: "client",
};

// An app's latest App.tsx, line by line, as Claude wrote it and coloured as
// in the editor: for the curious, from the ⋯ sheet. On the editor theme's
// dark panel, whatever the phone's setting. Read as the user, whose token
// Supabase's policies let read only their own apps' versions.
export async function Source(props: { authorization: string; id: string }) {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      global: { headers: { authorization: props.authorization } },
      auth: { persistSession: false },
    },
  );
  const { data, error } = await supabase
    .from("versions")
    .select("version, source")
    .eq("app_id", props.id)
    .order("version", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) {
    throw new Error(`Supabase: ${error.message}`, { cause: error });
  }
  const version = data?.version ?? null;
  const { colors, background, lines } = await highlight(data?.source ?? "");
  const { ink, muted } = palette.dark;
  return cs`{
    const styles = $StyleSheet.create({
      screen: { flex: 1 },
      header: { gap: 4, paddingHorizontal: 16, paddingVertical: 12 },
      file: { fontSize: 17, fontWeight: "700" },
      meta: { fontSize: 13 },
      line: { flexDirection: "row", paddingHorizontal: 16 },
      number: { minWidth: 28, textAlign: "right", marginRight: 12 },
      code: {
        fontSize: 12,
        lineHeight: 18,
        // iOS has no font named monospace.
        fontFamily: $Platform.select({ ios: "Menlo", default: "monospace" }),
      },
    });

    function Source() {
      const insets = $useSafeAreaInsets();
      return (
        <$View
          style={[
            styles.screen,
            { backgroundColor: $background, paddingTop: insets.top },
          ]}
        >
          <$StatusBar barStyle="light-content" />
          <$View style={styles.header}>
            <$Text style={[styles.file, { color: $ink }]}>App.tsx</$Text>
            <$Text style={[styles.meta, { color: $muted }]}>
              {$version === null ? "No saved version" : "Version " + $version}
            </$Text>
          </$View>
          {/* As in the editor: long lines scroll sideways. */}
          <$ScrollView horizontal contentContainerStyle={{ flexGrow: 1 }}>
            <$FlatList
              contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
              data={$lines}
              keyExtractor={(_, index) => String(index)}
              renderItem={({ item, index }) => (
                <$View style={styles.line}>
                  <$Text
                    style={[styles.code, styles.number, { color: $muted }]}
                  >
                    {index + 1}
                  </$Text>
                  <$Text style={styles.code} selectable>
                    {item.map(([color, text], at) => (
                      <$Text key={at} style={{ color: $colors[color] }}>
                        {text}
                      </$Text>
                    ))}
                  </$Text>
                </$View>
              )}
            />
          </$ScrollView>
        </$View>
      );
    }

    return <Source />;
  }`;
}
