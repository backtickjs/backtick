import { afterEach, beforeEach } from "node:test";
import { request } from "./request.js";

// The app's server as a screen's test talks to it: each path answered as
// the test says, and what each request sent, kept.
type Answer = (body: unknown) => object | { status: number; body: object };

export const sent: { path: string; body: unknown }[] = [];
const answers = new Map<string, Answer>();

/** Answers posts to `path` from now on, for this test. */
export function answer(path: string, with_: Answer) {
  answers.set(path, with_);
}

const real = globalThis.fetch;

beforeEach(() => {
  sent.length = 0;
  answers.clear();
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    if (!url.startsWith(request.origin)) return real(input, init);
    const path = url.slice(request.origin.length);
    const body =
      typeof init?.body === "string" ? JSON.parse(init.body) : "bytes";
    sent.push({ path, body });
    const answered = answers.get(path)?.(body) ?? {};
    const { status, body: json } =
      "status" in answered && "body" in answered
        ? (answered as { status: number; body: object })
        : { status: 200, body: answered };
    return new Response(JSON.stringify(json), {
      status,
      headers: { "content-type": "application/json" },
    });
  };
});

afterEach(() => {
  globalThis.fetch = real;
});
