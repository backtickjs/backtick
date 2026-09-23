// The one constructor the tests use, since `jsdom` ships no types of its own.
declare module "jsdom" {
  export class JSDOM {
    constructor(html: string, options?: { runScripts?: "dangerously" });
    readonly window: Window & typeof globalThis;
  }
}
