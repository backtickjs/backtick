import { cs } from "@backtickjs/core";
import { Text, View } from "@backtickjs/react-native";
import { account, type User } from "./account.js";

export async function Profile({ user }: { user: User }) {
  const orders = await account.ordersFor(user.id);
  const points = await account.pointsFor(user.id);

  return cs`(
    <$View style={{ padding: 24, gap: 8 }}>
      <$Text>{${user.name}}</$Text>
      <$Text>{${orders.length}} orders</$Text>
      <$Text>{$points} points</$Text>
    </$View>
  )`;
}
