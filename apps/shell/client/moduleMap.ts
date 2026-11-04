// What a screen may require, as your app imports it: the modules Expo Go ships
// (on SDK 58, its package.json and every Expo module its Podfile links) that
// need no keys, entitlements or store declarations, less Expo Go's own (expo,
// expo-updates, expo-splash-screen, expo-dev-menu, expo-image-loader). Not
// WebView: an app builds its screens natively. Not expo-intent-launcher: it
// throws on iOS. Not @expo/ui's SwiftUI and Jetpack Compose entries: each works
// on one platform, which a typecheck can't see. Reanimated without worklets in
// scripts: the worklets plugin finds them by hook name, and a script's hooks
// are spliced, so its CSS animations, transitions and layout animations work
// and `useAnimatedStyle` doesn't; save_app refuses its worklet APIs
// (apps/mcp.backtickjs.com/src/function/diagnostics/
// unsupported-reanimated-api.ts). Each is a getter, so a module loads when a
// screen first requires it. The app sends your server what it offers, at the
// versions it's built with.
import type { Module } from "./modules";

export const moduleMap = {
  get react() {
    return require("react");
  },
  get "react/jsx-runtime"() {
    return require("react/jsx-runtime");
  },
  get "react-native"() {
    return require("react-native");
  },
  get "expo-router"() {
    return require("expo-router");
  },
  get "react-native-safe-area-context"() {
    return require("react-native-safe-area-context");
  },
  get "@react-native-async-storage/async-storage"() {
    return require("@react-native-async-storage/async-storage");
  },
  get "@expo/vector-icons"() {
    return require("@expo/vector-icons");
  },
  get "expo-haptics"() {
    return require("expo-haptics");
  },
  get "expo-image"() {
    return require("expo-image");
  },
  get "expo-linear-gradient"() {
    return require("expo-linear-gradient");
  },
  get "expo-clipboard"() {
    return require("expo-clipboard");
  },
  get "react-native-svg"() {
    return require("react-native-svg");
  },
  get "@react-native-community/datetimepicker"() {
    return require("@react-native-community/datetimepicker");
  },
  get "@react-native-community/netinfo"() {
    return require("@react-native-community/netinfo");
  },
  get "@react-native-community/slider"() {
    return require("@react-native-community/slider");
  },
  get "@react-native-masked-view/masked-view"() {
    return require("@react-native-masked-view/masked-view");
  },
  get "@react-native-picker/picker"() {
    return require("@react-native-picker/picker");
  },
  get "@react-native-segmented-control/segmented-control"() {
    return require("@react-native-segmented-control/segmented-control");
  },
  get "@shopify/react-native-skia"() {
    return require("@shopify/react-native-skia");
  },
  get "expo-application"() {
    return require("expo-application");
  },
  get "expo-asset"() {
    return require("expo-asset");
  },
  get "expo-audio"() {
    return require("expo-audio");
  },
  get "expo-battery"() {
    return require("expo-battery");
  },
  get "expo-blur"() {
    return require("expo-blur");
  },
  get "expo-brightness"() {
    return require("expo-brightness");
  },
  get "expo-calendar"() {
    return require("expo-calendar");
  },
  get "expo-camera"() {
    return require("expo-camera");
  },
  get "expo-cellular"() {
    return require("expo-cellular");
  },
  get "expo-constants"() {
    return require("expo-constants");
  },
  get "expo-contacts"() {
    return require("expo-contacts");
  },
  get "expo-crypto"() {
    return require("expo-crypto");
  },
  get "expo-device"() {
    return require("expo-device");
  },
  get "expo-document-picker"() {
    return require("expo-document-picker");
  },
  get "expo-font"() {
    return require("expo-font");
  },
  get "expo-gl"() {
    return require("expo-gl");
  },
  get "expo-image-manipulator"() {
    return require("expo-image-manipulator");
  },
  get "expo-image-picker"() {
    return require("expo-image-picker");
  },
  get "expo-linking"() {
    return require("expo-linking");
  },
  get "expo-local-authentication"() {
    return require("expo-local-authentication");
  },
  get "expo-localization"() {
    return require("expo-localization");
  },
  get "expo-location"() {
    return require("expo-location");
  },
  get "expo-mail-composer"() {
    return require("expo-mail-composer");
  },
  get "expo-media-library"() {
    return require("expo-media-library");
  },
  get "expo-network"() {
    return require("expo-network");
  },
  get "expo-print"() {
    return require("expo-print");
  },
  get "expo-screen-capture"() {
    return require("expo-screen-capture");
  },
  get "expo-screen-orientation"() {
    return require("expo-screen-orientation");
  },
  get "expo-secure-store"() {
    return require("expo-secure-store");
  },
  get "expo-sensors"() {
    return require("expo-sensors");
  },
  get "expo-sharing"() {
    return require("expo-sharing");
  },
  get "expo-sms"() {
    return require("expo-sms");
  },
  get "expo-speech"() {
    return require("expo-speech");
  },
  get "expo-sqlite"() {
    return require("expo-sqlite");
  },
  get "expo-status-bar"() {
    return require("expo-status-bar");
  },
  get "expo-store-review"() {
    return require("expo-store-review");
  },
  get "expo-system-ui"() {
    return require("expo-system-ui");
  },
  get "expo-video"() {
    return require("expo-video");
  },
  get "expo-web-browser"() {
    return require("expo-web-browser");
  },
  get "lottie-react-native"() {
    return require("lottie-react-native");
  },
  get "react-native-gesture-handler"() {
    return require("react-native-gesture-handler");
  },
  get "react-native-gesture-handler/ReanimatedSwipeable"() {
    return require("react-native-gesture-handler/ReanimatedSwipeable");
  },
  get "react-native-gesture-handler/ReanimatedDrawerLayout"() {
    return require("react-native-gesture-handler/ReanimatedDrawerLayout");
  },
  get "react-native-keyboard-controller"() {
    return require("react-native-keyboard-controller");
  },
  get "react-native-pager-view"() {
    return require("react-native-pager-view");
  },
  get "react-native-screens"() {
    return require("react-native-screens");
  },
  get "react-native-view-shot"() {
    return require("react-native-view-shot");
  },
  get three() {
    return require("three");
  },
  get "@react-three/fiber/native"() {
    return require("@react-three/fiber/native");
  },
  get "expo-file-system"() {
    return require("expo-file-system");
  },
  get "expo-keep-awake"() {
    return require("expo-keep-awake");
  },
  get "@expo/ui"() {
    return require("@expo/ui");
  },
  get "@expo/ui/community/datetime-picker"() {
    return require("@expo/ui/community/datetime-picker");
  },
  get "@expo/ui/community/bottom-sheet"() {
    return require("@expo/ui/community/bottom-sheet");
  },
  get "@expo/ui/community/segmented-control"() {
    return require("@expo/ui/community/segmented-control");
  },
  get "@expo/ui/community/picker"() {
    return require("@expo/ui/community/picker");
  },
  get "@expo/ui/community/slider"() {
    return require("@expo/ui/community/slider");
  },
  get "@expo/ui/community/masked-view"() {
    return require("@expo/ui/community/masked-view");
  },
  get "@expo/ui/community/menu"() {
    return require("@expo/ui/community/menu");
  },
  get "@expo/ui/community/pager-view"() {
    return require("@expo/ui/community/pager-view");
  },
  get "expo-blob"() {
    return require("expo-blob");
  },
  get "expo-hinge"() {
    return require("expo-hinge");
  },
  get "expo-live-photo"() {
    return require("expo-live-photo");
  },
  get "expo-mesh-gradient"() {
    return require("expo-mesh-gradient");
  },
  get "expo-navigation-bar"() {
    return require("expo-navigation-bar");
  },
  get "expo-symbols"() {
    return require("expo-symbols");
  },
  get "expo-symbols/androidWeights/thin"() {
    return require("expo-symbols/androidWeights/thin");
  },
  get "expo-symbols/androidWeights/extraLight"() {
    return require("expo-symbols/androidWeights/extraLight");
  },
  get "expo-symbols/androidWeights/light"() {
    return require("expo-symbols/androidWeights/light");
  },
  get "expo-symbols/androidWeights/regular"() {
    return require("expo-symbols/androidWeights/regular");
  },
  get "expo-symbols/androidWeights/medium"() {
    return require("expo-symbols/androidWeights/medium");
  },
  get "expo-symbols/androidWeights/semiBold"() {
    return require("expo-symbols/androidWeights/semiBold");
  },
  get "expo-symbols/androidWeights/bold"() {
    return require("expo-symbols/androidWeights/bold");
  },
  get "expo-glass-effect"() {
    return require("expo-glass-effect");
  },
  get "expo-checkbox"() {
    return require("expo-checkbox");
  },
  get "react-native-reanimated"() {
    return require("react-native-reanimated");
  },
  get "react-native-worklets"() {
    return require("react-native-worklets");
  },
} satisfies Record<Module, unknown>;
