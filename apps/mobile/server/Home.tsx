import { cs } from "@backtickjs/core";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react" with { backtick: "client" };
import { Link, router, Stack } from "expo-router" with { backtick: "client" };
import { FlatList, Pressable, StyleSheet, Text } from "react-native" with {
  backtick: "client",
};

// The home: the user's apps, newest first, each opened by its address,
// `backtick://<id>`, as a page links to another site, and signing out. Pulled down, it loads `/` again,
// as a browser reloads a page, for a list made afresh here. Read as the user, whose token
// Supabase's policies let see only their own apps.
export async function Home(props: { authorization: string }) {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      global: { headers: { authorization: props.authorization } },
      auth: { persistSession: false },
    },
  );
  // An app still at its starter, with no saved version, isn't one yet.
  const { data, error } = await supabase
    .from("apps")
    .select("id, title, versions!inner(version)")
    .order("created_at", { ascending: false });
  if (error) {
    throw new Error(`Supabase: ${error.message}`, { cause: error });
  }
  const apps = data.map(({ id, title }) => ({
    id,
    title,
    url: `backtick://${id}`,
  }));

  return cs`{
    const styles = $StyleSheet.create({
      list: { paddingTop: 16 },
      row: {
        backgroundColor: "#fff",
        marginHorizontal: 16,
        marginBottom: 8,
        borderRadius: 12,
        padding: 16,
      },
      title: { fontSize: 17, color: "#17201b" },
      muted: { fontSize: 16, color: "#64706a", paddingHorizontal: 16 },
      link: { color: "#1f7a55", fontSize: 16, padding: 16 },
    });

    function Apps() {
      const [refreshing, setRefreshing] = $useState(false);
      return (
        <$FlatList
          contentContainerStyle={styles.list}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            $router.replace("/");
          }}
          data={$apps}
          keyExtractor={(app) => app.id}
          ListEmptyComponent={
            <$Text style={styles.muted}>
              Ask Claude for an app for your phone, and it appears here.
            </$Text>
          }
          renderItem={({ item }) => (
            <$Link href={item.url} asChild>
              <$Pressable style={styles.row}>
                <$Text style={styles.title}>{item.title}</$Text>
              </$Pressable>
            </$Link>
          )}
          ListFooterComponent={
            <$Link href="backtick://sign-out" style={styles.link}>
              Sign out
            </$Link>
          }
        />
      );
    }

    return (
      <>
        <$Stack.Screen options={{ title: "Your apps" }} />
        <Apps />
      </>
    );
  }`;
}
