import { cs } from "@backtickjs/core";
import { Layout } from "../components/Layout.js";

const contact = "support@backtickjs.com";

// The terms for Backtick's app and service, which the stores' listings and
// the connector directory link to.
export const Terms = cs`() => (
  <$Layout>
    <article class="max-w-[720px] pt-12">
      <h1 class="text-[clamp(30px,4.6vw,44px)] leading-[1.1] font-bold tracking-[-0.03em]">
        Terms of service
      </h1>
      <div class="docs-prose">
        <p>Effective November 5, 2026.</p>
        <p>
          These terms cover Backtick: the app on your phone, and the service
          that lets an assistant such as Claude make apps for you. Backtick is
          run by Jean-François Bisson. By using it, you agree to these terms.
          Questions go to <a href={"mailto:" + $contact}>{$contact}</a>.
        </p>

        <h2>Your account</h2>
        <p>
          You sign in with Apple, Google or your email address. Keep access to
          it safe: what's done with your account is your responsibility. You
          must be at least 13 to use Backtick.
        </p>

        <h2>Your apps</h2>
        <p>
          The apps made for you are yours. You give Backtick permission to store
          them, check them, and run them for you, only to provide the service.
          You're responsible for what your apps do and contain, even when an
          assistant wrote them.
        </p>

        <h2>What you may not do</h2>
        <ul>
          <li>Make apps that break the law or harm others.</li>
          <li>
            Use Backtick to send spam, attack other services, or collect other
            people's information without their permission.
          </li>
          <li>
            Try to get around Backtick's limits, reach other people's apps or
            data, or disrupt the service.
          </li>
        </ul>
        <p>We may remove an app or close an account that breaks these terms.</p>

        <h2>Assistants</h2>
        <p>
          The assistant you connect, such as Claude, works under its own
          provider's terms. What it writes can be wrong: check that your apps do
          what you expect.
        </p>

        <h2>The service</h2>
        <p>
          Backtick is new and changing. Features may change or stop, and the
          service may be unavailable at times. It's provided as is, without
          warranties of any kind, to the extent the law allows. To the extent
          the law allows, Backtick isn't liable for indirect or consequential
          losses, or for lost data, from using it.
        </p>

        <h2>Ending</h2>
        <p>
          You can stop using Backtick and delete your account at any time, in
          the app. We may end the service, with notice where we can.
        </p>

        <h2>Changes</h2>
        <p>
          If these terms change, the new version is posted here with its
          effective date. Using Backtick after that means you accept them.
        </p>
      </div>
    </article>
  </$Layout>
)`;
