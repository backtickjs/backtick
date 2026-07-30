import {
  type Client,
  type ClientElement,
  createClientElement,
} from "@backtickjs/cs-runtime";
import type { JSX } from "../jsx-runtime/index.js";
import type { Children } from "./Children.js";
import type { ViewStyle } from "./style/index.js";

/**
 * Keep aligned with:
 * https://github.com/react/react-native/blob/main/packages/react-native/Libraries/Components/Pressable/Pressable.d.ts
 */
export type PressableProps = {
  children?: Children<JSX.Element>;
  style?: ViewStyle;
  onPress?: Client<() => void>;
  testID?: string;
};

export const Pressable: ClientElement<PressableProps> =
  createClientElement("Pressable");
