import { type Client, cs, type Spliceable } from "@backtickjs/core";
import { Suspense, useState } from "@backtickjs/react";
import { Pressable, Text, TextInput, View } from "react-native" with {
  backtick: "client",
};
import {
  mutationOptions,
  queryOptions,
  useMutation,
  useSuspenseQuery,
} from "@tanstack/react-query" with { backtick: "client" };
import type { ReactNode } from "react";
import {
  addComment,
  addLike,
  commentsOf,
  type Item,
  readItem,
} from "./items.js";
import { commentsPath, itemPath } from "./paths.js";

/**
 * What every item takes from the feed: its path, and whether it's liked,
 * which is the feed's.
 */
export type ItemProps = {
  path: string;
  liked: boolean;
  likes: number;
  onLike: () => void;
};

const Like = cs`(props: ItemProps) => (
  <$Pressable
    onPress={props.onLike}
    disabled={props.liked}
    style={{ paddingTop: 8 }}
  >
    <$Text style={{ color: props.liked ? "#e63946" : "#888" }}>
      {props.liked ? "♥" : "♡"} {props.likes}
    </$Text>
  </$Pressable>
)`;

/** `GET /items/:id/comments` as a query, keyed by its path. */
export const commentsQuery = cs`(path: string) =>
  $queryOptions<string[]>({ queryKey: [path], staleTime: Infinity })`;

/**
 * `POST /items/:id/comments` as a mutation. The list it changed is the query
 * of the same path, refetched once the comment is added.
 */
export const commentMutation = cs`$mutationOptions<
  number,
  Error,
  { path: string; body: { text: string } }
>({
  onSuccess: (_count, { path }, _result, { client }) =>
    client.invalidateQueries({ queryKey: [path] }),
})`;

// A post's comments, queried by their path, and a box to add one. Sending
// one refetches the list: see `commentMutation`.
const Comments = cs`(props: { path: string }) => {
  const { data: comments } = $useSuspenseQuery($commentsQuery(props.path));
  const comment = $useMutation($commentMutation);
  const [text, setText] = $useState("");
  return (
    <$View style={{ gap: 4 }}>
      {comments.map((each, index) => (
        <$Text key={index} style={{ color: "#555" }}>
          {each}
        </$Text>
      ))}
      <$View style={{ flexDirection: "row", gap: 8 }}>
        <$TextInput
          value={text}
          onChangeText={setText}
          placeholder="Add a comment"
          style={{
            flex: 1,
            padding: 8,
            borderRadius: 8,
            backgroundColor: "#f1f1f1",
          }}
        />
        <$Pressable
          disabled={text === "" || comment.isPending}
          onPress={() =>
            comment.mutate(
              { path: props.path, body: { text } },
              { onSuccess: () => setText("") },
            )
          }
          style={{ justifyContent: "center" }}
        >
          <$Text style={{ color: "#1d4ed8" }}>Send</$Text>
        </$Pressable>
      </$View>
    </$View>
  );
}`;

const card = {
  backgroundColor: "#fff",
  borderRadius: 12,
  padding: 16,
  gap: 8,
} as const;

// One client component per kind: an item's bundle carries only its own.
const Post = cs`(
  props: ItemProps & {
    item: Item & { kind: "post" };
    commentsPath: string;
  },
) => (
  <$View style={$card}>
    <$Text style={{ fontWeight: "bold" }}>{props.item.author}</$Text>
    <$Text style={{ fontSize: 16 }}>{props.item.text}</$Text>
    <$Like {...props} />
    <$Suspense fallback={null}>
      <$Comments path={props.commentsPath} />
    </$Suspense>
  </$View>
)`;

const Photo = cs`(props: ItemProps & { item: Item & { kind: "photo" } }) => (
  <$View style={$card}>
    <$View
      style={{
        height: 160,
        borderRadius: 8,
        backgroundColor: props.item.color,
      }}
    />
    <$Text>
      <$Text style={{ fontWeight: "bold" }}>{props.item.author}</$Text>{" "}
      {props.item.caption}
    </$Text>
    <$Like {...props} />
  </$View>
)`;

// A poll keeps its vote here, on the phone: the feed never sees it.
const Poll = cs`(props: ItemProps & { item: Item & { kind: "poll" } }) => {
  const [vote, setVote] = $useState<string | null>(null);
  return (
    <$View style={$card}>
      <$Text style={{ fontWeight: "bold", fontSize: 16 }}>
        {props.item.question}
      </$Text>
      {props.item.options.map((option) => (
        <$Pressable
          key={option}
          onPress={() => setVote(option)}
          style={{
            padding: 10,
            borderRadius: 8,
            backgroundColor: vote === option ? "#d8f3dc" : "#f1f1f1",
          }}
        >
          <$Text>{option}</$Text>
        </$Pressable>
      ))}
      <$Like {...props} />
    </$View>
  );
}`;

/** What an item is on the phone: a component the feed gives its props. */
export type ItemComponent = (props: ItemProps) => ReactNode;

/**
 * One item, by its id, answered at `GET /items/:id`: the client component
 * that draws it. The feed knows nothing of what it looks like.
 */
export function itemFor(id: string): Client<ItemComponent> {
  const item = readItem(id);
  switch (item.kind) {
    case "post": {
      const comments = commentsPath(id);
      return cs`(props: ItemProps) => (
        <$Post item={$item} commentsPath={$comments} {...props} />
      )`;
    }
    case "photo":
      return cs`(props: ItemProps) => <$Photo item={$item} {...props} />`;
    case "poll":
      return cs`(props: ItemProps) => <$Poll item={$item} {...props} />`;
  }
}

/**
 * `GET /items/:id` as a query, keyed by its path. An item is current until
 * something invalidates it, so one a screen hands over isn't fetched again.
 */
export const itemQuery = cs`(path: string) =>
  $queryOptions<ItemComponent>({ queryKey: [path], staleTime: Infinity })`;

/**
 * What drawing an item reads, by path, as its routes answer: for a screen to
 * hand over with the item, so it draws without a request.
 */
export function answersFor(id: string): Record<string, Spliceable> {
  const answers: Record<string, Spliceable> = { [itemPath(id)]: itemFor(id) };
  if (readItem(id).kind === "post") {
    answers[commentsPath(id)] = commentsFor(id);
  }
  return answers;
}

/**
 * A like, counted on the server, answered at `POST /items/:id/likes`: how
 * many the item now has.
 */
export function likeFor(id: string): Client<number> {
  const count = addLike(id);
  return cs`$count`;
}

/** `POST /items/:id/likes` as a mutation, sent to the path it's given. */
export const likeMutation = cs`$mutationOptions<
  number,
  Error,
  { path: string }
>({})`;

/** An item's comments, answered at `GET /items/:id/comments`. */
export function commentsFor(id: string): Client<string[]> {
  const comments = commentsOf(id);
  return cs`$comments`;
}

/**
 * A comment, added at `POST /items/:id/comments`: how many the item now has.
 */
export function commentFor(id: string, text: string): Client<number> {
  const count = addComment(id, text);
  return cs`$count`;
}
