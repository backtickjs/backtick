import { Hero } from "../components/Hero.js";
import { Layout } from "../components/Layout.js";

export async function Home() {
  return (
    <Layout>
      <Hero
        standfirst={
          "Backtick is a server-driven UI framework: your app fetches screens" +
          " and their behavior at runtime. No app to build, no release to wait" +
          " on, no update to install."
        }
      />
    </Layout>
  );
}
