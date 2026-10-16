import { cs } from "@backtickjs/core";
import { useEffect, useState } from "react" with { backtick: "client" };
import { deleteItemAsync } from "expo-secure-store" with { backtick: "client" };
import { Linking, Modal, ScrollView, View } from "react-native" with {
  backtick: "client",
};
import { signedInRecently } from "../account.js";
import { useStack } from "../navigation.js";
import type { ScreenRequest } from "../request.js";
import { BackNavbar } from "../ui/BackNavbar.js";
import { Button } from "../ui/Button.js";
import { Notice } from "../ui/Notice.js";
import { Screen } from "../ui/Screen.js";
import { usePost } from "../ui/server.js";
import { Text } from "../ui/Text.js";
import { TextLink } from "../ui/TextLink.js";
import { useColors } from "../ui/theme.js";

// The website's My Account: the backup, deleting the account, and the
// agreements.

const Section = cs`(props: { title: string; children: React.ReactNode }) => (
  <$View style={{ gap: 8, paddingBottom: 20 }}>
    <$Text bold size={16}>
      {props.title}
    </$Text>
    {props.children}
  </$View>
)`;

// The backup, opened in the phone's browser by a link that's good for a few
// minutes, where it can be saved or shared.
const Backup = cs`() => {
  const post = $usePost();
  const [error, setError] = $useState<string | null>(null);
  return (
    <>
      <$Text color="secondaryText">Download your stories as PDF</$Text>
      {error !== null && <$Notice>{error}</$Notice>}
      <$View style={{ alignItems: "flex-start" }}>
        <$Button
          label="Download Backup"
          onPress={async () => {
            const answer = await post<{ url: string }>("/api/backup", {});
            if (answer.error !== undefined) setError(answer.error);
            else $Linking.openURL(answer.url);
          }}
        />
      </$View>
    </>
  );
}`;

// A last chance, as on the website: Delete stays blocked for ten seconds.
const DeleteDialog = cs`(props: {
  onCancel: () => void;
  onDelete: () => void;
}) => {
  const colors = $useColors();
  const [left, setLeft] = $useState(10);
  const [deleting, setDeleting] = $useState(false);
  $useEffect(() => {
    if (left === 0) return;
    const timer = setTimeout(() => setLeft(left - 1), 1000);
    return () => clearTimeout(timer);
  }, [left]);
  return (
    <$Modal
      transparent
      animationType="fade"
      visible
      onRequestClose={props.onCancel}
    >
      <$View
        style={{
          flex: 1,
          justifyContent: "center",
          padding: 16,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}
      >
        <$View
          accessibilityRole="alert"
          style={{
            alignSelf: "center",
            width: "100%",
            maxWidth: 544,
            borderRadius: 20,
            backgroundColor: colors.surface,
            boxShadow: colors.largeShadow,
          }}
        >
          <$Text bold size={16} style={{ padding: 12, paddingHorizontal: 16 }}>
            Delete Account
          </$Text>
          <$View style={{ height: 1, backgroundColor: colors.divider }} />
          <$Text style={{ padding: 12, paddingHorizontal: 16 }}>
            Are you sure you want to delete your account? If you delete your
            account, your stories can never be recovered.
          </$Text>
          <$View style={{ height: 1, backgroundColor: colors.divider }} />
          <$View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 8,
              margin: 8,
            }}
          >
            <$Button label="Cancel" flat onPress={props.onCancel} />
            <$Button
              label={left > 0 ? "Delete blocked for " + left + "s" : "Delete"}
              primary
              disabled={left > 0 || deleting}
              onPress={() => {
                setDeleting(true);
                props.onDelete();
              }}
            />
          </$View>
        </$View>
      </$View>
    </$Modal>
  );
}`;

const DeleteAccount = cs`(props: { recent: boolean }) => {
  const stack = $useStack();
  const post = $usePost();
  const [confirming, setConfirming] = $useState(false);
  const [error, setError] = $useState<string | null>(null);
  // signed out, to sign in again: the website's "reauthenticate"
  const signOut = async () => {
    await $deleteItemAsync("session");
    stack.restart("/signin");
  };
  const remove = async () => {
    const answer = await post("/api/account/delete", {});
    setConfirming(false);
    if (answer.error !== undefined) {
      setError(answer.error);
      return;
    }
    await $deleteItemAsync("session");
    stack.restart("/");
  };
  return (
    <>
      <$Text color="secondaryText">
        {props.recent
          ? "If you delete your account, your stories can never be recovered."
          : "In order to delete your account, please reauthenticate first."}
      </$Text>
      {error !== null && <$Notice>{error}</$Notice>}
      <$View style={{ alignItems: "flex-start" }}>
        {props.recent ? (
          <$Button label="Delete Account" onPress={() => setConfirming(true)} />
        ) : (
          <$Button label="Reauthenticate" onPress={signOut} />
        )}
      </$View>
      {confirming && (
        <$DeleteDialog
          onCancel={() => setConfirming(false)}
          onDelete={remove}
        />
      )}
    </>
  );
}`;

const Agreements = cs`() => (
  <$Text color="secondaryText">
    <$TextLink
      onPress={() =>
        $Linking.openURL("https://www.mystoryjar.com/terms-and-conditions.pdf")
      }
    >
      Terms and Conditions
    </$TextLink>{" "}
    and{" "}
    <$TextLink
      onPress={() =>
        $Linking.openURL("https://www.mystoryjar.com/privacy-policy.pdf")
      }
    >
      Privacy Policy
    </$TextLink>
  </$Text>
)`;

export function Account({ request }: { request: ScreenRequest }) {
  const recent = signedInRecently(request.user!);
  return (
    <Screen request={request}>
      {cs`(
        <$View style={{ flex: 1 }}>
          <$BackNavbar title="My Account" />
          <$ScrollView
            contentContainerStyle={{
              width: "100%",
              maxWidth: 544,
              alignSelf: "center",
              padding: 16,
            }}
          >
            <$Section title="Download Backup">
              <$Backup />
            </$Section>
            <$Section title="Delete Account">
              <$DeleteAccount recent={$recent} />
            </$Section>
            <$Section title="Agreements">
              <$Agreements />
            </$Section>
          </$ScrollView>
        </$View>
      )`}
    </Screen>
  );
}
