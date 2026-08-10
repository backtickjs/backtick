import { Page } from "./Page.js";

// An ordinary server component. Nothing about it knows which path reached it,
// or which client asked — that is the router's business, and the same page
// answers a browser and a phone.
export async function Home() {
  return (
    <Page title="Backtick">
      <p style="margin: 0; font-size: 16px">Three routes, one bundle each.</p>
      <a href="/counter" style="font-size: 16px; color: royalblue">
        Counter
      </a>
      <a href="/about" style="font-size: 16px; color: royalblue">
        About
      </a>
    </Page>
  );
}
