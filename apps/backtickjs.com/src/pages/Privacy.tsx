import { cs } from "@backtickjs/core";
import { Layout } from "../components/Layout.js";

const contact = "support@backtickjs.com";

// What Backtick collects, as the code does: the stores' privacy forms and the
// connector directory link here, and must say the same.
export const Privacy = cs`() => (
  <$Layout>
    <article class="max-w-[720px] pt-12">
      <h1 class="text-[clamp(30px,4.6vw,44px)] leading-[1.1] font-bold tracking-[-0.03em]">
        Privacy policy
      </h1>
      <div class="docs-prose">
        <p>Effective November 5, 2026.</p>
        <p>
          This policy covers Backtick: the app on your phone, the service that
          lets an assistant such as Claude make apps for you, and the websites
          backtickjs.com and backtickjs.dev. Backtick is run by Jean-François
          Bisson. Questions and requests go to{" "}
          <a href={"mailto:" + $contact}>{$contact}</a>.
        </p>

        <h2>What we collect</h2>
        <ul>
          <li>
            <strong>Your account</strong>: your email address, and your name if
            Apple or Google gives it when you sign in with them, with your
            profile picture's link from Google. With Apple, you can hide your
            email address, and we receive a relay address instead. We never
            receive your Apple or Google password. Kept until you delete your
            account.
          </li>
          <li>
            <strong>Your phones' sessions</strong>: for each phone you sign in
            on, a key that identifies it and a sign-in token (stored only as a
            hash), with when it was created and last used. Kept until you sign
            out or delete your account.
          </li>
          <li>
            <strong>The apps you make</strong>: their titles, the code of each
            version your assistant saves, what each version is built with, and a
            preview of each app's first screen, captured on your phone when you
            open it. A preview can show what you typed in the app; only you can
            see it. Kept until you delete the app or your account.
          </li>
          <li>
            <strong>Checks of your apps' code</strong>: whether each check
            passed, the errors and warnings it found, and how long it took. A
            check that failed also keeps the code it checked, so we can find
            what went wrong; it's deleted after 30 days.
          </li>
          <li>
            <strong>The assistants you connect</strong>: when you connect one,
            it registers with our sign-in service, and the access you allow it
            is recorded so you can revoke it.
          </li>
          <li>
            <strong>Where your apps connect</strong>: when an app you made
            connects to another service, we log the app and the service's
            address, not what's sent. Kept for a short time by our hosting.
          </li>
          <li>
            <strong>Request logs</strong>: our hosting keeps short-lived logs of
            requests to our servers, such as their IP address, time and address,
            to keep the service running and secure.
          </li>
        </ul>
        <p>
          What your apps keep on your phone stays on your phone. Your apps get
          an identifier for you that's different for each app, never your email
          address or account ID. Backtick doesn't collect your contacts,
          location, photos or other phone data. An app you make can ask your
          phone for them, and what it does with them is up to the app.
        </p>

        <h2>How we use it</h2>
        <p>
          Only to run Backtick: to sign you in, to check, save and run the apps
          your assistant makes, to show them to you on your phone, to keep the
          service secure, and to fix problems with it.
        </p>
        <p>
          We don't use your apps or your data to train AI models. We don't sell
          or rent your information, and we don't share it for advertising.
        </p>

        <h2>Who handles it</h2>
        <ul>
          <li>
            <strong>Supabase</strong> stores your account, your sessions, your
            apps, their previews and their checks.
          </li>
          <li>
            <strong>Vercel</strong> runs our websites, our sign-in service, and
            the service your assistant connects to, which checks your apps'
            code.
          </li>
          <li>
            <strong>Cloudflare</strong> runs your apps' servers when you open
            them, and logs where they connect.
          </li>
          <li>
            <strong>Resend</strong> sends the codes you sign in with by email.
          </li>
          <li>
            <strong>Apple and Google</strong> sign you in, if you choose them.
          </li>
          <li>
            <strong>Expo</strong> delivers updates to the Backtick app.
          </li>
          <li>
            <strong>The assistant you connect</strong>, such as Claude, reads
            and changes your apps on your behalf, with the access you allowed.
            What it does with your conversations is covered by its own policy.
          </li>
          <li>
            <strong>Umami</strong> counts visits to our websites, without
            cookies and without identifying you. The Backtick app has no
            analytics.
          </li>
        </ul>
        <p>
          We may also disclose information when the law requires it, or to
          protect people or the service from harm.
        </p>

        <h2>Other services your apps use</h2>
        <p>
          An app you make can connect to other services, as your assistant
          writes it. What those services receive, and what they do with it, is
          covered by their own terms and policies.
        </p>

        <h2>Where it's processed</h2>
        <p>
          In the United States, where our providers store and process it.
          Cloudflare runs your apps' servers in the data center nearest you.
        </p>

        <h2>Security</h2>
        <p>
          Connections are encrypted, sign-in tokens are bound to your phone and
          stored only as hashes, and each provider holds only what it needs. No
          service is perfectly secure, and we can't guarantee that yours will
          never be exposed.
        </p>

        <h2>Your choices</h2>
        <ul>
          <li>
            <strong>Delete an app</strong> in Backtick. It disappears from
            Backtick right away, and we erase it permanently after 30 days.
          </li>
          <li>
            <strong>Delete your account</strong> in Backtick: open your account
            and choose Delete account. Your account, apps, previews, sessions
            and connected assistants are deleted right away. If you can't open
            the app, email <a href={"mailto:" + $contact}>{$contact}</a> from
            the address you sign in with. Copies in our providers' backups
            expire on their own schedule.
          </li>
          <li>
            <strong>Disconnect an assistant</strong> in its settings, for
            example Claude's Settings → Connectors. It loses access to your
            apps.
          </li>
          <li>
            <strong>Ask for a copy</strong> of your information, or to correct
            it, by emailing <a href={"mailto:" + $contact}>{$contact}</a> from
            the address you sign in with.
          </li>
        </ul>

        <h2>Children</h2>
        <p>
          Backtick isn't meant for children under 13, and we don't knowingly
          collect their information. If you think a child has given us
          information, email <a href={"mailto:" + $contact}>{$contact}</a> and
          we'll delete it.
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
