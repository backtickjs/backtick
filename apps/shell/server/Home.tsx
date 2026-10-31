import { cs } from "@backtickjs/core";
import { shellURL } from "./links.js";
import { Logo, useColors } from "./look.js";
import { createClient } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react" with {
  backtick: "client",
};
import { Link, useFocusEffect } from "expo-router" with {
  backtick: "client",
};
import { setStringAsync } from "expo-clipboard" with { backtick: "client" };
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics" with {
  backtick: "client",
};
import { Image as Preview } from "expo-image" with { backtick: "client" };
import { LinearGradient } from "expo-linear-gradient" with {
  backtick: "client",
};
import { useSafeAreaInsets } from "react-native-safe-area-context" with {
  backtick: "client",
};
import {
  Alert,
  Animated,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
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
// + New one that asks Claude for a new app. Pulled down, it loads `/`
// again, as a browser reloads a page. Read as the user, whose
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
  // Whether the user connected Backtick to Claude (supabase/migrations,
  // assistants()), which registers by its name. Read each time the home
  // loads.
  const { data: assistants } = await supabase.rpc("assistants");
  const claude = (assistants ?? []).some(({ name }: { name: string }) =>
    /claude/i.test(name),
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
      list: { paddingHorizontal: 20, flexGrow: 1 },
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
      sweep: { position: "absolute", top: 0, bottom: 0 },
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
      // In the middle of what's left below the header (the list's content
      // fills the screen, so this can grow into it).
      empty: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
      },
      emptyText: {
        fontSize: 16,
        lineHeight: 23,
        textAlign: "center",
        maxWidth: 320,
      },
      top: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      },
      initial: { alignItems: "center", justifyContent: "center" },
      new: { borderRadius: 999, paddingHorizontal: 16, paddingVertical: 9 },
      newLabel: { fontSize: 15, fontWeight: "600" },
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
      steps: { gap: 16, marginTop: 18, marginBottom: 24 },
      step: { flexDirection: "row", gap: 14 },
      stepNumber: { width: 18, fontSize: 16, fontWeight: "700" },
      stepText: { fontSize: 16, lineHeight: 22 },
      server: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
      },
      // iOS has no font named monospace.
      serverUrl: {
        flex: 1,
        fontFamily: $Platform.select({ ios: "Menlo", default: "monospace" }),
        fontSize: 14,
      },
      copy: { fontSize: 14, fontWeight: "600" },
      note: { fontSize: 13, lineHeight: 19, textAlign: "center", marginTop: 4 },
    });

    // "2h ago", or the date once it's a month old.
    function ago(iso: string) {
      const minutes = (Date.now() - Date.parse(iso)) / 60000;
      if (minutes < 1) return "just now";
      if (minutes < 60) return Math.floor(minutes) + "m ago";
      if (minutes < 60 * 24) return Math.floor(minutes / 60) + "h ago";
      if (minutes < 60 * 24 * 30)
        return Math.floor(minutes / 60 / 24) + "d ago";
      return date(iso);
    }

    function date(iso: string) {
      return new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }

    type App = {
      id: string;
      title: string;
      createdAt: string;
      version: number;
      savedAt: string;
      screenshot: { uri: string; cacheKey: string };
    };

    function Card(props: { app: App; width: number; onMore: () => void }) {
      const { app, width, onMore } = props;
      const colors = $useColors();
      // Sprung in under the finger; a band of light crosses the card if the
      // app takes a moment. It waits off the card for its delay.
      const [scale] = $useState(() => new $Animated.Value(1));
      const [sweep] = $useState(() => new $Animated.Value(0));
      const [opening, setOpening] = $useState<boolean>(false);
      const height = Math.round(width * 1.9);
      const spring = (toValue: number, bounciness: number) =>
        $Animated
          .spring(scale, {
            toValue,
            bounciness,
            speed: 40,
            useNativeDriver: true,
          })
          .start();
      // Over as the app covers the home, not when it's back: a back swipe shows
      // the card before the home is on top again.
      $useFocusEffect($useCallback(() => () => setOpening(false), []));
      $useEffect(() => {
        if (!opening) {
          return;
        }
        sweep.setValue(0);
        const loop = $Animated.loop(
          $Animated.timing(sweep, {
            toValue: 1,
            duration: 1100,
            delay: 250,
            useNativeDriver: true,
          }),
        );
        loop.start();
        return () => loop.stop();
      }, [opening]);
      return (
        <$View style={[styles.card, { width }]}>
          <$Animated.View style={{ transform: [{ scale }] }}>
            <$Link href={$shellURL(app.id)} asChild>
              <$Pressable
                // One style object: Link's asChild drops an array, and a
                // function of the press.
                style={$StyleSheet.flatten([
                  styles.shot,
                  { borderColor: colors.line, height },
                ])}
                onPressIn={() => spring(0.97, 0)}
                onPressOut={() => spring(1, 8)}
                onPress={() => {
                  // On the tap, not the touch: a touch may be a scroll.
                  void $impactAsync($ImpactFeedbackStyle.Light);
                  setOpening(true);
                }}
                onLongPress={onMore}
              >
                <$Preview
                  source={app.screenshot}
                  style={{ width: width - 2, height: height - 2 }}
                  // A phone's screen, from the top, where an app's title is.
                  contentFit="cover"
                  contentPosition="top"
                  cachePolicy="memory-disk"
                />
                {opening ? (
                  <$Animated.View
                    pointerEvents="none"
                    style={[
                      styles.sweep,
                      {
                        width,
                        transform: [
                          {
                            translateX: sweep.interpolate({
                              inputRange: [0, 1],
                              outputRange: [-width, width],
                            }),
                          },
                        ],
                      },
                    ]}
                  >
                    <$LinearGradient
                      colors={[
                        "rgba(255,255,255,0)",
                        "rgba(255,255,255,0.55)",
                        "rgba(255,255,255,0)",
                      ]}
                      start={{ x: 0, y: 0.35 }}
                      end={{ x: 1, y: 0.65 }}
                      style={{ flex: 1 }}
                    />
                  </$Animated.View>
                ) : null}
              </$Pressable>
            </$Link>
          </$Animated.View>
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

    // A sheet's action: filled for the main one, outlined, or a danger's text.
    function Button(props: {
      label: string;
      kind: "filled" | "outlined" | "danger";
      onPress: () => void;
      disabled?: boolean;
    }) {
      const { label, kind, onPress, disabled } = props;
      const colors = $useColors();
      return (
        <$Pressable
          disabled={disabled}
          style={[
            styles.button,
            kind === "filled" && { backgroundColor: colors.ink },
            kind === "outlined" && { borderWidth: 1, borderColor: colors.line },
            disabled && { opacity: 0.4 },
          ]}
          onPress={onPress}
        >
          <$Text
            style={[
              styles.label,
              {
                color: {
                  filled: colors.paper,
                  outlined: colors.ink,
                  danger: colors.danger,
                }[kind],
              },
            ]}
          >
            {label}
          </$Text>
        </$Pressable>
      );
    }

    // A bottom sheet, as phones show a menu of actions, over the dimmed home.
    function Sheet(props: { onClose: () => void; children: any }) {
      const { onClose } = props;
      const colors = $useColors();
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

    // What to ask Claude: a new app, or a change to one.
    type Ask = { title: string; placeholder: string; prompt: string };

    // An app made or changed by Claude: a new chat there, the prompt written
    // in and not yet sent. It names Backtick (and the app, for a change), so
    // Claude uses the connector rather than answering in text. The card's
    // Open in Backtick brings the app back here. Not connected, it shows how
    // to connect instead, with nothing to write yet.
    function AskSheet(props: { ask: Ask; onClose: () => void }) {
      const { ask: what, onClose } = props;
      const colors = $useColors();
      const [idea, setIdea] = $useState("");
      const ready = idea.trim().length > 0;
      if (!$claude) {
        return <ConnectSheet onClose={onClose} />;
      }
      return (
        <Sheet onClose={onClose}>
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
          <Button
            label="Ask Claude"
            kind="filled"
            disabled={!ready}
            onPress={() => {
              onClose();
              $Linking.openURL(
                "https://claude.ai/new?q=" +
                  encodeURIComponent(what.prompt + idea.trim()),
              );
            }}
          />
          <$Text style={[styles.note, { color: colors.muted }]}>
            Opens a new chat with what you wrote.
          </$Text>
        </Sheet>
      );
    }

    // How to connect Backtick to Claude, as Claude's app asks it
    // (2026-10-24), and the button to its Connectors screen.
    function ConnectSheet(props: { onClose: () => void }) {
      const { onClose } = props;
      const colors = $useColors();
      const server = "https://api.backtickjs.com/mcp";
      const [copied, setCopied] = $useState(false);
      const steps = [
        "Open Claude's connectors.",
        "Tap +, then Add custom connector.",
        "Name it Backtick, with this MCP server URL:",
        "Tap Continue, then sign in and allow Backtick.",
        "Come back here.",
      ];
      return (
        <Sheet onClose={onClose}>
          <$Text style={[styles.sheetTitle, { color: colors.ink }]}>
            Connect Backtick to Claude
          </$Text>
          <$View style={styles.steps}>
            {steps.map((step, index) => (
              <$View key={step} style={styles.step}>
                <$Text style={[styles.stepNumber, { color: colors.muted }]}>
                  {index + 1}
                </$Text>
                <$View style={{ flex: 1, gap: 8 }}>
                  <$Text style={[styles.stepText, { color: colors.ink }]}>
                    {step}
                  </$Text>
                  {index === 2 ? (
                    // Tapped, it's copied, for Claude's form.
                    <$Pressable
                      onPress={async () => {
                        await $setStringAsync(server);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      style={[
                        styles.server,
                        {
                          backgroundColor: colors.wash,
                          borderColor: colors.line,
                        },
                      ]}
                      accessibilityLabel="Copy the MCP server URL"
                    >
                      <$Text style={[styles.serverUrl, { color: colors.ink }]}>
                        {server}
                      </$Text>
                      <$Text style={[styles.copy, { color: colors.muted }]}>
                        {copied ? "Copied" : "Copy"}
                      </$Text>
                    </$Pressable>
                  ) : null}
                </$View>
              </$View>
            ))}
          </$View>
          <Button
            label="Open Claude's connectors"
            kind="filled"
            onPress={() => {
              onClose();
              $Linking.openURL("https://claude.ai/settings/connectors");
            }}
          />
        </Sheet>
      );
    }

    // The account's picture, or its initial in a circle.
    function Avatar(props: { size: number }) {
      const { size } = props;
      const colors = $useColors();
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
    function AccountSheet(props: { onClose: () => void }) {
      const { onClose } = props;
      const colors = $useColors();
      const signOut = () => {
        onClose();
        $Linking.openURL($shellURL("sign-out"));
      };
      return (
        <Sheet onClose={onClose}>
          <$View style={styles.account}>
            <Avatar size={56} />
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
          <Button label="Sign out" kind="outlined" onPress={signOut} />
        </Sheet>
      );
    }

    // The app's details, and what can be done with it.
    function AppSheet(props: {
      app: App;
      onClose: () => void;
      onEdit: () => void;
    }) {
      const { app, onClose, onEdit } = props;
      const colors = $useColors();
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
        <Sheet onClose={onClose}>
          <$Text style={[styles.sheetTitle, { color: colors.ink }]}>
            {app.title}
          </$Text>
          <$View style={styles.details}>
            {/* Tapped, it shows the version's source: for the curious, so
                it looks like the rest of the details. */}
            <$Link
              href={"/source/" + app.id}
              onPress={onClose}
              style={[styles.detail, { color: colors.muted }]}
            >
              {"Version " + app.version + " · saved " + ago(app.savedAt)}
            </$Link>
            <$Text style={[styles.detail, { color: colors.muted }]}>
              {"Created " + date(app.createdAt)}
            </$Text>
          </$View>
          <Button label="Open" kind="filled" onPress={open} />
          <Button label="Edit" kind="outlined" onPress={onEdit} />
          <Button label="Delete" kind="danger" onPress={remove} />
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
      const [asking, setAsking] = $useState<Ask | null>(null);
      const newApp = () =>
        setAsking({
          title: "New app",
          placeholder: "An app that…",
          prompt: "Backtick app: ",
        });
      const [selected, setSelected] = $useState<App | null>(null);
      const [accountOpen, setAccountOpen] = $useState(false);
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
                    <Avatar size={34} />
                  </$Pressable>
                </$View>
                <$View style={styles.top}>
                  <$Text style={[styles.heading, { color: colors.ink }]}>
                    Your apps
                  </$Text>
                  <$Pressable
                    onPress={newApp}
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
            // No apps yet: where to start.
            ListEmptyComponent={
              <$View style={styles.empty}>
                <$Text style={[styles.emptyText, { color: colors.muted }]}>
                  Tap + New to create your first app.
                </$Text>
              </$View>
            }
            renderItem={({ item }) => (
              <Card
                app={item}
                width={cardWidth}
                onMore={() => setSelected(item)}
              />
            )}
          />
          {asking === null ? null : (
            <AskSheet ask={asking} onClose={() => setAsking(null)} />
          )}
          {accountOpen ? (
            <AccountSheet onClose={() => setAccountOpen(false)} />
          ) : null}
          {selected === null ? null : (
            <AppSheet
              app={selected}
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
