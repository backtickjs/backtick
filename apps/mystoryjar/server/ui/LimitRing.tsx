import { cs } from "@backtickjs/core";
import { View } from "react-native" with { backtick: "client" };
import { Circle, Svg } from "react-native-svg" with { backtick: "client" };
import { Text } from "./Text.js";
import { useColors } from "./theme.js";

// The website's text limit: a ring that fills as the story grows, grey, then
// amber from 260 characters, red past 280, where the count left goes
// negative.
export const LimitRing = cs`(props: { length: number; limit: number }) => {
  const colors = $useColors();
  const radius = 18.5;
  const around = 2 * Math.PI * radius;
  const used = Math.min(props.length / props.limit, 1);
  const over = props.length > props.limit;
  const color = over
    ? colors.negative
    : props.length >= props.limit - 20
      ? colors.warning
      : colors.progress;
  return (
    <$View
      accessibilityLabel={props.limit - props.length + " characters left"}
      style={{
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <$Svg
        width={40}
        height={40}
        style={{ position: "absolute", transform: [{ rotate: "-90deg" }] }}
      >
        <$Circle
          cx={20}
          cy={20}
          r={radius}
          stroke={colors.progressRemaining}
          strokeWidth={3}
          fill="none"
        />
        <$Circle
          cx={20}
          cy={20}
          r={radius}
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={around}
          strokeDashoffset={around * (1 - used)}
        />
      </$Svg>
      <$Text size={12} color={over ? "negative" : "primaryText"}>
        {props.limit - props.length}
      </$Text>
    </$View>
  );
}`;
