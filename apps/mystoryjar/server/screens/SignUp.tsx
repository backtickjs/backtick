import { cs } from "@backtickjs/core";
import type { ScreenRequest } from "../request.js";
import { Screen } from "../ui/Screen.js";
import { AuthForm, type AuthFormProps } from "./AuthForm.js";

export function SignUp({ request }: { request: ScreenRequest }) {
  const form: AuthFormProps = {
    greeting: "Welcome!",
    action: "Sign up",
    other: {
      question: "Already have an account?",
      link: "Sign in",
      path: "/signin",
    },
  };
  return <Screen request={request}>{cs`<$AuthForm {...$form} />`}</Screen>;
}
