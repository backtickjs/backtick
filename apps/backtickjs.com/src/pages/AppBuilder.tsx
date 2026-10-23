import { cs } from "@backtickjs/core";
import { Layout } from "../components/Layout.js";
import { Section } from "../components/Section.js";

const connector = "https://api.backtickjs.com/mcp";
// Backtick's shell, published with EAS Update: Expo Go opens it.
const shell =
  "exp://u.expo.dev/baed8ee5-a651-438c-999f-aff346fa0064?channel-name=production";

// The app builder's own page: what people sign in to with Google, and the home
// page Google's sign-in screen names for it.
export const AppBuilder = cs`() => (
  <$Layout>
    <$Section
      eyebrow="Backtick for your phone"
      title="Ask your assistant for an app. Open it on your phone."
      lede={
        <>
          Ask Claude or ChatGPT for an app, a workout log or a packing list, and
          it builds a real one with Backtick. It runs natively on your phone, in
          Expo Go, and changes each time you ask for something new.
        </>
      }
    />

    <$Section eyebrow="How it works" title="Three steps.">
      <ol class="grid max-w-[720px] list-decimal gap-4 pl-6 text-lg">
        <li>
          <strong>Connect Backtick to your assistant.</strong> In Claude,
          Settings → Connectors → Add custom connector, with the URL{" "}
          <code class="code-chip">{$connector}</code>, then sign in with Google.
        </li>
        <li>
          <strong>Ask for an app.</strong> Describe what you want; your
          assistant writes it, and Backtick checks and saves each version.
        </li>
        <li>
          <strong>Open it in Expo Go.</strong> Get Expo Go from the{" "}
          <a href="https://apps.apple.com/app/expo-go/id982107779">App Store</a>{" "}
          or{" "}
          <a href="https://play.google.com/store/apps/details?id=host.exp.exponent">
            Google Play
          </a>
          , then, on your phone,{" "}
          <a href={$shell} class="font-medium text-react">
            open Backtick
          </a>{" "}
          and sign in with the same Google account: your apps are there. Each
          app's link, from your assistant, opens it too.
        </li>
      </ol>
    </$Section>

    <$Section
      eyebrow="Your data"
      title="Your apps are yours."
      lede={
        <>
          Backtick keeps what it needs to run your apps for you, and doesn't
          sell or share it for advertising. The{" "}
          <a href="/privacy/" class="font-medium text-react">
            privacy policy
          </a>{" "}
          says exactly what's collected, who handles it, and how to delete it.
        </>
      }
    />
  </$Layout>
)`;
