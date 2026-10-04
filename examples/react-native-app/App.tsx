import { Backtick } from "@backtickjs/react-native-client";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Component, type ReactNode, useState } from "react";
import * as JSXRuntime from "react/jsx-runtime";
import * as ReactNative from "react-native";
import {
  ActivityIndicator,
  Button,
  ScrollView,
  Text,
  View,
} from "react-native";

// What a screen's bundle may require: the packages this app was built with.
// The server bundles for these versions (examples/react-native-server).
const modules = {
  react: React,
  "react/jsx-runtime": JSXRuntime,
  "react-native": ReactNative,
};

// The example server runs where Expo's dev server does, the computer this app
// was started from, unless told otherwise.
const host = Constants.expoConfig?.hostUri?.split(":")[0] ?? "localhost";
const server = process.env.EXPO_PUBLIC_BACKTICK_SERVER ?? `http://${host}:5179`;

export default function App() {
  // Each reload asks the server for the screen again: change the server's
  // code, press it, and the change shows without a new app.
  const [reload, setReload] = useState(0);
  return (
    <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
      <ScrollView>
        <Boundary key={reload}>
          <Backtick
            url={`${server}/home?reload=${reload}`}
            modules={modules}
            fallback={<ActivityIndicator style={{ marginTop: 48 }} />}
          />
        </Boundary>
        <Button
          title="Reload from the server"
          onPress={() => setReload(reload + 1)}
        />
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

// Why a screen couldn't be drawn: the server unreachable, or a bundle the app
// can't run.
class Boundary extends Component<{ children: ReactNode }, { error: unknown }> {
  state = { error: null as unknown };

  static getDerivedStateFromError(error: unknown) {
    return { error };
  }

  render() {
    if (this.state.error === null) {
      return this.props.children;
    }
    return (
      <Text style={{ margin: 24, color: "#b91c1c" }}>
        {String((this.state.error as Error).message ?? this.state.error)}
        {"\n\n"}Is the server running? pnpm --filter
        @backtickjs/example-react-native-server start
      </Text>
    );
  }
}
