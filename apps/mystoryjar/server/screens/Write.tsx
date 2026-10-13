import { cs } from "@backtickjs/core";
import { ScrollView, View } from "@backtickjs/react-native";
import { useStack } from "../navigation.js";
import type { ScreenRequest } from "../request.js";
import { dayOf } from "../ui/Calendar.js";
import { MainNavbar } from "../ui/MainNavbar.js";
import { Screen } from "../ui/Screen.js";
import { usePost } from "../ui/server.js";
import { Composer, type Draft } from "./Composer.js";

// A new story: today, where the phone is, and nothing else yet. Saved, it's
// on Read, which the app shows next.
const NewStory = cs`() => {
  const post = $usePost();
  const stack = $useStack();
  const initial: Draft = {
    day: $dayOf(new Date()),
    favorite: false,
    location: null,
    tags: null,
    photo: null,
    text: "",
  };
  const save = async (draft: Draft) => {
    const answer = await post<{ id: string }>("/api/stories", {
      text: draft.text,
      day: draft.day,
      favorite: draft.favorite,
      tags: draft.tags ?? [],
      location: draft.location ?? "",
      photoId: draft.photo?.id ?? null,
    });
    if (answer.error !== undefined) return answer.error;
    stack.replace("/read", { fresh: true });
    return null;
  };
  return <$Composer initial={initial} onSave={save} />;
}`;

export function Write({ request }: { request: ScreenRequest }) {
  return (
    <Screen request={request}>
      {cs`(
        <$View style={{ flex: 1 }}>
          <$MainNavbar selected="/write" dark={${request.theme === "dark"}} />
          <$ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              width: "100%",
              maxWidth: 544,
              alignSelf: "center",
              padding: 16,
              paddingBottom: 20,
            }}
          >
            <$NewStory />
          </$ScrollView>
        </$View>
      )`}
    </Screen>
  );
}
