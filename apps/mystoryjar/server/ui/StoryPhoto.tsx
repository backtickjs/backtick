import { cs } from "@backtickjs/core";
import { useState } from "@backtickjs/react";
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  ScrollView,
  View,
} from "react-native" with { backtick: "client" };
import { useSafeAreaInsets } from "react-native-safe-area-context" with {
  backtick: "client",
};
import { Button } from "./Button.js";
import { Icon } from "./Icon.js";
import { icons } from "./icons.js";
import { Text } from "./Text.js";
import { useColors } from "./theme.js";

export type Photo = { small: string; large: string };

// The photo full screen, on the page's colour: pinch to zoom where the
// platform's scroll view can (iOS), and back with the arrow.
const Lightbox = cs`(props: { uri: string; onClose: () => void }) => {
  const colors = $useColors();
  const insets = $useSafeAreaInsets();
  return (
    <$Modal animationType="fade" visible onRequestClose={props.onClose}>
      <$View style={{ flex: 1, backgroundColor: colors.wash }}>
        <$ScrollView
          maximumZoomScale={4}
          centerContent
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <$Image
            source={{ uri: props.uri }}
            resizeMode="contain"
            style={{ flex: 1 }}
          />
        </$ScrollView>
        <$Pressable
          accessibilityRole="button"
          accessibilityLabel="Close"
          onPress={props.onClose}
          style={{
            position: "absolute",
            top: insets.top + 8,
            left: 8,
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.regularButton,
            boxShadow: colors.smallShadow || undefined,
          }}
        >
          <$Icon shapes={${icons["arrow-left"]}} color="secondaryText" />
        </$Pressable>
      </$View>
    </$Modal>
  );
}`;

// A story's photo, 220 points high and cropped to fit, as on the website:
// a spinner while it loads, a way to retry if it doesn't, and the full photo
// when tapped.
export const StoryPhoto = cs`(props: { photo: Photo }) => {
  const colors = $useColors();
  const [state, setState] = $useState<"loading" | "loaded" | "failed">(
    "loading",
  );
  // a new attempt is a new image, which loads again
  const [attempt, setAttempt] = $useState(0);
  const [open, setOpen] = $useState(false);
  const frame = {
    height: 220,
    borderRadius: 16,
    borderWidth: state === "loaded" ? 0 : 1,
    borderColor: colors.divider,
    backgroundColor: colors.wash,
    overflow: "hidden" as const,
  };
  return (
    <$View style={{ marginTop: 8 }}>
      {state === "failed" ? (
        <$View
          style={[
            frame,
            { alignItems: "center", justifyContent: "center", gap: 8 },
          ]}
        >
          <$Icon shapes={${icons.warning}} size={30} color="secondaryText" />
          <$Text color="secondaryText">Image failed to load</$Text>
          <$Button
            label="Click to Retry"
            onPress={() => {
              setState("loading");
              setAttempt(attempt + 1);
            }}
          />
        </$View>
      ) : (
        <$Pressable
          accessibilityRole="imagebutton"
          accessibilityLabel="Full Screen Image"
          disabled={state !== "loaded"}
          onPress={() => setOpen(true)}
          style={frame}
        >
          <$Image
            key={attempt}
            source={{ uri: props.photo.small }}
            resizeMode="cover"
            onLoad={() => setState("loaded")}
            onError={() => setState("failed")}
            style={{ width: "100%", height: "100%" }}
          />
          {state === "loading" && (
            <$ActivityIndicator
              color={colors.accent}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
            />
          )}
        </$Pressable>
      )}
      {open && (
        <$Lightbox uri={props.photo.large} onClose={() => setOpen(false)} />
      )}
    </$View>
  );
}`;
