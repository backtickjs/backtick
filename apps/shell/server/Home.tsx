import { cs } from "@backtickjs/core";
import { shellURL } from "./links.js";
import { Logo, useColors } from "./look.js";
import { failed, supabase } from "./account.js";
import { useCallback, useState } from "react" with {
  backtick: "client",
};
import { Link, useFocusEffect } from "expo-router" with {
  backtick: "client",
};
import {
  nativeApplicationVersion,
  nativeBuildVersion,
} from "expo-application" with { backtick: "client" };
import { setStringAsync } from "expo-clipboard" with { backtick: "client" };
import { Ionicons } from "@expo/vector-icons" with { backtick: "client" };
import Constants from "expo-constants" with { backtick: "client" };
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics" with {
  backtick: "client",
};
import { Image as Preview } from "expo-image" with { backtick: "client" };
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

// The home's own origin, where its sheet's requests go.
const home = process.env.BACKTICK_HOME_ORIGIN!;

// The home: the user's apps, last saved first, as a grid of cards the way app
// builders list projects. A card opens its app by the shell's link to it; its
// ⋯ opens a sheet with the app's details,
// opening, editing and deleting, the avatar one with the account and signing out, and
// + New one that asks Claude for a new app. Pulled down, it loads `/`
// again. Only the user's own apps, and none they deleted.
export async function Home(props: { user: string; modules: string }) {
  // An app still at its starter, with no saved version, isn't one yet.
  const { data, error } = await supabase()
    .from("apps")
    .select("id, title, created_at, versions!inner(version, created_at)")
    .eq("owner_id", props.user)
    .is("deleted_at", null);
  if (error) {
    throw failed(error);
  }
  // Who's signed in, for the avatar: Apple's or Google's sign-in put the name
  // and picture in the user's metadata.
  const profile = await supabase().auth.admin.getUserById(props.user);
  if (profile.error) {
    throw failed(profile.error);
  }
  // The modules the phone offers, as it sent them, for its debug info.
  let modules: Record<string, string> = {};
  try {
    modules = JSON.parse(props.modules);
  } catch {}
  const metadata = profile.data.user.user_metadata ?? {};
  const account = {
    name: String(metadata.full_name ?? metadata.name ?? ""),
    email: profile.data.user.email ?? "",
    picture: (metadata.avatar_url ?? metadata.picture ?? null) as string | null,
  };
  // Each app's preview, private to the user, through a link signed for an
  // hour: none for an app never opened. A link is new on every load, so the
  // phone caches a preview by its app and when it was captured instead.
  const { data: previews } = await supabase()
    .storage.from("previews")
    .createSignedUrls(
      data.map(({ id }) => `${props.user}/${id}.jpg`),
      60 * 60,
    );
  const { data: files } = await supabase()
    .storage.from("previews")
    .list(props.user, { limit: 1000 });
  const captured = new Map(
    (files ?? []).map((file) => [file.name, file.updated_at]),
  );
  // Whether the user connected Backtick to Claude (supabase/migrations,
  // assistants_of()), which registers by its name. Read each time the home
  // loads.
  const { data: assistants } = await supabase().rpc("assistants_of", {
    owner: props.user,
  });
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
        flexShrink: 1,
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
      version: { fontSize: 12, textAlign: "center" },
      button: {
        borderRadius: 999,
        paddingVertical: 15,
        alignItems: "center",
        marginBottom: 10,
      },
      label: { fontSize: 16, fontWeight: "600" },
      idea: {
        flexShrink: 1,
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
      lede: { fontSize: 15, lineHeight: 21, marginTop: 6 },
      steps: { gap: 18, marginTop: 22, marginBottom: 26 },
      step: { flexDirection: "row", gap: 12 },
      stepNumber: {
        width: 26,
        height: 26,
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
      },
      stepDigit: { fontSize: 14, fontWeight: "700" },
      stepText: { fontSize: 16, lineHeight: 22, paddingTop: 2 },
      server: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 14,
        paddingRight: 4,
        paddingVertical: 6,
      },
      // iOS has no font named monospace.
      serverUrl: {
        flex: 1,
        fontFamily: $Platform.select({ ios: "Menlo", default: "monospace" }),
        fontSize: 14,
      },
      copy: { padding: 8 },
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
                // One open at a time, however many taps.
                disabled={opening}
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
      const server = "https://mcp.backtickjs.com";
      const [copied, setCopied] = $useState(false);
      const steps = [
        "Open Claude's connectors.",
        "Tap +, then Add custom connector.",
        "Name it Backtick and paste this URL:",
        "Tap Continue, sign in, and allow Backtick.",
      ];
      return (
        <Sheet onClose={onClose}>
          <$Text style={[styles.sheetTitle, { color: colors.ink }]}>
            Connect Backtick to Claude
          </$Text>
          <$Text style={[styles.lede, { color: colors.muted }]}>
            One time, about a minute. Claude builds your apps, so Backtick is
            free.
          </$Text>
          <$View style={styles.steps}>
            {steps.map((step, index) => (
              <$View key={step} style={styles.step}>
                <$View
                  style={[styles.stepNumber, { backgroundColor: colors.wash }]}
                >
                  <$Text style={[styles.stepDigit, { color: colors.ink }]}>
                    {index + 1}
                  </$Text>
                </$View>
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
                      <$Text
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        minimumFontScale={0.75}
                        style={[styles.serverUrl, { color: colors.ink }]}
                      >
                        {server}
                      </$Text>
                      <$Ionicons
                        name={copied ? "checkmark" : "copy-outline"}
                        size={20}
                        color={colors.muted}
                        style={styles.copy}
                      />
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

    // The Backtick app's version, for people: its version, and when the
    // update it runs was published. A tap copies what debugging needs: its
    // runtime version (EAS's fingerprint), its update, and the modules it
    // offers apps.
    function Version() {
      const colors = $useColors();
      const update = $Constants.manifest2;
      const label =
        "Backtick " +
        ($nativeApplicationVersion ?? "") +
        (update
          ? " · updated " +
            new Date(update.createdAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })
          : "");
      const copy = () => {
        $impactAsync($ImpactFeedbackStyle.Light);
        void $setStringAsync(
          JSON.stringify(
            {
              version: $nativeApplicationVersion,
              build: $nativeBuildVersion,
              runtimeVersion: update?.runtimeVersion ?? null,
              update: update
                ? { id: update.id, createdAt: update.createdAt }
                : null,
              modules: $modules,
            },
            null,
            2,
          ),
        );
      };
      return (
        <$Pressable onPress={copy} hitSlop={8}>
          <$Text style={[styles.version, { color: colors.muted }]}>
            {label}
          </$Text>
        </$Pressable>
      );
    }

    // Who's signed in, signing out, and deleting the account.
    function AccountSheet(props: { onClose: () => void }) {
      const { onClose } = props;
      const colors = $useColors();
      const signOut = () => {
        onClose();
        $Linking.openURL($shellURL("sign-out"));
      };
      // The shell asks first, deletes, and signs out.
      const deleteAccount = () => {
        onClose();
        $Linking.openURL($shellURL("delete-account"));
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
          <Button
            label="Delete account"
            kind="danger"
            onPress={deleteAccount}
          />
          <Version />
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
              // The home's own server deletes it, then the home loads again.
              onPress: async () => {
                onClose();
                await fetch($home + "/apps/" + app.id + "/delete", {
                  method: "POST",
                });
                $Linking.openURL($shellURL("reload"));
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
      // Loads the home again, in place: the spinner stays until the new one
      // replaces this one.
      const refresh = () => {
        setRefreshing(true);
        $Linking.openURL($shellURL("reload"));
      };
      const [asking, setAsking] = $useState<Ask | null>(null);
      const newApp = () =>
        setAsking({
          title: "New app",
          placeholder: "An app that…",
          prompt: "New Backtick app: ",
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
                  prompt: "Edit Backtick app " + selected.id + ": ",
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
