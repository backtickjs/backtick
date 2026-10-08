import { cs } from "@backtickjs/core";
import { Text } from "@backtickjs/react-native";
import type { User } from "./account.js";

// `$user.name` splices `user`, the whole object, and reads its name on the
// phone: the email crosses too.
export async function Greeting({ user }: { user: User }) {
  return cs`<$Text>Hello, {$user.name}</$Text>`;
}
