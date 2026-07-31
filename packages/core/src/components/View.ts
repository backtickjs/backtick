import {
  type Children,
  type ClientElement,
  createClientElement,
} from "@backtickjs/cs-runtime";
import type { JSX } from "../jsx-runtime/index.js";
import type { ViewStyle } from "./style/index.js";

/**
 * Keep aligned with:
 * https://github.com/react/react-native/blob/main/packages/react-native/Libraries/Comp onents/View/ViewPropTypes.d.ts
 */
export type ViewProps = {
  children?: Children<JSX.Element>;
  style?: ViewStyle;
  testID?: string;
};

export const View: ClientElement<ViewProps> = createClientElement("View");
