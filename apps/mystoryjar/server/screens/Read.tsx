import { cs } from "@backtickjs/core";
import { useDeferredValue, useMemo, useState } from "@backtickjs/react";
import { Pressable, SectionList, View } from "@backtickjs/react-native";
import { useStack } from "../navigation.js";
import type { ScreenRequest } from "../request.js";
import { type Story, storiesOf } from "../stories.js";
import { Button } from "../ui/Button.js";
import { Dropdown } from "../ui/Dropdown.js";
import { Icon } from "../ui/Icon.js";
import { icons } from "../ui/icons.js";
import { MainNavbar } from "../ui/MainNavbar.js";
import { Screen } from "../ui/Screen.js";
import { Text } from "../ui/Text.js";
import { TextInput } from "../ui/TextInput.js";
import { useColors } from "../ui/theme.js";

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

const Card = cs`(props: { story: Story }) => {
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
      <$View
        accessibilityLabel={
          story.favorite ? "Favorite, " + story.day : story.day
        }
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
      </$View>
      <$View
        style={{ width: 1, marginVertical: 8, backgroundColor: colors.divider }}
      />
      <$View style={{ flex: 1, margin: 8, marginLeft: 12, gap: 4 }}>
        <$Text>{story.text}</$Text>
        {details.map((detail) => (
          <$View
            key={detail.icon}
            style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
          >
            <$Icon shapes={detail.icon} size={16} color="secondaryText" />
            <$Text color="secondaryText" style={{ flexShrink: 1 }}>
              {detail.text}
            </$Text>
          </$View>
        ))}
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

const Stories = cs`(props: { stories: Story[] }) => {
  const [search, setSearch] = $useState("");
  const [filter, setFilter] = $useState<Filter>("All");
  // typing stays quick while a long list catches up
  const deferred = $useDeferredValue(search);
  const sections = $useMemo(() => {
    const months: { title: string; data: Story[] }[] = [];
    for (const story of props.stories) {
      if (!$passes(story, filter) || !$matches(story, deferred.trim())) {
        continue;
      }
      const last = months[months.length - 1];
      if (last?.title === story.month) last.data.push(story);
      else months.push({ title: story.month, data: [story] });
    }
    return months;
  }, [props.stories, filter, deferred]);

  return (
    <$SectionList
      sections={sections}
      keyExtractor={(story) => story.id}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      stickySectionHeadersEnabled={false}
      ListHeaderComponent={
        <$SearchRow
          search={search}
          onSearch={setSearch}
          filter={filter}
          onFilter={setFilter}
        />
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
      renderItem={({ item }) => <$Card story={item} />}
      ItemSeparatorComponent={() => <$View style={{ height: 8 }} />}
      ListEmptyComponent={
        <$View style={{ alignItems: "center", marginTop: 40, gap: 8 }}>
          <$Icon shapes={${icons["logo-bummed"]}} size={120} color="accent" />
          <$Text size={16}>No Stories to Show.</$Text>
        </$View>
      }
    />
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
  const stories = await storiesOf(request.user!.uid, request.timeZone);
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
