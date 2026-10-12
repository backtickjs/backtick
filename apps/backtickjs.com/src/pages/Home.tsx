import { cs } from "@backtickjs/core";
import { AppSizeVisual } from "../components/AppSize.js";
import { Button } from "../components/Button.js";
import { DataVisual } from "../components/Data.js";
import { DeployDemo } from "../components/DeployDemo.js";
import { Hero } from "../components/Hero.js";
import { LayersVisual } from "../components/Layers.js";
import { Layout } from "../components/Layout.js";
import { LimitsVisual } from "../components/Limits.js";
import { OneDeployVisual } from "../components/OneDeploy.js";
import { PerUserVisual } from "../components/PerUser.js";
import { QuickStart } from "../components/QuickStart.js";
import { Section } from "../components/Section.js";

export const Home = cs`() => (
  <$Layout>
    <$Hero />

    <$Section
      eyebrow="See it in action"
      title="One app build. Every change from your server."
    >
      <$DeployDemo />
    </$Section>

    <$Section
      eyebrow="Server-driven"
      title="Most apps download data. Yours downloads whole screens."
      lede="Buttons, state and what happens on a tap come from your server too, as React Native components. A new interaction reaches your users the next time they open the screen."
    >
      <$LayersVisual />
    </$Section>

    <$Section
      eyebrow="Per user"
      title="Every user gets a screen made for them."
      lede="Your server decides what each person sees on each request, and sends only that. Code for other roles, plans and markets never reaches their phone."
    >
      <$PerUserVisual />
    </$Section>

    <$Section
      eyebrow="Data"
      title="Your server fetches the data, directly and securely."
      lede="The component queries your database, calls APIs and reads environment variables, on your server. No API routes, no client state for server data, no network waterfalls."
    >
      <$DataVisual />
    </$Section>

    <$Section
      eyebrow="Updates"
      title="Your users always see your latest changes."
      lede="Each change is one server deploy, with no API or app release to coordinate."
    >
      <$OneDeployVisual />
    </$Section>

    <$Section
      eyebrow="App size"
      title="Your app stays small as your product grows."
      lede="Each new screen lives on your server, not in the app your users install."
    >
      <$AppSizeVisual />
    </$Section>

    <$Section
      eyebrow="What stays in the app"
      title="Your app is the shell. Your server is everything else."
      lede="The app ships React Native, your native modules and the Backtick client. A few things still belong there."
    >
      <$LimitsVisual />
    </$Section>

    <$Section
      eyebrow="Get started"
      title="Move one screen to your server today."
    >
      <div class="flex flex-wrap gap-3">
        <$QuickStart />
        <$Button href="/docs" solid label="Read the docs" event="read-docs" />
      </div>
    </$Section>
  </$Layout>
)`;
