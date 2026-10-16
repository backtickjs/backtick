import { cs } from "@backtickjs/core";
import { View } from "react-native" with { backtick: "client" };
import { useColors } from "./theme.js";

// The website's switch: a 42 × 22 track, its handle to the right when on.
// Shown, not tapped: the row it's in takes the tap.
export const ToggleSwitch = cs`(props: { on: boolean }) => {
  const colors = $useColors();
  return (
    <$View
      style={{
        width: 42,
        height: 22,
        borderRadius: 20,
        justifyContent: "center",
        backgroundColor: props.on ? colors.accent : colors.toggleInactive,
      }}
    >
      <$View
        style={{
          position: "absolute",
          left: props.on ? 22 : 2,
          width: 18,
          height: 18,
          borderRadius: 9,
          backgroundColor: colors.white,
        }}
      />
    </$View>
  );
}`;
