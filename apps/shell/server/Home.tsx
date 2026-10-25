import { cs } from "@backtickjs/core";
import { shellURL } from "./links.js";
import { Logo, useColors } from "./look.js";
import { createClient } from "@supabase/supabase-js";
import { useCallback, useRef, useState } from "react" with {
  backtick: "client",
};
import { Link, useFocusEffect } from "expo-router" with {
  backtick: "client",
};
import { Image as Preview } from "expo-image" with { backtick: "client" };
import { useSafeAreaInsets } from "react-native-safe-area-context" with {
  backtick: "client",
};
import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  Text,
  useWindowDimensions,
  View,
} from "react-native" with {
  backtick: "client",
};

// A card's preview until its app has been opened on the phone, which captures
// one (client/preview.ts).
const noPreview = `${process.env.SUPABASE_URL}/storage/v1/object/public/screenshots/no-preview.png`;

// The home: the user's apps, last saved first, as a grid of cards the way app
// builders list projects. A card opens its app by the shell's link to it, as a
// page links to another site; its ⋯ opens a sheet with the app's details,
// opening, editing and deleting, the avatar one with the account and signing out, and
// + New one that asks Claude or ChatGPT for a new app. Pulled down, or back on
// top, it loads `/` again, as a browser reloads a page. Read as the user, whose
// token Supabase's policies let see only their own apps, and none they deleted.
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
  // Who's signed in, for the avatar, from the token's own claims: Supabase
  // checked it in the query above, and Google's sign-in put the name and
  // picture in its user metadata.
  const claims = JSON.parse(
    Buffer.from(props.authorization.split(".")[1]!, "base64url").toString(),
  ) as {
    sub: string;
    email?: string;
    user_metadata?: Record<string, unknown>;
  };
  const metadata = claims.user_metadata ?? {};
  const account = {
    name: String(metadata.full_name ?? metadata.name ?? ""),
    email: claims.email ?? "",
    picture: (metadata.avatar_url ?? metadata.picture ?? null) as string | null,
  };
  // Each app's preview, private to the user, through a link signed for an
  // hour: none for an app never opened. A link is new on every load, so the
  // phone caches a preview by its app and when it was captured instead.
  const { data: previews } = await supabase.storage
    .from("previews")
    .createSignedUrls(
      data.map(({ id }) => `${claims.sub}/${id}.jpg`),
      60 * 60,
    );
  const { data: files } = await supabase.storage
    .from("previews")
    .list(claims.sub, { limit: 1000 });
  const captured = new Map(
    (files ?? []).map((file) => [file.name, file.updated_at]),
  );
  const apps = data
    .map(({ id, title, created_at, versions }, index) => {
      const latest = versions.reduce((a, b) => (b.version > a.version ? b : a));
      return {
        id,
        title,
        createdAt: created_at,
        version: latest.version,
        savedAt: latest.created_at,
        screenshot: previews?.[index]?.signedUrl
          ? {
              uri: previews[index].signedUrl,
              cacheKey: `${id}@${captured.get(`${id}.jpg`)}`,
            }
          : { uri: noPreview, cacheKey: "no-preview" },
      };
    })
    .sort((a, b) => b.savedAt.localeCompare(a.savedAt));

  return cs`{
    const styles = $StyleSheet.create({
      // The insets are added where it's drawn, so content scrolls under the
      // status bar and ends clear of the gesture bar.
      list: { paddingHorizontal: 20 },
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
      top: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      },
      initial: { alignItems: "center", justifyContent: "center" },
      new: { borderRadius: 999, paddingHorizontal: 16, paddingVertical: 9 },
      newLabel: { fontSize: 15, fontWeight: "600" },
      idea: {
        minHeight: 120,
        borderWidth: 1,
        borderRadius: 16,
        padding: 16,
        marginTop: 16,
        marginBottom: 18,
        fontSize: 17,
        lineHeight: 24,
        textAlignVertical: "top",
      },
      note: { fontSize: 13, lineHeight: 19, textAlign: "center", marginTop: 4 },
      account: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        marginBottom: 24,
      },
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
      screenshot: { uri: string; cacheKey: string };
    };
    type Colors = {
      ink: string;
      paper: string;
      muted: string;
      line: string;
      wash: string;
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
                { borderColor: colors.line, height: Math.round(width * 1.9) },
              ])}
              onLongPress={onMore}
            >
              <$Preview
                source={app.screenshot}
                style={{
                  width: width - 2,
                  height: Math.round(width * 1.9) - 2,
                }}
                // A phone's screen, from the top, where an app's title is.
                contentFit="cover"
                contentPosition="top"
                cachePolicy="memory-disk"
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

    // A bottom sheet, as phones show a menu of actions, over the dimmed home.
    function Sheet(props: {
      colors: Colors;
      onClose: () => void;
      children: any;
    }) {
      const { colors, onClose } = props;
      const insets = $useSafeAreaInsets();
      return (
        <$Modal
          visible
          transparent
          animationType="slide"
          onRequestClose={onClose}
        >
          {/* Above the keyboard, for a sheet with a text field. */}
          <$KeyboardAvoidingView
            // Below the status bar, however high the keyboard pushes it.
            style={{ flex: 1, paddingTop: insets.top + 12 }}
            behavior={$Platform.OS === "ios" ? "padding" : "height"}
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
              <$View
                style={[styles.handle, { backgroundColor: colors.line }]}
              />
              {props.children}
            </$View>
          </$KeyboardAvoidingView>
        </$Modal>
      );
    }

    // What to ask an assistant: a new app, or a change to one.
    type Ask = { title: string; placeholder: string; prompt: string };

    // An app made or changed by an assistant: a new chat there, the prompt
    // written in and not yet sent. It names Backtick (and the app, for a
    // change), so the assistant uses the connector the user added rather than
    // answering in text. The card's Open in Backtick brings the app back here.
    function AskSheet(props: {
      ask: Ask;
      colors: Colors;
      onClose: () => void;
    }) {
      const { ask: what, colors, onClose } = props;
      const [idea, setIdea] = $useState("");
      const prompt = what.prompt + idea.trim();
      const ready = idea.trim().length > 0;
      const ask = (url: string) => {
        onClose();
        $Linking.openURL(url + encodeURIComponent(prompt));
      };
      return (
        <Sheet colors={colors} onClose={onClose}>
          <$Text style={[styles.sheetTitle, { color: colors.ink }]}>
            {what.title}
          </$Text>
          <$TextInput
            value={idea}
            onChangeText={setIdea}
            placeholder={what.placeholder}
            placeholderTextColor={colors.muted}
            multiline
            autoFocus
            style={[
              styles.idea,
              {
                color: colors.ink,
                borderColor: colors.line,
                backgroundColor: colors.wash,
              },
            ]}
          />
          <$Pressable
            disabled={!ready}
            style={[
              styles.button,
              { backgroundColor: colors.ink, opacity: ready ? 1 : 0.4 },
            ]}
            onPress={() => ask("https://claude.ai/new?q=")}
          >
            <$Text style={[styles.label, { color: colors.paper }]}>
              Ask Claude
            </$Text>
          </$Pressable>
          <$Pressable
            disabled={!ready}
            style={[
              styles.button,
              {
                borderWidth: 1,
                borderColor: colors.line,
                opacity: ready ? 1 : 0.4,
              },
            ]}
            onPress={() => ask("https://chatgpt.com/?q=")}
          >
            <$Text style={[styles.label, { color: colors.ink }]}>
              Ask ChatGPT
            </$Text>
          </$Pressable>
          <$Text style={[styles.note, { color: colors.muted }]}>
            Opens a new chat with what you wrote. The assistant needs the
            Backtick connector.
          </$Text>
        </Sheet>
      );
    }

    // The account's picture, or its initial in a circle.
    function Avatar(props: { size: number; colors: Colors }) {
      const { size, colors } = props;
      const round = { width: size, height: size, borderRadius: size / 2 };
      const picture = $account.picture;
      return picture ? (
        <$Image source={{ uri: picture }} style={round} />
      ) : (
        <$View
          style={[round, styles.initial, { backgroundColor: colors.line }]}
        >
          <$Text
            style={{
              color: colors.ink,
              fontSize: size * 0.42,
              fontWeight: "700",
            }}
          >
            {($account.name || $account.email || "?").slice(0, 1).toUpperCase()}
          </$Text>
        </$View>
      );
    }

    // Who's signed in, and signing out.
    function AccountSheet(props: { colors: Colors; onClose: () => void }) {
      const { colors, onClose } = props;
      const signOut = () => {
        onClose();
        $Linking.openURL($shellURL("sign-out"));
      };
      return (
        <Sheet colors={colors} onClose={onClose}>
          <$View style={styles.account}>
            <Avatar size={56} colors={colors} />
            <$View style={{ flex: 1 }}>
              {$account.name ? (
                <$Text
                  numberOfLines={1}
                  style={[styles.sheetTitle, { color: colors.ink }]}
                >
                  {$account.name}
                </$Text>
              ) : null}
              <$Text
                numberOfLines={1}
                style={[styles.detail, { color: colors.muted }]}
              >
                {$account.email}
              </$Text>
            </$View>
          </$View>
          <$Pressable
            style={[
              styles.button,
              { borderWidth: 1, borderColor: colors.line },
            ]}
            onPress={signOut}
          >
            <$Text style={[styles.label, { color: colors.ink }]}>
              Sign out
            </$Text>
          </$Pressable>
        </Sheet>
      );
    }

    // The app's details, and what can be done with it.
    function AppSheet(props: {
      app: App;
      colors: Colors;
      onClose: () => void;
      onEdit: () => void;
    }) {
      const { app, colors, onClose, onEdit } = props;
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
        <Sheet colors={colors} onClose={onClose}>
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
            <$Text style={[styles.label, { color: colors.paper }]}>Open</$Text>
          </$Pressable>
          <$Pressable
            style={[
              styles.button,
              { borderWidth: 1, borderColor: colors.line },
            ]}
            onPress={onEdit}
          >
            <$Text style={[styles.label, { color: colors.ink }]}>Edit</$Text>
          </$Pressable>
          <$Pressable style={styles.button} onPress={remove}>
            <$Text style={[styles.label, { color: colors.danger }]}>
              Delete
            </$Text>
          </$Pressable>
        </Sheet>
      );
    }

    function Apps() {
      const colors = $useColors();
      const insets = $useSafeAreaInsets();
      const { width } = $useWindowDimensions();
      const [refreshing, setRefreshing] = $useState(false);
      // Loads the home again, in place, as location.reload() does: the
      // spinner stays until the new one replaces this one.
      const refresh = () => {
        setRefreshing(true);
        $Linking.openURL($shellURL("reload"));
      };
      // Back on top, the home refreshes itself, as a page does on pageshow:
      // an app made in a chat, or deleted, changed the list meanwhile.
      const shown = $useRef(false);
      $useFocusEffect(
        $useCallback(() => {
          if (shown.current) {
            refresh();
          }
          shown.current = true;
        }, []),
      );
      const [selected, setSelected] = $useState<App | null>(null);
      const [accountOpen, setAccountOpen] = $useState(false);
      const [asking, setAsking] = $useState<Ask | null>(null);
      // Two columns, 20 at the edges and 14 between.
      const cardWidth = Math.floor((width - 40 - 14) / 2);
      return (
        <>
          <$FlatList
            style={{ backgroundColor: colors.paper }}
            contentContainerStyle={[
              styles.list,
              { paddingTop: insets.top, paddingBottom: insets.bottom + 32 },
            ]}
            numColumns={2}
            columnWrapperStyle={styles.columns}
            refreshing={refreshing}
            onRefresh={refresh}
            // Android draws the spinner at the list's top, under the status bar.
            progressViewOffset={insets.top + 8}
            data={$apps}
            keyExtractor={(app) => app.id}
            ListHeaderComponent={
              <$View style={styles.header}>
                <$View style={styles.top}>
                  <$Logo width={112} color={colors.ink} />
                  <$Pressable
                    onPress={() => setAccountOpen(true)}
                    hitSlop={10}
                    accessibilityLabel="Account"
                  >
                    <Avatar size={34} colors={colors} />
                  </$Pressable>
                </$View>
                <$View style={styles.top}>
                  <$Text style={[styles.heading, { color: colors.ink }]}>
                    Your apps
                  </$Text>
                  <$Pressable
                    onPress={() =>
                      setAsking({
                        title: "New app",
                        placeholder: "An app that…",
                        prompt: "Backtick app: ",
                      })
                    }
                    style={[styles.new, { backgroundColor: colors.ink }]}
                    accessibilityLabel="New app"
                  >
                    <$Text style={[styles.newLabel, { color: colors.paper }]}>
                      + New
                    </$Text>
                  </$Pressable>
                </$View>
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
          />
          {asking === null ? null : (
            <AskSheet
              ask={asking}
              colors={colors}
              onClose={() => setAsking(null)}
            />
          )}
          {accountOpen ? (
            <AccountSheet
              colors={colors}
              onClose={() => setAccountOpen(false)}
            />
          ) : null}
          {selected === null ? null : (
            <AppSheet
              app={selected}
              colors={colors}
              onClose={() => setSelected(null)}
              onEdit={() => {
                setSelected(null);
                setAsking({
                  title: "Edit " + selected.title,
                  placeholder: "What should change?",
                  prompt: "Backtick app " + selected.id + ": ",
                });
              }}
            />
          )}
        </>
      );
    }

    return <Apps />;
  }`;
}
