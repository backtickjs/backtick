import { cs } from "@backtickjs/core";
import { Layout } from "../components/Layout.js";
import { Section } from "../components/Section.js";

// Where each phone installs Backtick from, once it can: the App Store, and the
// Android APK or Google Play later. Without one, the platform says it's coming.
const iphone: string | undefined =
  "https://apps.apple.com/us/app/backtick-make-apps-with-ai/id6830867621";
const android: string | undefined = undefined;

export const Download = cs`() => (
  <$Layout>
    <$Section
      eyebrow="Download"
      title="Get Backtick on your phone."
      lede={
        <>
          Then ask your assistant for an app: it opens in Backtick, signed in
          with the same account.
        </>
      }
    >
      <ul class="grid max-w-[720px] gap-4 text-lg">
        <li>
          <strong>iPhone</strong>:{" "}
          {$iphone === undefined ? (
            "coming soon."
          ) : (
            <a href={$iphone} class="font-medium text-react">
              download on the App Store
            </a>
          )}
        </li>
        <li>
          <strong>Android</strong>:{" "}
          {$android === undefined ? (
            "coming soon."
          ) : (
            <a href={$android} class="font-medium text-react">
              download the app
            </a>
          )}
        </li>
      </ul>
    </$Section>
  </$Layout>
)`;
