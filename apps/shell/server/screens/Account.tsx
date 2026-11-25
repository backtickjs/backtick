import { cs } from "@backtickjs/core";
import { accountOf, connectionsOf } from "../account.js";
import { AccountSheet } from "../components/AccountSheet.js";
import type { Assistant } from "../components/assistants.js";
import type { Account as AccountData } from "../components/Avatar.js";
import { useNavigation } from "@react-navigation/native" with {
  backtick: "client",
};

// The account sheet, over the home: closing goes back.
const AccountScreen = cs`(props: {
  account: AccountData;
  modules: Record<string, string>;
  assistant: Assistant | null;
}) => {
  const navigation = $useNavigation();
  return <$AccountSheet {...props} onClose={() => navigation.goBack()} />;
}`;

// The account sheet, from the server: who's signed in, and their assistant,
// as chosen now.
export async function Account(props: { user: string; modules: string }) {
  const account = await accountOf(props.user);
  const { assistant } = await connectionsOf(props.user);
  // The modules the phone offers, as it sent them, for its debug info.
  let modules: Record<string, string> = {};
  try {
    modules = JSON.parse(props.modules);
  } catch {}
  return cs`(
    <$AccountScreen
      account={$account}
      modules={$modules}
      assistant={$assistant}
    />
  )`;
}
