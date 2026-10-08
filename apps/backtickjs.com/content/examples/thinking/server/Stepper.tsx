import { cs } from "@backtickjs/core";
import { Pressable, Text, View } from "@backtickjs/react-native";

// A client component in a file of its own: import it wherever a script draws
// it.
export const Stepper = cs`(props: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
}) => {
  const min = props.min ?? 0;
  return (
    <$View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
      <$Pressable
        onPress={() => props.onChange(Math.max(min, props.value - 1))}
        disabled={props.value <= min}
      >
        <$Text style={{ fontSize: 24 }}>−</$Text>
      </$Pressable>
      <$Text style={{ fontSize: 18 }}>{props.value}</$Text>
      <$Pressable onPress={() => props.onChange(props.value + 1)}>
        <$Text style={{ fontSize: 24 }}>+</$Text>
      </$Pressable>
    </$View>
  );
}`;
