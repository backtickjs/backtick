import { cs } from "@backtickjs/core";
import type { ScreenRequest } from "../request.js";
import { Screen } from "../ui/Screen.js";
import { AuthForm, type AuthFormProps } from "./AuthForm.js";

export function SignIn({ request }: { request: ScreenRequest }) {
  const form: AuthFormProps = {
    greeting: "Welcome back!",
    action: "Sign in",
    other: { question: "No account?", link: "Create one", path: "/signup" },
  };
  return <Screen request={request}>{cs`<$AuthForm {...$form} />`}</Screen>;
}
