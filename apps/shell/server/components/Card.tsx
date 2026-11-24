import { cs } from "@backtickjs/core";
import { useColors } from "./look.js";
import { ago } from "./format.js";
import { Image as Preview } from "expo-image" with { backtick: "client" };
import { useCallback, useState } from "react" with { backtick: "client" };
import {
  StackActions,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native" with { backtick: "client" };
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics" with {
  backtick: "client",
};
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native" with { backtick: "client" };

// One of the user's apps, as the home lists it.
export type App = {
  id: string;
  title: string;
  createdAt: string;
  version: number;
  savedAt: string;
  screenshot: { uri: string; cacheKey: string };
};

const styles = cs`$StyleSheet.create({
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
})`;

export const Card = cs`(props: {
  app: App;
  width: number;
  onMore: () => void;
}) => {
  const { app, width, onMore } = props;
  const colors = $useColors();
  // Sprung in under the finger; a band of light crosses the card if the
  // app takes a moment. It waits off the card for its delay.
  const [scale] = $useState(() => new $Animated.Value(1));
  const [opening, setOpening] = $useState<boolean>(false);
  const navigation = $useNavigation();
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
    <$View style={[$styles.card, { width }]}>
      <$Animated.View style={{ transform: [{ scale }] }}>
        <$Pressable
          style={[$styles.shot, { borderColor: colors.line, height }]}
          // One open at a time, however many taps.
          disabled={opening}
          onPressIn={() => spring(0.97, 0)}
          onPressOut={() => spring(1, 8)}
          onPress={() => {
            // On the tap, not the touch: a touch may be a scroll.
            void $impactAsync($ImpactFeedbackStyle.Light);
            setOpening(true);
            navigation.dispatch($StackActions.push("App", { appId: app.id }));
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
      </$Animated.View>
      <$View style={$styles.caption}>
        <$View style={{ flex: 1 }}>
          <$Text
            numberOfLines={1}
            style={[$styles.title, { color: colors.ink }]}
          >
            {app.title}
          </$Text>
          <$Text style={[$styles.meta, { color: colors.muted }]}>
            {"v" + app.version + " · " + $ago(app.savedAt)}
          </$Text>
        </$View>
        <$Pressable onPress={onMore} hitSlop={12} accessibilityLabel="More">
          <$Text style={[$styles.more, { color: colors.muted }]}>···</$Text>
        </$Pressable>
      </$View>
    </$View>
  );
}`;
