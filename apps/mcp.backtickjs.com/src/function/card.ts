// The card a host shows in the chat for each save: the app's title and
// version, a button that opens it on the phone, and a QR code of its link for
// a chat on a computer. An MCP App: the host renders it in a sandboxed frame
// and hands it `save_app`'s result.
import QRCode from "qrcode";

export const cardUri = "ui://backtick/app-card.html";

// ext-apps' client, self-contained, at the version package.json installs:
// the card's CSP allows this origin.
export const cardScriptOrigin = "https://cdn.jsdelivr.net";
const cardScript = `${cardScriptOrigin}/npm/@modelcontextprotocol/ext-apps@2.0.3/dist/src/app-with-deps.js`;

// What the card shows, beside what the model reads: the app's link, which
// opens the Backtick app on Android (it claims every app's host) and otherwise
// the app's page, which sends an iPhone on to Expo Go.
export type Card = {
  title: string;
  version: number;
  url: string;
  qr: string;
};

export async function card(
  id: string,
  title: string,
  version: number,
  url: string,
): Promise<Card> {
  const qr = await QRCode.toString(url, { type: "svg", margin: 0 });
  return { title, version, url, qr };
}

export const cardHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      :root {
        color-scheme: light dark;
        --text: #17201b;
        --muted: #64706a;
        --surface: #ffffff;
        --border: #dfe5e0;
        --accent: #1f7a55;
      }
      @media (prefers-color-scheme: dark) {
        :root {
          --text: #eef2ef;
          --muted: #9aa69f;
          --surface: #1b211e;
          --border: #2c3530;
        }
      }
      body {
        margin: 0;
        font:
          15px system-ui,
          sans-serif;
        color: var(--text);
        background: transparent;
      }
      .card {
        display: flex;
        gap: 16px;
        align-items: center;
        padding: 16px;
        border: 1px solid var(--border);
        border-radius: 12px;
        background: var(--surface);
      }
      .card[hidden] {
        display: none;
      }
      .text {
        flex: 1;
        min-width: 0;
        display: grid;
        gap: 4px;
      }
      .title {
        font-size: 17px;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .version {
        color: var(--muted);
      }
      button {
        justify-self: start;
        margin-top: 8px;
        padding: 10px 16px;
        border: 0;
        border-radius: 8px;
        background: var(--accent);
        color: #fff;
        font: inherit;
        font-weight: 600;
        cursor: pointer;
      }
      .qr {
        width: 96px;
        height: 96px;
        padding: 6px;
        border-radius: 8px;
        background: #fff;
        flex: none;
      }
      .qr svg {
        display: block;
        width: 100%;
        height: 100%;
      }
      @media (max-width: 420px) {
        .qr {
          display: none;
        }
      }
    </style>
  </head>
  <body>
    <div class="card" hidden>
      <div class="text">
        <div class="title"></div>
        <div class="version"></div>
        <button type="button">Open in Backtick</button>
      </div>
      <div class="qr" title="Scan with your phone's camera"></div>
    </div>
    <script type="module">
      import { App } from "${cardScript}";

      const app = new App({ name: "Backtick app card", version: "1.0.0" });
      const element = document.querySelector(".card");
      let card;
      // Only the label: the link is the same everywhere.
      const iOS = /iPhone|iPad|iPod/.test(navigator.userAgent);

      app.ontoolresult = (result) => {
        card = result.isError ? undefined : result._meta?.["backtickjs.com/card"];
        if (card === undefined) {
          element.hidden = true;
          return;
        }
        element.querySelector(".title").textContent = card.title;
        element.querySelector(".version").textContent =
          "Version " + card.version + " · published";
        element.querySelector(".qr").innerHTML = card.qr;
        element.querySelector("button").textContent = iOS
          ? "Open in Expo Go"
          : "Open in Backtick";
        element.hidden = false;
      };

      // Opened by the host itself, so going back returns to the chat.
      element.querySelector("button").addEventListener("click", async () => {
        if (card !== undefined) {
          await app.openLink({ url: card.url });
        }
      });

      await app.connect();
    </script>
  </body>
</html>
`;
