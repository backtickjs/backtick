import { cs } from "@backtickjs/core";
import { connectionsOf, failed, supabase } from "../account.js";
import { AskSheet } from "../components/AskSheet.js";
import type { Ask } from "../components/AskSheet.js";
import type { Assistant } from "../components/assistants.js";
import { useEffect } from "react" with { backtick: "client" };
import { StackActions, useNavigation } from "@react-navigation/native" with {
  backtick: "client",
};

// Asking the user's assistant, in a sheet over the home. With none connected,
// connecting one first, in its place.
const AskScreen = cs`(props: { ask: Ask; assistant: Assistant | null }) => {
  const { ask, assistant } = props;
  const navigation = $useNavigation();
  $useEffect(() => {
    if (assistant === null) {
      navigation.dispatch($StackActions.replace("Assistants"));
    }
  }, [assistant, navigation]);
  if (assistant === null) {
    return null;
  }
  return <$AskSheet ask={ask} assistant={assistant} />;
}`;

// + New, from the server: the assistant it asks, as chosen now.
export async function NewApp(props: { user: string }) {
  const { assistant } = await connectionsOf(props.user);
  const ask: Ask = {
    title: "New app",
    placeholder: "An app that…",
    prompt: "New Backtick app: ",
  };
  return cs`<$AskScreen ask={$ask} assistant={$assistant} />`;
}

// An app's Edit, from its ⋯ sheet: the user's own app, and the assistant it
// asks, as chosen now.
export async function EditApp(props: { user: string; id: string }) {
  const { data, error } = await supabase()
    .from("apps")
    .select("title")
    .eq("id", props.id)
    .eq("owner_id", props.user)
    .is("deleted_at", null)
    .maybeSingle();
  if (error) {
    throw failed(error);
  }
  if (data === null) {
    throw new Error(`App ${props.id} isn't the user's, or was deleted.`);
  }
  const { assistant } = await connectionsOf(props.user);
  const ask: Ask = {
    title: "Edit " + data.title,
    placeholder: "What should change?",
    prompt: "Edit Backtick app " + props.id + ": ",
  };
  return cs`<$AskScreen ask={$ask} assistant={$assistant} />`;
}
