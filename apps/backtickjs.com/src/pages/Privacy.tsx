import { cs } from "@backtickjs/core";
import { Layout } from "../components/Layout.js";

const contact = "hello@backtickjs.com";

// The privacy policy of Backtick's app builder, which Google's sign-in screen
// and the assistants' connector listings link to.
export const Privacy = cs`() => (
  <$Layout>
    <article class="max-w-[720px] pt-12">
      <h1 class="text-[clamp(30px,4.6vw,44px)] leading-[1.1] font-bold tracking-[-0.03em]">
        Privacy policy
      </h1>
      <div class="docs-prose">
        <p>Effective October 20, 2026.</p>
        <p>
          This policy covers Backtick's app builder: the service that lets an
          assistant such as Claude or ChatGPT make apps for you, and Backtick's
          app that runs them on your phone, in Expo Go. It's run by
          Jean-François Bisson. Questions and requests go to{" "}
          <a href={"mailto:" + $contact}>{$contact}</a>.
        </p>

        <h2>What we collect</h2>
        <ul>
          <li>
            <strong>
              Your Google account's name, email address, profile picture and id
            </strong>
            , when you sign in with Google. They identify your account; we don't
            receive your Google password or anything else from your Google
            account.
          </li>
          <li>
            <strong>The apps you make</strong>: their titles and the code of
            each version an assistant saves for you.
          </li>
          <li>
            <strong>Each check of an app's code</strong>: whether it passed, the
            errors and warnings it found, and how long it took. A check that
            failed also keeps the code it checked, so we can find what went
            wrong; we delete those after 30 days.
          </li>
          <li>
            <strong>Which assistants you've connected</strong>: when you connect
            one, it registers with our sign-in service, and the access you allow
            it is recorded so you can revoke it.
          </li>
          <li>
            <strong>Request logs</strong>: our hosting keeps a short-lived log
            of requests, such as their address and time, to keep the service
            running and secure.
          </li>
        </ul>
        <p>
          We don't use cookies for tracking or advertising, and we don't sell or
          rent your information.
        </p>

        <h2>How it's used</h2>
        <p>
          Only to run the app builder: to sign you in, to check and save the
          apps your assistant makes, to show them to you on your phone, and to
          fix problems with the service.
        </p>

        <h2>Who handles it</h2>
        <ul>
          <li>
            <strong>Supabase</strong> stores your account, your apps and their
            checks, in the United States.
          </li>
          <li>
            <strong>Vercel</strong> runs the service and checks your apps' code,
            in the United States.
          </li>
          <li>
            <strong>Google</strong> signs you in.
          </li>
          <li>
            <strong>The assistant you connect</strong>, such as Claude or
            ChatGPT, reads and changes your apps on your behalf, with the access
            you allowed. What it does with your conversation is covered by its
            own policy.
          </li>
        </ul>

        <h2>Your choices</h2>
        <ul>
          <li>
            <strong>Disconnect an assistant</strong> in its settings, for
            example Claude's Settings → Connectors. It loses access to your
            apps.
          </li>
          <li>
            <strong>Delete your account and your apps</strong> by emailing{" "}
            <a href={"mailto:" + $contact}>{$contact}</a> from the address you
            signed in with. We delete them within 30 days.
          </li>
        </ul>

        <h2>Children</h2>
        <p>
          The app builder isn't meant for children under 13, and we don't
          knowingly collect their information.
        </p>

        <h2>Changes</h2>
        <p>
          If this policy changes, the new version is posted here with its
          effective date.
        </p>
      </div>
    </article>
  </$Layout>
)`;
