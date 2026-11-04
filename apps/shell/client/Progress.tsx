import { useEffect, useState } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { unstable_useIsNavigating } from "expo-router";
import { manifestOf } from "./manifest";
import { useInk } from "./screens";

const delay = 300;
const minimum = 500;

// A progress bar along the top. Only once a navigation has taken
// a moment, and then long enough to read as a bar, not a flicker.
export function Progress({ app }: { app: string | null }) {
  const navigating = unstable_useIsNavigating();
  const [shownAt, setShownAt] = useState<number | null>(null);
  useEffect(() => {
    if (navigating) {
      if (shownAt !== null) {
        return;
      }
      const wait = setTimeout(() => setShownAt(Date.now()), delay);
      return () => clearTimeout(wait);
    }
    if (shownAt !== null) {
      const left = shownAt + minimum - Date.now();
      const wait = setTimeout(() => setShownAt(null), Math.max(left, 0));
      return () => clearTimeout(wait);
    }
  }, [navigating, shownAt]);
  return shownAt === null ? null : <Bar app={app} />;
}

function Bar({ app }: { app: string | null }) {
  const ink = useInk();
  const { top } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [travel] = useState(() => new Animated.Value(0));
  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(travel, {
        toValue: 1,
        duration: 1100,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [travel]);
  const translateX = travel.interpolate({
    inputRange: [0, 1],
    outputRange: [-width / 3, width],
  });
  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.bar,
        {
          top,
          width: width / 3,
          backgroundColor: manifestOf(app)?.theme_color ?? ink,
          transform: [{ translateX }],
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  bar: { position: "absolute", left: 0, height: 2, borderRadius: 1 },
});
