import { cs } from "@backtickjs/core";
import type { ScreenRequest } from "../request.js";
import { Screen } from "../ui/Screen.js";
import { type AuthFormProps, authForm } from "./AuthForm.js";

export function SignIn({ request }: { request: ScreenRequest }) {
  const form: AuthFormProps = {
    greeting: "Welcome back!",
    action: "Sign in",
    other: { question: "No account?", link: "Create one", path: "/signup" },
  };
  const AuthForm = authForm(request.modules);
  return <Screen request={request}>{cs`<$AuthForm {...$form} />`}</Screen>;
}
