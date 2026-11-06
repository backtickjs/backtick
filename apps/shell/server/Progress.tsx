import { cs } from "@backtickjs/core";
import { unstable_useIsNavigating } from "expo-router" with {
  backtick: "client",
};
import { useEffect, useState } from "react" with { backtick: "client" };
import {
  Animated,
  Easing,
  StyleSheet,
  useWindowDimensions,
} from "react-native" with { backtick: "client" };
import { useSafeAreaInsets } from "react-native-safe-area-context" with {
  backtick: "client",
};

const styles = cs`$StyleSheet.create({
  bar: { position: "absolute", left: 0, height: 2, borderRadius: 1 },
})`;

const Bar = cs`(props: { color: string }) => {
  const { top } = $useSafeAreaInsets();
  const { width } = $useWindowDimensions();
  const [travel] = $useState(() => new $Animated.Value(0));
  $useEffect(() => {
    const loop = $Animated.loop(
      $Animated.timing(travel, {
        toValue: 1,
        duration: 1100,
        easing: $Easing.inOut($Easing.ease),
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
    <$Animated.View
      pointerEvents="none"
      style={[
        $styles.bar,
        {
          top,
          width: width / 3,
          backgroundColor: props.color,
          transform: [{ translateX }],
        },
      ]}
    />
  );
}`;

// A progress bar along the top, in `color`. Only once a navigation has taken
// a moment, and then long enough to read as a bar, not a flicker.
export const Progress = cs`(props: { color: string }) => {
  const navigating = $unstable_useIsNavigating();
  const [shownAt, setShownAt] = $useState<number | null>(null);
  $useEffect(() => {
    if (navigating) {
      if (shownAt !== null) {
        return;
      }
      const wait = setTimeout(() => setShownAt(Date.now()), 300);
      return () => clearTimeout(wait);
    }
    if (shownAt !== null) {
      const left = shownAt + 500 - Date.now();
      const wait = setTimeout(() => setShownAt(null), Math.max(left, 0));
      return () => clearTimeout(wait);
    }
  }, [navigating, shownAt]);
  return shownAt === null ? null : <$Bar color={props.color} />;
}`;
