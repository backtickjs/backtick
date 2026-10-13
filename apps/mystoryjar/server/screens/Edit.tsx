import { cs } from "@backtickjs/core";
import { ScrollView, View } from "@backtickjs/react-native";
import { useStack } from "../navigation.js";
import { Refusal } from "../refusal.js";
import type { ScreenRequest } from "../request.js";
import { type Story, storyFor } from "../stories.js";
import { BackNavbar } from "../ui/BackNavbar.js";
import { Navbar } from "../ui/Navbar.js";
import { Notice } from "../ui/Notice.js";
import { Screen } from "../ui/Screen.js";
import { usePost } from "../ui/server.js";
import { Text } from "../ui/Text.js";
import { Composer, type Draft } from "./Composer.js";

// A story in the composer, as a sheet over Read: saved, Read is shown again,
// fetched with the change; discarded, it's as it was.
const EditStory = cs`(props: { story: Story }) => {
  const post = $usePost();
  const stack = $useStack();
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
    const answer = await post("/api/stories/update", {
      id: story.id,
      text: draft.text,
      day: draft.day,
      favorite: draft.favorite,
      tags: draft.tags ?? [],
      location: draft.location ?? "",
      photoId: draft.photo?.id ?? null,
    });
    if (answer.error !== undefined) return answer.error;
    stack.backFresh("/read");
    return null;
  };
  return <$Composer initial={initial} onSave={save} onDiscard={stack.back} />;
}`;

export async function Edit({ request }: { request: ScreenRequest }) {
  const story = await storyFor(
    request.user!.uid,
    request.query.id ?? "",
    request.timeZone,
    request.origin,
  ).catch((error) => {
    if (error instanceof Refusal) return null;
    throw error;
  });
  return <EditView request={request} story={story} />;
}

/** Edit with its story in hand, or null for one that's gone, as tests draw it. */
export function EditView({
  request,
  story,
}: {
  request: ScreenRequest;
  story: Story | null;
}) {
  if (story === null) {
    return (
      <Screen request={request}>
        {cs`(
          <$View style={{ flex: 1 }}>
            <$BackNavbar title="Edit Story" />
            <$View style={{ padding: 16 }}>
              <$Notice>That story is gone.</$Notice>
            </$View>
          </$View>
        )`}
      </Screen>
    );
  }
  return (
    <Screen request={request}>
      {cs`(
        <$View style={{ flex: 1 }}>
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
            <$EditStory story={$story} />
          </$ScrollView>
        </$View>
      )`}
    </Screen>
  );
}
