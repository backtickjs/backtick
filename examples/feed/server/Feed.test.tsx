import assert from "node:assert/strict";
import { beforeEach, it } from "node:test";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { app } from "./app.js";
import type { FeedPage } from "./Feed.js";
import { drawApp, failing, fetchBundle, requests } from "./test/drawApp.js";

beforeEach(() => {
  requests.splice(0);
  failing.clear();
});

it("draws the first page, its items and their comments from the screen alone", async () => {
  await drawApp();
  assert.ok(screen.getByText("Shipped a new screen without a store review."));
  assert.ok(screen.getByText("Sunset over the harbour"));
  assert.ok(screen.getByText("Tabs or spaces?"));
  assert.ok(screen.getByPlaceholderText("Add a comment"));
  assert.deepEqual(requests, ["GET /"]);
});

it("draws the next page's items, each from a query of its path, a GET", async () => {
  await drawApp();
  requests.splice(0);
  await userEvent.click(screen.getByText("Load more"));
  assert.ok(await screen.findByText("Launch day"));
  assert.ok(await screen.findByText("Dark mode or light?"));
  assert.ok(
    await screen.findByText(
      "Each item here is its own bundle, from its own request.",
    ),
  );
  assert.deepEqual(requests.toSorted(), [
    "GET /items/4",
    "GET /items/4/comments",
    "GET /items/5",
    "GET /items/6",
    "GET /pages/2",
  ]);
});

it("loads the next page, from the path the last one names", async () => {
  await drawApp();
  await screen.findByText("Tabs or spaces?");
  requests.splice(0);
  await userEvent.click(screen.getByText("Load more"));
  assert.ok(await screen.findByText("Launch day"));
  assert.ok(await screen.findByText("Dark mode or light?"));
  assert.deepEqual(requests.slice(0, 1), ["GET /pages/2"]);
  await userEvent.click(screen.getByText("Load more"));
  assert.ok(
    await screen.findByText("Everything below here is made up by the server."),
  );
});

it("names no next page after the last", async () => {
  const last = (await fetchBundle("/pages/67")) as FeedPage;
  assert.deepEqual(
    last.items.map((item) => item.path),
    ["/items/199", "/items/200"],
  );
  assert.equal(last.next, null);
});

it("likes on the server, and hands the count to the item as props", async () => {
  await drawApp();
  const likes = await screen.findAllByText("♡ 0");
  assert.equal(likes.length, 3);
  requests.splice(0);
  await userEvent.click(likes[1]!);
  assert.ok(await screen.findByText("♥ 1"));
  assert.ok(screen.getByText("1 liked"));
  // the like, a write, and no item fetched again
  assert.deepEqual(requests, ["POST /items/2/likes"]);
});

it("refetches the comments a comment changed", async () => {
  await drawApp();
  await userEvent.type(
    await screen.findByPlaceholderText("Add a comment"),
    "Congrats!",
  );
  requests.splice(0);
  await userEvent.click(screen.getByText("Send"));
  assert.ok(await screen.findByText("Congrats!"));
  // the comment, a write, then the list it changed, and nothing else
  assert.deepEqual(requests, [
    'POST /items/1/comments {"text":"Congrats!"}',
    "GET /items/1/comments",
  ]);
});

it("keeps an item's own state on the phone", async () => {
  await drawApp();
  await userEvent.click(await screen.findByText("Spaces"));
  assert.ok(screen.getByText("0 liked"));
});

it("refuses a write sent as a read", async () => {
  const response = await app.request("/items/1/likes");
  assert.equal(response.status, 404);
});

it("draws an item that couldn't load as its error, and the others", async () => {
  failing.add("/items/5");
  await drawApp();
  await userEvent.click(screen.getByText("Load more"));
  assert.ok(await screen.findByText("Couldn't load this item."));
  assert.ok(await screen.findByText("Dark mode or light?"));
  assert.ok(screen.getByText("Tabs or spaces?"));
});
