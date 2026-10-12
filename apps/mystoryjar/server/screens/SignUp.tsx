import { cs } from "@backtickjs/core";
import { View } from "@backtickjs/react-native";
import { useStack } from "../navigation.js";
import type { ScreenRequest } from "../request.js";
import { Button } from "../ui/Button.js";
import { Navbar } from "../ui/Navbar.js";
import { Screen } from "../ui/Screen.js";
import { Text } from "../ui/Text.js";

// A placeholder until sign-up is built.
const Back = cs`() => {
  const stack = $useStack();
  return <$Button label="Back" flat onPress={stack.back} />;
}`;

export function SignUp({ request }: { request: ScreenRequest }) {
  return (
    <Screen request={request} theme="light">
      {cs`(
        <$View style={{ flex: 1 }}>
          <$Navbar>
            <$Back />
          </$Navbar>
          <$View style={{ padding: 16 }}>
            <$Text bold size={16}>
              Get started today!
            </$Text>
          </$View>
        </$View>
      )`}
    </Screen>
  );
}
