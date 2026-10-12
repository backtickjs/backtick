import { cs } from "@backtickjs/core";
import { View } from "@backtickjs/react-native";
import type { ScreenRequest } from "../request.js";
import { MainNavbar } from "../ui/MainNavbar.js";
import { Screen } from "../ui/Screen.js";
import { Text } from "../ui/Text.js";

// A placeholder until the composer is built.
export function Write({ request }: { request: ScreenRequest }) {
  const email = request.user!.email;
  return (
    <Screen request={request}>
      {cs`(
        <$View style={{ flex: 1 }}>
          <$MainNavbar selected="/write" />
          <$View style={{ padding: 16 }}>
            <$Text>Signed in as {$email}</$Text>
          </$View>
        </$View>
      )`}
    </Screen>
  );
}
