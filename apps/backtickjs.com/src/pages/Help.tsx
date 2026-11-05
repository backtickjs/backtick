import { cs } from "@backtickjs/core";
import { Layout } from "../components/Layout.js";

const connector = "https://mcp.backtickjs.com";
const contact = "support@backtickjs.com";

// How Backtick works with Claude, and what to do when it doesn't: the
// connector directory's documentation link.
export const Help = cs`() => (
  <$Layout>
    <article class="max-w-[720px] pt-12">
      <h1 class="text-[clamp(30px,4.6vw,44px)] leading-[1.1] font-bold tracking-[-0.03em]">
        Help
      </h1>
      <div class="docs-prose">
        <p>
          Backtick builds native apps with AI, all from your phone. You ask
          Claude for an app, and it runs on your phone in the Backtick app. Only
          you can open the apps you make.
        </p>

        <h2>Getting started</h2>
        <ol>
          <li>
            <strong>Get the Backtick app</strong> on your phone (
            <a href="/download/">download</a>), and sign in with Apple, Google
            or your email.
          </li>
          <li>
            <strong>Connect Backtick to Claude.</strong> In Claude, open
            Settings → Connectors, choose Add custom connector, and enter{" "}
            <code class="code-chip">{$connector}</code>. Sign in with the same
            account as on your phone, and allow Claude to use Backtick.
          </li>
          <li>
            <strong>Ask Claude for an app</strong>, such as "Make me a tip
            calculator app for my phone." Claude writes it, Backtick checks and
            saves it, and Claude gives you its link.
          </li>
          <li>
            <strong>Open it on your phone.</strong> It's on the Backtick app's
            home, and its link opens it too.
          </li>
        </ol>

        <h2>Things to ask</h2>
        <ul>
          <li>"Make me a tip calculator app for my phone."</li>
          <li>
            "Build a habit tracker app with a checklist for today and a streak
            count."
          </li>
          <li>
            "Show me my Backtick apps, then add a dark mode to the most recent
            one."
          </li>
        </ul>
        <p>
          Each change Claude saves is a new version of the app. Your phone opens
          the latest one.
        </p>

        <h2>What Claude can do with Backtick</h2>
        <ul>
          <li>
            <strong>Start an app</strong>: gives Claude a working app to build
            from. It saves nothing.
          </li>
          <li>
            <strong>Save an app</strong>: checks the app's code and, if it has
            no errors, saves it as the app's next version. The first save
            creates the app.
          </li>
          <li>
            <strong>Update an app</strong>: changes part of an app's code, then
            checks and saves it the same way.
          </li>
          <li>
            <strong>Get an app</strong>: reads an app's latest code, to change
            it.
          </li>
          <li>
            <strong>List apps</strong>: your apps, last saved first.
          </li>
        </ul>
        <p>
          Claude can't delete your apps. You delete an app in the Backtick app.
        </p>

        <h2>Troubleshooting</h2>
        <ul>
          <li>
            <strong>The link doesn't open the app.</strong> Install Backtick and
            sign in with the account you connected to Claude: an app opens only
            for the account that made it. On a computer, the link shows a code
            to scan with your phone.
          </li>
          <li>
            <strong>Claude says a save failed.</strong> Backtick checks every
            save and tells Claude what to fix. Ask Claude to fix it and save
            again. If the check didn't finish, ask it to try again.
          </li>
          <li>
            <strong>Claude doesn't use Backtick.</strong> Say you want the app
            on your phone, or with Backtick, and check that Backtick is turned
            on in the chat's connectors.
          </li>
          <li>
            <strong>An app shows an error on your phone.</strong> Tell Claude
            what you see, with a screenshot if you can, and ask it to fix the
            app.
          </li>
        </ul>

        <h2>Disconnecting</h2>
        <p>
          In Claude, open Settings → Connectors and disconnect Backtick. Claude
          loses access to your apps, and your apps stay in Backtick. To delete
          them or your account, see <a href="/support/">Support</a>.
        </p>

        <h2>Still stuck?</h2>
        <p>
          Email <a href={"mailto:" + $contact}>{$contact}</a> from the address
          you sign in with.
        </p>
      </div>
    </article>
  </$Layout>
)`;
