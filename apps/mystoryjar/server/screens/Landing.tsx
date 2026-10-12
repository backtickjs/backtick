import { cs } from "@backtickjs/core";
import { Image, ScrollView, View } from "@backtickjs/react-native";
import { useSafeAreaInsets } from "@backtickjs/react-native-safe-area-context";
import { useStack } from "../navigation.js";
import type { ScreenRequest } from "../request.js";
import { Button } from "../ui/Button.js";
import { Logo } from "../ui/Logo.js";
import { Navbar } from "../ui/Navbar.js";
import { Screen } from "../ui/Screen.js";
import { Text } from "../ui/Text.js";

// The website's landing page, at a phone's width: what MyStoryJar is, and the
// way in. Always light, as no one is signed in.

const Header = cs`() => {
  const stack = $useStack();
  return (
    <$Navbar>
      <$Logo />
      <$View style={{ flexDirection: "row", gap: 8 }}>
        <$Button
          label="Sign in"
          flat
          onPress={() => stack.navigate("/signin")}
        />
        <$Button
          label="Sign up"
          primary
          onPress={() => stack.navigate("/signup")}
        />
      </$View>
    </$Navbar>
  );
}`;

const GetStarted = cs`() => {
  const stack = $useStack();
  return (
    <$Button
      label="Get Started"
      primary
      onPress={() => stack.navigate("/signup")}
    />
  );
}`;

// A band on black: a line in the accent, then one in white, and a picture.
type Band = {
  title?: string;
  accent: string;
  rest: string;
  image: { uri: string; width: number; height: number };
};

const BlackBand = cs`(props: Band) => (
  <$View
    style={{
      backgroundColor: "#0A0A0A",
      paddingVertical: 48,
      paddingHorizontal: 16,
      alignItems: "center",
      gap: 24,
    }}
  >
    {props.title !== undefined && (
      <$Text color="whiteText" style={{ fontSize: 30, lineHeight: 40 }}>
        {props.title}
      </$Text>
    )}
    <$Text style={{ fontSize: 22, lineHeight: 32, textAlign: "center" }}>
      <$Text color="accentText" style={{ fontSize: 22, lineHeight: 32 }}>
        {props.accent}
      </$Text>
      <$Text color="whiteText" style={{ fontSize: 22, lineHeight: 32 }}>
        {props.rest}
      </$Text>
    </$Text>
    <$Image
      source={{ uri: props.image.uri }}
      style={{
        width: "100%",
        maxWidth: props.image.width,
        aspectRatio: props.image.width / props.image.height,
      }}
    />
  </$View>
)`;

const Footer = cs`() => {
  const insets = $useSafeAreaInsets();
  return (
    <$View
      style={{
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#D7D7D7",
        paddingTop: 12,
        paddingBottom: 12 + insets.bottom,
        alignItems: "center",
      }}
    >
      <$Text color="secondaryText">© 2021 Popper Software LLC.</$Text>
      <$Text color="secondaryText">All rights reserved.</$Text>
    </$View>
  );
}`;

export function Landing({ request }: { request: ScreenRequest }) {
  const asset = (name: string) => `${request.origin}/assets/${name}`;
  const hero = asset("my-story-jar@4x.png");
  const live: Band = {
    title: "Live Better.",
    accent: "Make each day unforgettable. ",
    rest: "Relive the moments that have shaped you.",
    image: { uri: asset("mothers-day@2x.png"), width: 519, height: 318 },
  };
  const mindset: Band = {
    accent: "Revolutionize your mindset. ",
    rest: "Discover that your days are full of meaningful moments that no longer slip by unnoticed.",
    image: { uri: asset("sunrise@2x.png"), width: 518, height: 365 },
  };
  return (
    <Screen request={request}>
      {cs`(
        <$View style={{ flex: 1 }}>
          <$Header />
          <$ScrollView>
            <$View
              style={{ padding: 16, paddingTop: 32, alignItems: "center" }}
            >
              <$Text
                color="accentText"
                style={{ fontSize: 34, lineHeight: 44, textAlign: "center" }}
              >
                Own every day.
              </$Text>
              <$Text
                style={{ fontSize: 22, lineHeight: 32, textAlign: "center" }}
              >
                Journaling without the hassle.
              </$Text>
              <$Text size={16} style={{ marginTop: 20, textAlign: "center" }}>
                Document your life in 280 characters. A quick, pain free way to
                log and remember your important moments.
              </$Text>
              <$View style={{ marginTop: 20, marginBottom: 16 }}>
                <$GetStarted />
              </$View>
            </$View>
            <$Image
              source={{ uri: $hero }}
              style={{
                width: "100%",
                aspectRatio: 2200 / 1200,
                marginBottom: 32,
              }}
            />
            <$BlackBand {...$live} />
            <$BlackBand {...$mindset} />
            <$Footer />
          </$ScrollView>
        </$View>
      )`}
    </Screen>
  );
}
