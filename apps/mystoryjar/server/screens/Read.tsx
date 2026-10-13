import { cs } from "@backtickjs/core";
import {
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "@backtickjs/react";
import {
  Modal,
  Pressable,
  ScrollView,
  SectionList,
  View,
} from "@backtickjs/react-native";
import { useStack } from "../navigation.js";
import type { ScreenRequest } from "../request.js";
import { type Story, storiesOf } from "../stories.js";
import { Button } from "../ui/Button.js";
import { Dropdown } from "../ui/Dropdown.js";
import { Icon } from "../ui/Icon.js";
import { icons } from "../ui/icons.js";
import { MainNavbar } from "../ui/MainNavbar.js";
import { Navbar } from "../ui/Navbar.js";
import { Notice } from "../ui/Notice.js";
import { Screen } from "../ui/Screen.js";
import { usePost } from "../ui/server.js";
import { StoryPhoto } from "../ui/StoryPhoto.js";
import { Text } from "../ui/Text.js";
import { TextInput } from "../ui/TextInput.js";
import { useColors } from "../ui/theme.js";
import { Composer, type Draft } from "./Composer.js";

// Every story the user wrote, newest first, under its month: searched and
// filtered on the phone, as all of them are here.

type Filter = "All" | "Favorites" | "On this day";
const filters: Filter[] = ["All", "Favorites", "On this day"];

const passes = cs`(story: Story, filter: Filter) =>
  filter === "Favorites"
    ? story.favorite
    : filter === "On this day"
      ? story.onThisDay
      : true`;

// The website's search: every word somewhere in the story's text, tags,
// location or date.
const matches = cs`(story: Story, search: string) => {
  const haystack = [
    story.text,
    story.tags.join("/"),
    story.location,
    story.searchDate,
  ]
    .join("\\n")
    .toLowerCase();
  return search
    .toLowerCase()
    .split(" ")
    .every((word) => haystack.includes(word));
}`;

type CardProps = {
  story: Story;
  onFavorite: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

const Card = cs`(props: CardProps) => {
  const colors = $useColors();
  const { story } = props;
  const details = [
    story.location !== "" && { icon: ${icons.pointer}, text: story.location },
    story.tags.length > 0 && {
      icon: ${icons.tag},
      text: story.tags.join(", "),
    },
  ].filter((detail) => detail !== false);
  return (
    <$View
      style={{
        flexDirection: "row",
        borderRadius: 20,
        backgroundColor: colors.surface,
        boxShadow: colors.smallShadow || undefined,
      }}
    >
      <$Pressable
        accessibilityRole="button"
        accessibilityLabel={
          story.favorite ? "Favorite, " + story.day : story.day
        }
        accessibilityHint="Toggles Favorite"
        onPress={props.onFavorite}
        style={{
          width: 40,
          marginLeft: 4,
          alignItems: "center",
          paddingTop: 8,
        }}
      >
        {story.favorite ? (
          <$View
            style={{
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <$View style={{ position: "absolute" }}>
              <$Icon shapes={${icons.like}} size={40} color="accent" />
            </$View>
            <$Text
              size={12}
              color="whiteText"
              // lifted into the heart's middle, above its point, as on the
              // website
              style={{ marginBottom: 2 }}
            >
              {story.day}
            </$Text>
          </$View>
        ) : (
          <$View style={{ height: 40, justifyContent: "center" }}>
            <$Text size={16} color="secondaryText">
              {story.day}
            </$Text>
          </$View>
        )}
      </$Pressable>
      <$View
        style={{ width: 1, marginVertical: 8, backgroundColor: colors.divider }}
      />
      <$View style={{ flex: 1, margin: 8, marginLeft: 12, gap: 4 }}>
        <$View style={{ flexDirection: "row", gap: 4 }}>
          <$Text style={{ flex: 1 }}>{story.text}</$Text>
          <$Dropdown
            accessibilityLabel="Story Menu"
            items={[
              { label: "Edit", icon: ${icons.pen}, onPress: props.onEdit },
              {
                label: "Delete",
                icon: ${icons.basket},
                onPress: props.onDelete,
              },
            ]}
          >
            <$View
              style={{
                width: 30,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <$Icon
                shapes={${icons["dots-menu"]}}
                size={20}
                color="tertiaryText"
              />
            </$View>
          </$Dropdown>
        </$View>
        {/* the place and the tags on one line, as on the website, wrapping
            when they don't fit */}
        {details.length > 0 && (
          <$View
            style={{ flexDirection: "row", flexWrap: "wrap", columnGap: 12 }}
          >
            {details.map((detail) => (
              <$View
                key={detail.icon}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                  flexShrink: 1,
                }}
              >
                {/* centred on the letters rather than the line, which Noto
                Sans JP draws tall for its kanji */}
                <$View style={{ marginTop: 2 }}>
                  <$Icon shapes={detail.icon} size={16} color="secondaryText" />
                </$View>
                <$Text color="secondaryText" style={{ flexShrink: 1 }}>
                  {detail.text}
                </$Text>
              </$View>
            ))}
          </$View>
        )}
        {story.photo !== null && <$StoryPhoto photo={story.photo} />}
      </$View>
    </$View>
  );
}`;

const SearchRow = cs`(props: {
  search: string;
  onSearch: (search: string) => void;
  filter: Filter;
  onFilter: (filter: Filter) => void;
}) => {
  const colors = $useColors();
  return (
    <$View style={{ flexDirection: "row", gap: 8, marginBottom: 8 }}>
      <$View style={{ flex: 1 }}>
        <$TextInput
          icon={${icons.search}}
          placeholder="Search"
          value={props.search}
          onChangeText={props.onSearch}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          after={
            props.search !== "" && (
              <$Pressable
                accessibilityRole="button"
                accessibilityLabel="Clear"
                onPress={() => props.onSearch("")}
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
      </$View>
      <$Dropdown
        accessibilityLabel={"Filter: " + props.filter}
        items={$filters.map((filter) => ({
          label: filter,
          onPress: () => props.onFilter(filter),
        }))}
      >
        <$View
          style={{
            height: 40,
            borderRadius: 20,
            paddingHorizontal: 16,
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            backgroundColor: colors.regularButton,
            boxShadow: colors.smallShadow || undefined,
          }}
        >
          <$Text color="regularButtonText">{props.filter}</$Text>
          <$Icon
            shapes={${icons["chevron-down"]}}
            size={14}
            color="secondaryText"
          />
        </$View>
      </$Dropdown>
    </$View>
  );
}`;

// A story in the composer, over everything: saved, it's drawn in place on
// the list; discarded, it's as it was.
const EditStory = cs`(props: {
  story: Story;
  onSaved: (story: Story) => void;
  onClose: () => void;
}) => {
  const colors = $useColors();
  const post = $usePost();
  const { story } = props;
  const initial: Draft = {
    day: story.date,
    favorite: story.favorite,
    location: story.location === "" ? null : story.location,
    tags: story.tags.length === 0 ? null : story.tags,
    photo: story.photo,
    text: story.text,
  };
  const save = async (draft: Draft) => {
    const answer = await post<{ story: Story }>("/api/stories/update", {
      id: story.id,
      text: draft.text,
      day: draft.day,
      favorite: draft.favorite,
      tags: draft.tags ?? [],
      location: draft.location ?? "",
      photoId: draft.photo?.id ?? null,
    });
    if (answer.error !== undefined) return answer.error;
    props.onSaved(answer.story);
    return null;
  };
  return (
    <$Modal animationType="slide" visible onRequestClose={props.onClose}>
      <$View style={{ flex: 1, backgroundColor: colors.wash }}>
        <$Navbar>
          <$View style={{ flex: 1, alignItems: "center" }}>
            <$Text bold size={16}>
              Edit Story
            </$Text>
          </$View>
        </$Navbar>
        <$ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            width: "100%",
            maxWidth: 544,
            alignSelf: "center",
            padding: 16,
          }}
        >
          <$Composer
            initial={initial}
            onSave={save}
            onDiscard={props.onClose}
          />
        </$ScrollView>
      </$View>
    </$Modal>
  );
}`;

// The website's confirmation, in a card over the page.
const DeleteDialog = cs`(props: {
  onCancel: () => void;
  onDelete: () => void;
}) => {
  const colors = $useColors();
  const [deleting, setDeleting] = $useState(false);
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
            Delete Story
          </$Text>
          <$View style={{ height: 1, backgroundColor: colors.divider }} />
          <$Text style={{ padding: 12, paddingHorizontal: 16 }}>
            Are you sure you want to delete this story?
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
              label="Delete"
              primary
              disabled={deleting}
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

// Newest day first, keeping the order within a day: where an edited story
// moves to.
const newestFirst = cs`(stories: Story[]) =>
  [...stories].sort((a, b) =>
    a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
  )`;

const Stories = cs`(props: { stories: Story[] }) => {
  const post = $usePost();
  // the stories as changed here, until the screen is fetched again
  const [stories, setStories] = $useState(props.stories);
  $useEffect(() => setStories(props.stories), [props.stories]);
  const [editing, setEditing] = $useState<Story | null>(null);
  const [deleting, setDeleting] = $useState<Story | null>(null);
  const [error, setError] = $useState<string | null>(null);
  const replace = (story: Story) =>
    setStories((current) =>
      $newestFirst(
        current.map((each) => (each.id === story.id ? story : each)),
      ),
    );
  // shown at once, and taken back if the server refuses
  const favorite = async (story: Story) => {
    replace({ ...story, favorite: !story.favorite });
    const answer = await post("/api/stories/favorite", {
      id: story.id,
      favorite: !story.favorite,
    });
    if (answer.error !== undefined) {
      replace(story);
      setError(answer.error);
    }
  };
  const remove = async (story: Story) => {
    const answer = await post("/api/stories/delete", { id: story.id });
    setDeleting(null);
    if (answer.error !== undefined) setError(answer.error);
    else
      setStories((current) => current.filter((each) => each.id !== story.id));
  };
  const [search, setSearch] = $useState("");
  const [filter, setFilter] = $useState<Filter>("All");
  // typing stays quick while a long list catches up
  const deferred = $useDeferredValue(search);
  const sections = $useMemo(() => {
    const months: { title: string; data: Story[] }[] = [];
    for (const story of stories) {
      if (!$passes(story, filter) || !$matches(story, deferred.trim())) {
        continue;
      }
      const last = months[months.length - 1];
      if (last?.title === story.month) last.data.push(story);
      else months.push({ title: story.month, data: [story] });
    }
    return months;
  }, [stories, filter, deferred]);

  return (
    <>
      <$SectionList
        sections={sections}
        keyExtractor={(story) => story.id}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={
          <$View style={{ gap: 8 }}>
            {error !== null && <$Notice>{error}</$Notice>}
            <$SearchRow
              search={search}
              onSearch={setSearch}
              filter={filter}
              onFilter={setFilter}
            />
          </$View>
        }
        renderSectionHeader={({ section }) => (
          <$Text
            bold
            size={16}
            style={{ marginLeft: 12, marginTop: 8, marginBottom: 8 }}
          >
            {section.title}
          </$Text>
        )}
        renderItem={({ item }) => (
          <$Card
            story={item}
            onFavorite={() => favorite(item)}
            onEdit={() => setEditing(item)}
            onDelete={() => setDeleting(item)}
          />
        )}
        ItemSeparatorComponent={() => <$View style={{ height: 8 }} />}
        ListEmptyComponent={
          <$View style={{ alignItems: "center", marginTop: 40, gap: 8 }}>
            <$Icon shapes={${icons["logo-bummed"]}} size={120} color="accent" />
            <$Text size={16}>No Stories to Show.</$Text>
          </$View>
        }
      />
      {editing !== null && (
        <$EditStory
          story={editing}
          onSaved={(story) => {
            replace(story);
            setEditing(null);
          }}
          onClose={() => setEditing(null)}
        />
      )}
      {deleting !== null && (
        <$DeleteDialog
          onCancel={() => setDeleting(null)}
          onDelete={() => remove(deleting)}
        />
      )}
    </>
  );
}`;

// No stories yet: the jar, waiting, and the way to the first one.
const EmptyJar = cs`() => {
  const stack = $useStack();
  return (
    <$View style={{ alignItems: "center", marginTop: 60, padding: 16, gap: 8 }}>
      <$Icon shapes={${icons["logo-happy"]}} size={120} color="accent" />
      <$Text size={16}>Your jar is waiting.</$Text>
      <$Text color="secondaryText" style={{ textAlign: "center" }}>
        Every story you write will appear here. Get started today!
      </$Text>
      <$View style={{ marginTop: 8 }}>
        <$Button
          label="Write a Story"
          primary
          onPress={() => stack.replace("/write")}
        />
      </$View>
    </$View>
  );
}`;

export async function Read({ request }: { request: ScreenRequest }) {
  const stories = await storiesOf(
    request.user!.uid,
    request.timeZone,
    request.origin,
  );
  return <ReadView request={request} stories={stories} />;
}

/** Read with its stories in hand, as tests draw it. */
export function ReadView({
  request,
  stories,
}: {
  request: ScreenRequest;
  stories: Story[];
}) {
  return (
    <Screen request={request}>
      {cs`(
        <$View style={{ flex: 1 }}>
          <$MainNavbar selected="/read" />
          {${stories.length === 0} ? (
            <$EmptyJar />
          ) : (
            <$Stories stories={$stories} />
          )}
        </$View>
      )`}
    </Screen>
  );
}
