import type { Prop } from "@backtickjs/cs-runtime";

/**
 * Keep aligned with:
 * https://github.com/react/react-native/blob/main/packages/react-native/Libraries/Image/ImageSource.d.ts
 */
export type ImageSource = {
  readonly uri: Prop<string>;
};
