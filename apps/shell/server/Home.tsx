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
  Alert,
  FlatList,
  Image,
  Linking,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native" with {
  backtick: "client",
};

// Every app's card shows this until saves render screenshots of their own.
const placeholder = `${process.env.SUPABASE_URL}/storage/v1/object/public/screenshots/placeholder.png`;

// The home: the user's apps, last saved first, as a grid of cards the way app
// builders list projects. A card opens its app by the shell's link to it, as a
// page links to another site; its ⋯ opens a sheet with the app's details,
// opening and deleting. Pulled down, it loads `/` again, as a browser reloads a
// page. Read as the user, whose token Supabase's policies let see only their
// own apps, and none they deleted.
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
    .select("id, title, created_at, versions!inner(version, created_at)");
  if (error) {
    throw new Error(`Supabase: ${error.message}`, { cause: error });
  }
  const apps = data
    .map(({ id, title, created_at, versions }) => {
      const latest = versions.reduce((a, b) => (b.version > a.version ? b : a));
      return {
        id,
        title,
        createdAt: created_at,
        version: latest.version,
        savedAt: latest.created_at,
        screenshot: placeholder,
      };
    })
    .sort((a, b) => b.savedAt.localeCompare(a.savedAt));

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
      columns: { gap: 14 },
      card: { marginBottom: 22 },
      shot: { borderRadius: 18, borderWidth: 1, overflow: "hidden" },
      caption: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: 10,
      },
      title: { fontSize: 15, fontWeight: "600", letterSpacing: -0.2 },
      meta: { fontSize: 13, marginTop: 3 },
      more: {
        fontSize: 18,
        fontWeight: "700",
        letterSpacing: 1,
        paddingLeft: 8,
      },
      muted: { fontSize: 17, lineHeight: 26 },
      link: { fontSize: 15, fontWeight: "600", paddingVertical: 16 },
      backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" },
      sheet: {
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingHorizontal: 24,
        paddingTop: 12,
      },
      handle: {
        alignSelf: "center",
        width: 40,
        height: 5,
        borderRadius: 3,
        marginBottom: 20,
      },
      sheetTitle: {
        fontSize: 26,
        lineHeight: 30,
        fontWeight: "800",
        letterSpacing: -0.9,
      },
      details: { marginTop: 14, marginBottom: 22, gap: 6 },
      detail: { fontSize: 15 },
      button: {
        borderRadius: 999,
        paddingVertical: 15,
        alignItems: "center",
        marginBottom: 10,
      },
      label: { fontSize: 16, fontWeight: "600" },
    });

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // "2 h ago", or the date once it's a month old.
    function ago(iso: string) {
      const minutes = (Date.now() - Date.parse(iso)) / 60000;
      if (minutes < 1) return "just now";
      if (minutes < 60) return Math.floor(minutes) + " min ago";
      if (minutes < 60 * 24) return Math.floor(minutes / 60) + " h ago";
      if (minutes < 60 * 24 * 30)
        return Math.floor(minutes / 60 / 24) + " d ago";
      return date(iso);
    }

    function date(iso: string) {
      const day = new Date(iso);
      return (
        months[day.getMonth()] + " " + day.getDate() + ", " + day.getFullYear()
      );
    }

    type App = {
      id: string;
      title: string;
      createdAt: string;
      version: number;
      savedAt: string;
      screenshot: string;
    };
    type Colors = {
      ink: string;
      paper: string;
      muted: string;
      line: string;
      danger: string;
    };

    function Card(props: {
      app: App;
      width: number;
      colors: Colors;
      onMore: () => void;
    }) {
      const { app, width, colors, onMore } = props;
      return (
        <$View style={[styles.card, { width }]}>
          <$Link href={$shellURL(app.id)} asChild>
            <$Pressable
              // One style object: Link's asChild drops an array, and a
              // function of the press.
              style={$StyleSheet.flatten([
                styles.shot,
                { borderColor: colors.line },
              ])}
              onLongPress={onMore}
            >
              <$Image
                source={{ uri: app.screenshot }}
                style={{ width: width - 2, height: Math.round(width * 1.75) }}
                resizeMode="cover"
              />
            </$Pressable>
          </$Link>
          <$View style={styles.caption}>
            <$View style={{ flex: 1 }}>
              <$Text
                numberOfLines={1}
                style={[styles.title, { color: colors.ink }]}
              >
                {app.title}
              </$Text>
              <$Text style={[styles.meta, { color: colors.muted }]}>
                {"v" + app.version + " · " + ago(app.savedAt)}
              </$Text>
            </$View>
            <$Pressable onPress={onMore} hitSlop={12} accessibilityLabel="More">
              <$Text style={[styles.more, { color: colors.muted }]}>···</$Text>
            </$Pressable>
          </$View>
        </$View>
      );
    }

    // The app's details, and what can be done with it: a bottom sheet, as
    // phones show a menu of actions.
    function Sheet(props: { app: App; colors: Colors; onClose: () => void }) {
      const { app, colors, onClose } = props;
      const insets = $useSafeAreaInsets();
      const open = () => {
        onClose();
        $Linking.openURL($shellURL(app.id));
      };
      const remove = () =>
        $Alert.alert(
          "Delete " + app.title + "?",
          "It leaves your apps, and its link stops working.",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Delete",
              style: "destructive",
              onPress: () => {
                onClose();
                $Linking.openURL($shellURL("delete/" + app.id));
              },
            },
          ],
        );
      return (
        <$Modal
          visible
          transparent
          animationType="slide"
          onRequestClose={onClose}
        >
          <$Pressable style={styles.backdrop} onPress={onClose} />
          <$View
            style={[
              styles.sheet,
              {
                backgroundColor: colors.paper,
                paddingBottom: insets.bottom + 16,
              },
            ]}
          >
            <$View style={[styles.handle, { backgroundColor: colors.line }]} />
            <$Text style={[styles.sheetTitle, { color: colors.ink }]}>
              {app.title}
            </$Text>
            <$View style={styles.details}>
              <$Text style={[styles.detail, { color: colors.muted }]}>
                {"Version " + app.version + " · saved " + ago(app.savedAt)}
              </$Text>
              <$Text style={[styles.detail, { color: colors.muted }]}>
                {"Created " + date(app.createdAt)}
              </$Text>
            </$View>
            <$Pressable
              style={[styles.button, { backgroundColor: colors.ink }]}
              onPress={open}
            >
              <$Text style={[styles.label, { color: colors.paper }]}>
                Open
              </$Text>
            </$Pressable>
            <$Pressable style={styles.button} onPress={remove}>
              <$Text style={[styles.label, { color: colors.danger }]}>
                Delete
              </$Text>
            </$Pressable>
          </$View>
        </$Modal>
      );
    }

    function Apps() {
      const colors = $useColors();
      const insets = $useSafeAreaInsets();
      const { width } = $useWindowDimensions();
      const [refreshing, setRefreshing] = $useState(false);
      const [selected, setSelected] = $useState<App | null>(null);
      // Two columns, 20 at the edges and 14 between.
      const cardWidth = Math.floor((width - 40 - 14) / 2);
      return (
        <>
          <$FlatList
            style={{ backgroundColor: colors.paper }}
            contentContainerStyle={[styles.list, { paddingTop: insets.top }]}
            numColumns={2}
            columnWrapperStyle={styles.columns}
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
              <Card
                app={item}
                width={cardWidth}
                colors={colors}
                onMore={() => setSelected(item)}
              />
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
          {selected === null ? null : (
            <Sheet
              app={selected}
              colors={colors}
              onClose={() => setSelected(null)}
            />
          )}
        </>
      );
    }

    return <Apps />;
  }`;
}
