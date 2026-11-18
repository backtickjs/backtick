import { cs } from "@backtickjs/core";
import { Layout } from "../components/Layout.js";
import { IPHONE } from "../pages.js";

const connector = "https://mcp.backtickjs.com";
// Claude's Connectors settings, on the web.
const connectors = "https://claude.ai/customize/connectors";
const contact = "support@backtickjs.com";

// How Backtick works with Claude, what to do when it doesn't, and how to reach
// us or delete your account: what the stores' support links and the connector
// directory's documentation link (/help/, redirected here) open.
export const Support = cs`() => (
  <$Layout>
    <article class="max-w-[720px] pt-12">
      <h1 class="text-[clamp(30px,4.6vw,44px)] leading-[1.1] font-bold tracking-[-0.03em]">
        Support
      </h1>
      <div class="docs-prose">
        <h2>Make your first app</h2>
        <ol>
          <li>
            <strong>Install the Backtick app</strong> from the{" "}
            <a href={$IPHONE}>App Store</a> and sign in.
          </li>
          <li>
            <strong>Tap + New and describe your app.</strong> The first time,
            Backtick helps you connect Claude.
          </li>
          <li>
            <strong>Tap Ask Claude</strong> and send the message it opens with.
            Claude builds the app.
          </li>
          <li>
            <strong>Tap Open in Backtick</strong> in the chat, or find the app
            in Your apps.
          </li>
        </ol>

        <h2>Edit an app</h2>
        <p>
          Switch back to the Claude chat that made the app and ask for the
          change. No chat anymore? Tap ••• under the app, then Edit, describe
          the change and tap Ask Claude.
        </p>

        <h2>Connecting to Claude</h2>
        <p>
          Backtick walks you through it, but here are the steps if you're
          setting it up from a computer:
        </p>
        <ol>
          <li>
            Open <a href={$connectors}>Claude's connectors</a>.
          </li>
          <li>Choose +, then Add custom connector.</li>
          <li>
            Name it Backtick and paste{" "}
            <code class="code-chip">{$connector}</code>.
          </li>
          <li>
            Choose Continue, sign in the way you did on your phone, then choose
            Allow.
          </li>
        </ol>

        <h2>What Claude can do with Backtick</h2>
        <ul>
          <li>
            <strong>New app</strong>: start from a working app to build on.
          </li>
          <li>
            <strong>Save an app</strong>: check the code and, if it has no
            errors, save it as the app's next version.
          </li>
          <li>
            <strong>Update an app</strong>: change part of an app, then check
            and save it.
          </li>
          <li>
            <strong>Get an app</strong> and <strong>List apps</strong>: find one
            of your apps and read its code to change it.
          </li>
        </ul>
        <p>Claude can't delete your apps. You delete an app in Backtick.</p>

        <h2>Troubleshooting</h2>
        <ul>
          <li>
            <strong>The link doesn't open the app.</strong> Sign in with the
            account you connected to Claude.
          </li>
          <li>
            <strong>Claude doesn't use Backtick.</strong> In{" "}
            <a href={$connectors}>Claude's connectors</a>, make sure Backtick
            shows as connected.
          </li>
          <li>
            <strong>An app shows an error.</strong> Take a screenshot of the
            error and share it with Claude.
          </li>
          <li>
            <strong>Still stuck?</strong> Email{" "}
            <a href={"mailto:" + $contact}>{$contact}</a> from the address you
            sign in with. A screenshot helps.
          </li>
        </ul>

        <h2>Deleting your account</h2>
        <p>
          In Backtick, tap your profile photo or initial at the top right, then
          Delete account. Your apps and everything Backtick keeps for you are
          deleted right away.
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
