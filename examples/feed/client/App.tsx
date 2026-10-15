import { QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { type ReactNode, Suspense, use, useState } from "react";
import { ActivityIndicator, Text } from "react-native";
import {
  ErrorBoundary,
  type FallbackProps,
  getErrorMessage,
} from "react-error-boundary";
import { createQueryClient, fetchBundle } from "./connection";

export default function App() {
  const [queryClient] = useState(createQueryClient);
  // Held here, which doesn't suspend, so the request outlives the render
  // that waits for it.
  const [screen] = useState(() => fetchBundle("/") as Promise<ReactNode>);
  // The whole feed comes from the server, and each page and item from a
  // query it makes: see server/Feed.tsx.
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={Failed}>
        <Suspense fallback={<ActivityIndicator style={{ flex: 1 }} />}>
          <Screen screen={screen} />
        </Suspense>
      </ErrorBoundary>
      <StatusBar style="auto" />
    </QueryClientProvider>
  );
}

// What the server sent, once it has: suspending until then, and throwing,
// for the boundary, a screen that couldn't be fetched or run.
function Screen({ screen }: { screen: Promise<ReactNode> }) {
  return use(screen);
}

// Why the screen couldn't be drawn: the server unreachable, or a screen the
// app can't run.
function Failed({ error }: FallbackProps) {
  return (
    <Text style={{ margin: 24, marginTop: 96, color: "#b91c1c" }}>
      {getErrorMessage(error) ?? String(error)}
      {"\n\n"}Is your Backtick server running? npm start runs it alongside Expo.
    </Text>
  );
}
