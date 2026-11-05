import { cs } from "@backtickjs/core";
import { Layout } from "../components/Layout.js";

const contact = "support@backtickjs.com";

// What the stores' listings link to for help.
export const Support = cs`() => (
  <$Layout>
    <article class="max-w-[720px] pt-12">
      <h1 class="text-[clamp(30px,4.6vw,44px)] leading-[1.1] font-bold tracking-[-0.03em]">
        Support
      </h1>
      <div class="docs-prose">
        <p>
          Email <a href={"mailto:" + $contact}>{$contact}</a> from the address
          you sign in with. Tell us what you were doing and what happened; a
          screenshot helps.
        </p>
        <p>
          Getting started, and what to do when something doesn't work, is in{" "}
          <a href="/help/">Help</a>.
        </p>

        <h2>Deleting your account</h2>
        <p>
          In Backtick, open your account and choose Delete account. Your apps
          and everything Backtick keeps for you are deleted right away.
        </p>
        <p>
          If you can't open the app, email{" "}
          <a href={"mailto:" + $contact}>{$contact}</a> from the address you
          sign in with, and we'll delete your account.
        </p>

        <h2>Your data</h2>
        <p>
          The <a href="/privacy/">privacy policy</a> says what Backtick
          collects, who handles it, and your choices.
        </p>
      </div>
    </article>
  </$Layout>
)`;
