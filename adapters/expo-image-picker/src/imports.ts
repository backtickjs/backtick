import { createImport } from "@backtickjs/core";
import type * as ImagePicker from "expo-image-picker";

// Expo Image Picker's API as a script splices it —
// `$launchImageLibraryAsync(…)`, `$launchCameraAsync(…)` — each typed with its
// own declarations, and each required from `expo-image-picker` by the app that
// runs the bundle. Internal: the adapter mirrors it, name for name.

// The expo-image-picker every name is typed against: the adapter's version, and
// its `expo-image-picker` dependency.
const version = "57.0.20";

export const imagePicker = <Name extends keyof typeof ImagePicker>(
  name: Name,
) =>
  createImport<(typeof ImagePicker)[Name]>({
    name,
    from: "expo-image-picker",
    version,
  });
