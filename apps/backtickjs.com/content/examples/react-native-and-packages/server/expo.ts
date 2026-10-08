import { createImport } from "@backtickjs/core";
import type { impactAsync as ImpactAsync } from "expo-haptics";
import type { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";

// What the app provides from these packages, typed as the packages type
// them, for any script to splice.
export const impactAsync = createImport<typeof ImpactAsync>({
  name: "impactAsync",
  from: "expo-haptics",
  version: "~57.0.0",
});

export const LinearGradient = createImport<typeof ExpoLinearGradient>({
  name: "LinearGradient",
  from: "expo-linear-gradient",
  version: "~57.0.0",
});
