import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  cleanup,
  queries,
  queryHelpers,
  render,
  screen,
} from "@backtickjs/web-testing";

// `render` as React Testing Library's behaves: where it draws, what its
// queries read, and what `cleanup` takes away.
const paragraph = (text: string) => <p>{text}</p>;

describe("render", () => {
  it("draws into a new div in the body, and queries the body", async () => {
    const { container, baseElement, getByText } = await render(paragraph("hi"));
    assert.equal(container.parentNode, document.body);
    assert.equal(baseElement, document.body);
    assert.equal(getByText("hi").parentNode, container);
  });

  it("queries the container it was given", async () => {
    const outside = document.body.appendChild(document.createElement("p"));
    outside.textContent = "outside";
    const container = document.body.appendChild(document.createElement("div"));
    const { baseElement, queryByText } = await render(paragraph("in"), {
      container,
    });
    assert.equal(baseElement, container);
    assert.equal(queryByText("outside"), null);
    assert.ok(screen.getByText("outside"));
    outside.remove();
  });

  it("replaces what it drew on a rerender", async () => {
    const { container, rerender } = await render(paragraph("first"));
    await rerender(paragraph("second"));
    assert.equal(container.innerHTML, "<p>second</p>");
  });

  it("replaces what it drew in a container drawn into again", async () => {
    const { container } = await render(paragraph("first"));
    await render(paragraph("second"), { container });
    assert.equal(container.innerHTML, "<p>second</p>");
  });

  it("copies what the container holds into a fragment", async () => {
    const { container, asFragment } = await render(paragraph("kept"));
    const fragment = asFragment();
    container.innerHTML = "";
    assert.equal(fragment.firstChild?.textContent, "kept");
  });

  it("binds the queries it was given", async () => {
    const queryByTag = (element: HTMLElement, tag: string) =>
      element.querySelector<HTMLElement>(tag);
    const { queryByTag: bound } = await render(paragraph("tagged"), {
      queries: { ...queries, queryByTag },
    });
    assert.equal(bound("p")?.textContent, "tagged");
    assert.ok(queryHelpers);
  });

  it("leaves the container on unmount", async () => {
    const { container, unmount } = await render(paragraph("gone"));
    unmount();
    assert.equal(container.innerHTML, "");
    assert.equal(container.parentNode, document.body);
  });
});

describe("cleanup", () => {
  it("takes every drawing down and empties the body", async () => {
    await render(paragraph("one"));
    await render(paragraph("two"));
    cleanup();
    assert.equal(document.body.innerHTML, "");
  });
});
