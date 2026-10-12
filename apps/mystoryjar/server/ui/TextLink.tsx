import { cs } from "@backtickjs/core";
import { Text } from "./Text.js";

// Text in the accent that does something when tapped.
export const TextLink = cs`(props: {
  children: string;
  onPress: () => void;
  size?: 12 | 14 | 16;
}) => (
  <$Text
    color="accentText"
    size={props.size}
    accessibilityRole="link"
    onPress={props.onPress}
  >
    {props.children}
  </$Text>
)`;
