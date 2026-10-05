import { cs } from "@backtickjs/core";
import { useEffect, useRef } from "@backtickjs/react";
import { Animated, Pressable } from "@backtickjs/react-native";

// A client component: it runs on the phone, so its animation does too. It
// waves when it appears, and again when you tap it.
export const HelloWave = cs`() => {
  const rotation = $useRef(new $Animated.Value(0)).current;
  const wave = () =>
    $Animated.loop(
      $Animated.sequence([
        $Animated.timing(rotation, { toValue: 1, duration: 150, useNativeDriver: true }),
        $Animated.timing(rotation, { toValue: 0, duration: 150, useNativeDriver: true }),
      ]),
      { iterations: 4 },
    ).start();

  $useEffect(wave, []);

  return (
    <$Pressable onPress={wave}>
      <$Animated.Text
        style={{
          fontSize: 28,
          lineHeight: 32,
          marginTop: -6,
          transform: [
            {
              rotate: rotation.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", "25deg"],
              }),
            },
          ],
        }}
      >
        👋
      </$Animated.Text>
    </$Pressable>
  );
}`;
