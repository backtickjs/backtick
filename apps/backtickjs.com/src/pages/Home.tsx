import { cs } from "@backtickjs/core";
import { DataVisual } from "../components/Data.js";
import { DeployDemo } from "../components/DeployDemo.js";
import { AppSizeVisual } from "../components/AppSize.js";
import { Hero } from "../components/Hero.js";
import { Layout } from "../components/Layout.js";
import { OneDeployVisual } from "../components/OneDeploy.js";
import { Section } from "../components/Section.js";

export const Home = cs`() => (
  <$Layout>
    <$Hero />

    <$Section eyebrow="See it in action">
      <$DeployDemo />
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
  </$Layout>
)`;
