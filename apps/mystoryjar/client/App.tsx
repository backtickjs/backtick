import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import * as SafeArea from "react-native-safe-area-context";
import { type Routes, ServerScreen } from "./ServerScreen";
import { watchServer } from "./serverRestarts";

const Stack = createNativeStackNavigator<Routes>();

// The app is a stack of server paths: every screen, the tab bar and the
// headers included, comes from the server. See server/routes.tsx.
export default function App() {
  useEffect(() => (__DEV__ ? watchServer() : undefined), []);
  return (
    <SafeArea.SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            animation: route.params.animation ?? "default",
            presentation: route.params.presentation ?? "card",
          })}
        >
          <Stack.Screen
            name="Screen"
            component={ServerScreen}
            initialParams={{ path: "/" }}
            // a screen is its path: one a screen preloads is the one shown
            // when the stack moves to that path
            getId={({ params }) => params.path}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeArea.SafeAreaProvider>
  );
}
