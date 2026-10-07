import { cs } from "@backtickjs/core";
import { useEffect, useRef } from "@backtickjs/react";
import {
  Animated,
  Linking,
  Platform,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "@backtickjs/react-native";
import type { ReactNode } from "react";

// Fades its children in when it appears.
const FadeIn = cs`(props: { children: ReactNode }) => {
  const opacity = $useRef(new $Animated.Value(0)).current;
  $useEffect(() => {
    $Animated
      .timing(opacity, { toValue: 1, duration: 400, useNativeDriver: true })
      .start();
  }, []);
  return <$Animated.View style={{ opacity }}>{props.children}</$Animated.View>;
}`;

type StoreInfo = { name: string; phone: string; address: string };

const StoreCard = cs`(props: StoreInfo) => {
  const { width } = $useWindowDimensions();
  const maps =
    $Platform.OS === "ios"
      ? { label: "Open in Maps", url: "https://maps.apple.com/?q=" }
      : {
          label: "Open in Google Maps",
          url: "https://www.google.com/maps/search/?api=1&query=",
        };

  return (
    <$FadeIn>
      <$View
        style={{
          padding: 24,
          gap: 12,
          flexDirection: width > 600 ? "row" : "column",
        }}
      >
        <$Text style={{ fontSize: 24, fontWeight: "bold" }}>{props.name}</$Text>
        <$Pressable onPress={() => $Linking.openURL("tel:" + props.phone)}>
          <$Text>Call {props.phone}</$Text>
        </$Pressable>
        <$Pressable
          onPress={() =>
            $Linking.openURL(maps.url + encodeURIComponent(props.address))
          }
        >
          <$Text>{maps.label}</$Text>
        </$Pressable>
      </$View>
    </$FadeIn>
  );
}`;

export async function Store() {
  const store: StoreInfo = {
    name: "Backtick Coffee",
    phone: "+15550100",
    address: "1 Main St, Portland",
  };
  return cs`<$StoreCard {...$store} />`;
}
