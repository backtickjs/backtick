import { cs } from "@backtickjs/core";
import { deleteItemAsync } from "@backtickjs/expo-secure-store";
import { View } from "@backtickjs/react-native";
import { useStack } from "../navigation.js";
import type { ScreenRequest } from "../request.js";
import { Button } from "../ui/Button.js";
import { Logo } from "../ui/Logo.js";
import { Navbar } from "../ui/Navbar.js";
import { Screen } from "../ui/Screen.js";
import { Text } from "../ui/Text.js";

// A placeholder until the composer is built: who's signed in, and the way out.
const SignOut = cs`() => {
  const stack = $useStack();
  return (
    <$Button
      label="Sign out"
      flat
      onPress={async () => {
        await $deleteItemAsync("session");
        stack.restart("/");
      }}
    />
  );
}`;

export function Write({ request }: { request: ScreenRequest }) {
  const email = request.user!.email;
  return (
    <Screen request={request} theme="light">
      {cs`(
        <$View style={{ flex: 1 }}>
          <$Navbar>
            <$Logo withText={false} />
            <$SignOut />
          </$Navbar>
          <$View style={{ padding: 16 }}>
            <$Text>Signed in as {$email}</$Text>
          </$View>
        </$View>
      )`}
    </Screen>
  );
}
