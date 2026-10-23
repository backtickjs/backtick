import { cs } from "@backtickjs/core";
import { Layout } from "../components/Layout.js";
import { Section } from "../components/Section.js";

const connector = "https://api.backtickjs.com/mcp";

// The app builder's own page: what people sign in to with Google, and the home
// page Google's sign-in screen names for it.
export const AppBuilder = cs`() => (
  <$Layout>
    <$Section
      eyebrow="The Backtick app"
      title="Ask your assistant for an app. Open it on your phone."
      lede={
        <>
          Ask Claude or ChatGPT for an app, a workout log or a packing list, and
          it builds a real one with Backtick. It runs on your phone, in the
          Backtick app, and changes each time you ask for something new.
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
          <strong>Open it in the Backtick app.</strong> Sign in with the same
          Google account, and your apps are there. The Backtick app is in
          testing on Android, coming to Google Play.
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
