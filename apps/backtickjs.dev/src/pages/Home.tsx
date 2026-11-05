import { cs } from "@backtickjs/core";
import { AppSizeVisual } from "../components/AppSize.js";
import { BehaviourIncludedVisual } from "../components/BehaviourIncluded.js";
import { Button } from "../components/Button.js";
import { DeveloperExperienceVisual } from "../components/DeveloperExperience.js";
import { Hero } from "../components/Hero.js";
import { Layout } from "../components/Layout.js";
import { LiveDemo } from "../components/LiveDemo.js";
import { NoVersionSkewVisual } from "../components/NoVersionSkew.js";
import { PersonalizedVisual } from "../components/Personalized.js";
import { QuickStart } from "../components/QuickStart.js";
import { Section } from "../components/Section.js";
import { TradeOffsVisual } from "../components/TradeOffs.js";

export const Home = cs`() => (
  <$Layout>
    <$Hero />

    <$Section
      eyebrow="Live demo"
      title="One app build. Every change from your server."
    >
      <$LiveDemo />
    </$Section>

    <$Section
      eyebrow="Behaviour included"
      title="Most apps download data. Yours downloads whole screens."
      lede="Buttons, state and what happens on a tap come from your server too, as React Native components. A new interaction reaches your users the next time they open the screen."
    >
      <$BehaviourIncludedVisual />
    </$Section>

    <$Section
      eyebrow="Personalized"
      title="Every user gets a screen made for them."
      lede="Your server decides what each person sees on each request, and sends only that. Code for other roles, plans and markets never reaches their phone."
    >
      <$PersonalizedVisual />
    </$Section>

    <$Section
      eyebrow="Developer experience"
      title="Less code to write, and fewer bugs to ship."
      lede="A screen is one file: the data it reads, the client code it sends and the types between them, written like the React Native you already know. Writes are still a fetch to your own routes."
    >
      <$DeveloperExperienceVisual />
    </$Section>

    <$Section
      eyebrow="No version skew"
      title="New features reach old app builds."
      lede="Each screen arrives with the code that reads its data, so it runs on any build of your app that has the packages it uses. No waiting for users to update, and no old data formats to keep alive."
    >
      <$NoVersionSkewVisual />
    </$Section>

    <$Section
      eyebrow="App size"
      title="Your app stays small as your product grows."
      lede="Each new screen lives on your server, not in the app your users install."
    >
      <$AppSizeVisual />
    </$Section>

    <$Section
      eyebrow="Trade-offs"
      title="Your app is the shell. Your server is everything else."
      lede="The app ships React Native, your native modules and the Backtick client. A few things still belong there."
    >
      <$TradeOffsVisual />
    </$Section>

    <$Section
      eyebrow="Get started"
      title="Move one screen to your server today."
    >
      <div class="flex flex-wrap gap-3">
        <$QuickStart />
        <$Button href="/docs/" label="Read the docs" event="read-docs" />
      </div>
    </$Section>
  </$Layout>
)`;
