import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { describe, it } from "node:test";
import { clientAsset } from "../dist/clientAsset.js";

describe("clientAsset", () => {
  it("is the client itself, and self-starting", () => {
    const { source } = clientAsset();
    assert.ok(source.includes("backtick-bundle"));
    assert.ok(source.includes("customElements"));
  });

  it("holds what it says it holds", () => {
    const { source, hash } = clientAsset();
    assert.equal(
      hash,
      createHash("sha256").update(source, "utf8").digest("hex"),
    );
  });

  it("names the url for what the client holds", () => {
    const { url, hash } = clientAsset();
    assert.equal(url, `/_backtick/client-${hash.slice(0, 16)}.js`);
  });

  it("answers where the app's urls begin", () => {
    assert.ok(clientAsset("./_backtick/").url.startsWith("./_backtick/"));
    assert.ok(clientAsset("/static/").url.startsWith("/static/"));
  });

  // A url named for its contents is what makes a year safe to promise: the two
  // are one decision, so a caller cannot take the cache-control and name the
  // file something else.
  it("promises a year, immutably", () => {
    const { headers } = clientAsset();
    assert.equal(headers["content-type"], "text/javascript");
    assert.equal(
      headers["cache-control"],
      "public, max-age=31536000, immutable",
    );
  });
});
