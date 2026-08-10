import { Page } from "./Page.js";

// Built per request, so what it reports is the moment it was asked for — the
// simplest demonstration that a page is a function, not a constant.
export async function About({ started }: { started: Date }) {
  const uptime = Math.round((Date.now() - started.getTime()) / 1000);
  return (
    <Page title="About">
      <p style="margin: 0; font-size: 16px">
        Rendered on the server, drawn by the client.
      </p>
      <p style="margin: 0; font-size: 16px">{`Server up ${uptime}s.`}</p>
      <a href="/" style="font-size: 16px; color: royalblue">
        Home
      </a>
    </Page>
  );
}
