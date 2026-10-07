import { cs } from "@backtickjs/core";
import { Text, View } from "@backtickjs/react-native";
import { db, type User } from "./db.js";

// A server component: it runs on your server, for every request.
export async function Home({ user }: { user: User }) {
  const picks = await db.picksFor(user.id);

  return cs`(
    <$View>
      <$Text>Good morning, {$user.name}</$Text>
      {$picks.map((pick) => (
        <$Text key={pick.id}>{pick.name}</$Text>
      ))}
    </$View>
  )`;
}
