import { cs } from "@backtickjs/core";
import { Layout } from "../components/Layout.js";
import { Section } from "../components/Section.js";

// Where each phone installs Backtick from, once it can: TestFlight's public
// link and the Android APK for now, the App Store and Google Play later.
// Without one, the platform says it's coming.
const iphone: string | undefined = undefined;
const android: string | undefined = undefined;

export const Download = cs`() => (
  <$Layout>
    <$Section
      eyebrow="Download"
      title="Get Backtick on your phone."
      lede={
        <>
          Then ask Claude for an app: it opens in Backtick, signed in with the
          same account.
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
              install with TestFlight
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
