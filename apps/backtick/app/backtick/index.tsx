import { router, Stack } from "expo-router";
import { use, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import { type App, OpenApp } from "../../client/openApp";
import { spike } from "../../client/screens";
import { supabase } from "../../client/supabase";

// The user's apps with at least one saved version: an app still at its
// starter isn't one yet.
export default function Apps() {
  const { open } = use(OpenApp);
  const [apps, setApps] = useState<App[]>();
  const [error, setError] = useState<string>();
  useEffect(() => {
    supabase
      .from("apps")
      .select("id, title, versions!inner(version)")
      .order("created_at", { ascending: false })
      .then(({ data, error }) =>
        error ? setError(error.message) : setApps(data),
      );
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Your apps",
          headerRight: () => (
            <Pressable onPress={() => supabase.auth.signOut()}>
              <Text style={styles.link}>Sign out</Text>
            </Pressable>
          ),
        }}
      />
      {error !== undefined ? (
        <Text style={styles.error}>{error}</Text>
      ) : apps === undefined ? (
        <ActivityIndicator style={{ flex: 1 }} />
      ) : (
        <FlatList
          contentContainerStyle={{ paddingTop: 16 }}
          data={[spike, ...apps]}
          keyExtractor={(app) => app.id}
          ListEmptyComponent={
            <Text style={styles.muted}>
              Ask Claude for an app for your phone, and it appears here.
            </Text>
          }
          renderItem={({ item }) => (
            <Pressable
              style={styles.row}
              onPress={() => {
                open(item);
                router.push("/");
              }}
            >
              <Text style={styles.rowLabel}>{item.title}</Text>
            </Pressable>
          )}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  muted: { fontSize: 16, color: "#64706a", paddingHorizontal: 16 },
  link: { color: "#1f7a55", fontSize: 16 },
  row: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    padding: 16,
  },
  rowLabel: { fontSize: 17, color: "#17201b" },
  error: { margin: 24, color: "#b91c1c" },
});
