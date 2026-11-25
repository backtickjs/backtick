import { cs } from "@backtickjs/core";
import type { StyleProp, TextStyle } from "react-native";
import { useColors } from "./look.js";
import { useEffect, useState } from "react" with { backtick: "client" };
import { Animated, Text } from "react-native" with { backtick: "client" };

// A skeleton's pulse: its shapes fade to faint and back while a sheet's
// contents load.
export const Pulse = cs`(props: { children: any }) => {
  const [opacity] = $useState(() => new $Animated.Value(1));
  $useEffect(() => {
    const pulse = $Animated.loop(
      $Animated.sequence([
        $Animated.timing(opacity, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
        $Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity]);
  return <$Animated.View style={{ opacity }}>{props.children}</$Animated.View>;
}`;

// A line of text not yet in: a bar as tall as a line in `style`, the text's
// own, so it's as tall as the text will be, at any text size.
export const Bone = cs`(props: {
  style: StyleProp<TextStyle>;
  width: number;
}) => {
  const colors = $useColors();
  return (
    <$Text
      style={[
        props.style,
        {
          width: props.width,
          color: "transparent",
          backgroundColor: colors.line,
          borderRadius: 6,
          overflow: "hidden",
        },
      ]}
    >
      {" "}
    </$Text>
  );
}`;
