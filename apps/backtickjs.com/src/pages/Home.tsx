import { cs } from "@backtickjs/core";
import { CLIENT_SCRIPT_SYNTAX, InlineCode } from "../components/Code.js";
import { DeployDemo } from "../components/DeployDemo.js";
import { Hero } from "../components/Hero.js";
import { HowItWorks } from "../components/HowItWorks.js";
import { Layout } from "../components/Layout.js";
import { Questions } from "../components/Questions.js";
import { Section } from "../components/Section.js";

export const Home = cs`() => (
  <$Layout>
    <$Hero />

    <$Section
      eyebrow="Demo"
      title="Your server deploy is the release."
      lede="Like a web page, users get your changes the next time they open the screen, client components included. Rolling back is another deploy."
    >
      <$DeployDemo />
    </$Section>

    <$Section
      id="how"
      eyebrow="How it works"
      title="Compiled once. Bundled per request."
      lede={
        <>
          Your client scripts <$InlineCode line={$CLIENT_SCRIPT_SYNTAX} /> are
          type-checked and formatted like the rest of your code, then compiled
          at build time. On each request, your server components run and decide
          what the screen shows, and the bundler combines that data with the
          compiled scripts into one JavaScript file.
        </>
      }
    >
      <$HowItWorks />
    </$Section>

    <$Section eyebrow="Questions" title="What you're probably wondering.">
      <$Questions />
    </$Section>
  </$Layout>
)`;
