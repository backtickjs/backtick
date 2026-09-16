import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  cleanup,
  queries,
  queryHelpers,
  render,
  screen,
} from "@backtickjs/web-testing";
import { createSourceLoader } from "./importFixture.ts";

// `render` as React Testing Library's behaves: where it draws, what its
// queries read, and what `cleanup` takes away.
const importSource = createSourceLoader("web-testing");
const paragraph = (text: string) =>
  importSource(`export default <p>{${JSON.stringify(text)}}</p>;`);

describe("render", () => {
  it("draws into a new div in the body, and queries the body", async () => {
    const { container, baseElement, getByText } = await render(
      await paragraph("hi"),
    );
    assert.equal(container.parentNode, document.body);
    assert.equal(baseElement, document.body);
    assert.equal(getByText("hi").parentNode, container);
  });

  it("queries the container it was given", async () => {
    const outside = document.body.appendChild(document.createElement("p"));
    outside.textContent = "outside";
    const container = document.body.appendChild(document.createElement("div"));
    const { baseElement, queryByText } = await render(await paragraph("in"), {
      container,
    });
    assert.equal(baseElement, container);
    assert.equal(queryByText("outside"), null);
    assert.ok(screen.getByText("outside"));
    outside.remove();
  });

  it("replaces what it drew on a rerender", async () => {
    const { container, rerender } = await render(await paragraph("first"));
    await rerender(await paragraph("second"));
    assert.equal(container.innerHTML, "<p>second</p>");
  });

  it("replaces what it drew in a container drawn into again", async () => {
    const { container } = await render(await paragraph("first"));
    await render(await paragraph("second"), { container });
    assert.equal(container.innerHTML, "<p>second</p>");
  });

  it("copies what the container holds into a fragment", async () => {
    const { container, asFragment } = await render(await paragraph("kept"));
    const fragment = asFragment();
    container.innerHTML = "";
    assert.equal(fragment.firstChild?.textContent, "kept");
  });

  it("binds the queries it was given", async () => {
    const queryByTag = (element: HTMLElement, tag: string) =>
      element.querySelector<HTMLElement>(tag);
    const { queryByTag: bound } = await render(await paragraph("tagged"), {
      queries: { ...queries, queryByTag },
    });
    assert.equal(bound("p")?.textContent, "tagged");
    assert.ok(queryHelpers);
  });

  it("leaves the container on unmount", async () => {
    const { container, unmount } = await render(await paragraph("gone"));
    unmount();
    assert.equal(container.innerHTML, "");
    assert.equal(container.parentNode, document.body);
  });
});

describe("cleanup", () => {
  it("takes every drawing down and empties the body", async () => {
    await render(await paragraph("one"));
    await render(await paragraph("two"));
    cleanup();
    assert.equal(document.body.innerHTML, "");
  });
});
