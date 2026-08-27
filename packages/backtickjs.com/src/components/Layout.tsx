import type { FragmentProps } from "@backtickjs/web-sdk/jsx-runtime";
import { logoUrl } from "../files.js";
import { REPO } from "../links.js";

// The chrome every page is drawn in. A server component: it runs while
// bundling and never reaches the client, so what it decides is settled in the
// bundle rather than asked again there.
export async function Layout({
  children,
}: {
  // Required, not optional: every page has a body, and `FragmentProps` says
  // `children?` because a fragment may hold nothing.
  children: NonNullable<FragmentProps["children"]>;
}) {
  return (
    <div class="shell">
      <header class="top">
        <a class="mark" href="/">
          {/* Sized here as well as in CSS: the two attributes are what reserves
              the space before the file arrives. */}
          <img src={logoUrl} alt="Backtick" width={152} height={21} />
        </a>
        <nav class="top-nav">
          <a href={REPO}>GitHub</a>
        </nav>
      </header>

      <main>{children}</main>

      <footer>
        <span>Built with Backtick. This page is one bundle.</span>
        <a href={REPO}>github.com/trybacktick/backtick</a>
      </footer>
    </div>
  );
}
