// What the phone provides for client imports: the shell's module map
// (apps/shell/client/moduleMap.ts), which a test keeps this in step with. An
// app that imports anything else would save and fail on the phone, so
// save_app refuses it.
import type ts from "typescript";

export const phoneModules: readonly string[] = [
  "react",
  "react/jsx-runtime",
  "react-native",
  "expo-router",
  "react-native-safe-area-context",
  "@react-native-async-storage/async-storage",
  "@expo/vector-icons",
  "expo-haptics",
  "expo-image",
  "expo-linear-gradient",
  "expo-clipboard",
  "react-native-svg",
  "@react-native-community/datetimepicker",
  "@react-native-community/netinfo",
  "@react-native-community/slider",
  "@react-native-masked-view/masked-view",
  "@react-native-picker/picker",
  "@react-native-segmented-control/segmented-control",
  "@shopify/react-native-skia",
  "expo-application",
  "expo-asset",
  "expo-audio",
  "expo-battery",
  "expo-blur",
  "expo-brightness",
  "expo-calendar",
  "expo-camera",
  "expo-cellular",
  "expo-constants",
  "expo-contacts",
  "expo-crypto",
  "expo-device",
  "expo-document-picker",
  "expo-font",
  "expo-gl",
  "expo-image-manipulator",
  "expo-image-picker",
  "expo-linking",
  "expo-local-authentication",
  "expo-localization",
  "expo-location",
  "expo-mail-composer",
  "expo-media-library",
  "expo-network",
  "expo-print",
  "expo-screen-capture",
  "expo-screen-orientation",
  "expo-secure-store",
  "expo-sensors",
  "expo-sharing",
  "expo-sms",
  "expo-speech",
  "expo-sqlite",
  "expo-store-review",
  "expo-system-ui",
  "expo-video",
  "expo-video-thumbnails",
  "expo-web-browser",
  "lottie-react-native",
  "react-native-gesture-handler",
  "react-native-gesture-handler/ReanimatedSwipeable",
  "react-native-gesture-handler/ReanimatedDrawerLayout",
  "react-native-keyboard-controller",
  "react-native-pager-view",
  "react-native-screens",
  "react-native-view-shot",
  "react-native-webview",
];

// Each client import (`with { backtick: "client" }`) the phone doesn't
// provide, as an error where it is in the file. TypeScript loads here, not as
// the function starts.
export async function unprovidedImports(
  file: string,
  code: string,
): Promise<string[]> {
  const { default: ts } = await import("typescript");
  const source = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, true);
  return source.statements.flatMap((statement) => {
    if (
      !ts.isImportDeclaration(statement) ||
      !ts.isStringLiteral(statement.moduleSpecifier) ||
      !isClientImport(ts, statement)
    ) {
      return [];
    }
    const specifier = statement.moduleSpecifier.text;
    if (phoneModules.includes(specifier)) {
      return [];
    }
    const { line, character } = source.getLineAndCharacterOfPosition(
      statement.moduleSpecifier.getStart(),
    );
    return [
      `${file}(${line + 1},${character + 1}): error: The phone doesn't provide "${specifier}". Use one it does: ${phoneModules.join(", ")}.`,
    ];
  });
}

function isClientImport(
  ts: typeof import("typescript"),
  statement: ts.ImportDeclaration,
): boolean {
  return (
    statement.attributes?.elements.some(
      (attribute) =>
        attribute.name.text === "backtick" &&
        ts.isStringLiteral(attribute.value) &&
        attribute.value.text === "client",
    ) ?? false
  );
}
