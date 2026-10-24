import { cs } from "@backtickjs/core";
import { shellURL } from "./links.js";
import { Logo, useColors } from "./look.js";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react" with { backtick: "client" };
import { Link, router } from "expo-router" with { backtick: "client" };
import { useSafeAreaInsets } from "react-native-safe-area-context" with {
  backtick: "client",
};
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native" with {
  backtick: "client",
};

// The home: the user's apps, newest first, each opened by the shell's link to
// it, `<id>`, as a page links to another site, and signing out. Pulled down, it loads `/` again, as a browser reloads a page, for
// a list made afresh here. Read as the user, whose token Supabase's policies
// let see only their own apps.
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
  const apps = data.map(({ id, title }) => ({ id, title }));

  return cs`{
    const styles = $StyleSheet.create({
      list: { paddingHorizontal: 20, paddingBottom: 32 },
      header: { gap: 22, paddingTop: 12, paddingBottom: 24 },
      heading: {
        fontSize: 40,
        lineHeight: 44,
        fontWeight: "800",
        letterSpacing: -1.6,
      },
      row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 18,
        marginBottom: 10,
      },
      title: {
        fontSize: 17,
        fontWeight: "600",
        letterSpacing: -0.2,
        flexShrink: 1,
      },
      chevron: { fontSize: 22, marginLeft: 12 },
      muted: { fontSize: 17, lineHeight: 26 },
      link: { fontSize: 15, fontWeight: "600", paddingVertical: 16 },
    });

    function Apps() {
      const colors = $useColors();
      const insets = $useSafeAreaInsets();
      const [refreshing, setRefreshing] = $useState(false);
      return (
        <$FlatList
          style={{ backgroundColor: colors.paper }}
          contentContainerStyle={[styles.list, { paddingTop: insets.top }]}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            $router.replace("/");
          }}
          data={$apps}
          keyExtractor={(app) => app.id}
          ListHeaderComponent={
            <$View style={styles.header}>
              <$Logo width={112} color={colors.ink} />
              <$Text style={[styles.heading, { color: colors.ink }]}>
                Your apps
              </$Text>
            </$View>
          }
          ListEmptyComponent={
            <$Text style={[styles.muted, { color: colors.muted }]}>
              Ask Claude for an app for your phone, and it appears here.
            </$Text>
          }
          renderItem={({ item }) => (
            <$Link href={$shellURL(item.id)} asChild>
              <$Pressable
                // One style object: Link's asChild drops an array, and a
                // function of the press.
                style={$StyleSheet.flatten([
                  styles.row,
                  { borderColor: colors.line, backgroundColor: colors.paper },
                ])}
                android_ripple={{ color: colors.line }}
              >
                <$Text style={[styles.title, { color: colors.ink }]}>
                  {item.title}
                </$Text>
                <$Text style={[styles.chevron, { color: colors.muted }]}>
                  ›
                </$Text>
              </$Pressable>
            </$Link>
          )}
          ListFooterComponent={
            <$Link
              href={$shellURL("sign-out")}
              style={[styles.link, { color: colors.muted }]}
            >
              Sign out
            </$Link>
          }
        />
      );
    }

    return <Apps />;
  }`;
}
