import { cs } from "@backtickjs/core";
import { Layout } from "../components/Layout.js";
import { Section } from "../components/Section.js";

export const NotFound = cs`() => (
  <$Layout>
    <$Section
      eyebrow="404"
      title="This page doesn't exist."
      lede={
        <>
          It may have moved, or the link may be wrong. Start from the{" "}
          <a href="/" class="font-medium text-react">
            home page
          </a>{" "}
          or{" "}
          <a href="/support/" class="font-medium text-react">
            support
          </a>
          .
        </>
      }
    />
  </$Layout>
)`;
