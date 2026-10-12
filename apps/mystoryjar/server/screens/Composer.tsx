import { cs } from "@backtickjs/core";
import { useRef, useState } from "@backtickjs/react";
import { launchImageLibraryAsync } from "@backtickjs/expo-image-picker";
import {
  ActivityIndicator,
  Pressable,
  TextInput as NativeTextInput,
  View,
} from "@backtickjs/react-native";
import { Button } from "../ui/Button.js";
import { Calendar, dateOf } from "../ui/Calendar.js";
import { fontFamilies } from "../ui/fonts.js";
import { Icon } from "../ui/Icon.js";
import { icons } from "../ui/icons.js";
import { LimitRing } from "../ui/LimitRing.js";
import { Notice } from "../ui/Notice.js";
import { RoundButton } from "../ui/RoundButton.js";
import { useUpload } from "../ui/server.js";
import { type Photo, StoryPhoto } from "../ui/StoryPhoto.js";
import { Text } from "../ui/Text.js";
import { TextInput } from "../ui/TextInput.js";
import { useColors } from "../ui/theme.js";

// The website's composer, for Write and for editing a story: the day, a
// heart, a place, tags, one photo, and up to 280 characters.

export type Draft = {
  day: string;
  favorite: boolean;
  // shown only once asked for: null until then
  location: string | null;
  tags: string[] | null;
  photo: (Photo & { id: string }) | null;
  text: string;
};

export type ComposerProps = {
  initial: Draft;
  // saves the draft: an error to show, or null once saved
  onSave: (draft: Draft) => Promise<string | null>;
};

const LIMIT = 280;

const DayButton = cs`(props: { day: string; onDay: (day: string) => void }) => {
  const [open, setOpen] = $useState(false);
  return (
    <>
      <$Button
        label={$dateOf(props.day).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
        icon={${icons.calendar}}
        onPress={() => setOpen(true)}
      />
      {open && (
        <$Calendar
          day={props.day}
          onDay={props.onDay}
          onDone={() => setOpen(false)}
        />
      )}
    </>
  );
}`;

// The tags, each a pill, then a field for the next: Enter adds one, as does
// leaving the field; Backspace on an empty field takes the last back.
const Tags = cs`(props: {
  tags: string[];
  // given the tags as they are by then, as two changes can come at once
  onTags: (change: (tags: string[]) => string[] | null) => void;
}) => {
  const colors = $useColors();
  const [next, setNext] = $useState("");
  // what's typed, as of now: Enter then leaving the field adds it once
  const typed = $useRef("");
  const type = (text: string) => {
    typed.current = text;
    setNext(text);
  };
  const add = () => {
    const tag = typed.current.trim();
    type("");
    if (tag !== "") props.onTags((tags) => [...tags, tag]);
  };
  return (
    <$View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 4,
        minHeight: 40,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 6,
        backgroundColor: colors.surface,
        boxShadow: colors.smallShadow || undefined,
      }}
    >
      <$Icon shapes={${icons.tag}} color="secondaryText" />
      {props.tags.map((tag, index) => (
        <$View
          key={index}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
            maxWidth: 160,
            paddingLeft: 10,
            paddingRight: 4,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: colors.divider,
          }}
        >
          <$Text
            color="secondaryText"
            numberOfLines={1}
            style={{ flexShrink: 1 }}
          >
            {tag}
          </$Text>
          <$Pressable
            accessibilityRole="button"
            accessibilityLabel={"Remove " + tag}
            onPress={() =>
              props.onTags((tags) => tags.filter((_, other) => other !== index))
            }
          >
            <$Icon shapes={${icons.close}} size={16} color="secondaryText" />
          </$Pressable>
        </$View>
      ))}
      <$NativeTextInput
        value={next}
        onChangeText={type}
        onSubmitEditing={add}
        onBlur={add}
        submitBehavior="submit"
        onKeyPress={({ nativeEvent }) => {
          if (
            nativeEvent.key === "Backspace" &&
            next === "" &&
            props.tags.length > 0
          ) {
            props.onTags((tags) => tags.slice(0, -1));
          }
        }}
        accessibilityLabel="Tags"
        placeholder={props.tags.length === 0 ? "Tags" : ""}
        placeholderTextColor={colors.tertiaryText}
        autoCapitalize="none"
        returnKeyType="done"
        style={{
          flexGrow: 1,
          minWidth: 60,
          height: 28,
          paddingVertical: 0,
          fontFamily: ${fontFamilies.medium},
          fontSize: 14,
          // centred, without Android's font padding, as every field is
          textAlignVertical: "center",
          includeFontPadding: false,
          color: colors.primaryText,
        }}
      />
      {props.tags.length === 0 && (
        <$Pressable
          accessibilityRole="button"
          accessibilityLabel="Clear Tags"
          onPress={() => props.onTags(() => null)}
        >
          <$Icon shapes={${icons.close}} size={18} color="secondaryText" />
        </$Pressable>
      )}
    </$View>
  );
}`;

export const Composer = cs`(props: ComposerProps) => {
  const colors = $useColors();
  const upload = $useUpload();
  const [draft, setDraft] = $useState(props.initial);
  const [uploading, setUploading] = $useState(false);
  const [saving, setSaving] = $useState(false);
  const [error, setError] = $useState<string | null>(null);
  const change = (fields: Partial<Draft>) =>
    setDraft((current) => ({ ...current, ...fields }));

  const pickPhoto = async () => {
    const picked = await $launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });
    if (picked.canceled) return;
    const asset = picked.assets[0]!;
    setUploading(true);
    setError(null);
    const stored = await upload<Photo & { id: string }>(
      "/api/photos",
      asset.uri,
      asset.mimeType ?? "image/jpeg",
    );
    setUploading(false);
    if (stored.error !== undefined) setError(stored.error);
    else setDraft((current) => ({ ...current, photo: stored }));
  };

  const save = async () => {
    setSaving(true);
    setError(await props.onSave(draft));
    setSaving(false);
  };

  return (
    <$View style={{ gap: 8 }}>
      {error !== null && <$Notice>{error}</$Notice>}
      <$View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <$View style={{ flex: 1, alignItems: "flex-start" }}>
          <$DayButton day={draft.day} onDay={(day) => change({ day })} />
        </$View>
        <$Pressable
          accessibilityRole="button"
          accessibilityLabel="Toggle Favorite"
          accessibilityState={{ selected: draft.favorite }}
          onPress={() => change({ favorite: !draft.favorite })}
        >
          <$Icon
            shapes={${icons.like}}
            size={28}
            outline={!draft.favorite}
            color={draft.favorite ? "accent" : "secondaryText"}
          />
        </$Pressable>
        <$RoundButton
          icon={${icons.pointer}}
          accessibilityLabel="Toggle Location Input"
          disabled={draft.location !== null}
          onPress={() => change({ location: "" })}
        />
        <$RoundButton
          icon={${icons.tag}}
          accessibilityLabel="Toggle Tags Input"
          disabled={draft.tags !== null}
          onPress={() => change({ tags: [] })}
        />
        <$RoundButton
          icon={${icons.picture}}
          iconSize={26}
          accessibilityLabel="Upload Photo"
          disabled={uploading || draft.photo !== null}
          onPress={pickPhoto}
        />
      </$View>
      {draft.location !== null && (
        <$TextInput
          icon={${icons.pointer}}
          placeholder="Location"
          value={draft.location}
          onChangeText={(location) => change({ location })}
          after={
            draft.location === "" && (
              <$Pressable
                accessibilityRole="button"
                accessibilityLabel="Clear Location"
                onPress={() => change({ location: null })}
              >
                <$Icon
                  shapes={${icons.close}}
                  size={18}
                  color="secondaryText"
                />
              </$Pressable>
            )
          }
        />
      )}
      {draft.tags !== null && (
        <$Tags
          tags={draft.tags}
          onTags={(update) =>
            setDraft((current) => ({
              ...current,
              tags: update(current.tags ?? []),
            }))
          }
        />
      )}
      {uploading && (
        <$View
          style={{
            height: 220,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: colors.divider,
            backgroundColor: colors.wash,
            justifyContent: "center",
          }}
        >
          <$ActivityIndicator color={colors.accent} />
        </$View>
      )}
      {draft.photo !== null && (
        <$View>
          <$StoryPhoto photo={draft.photo} />
          <$View style={{ position: "absolute", top: 12, right: 4 }}>
            <$RoundButton
              icon={${icons.close}}
              accessibilityLabel="Clear Photo"
              size={32}
              onPress={() => change({ photo: null })}
            />
          </$View>
        </$View>
      )}
      <$View
        style={{
          borderRadius: 20,
          backgroundColor: colors.surface,
          boxShadow: colors.smallShadow || undefined,
        }}
      >
        <$NativeTextInput
          multiline
          value={draft.text}
          onChangeText={(text) => change({ text })}
          placeholder="What's your story?"
          placeholderTextColor={colors.tertiaryText}
          textAlignVertical="top"
          style={{
            minHeight: 112,
            paddingHorizontal: 16,
            paddingTop: 12,
            paddingBottom: 12,
            fontFamily: ${fontFamilies.medium},
            fontSize: 14,
            // no line height and no font padding: given either, Android
            // draws an empty field's cursor as tall as Noto Sans JP's
            // ascent and descent together
            includeFontPadding: false,
            color: colors.primaryText,
          }}
        />
      </$View>
      <$View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <$LimitRing length={draft.text.length} limit={$LIMIT} />
        <$Button
          label="Save"
          primary
          disabled={
            saving ||
            uploading ||
            draft.text.length === 0 ||
            draft.text.length > $LIMIT
          }
          onPress={save}
        />
      </$View>
    </$View>
  );
}`;
