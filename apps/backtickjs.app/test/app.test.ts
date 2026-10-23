import assert from "node:assert/strict";
import { afterEach, describe, it, mock } from "node:test";
import app from "../src/index.ts";

const id = "3f2a6c1e-9b4d-4e8a-a1c2-7d5e9f0b1a2c";
const modules = '{"react-native":"0.86.3"}';

afterEach(() => mock.restoreAll());

describe("an app's host", () => {
  it("hands the phone's request to the service, with its token and modules", async () => {
    const sent: { url: string; headers: Headers }[] = [];
    mock.method(globalThis, "fetch", async (url: string, init: RequestInit) => {
      sent.push({ url, headers: new Headers(init.headers) });
      return new Response("bundle", {
        headers: {
          "content-type": "text/javascript",
          "x-backtick-version": "3",
        },
      });
    });
    const answer = await app.request(`https://${id}.backtickjs.app/day`, {
      headers: { authorization: "Bearer token", "x-backtick-modules": modules },
    });
    assert.equal(answer.status, 200);
    assert.equal(await answer.text(), "bundle");
    assert.equal(answer.headers.get("x-backtick-version"), "3");
    assert.equal(sent[0].url, `https://api.backtickjs.com/apps/${id}/bundle`);
    assert.equal(sent[0].headers.get("authorization"), "Bearer token");
    assert.equal(sent[0].headers.get("x-backtick-modules"), modules);
  });

  it("passes the service's refusal on", async () => {
    mock.method(
      globalThis,
      "fetch",
      async () => new Response("no", { status: 401 }),
    );
    const answer = await app.request(`https://${id}.backtickjs.app/`, {
      headers: { "x-backtick-modules": modules },
    });
    assert.equal(answer.status, 401);
  });

  it("offers a browser the app in Expo Go, at the same path", async () => {
    const page = await app.request(`https://${id}.backtickjs.app/talks/42?x=1`);
    assert.equal(page.status, 200);
    assert.match(
      await page.text(),
      new RegExp(
        `href="exp://u\\.expo\\.dev/[0-9a-f-]+/--/${id}/talks/42\\?x=1&amp;channel-name=production"`,
      ),
    );
  });
});

describe("the bare domain", () => {
  it("sends people to the website", async () => {
    const answer = await app.request("https://backtickjs.app/");
    assert.equal(answer.status, 302);
    assert.equal(answer.headers.get("location"), "https://backtickjs.com");
  });

  it("isn't an app at a host that isn't one", async () => {
    const answer = await app.request("https://www.backtickjs.app/");
    assert.equal(answer.status, 302);
  });
});
