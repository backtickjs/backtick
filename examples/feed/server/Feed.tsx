import { type Client, cs } from "@backtickjs/core";
import { Suspense, useState } from "@backtickjs/react";
import { ErrorBoundary } from "@backtickjs/react-error-boundary";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "@backtickjs/react-native";
import {
  HydrationBoundary,
  infiniteQueryOptions,
  useMutation,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@backtickjs/tanstack-react-query";
import { cacheOf } from "./cache.js";
import { answersFor, itemQuery, type ItemProps, likeMutation } from "./Item.js";
import { likesOf, readPage } from "./items.js";
import { itemPath, likesPath, pagePath } from "./paths.js";

/** An item on a page: its path, where to like it, and its likes. */
export type FeedItem = { path: string; likesPath: string; likes: number };

/** A page of the feed: its items, and the next page's path. */
export type FeedPage = { items: FeedItem[]; next: string | null };

/** One page of the feed, by its number, answered at `GET /pages/:page`. */
export function pageFor(page: number): Client<FeedPage> {
  const { ids, more } = readPage(page);
  const feedPage: FeedPage = {
    items: ids.map((id) => ({
      path: itemPath(id),
      likesPath: likesPath(id),
      likes: likesOf(id),
    })),
    next: more ? pagePath(String(page + 1)) : null,
  };
  return cs`$feedPage`;
}

const firstPage = pagePath("1");

/**
 * The feed's pages as one query, keyed by the first page's path: each page
 * names the path of the next, and a page param is the path it's fetched at.
 * Current until something invalidates it, so pages the screen hands over
 * aren't fetched again as they draw.
 */
export const feedQuery = cs`$infiniteQueryOptions({
  queryKey: [$firstPage],
  staleTime: Infinity,
  initialPageParam: $firstPage,
  getNextPageParam: (page: FeedPage) => page.next,
})`;

// One item, queried from the server by its path: the component it answers
// with, given the feed's props.
const ItemCard = cs`(props: ItemProps) => {
  const { data: Item } = $useSuspenseQuery($itemQuery(props.path));
  return <Item {...props} />;
}`;

// The feed, on the phone, a page at a time: what's liked, and how many likes
// each item has, the server's count until a like here answers with a new one.
const FeedList = cs`() => {
  const feed = $useSuspenseInfiniteQuery($feedQuery);
  const items = feed.data.pages.flatMap((page) => page.items);
  const [liked, setLiked] = $useState<string[]>([]);
  const [likes, setLikes] = $useState<Record<string, number>>({});
  const like = $useMutation($likeMutation);
  const onLike = async (item: FeedItem) => {
    setLiked((liked) => [...liked, item.path]);
    const count = await like.mutateAsync({ path: item.likesPath });
    setLikes((likes) => ({ ...likes, [item.path]: count }));
  };

  return (
    <$SafeAreaView style={{ flex: 1, backgroundColor: "#f1f1f1" }}>
      <$View style={{ padding: 16 }}>
        <$Text style={{ fontSize: 28, fontWeight: "bold" }}>Feed</$Text>
        <$Text style={{ color: "#888" }}>{liked.length} liked</$Text>
      </$View>
      <$FlatList
        data={items}
        keyExtractor={(item) => item.path}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        renderItem={({ item }) => (
          // An item that couldn't load says so, and the others still draw.
          <$ErrorBoundary fallback={<$Text>Couldn't load this item.</$Text>}>
            <$Suspense
              fallback={<$ActivityIndicator style={{ padding: 24 }} />}
            >
              <$ItemCard
                path={item.path}
                liked={liked.includes(item.path)}
                likes={likes[item.path] ?? item.likes}
                onLike={() => onLike(item)}
              />
            </$Suspense>
          </$ErrorBoundary>
        )}
        onEndReached={() => {
          if (feed.hasNextPage && !feed.isFetchingNextPage) {
            feed.fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          feed.hasNextPage ? (
            <$Pressable
              disabled={feed.isFetchingNextPage}
              onPress={() => feed.fetchNextPage()}
              style={{ padding: 16, alignItems: "center" }}
            >
              <$Text style={{ color: "#1d4ed8" }}>
                {feed.isFetchingNextPage ? "Loading…" : "Load more"}
              </$Text>
            </$Pressable>
          ) : null
        }
      />
    </$SafeAreaView>
  );
}`;

// The screen at `/`, with the first page and what its items read already
// answered, so it draws without a request. The phone queries the pages after
// it, and their items.
export function Feed() {
  const { ids } = readPage(1);
  const cache = cacheOf({
    [firstPage]: { pages: [pageFor(1)], pageParams: [firstPage] },
    ...Object.assign({}, ...ids.map(answersFor)),
  });
  return cs`(
    <$HydrationBoundary state={$cache}>
      <$FeedList />
    </$HydrationBoundary>
  )`;
}
