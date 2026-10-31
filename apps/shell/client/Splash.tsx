import { cancel, router } from "@backtickjs/router";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useManifest } from "./manifest";
import { screenUrl, useAppPaper, useInk } from "./screens";
import { showing } from "./shown";

// An app's launch screen, as an installed web app gets, while its first screen
// is fetched. That screen then replaces it like any Link's, so what it sets as
// it mounts, like its header, is there from its first frame. From the manifest
// the phone kept: on a first open, the shell's paper alone.
export function Splash({ app, path }: { app: string; path: string }) {
  const manifest = useManifest(app);
  const paper = useAppPaper(manifest);
  const ink = useInk();
  useFocusEffect(
    useCallback(() => {
      const hide = showing(app, () => Promise.resolve());
      router.replace(path);
      return () => {
        hide();
        cancel();
      };
    }, [app, path]),
  );
  const icon = manifest?.icons?.[0]?.src;
  return (
    <View style={[styles.splash, { backgroundColor: paper }]}>
      {icon === undefined ? null : (
        <Image
          source={{ uri: new URL(icon, screenUrl(app, "/")).href }}
          style={styles.icon}
        />
      )}
      {manifest?.name === undefined ? null : (
        <Text style={[styles.name, { color: ink }]}>{manifest.name}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  icon: { width: 96, height: 96, borderRadius: 22 },
  name: { fontSize: 20, fontWeight: "600" },
});
