import { readFile } from "node:fs/promises";
import { bundler } from "@backtickjs/core";
import { Caption } from "../components/Caption.js";
import { Code } from "../components/Code.js";
import { Counter } from "../components/Counter.js";
import { Hero } from "../components/Hero.js";
import { Lede } from "../components/Lede.js";
import { Note } from "../components/Note.js";
import { Section } from "../components/Section.js";
import { Step, Steps } from "../components/Steps.js";

const HOST = `interface RendererOptions<NodeType> {
  createElement(tag: string): NodeType;
  createTextNode(value: string): NodeType;
  replaceText(textNode: NodeType, value: string): void;
  isTextNode(node: NodeType): boolean;
  setProperty<T>(node: NodeType, name: string, value: T, prev?: T): void;
  insertNode(parent: NodeType, node: NodeType, anchor?: NodeType): void;
  removeNode(parent: NodeType, node: NodeType): void;
  getParentNode(node: NodeType): NodeType | undefined;
  getFirstChild(node: NodeType): NodeType | undefined;
  getNextSibling(node: NodeType): NodeType | undefined;
}`;

export async function Home() {
  const source = await readFile(
    new URL("../../src/components/Counter.tsx", import.meta.url),
    "utf8",
  );
  const wire = JSON.stringify(await bundler.run(<Counter start={0} />));

  return (
    <>
      <Hero
        standfirst={
          "Backtick is a server-driven UI framework: your app fetches screens" +
          " and their behavior at runtime. No app to build, no release to wait" +
          " on, no update to install."
        }
      />

      <Section title="How it works" id="how">
        <Steps>
          <Step ordinal="01" title="Write a screen">
            An ordinary TypeScript component. The half inside a `cs` template
            runs on the client; everything around it runs on your server and
            never ships.
          </Step>
          <Step ordinal="02" title="Compile it to data">
            `bundler.run` returns JSON — no JavaScript in it, nothing to
            evaluate. Serve it from any endpoint you already have.
          </Step>
          <Step ordinal="03" title="Your app draws it">
            An interpreter inside your binary reads the bundle and builds real
            native views. Serve different bytes and the screen is different, for
            every user, at once.
          </Step>
        </Steps>
        <Note>
          If you have used React Server Components, you already know half of
          this. An RSC payload is data rather than JavaScript, and a server
          component's code never reaches the browser — but the moment something
          needs to be interactive it becomes a client component and ships as a
          bundle. Backtick draws the line further along: the interactive half is
          data too, so what your app carries is one interpreter rather than one
          interpreter and a bundle per screen.
        </Note>
      </Section>

      <Section title="Why now">
        <Lede>
          Writing a screen used to be the expensive part of shipping one. It is
          not any more — and nothing about releasing one got faster.
        </Lede>
        <p>
          A team can now produce a week of screens in an afternoon and still
          ship them at the rate review and adoption allow. The speedup lands
          entirely in the part of the loop that was never the constraint, so
          what it buys on mobile is a longer queue of work users cannot see. Web
          teams got the whole benefit, because for them deploying is seconds.
          Backtick is how mobile gets it.
        </p>
        <Note>
          And because a screen is data rather than code, shipping something a
          model wrote does not mean running what a model wrote on someone's
          phone. There is no eval and no ambient globals — the interpreter
          answers only for the names your app hands it.
        </Note>
      </Section>

      <Section title="It is not a webview">
        <Lede>
          A target is ten functions. That is the entire contract between
          Backtick and a platform — implement these against UIKit or Jetpack
          Compose and you have real native views, not a browser pretending.
        </Lede>
        <Code source={HOST} />
        <Caption>
          The web target implements them in 92 lines. That number is why a new
          platform is a port and not a rewrite.
        </Caption>
      </Section>

      <Section title="Apple allows this">
        <Lede>
          Guideline 2.5.2 is about downloading and executing code. A bundle is
          not code.
        </Lede>
        <Note>
          There is no eval, no ambient globals, and the interpreter answers only
          for a closed table of names your app hands it. A screen is content —
          the same category as the JSON your API already returns, or the remote
          config nearly every app on the store ships with. The interpreter that
          draws it was reviewed with your binary.
        </Note>
      </Section>

      <Section title="What actually ships">
        <Lede>
          This page is a Backtick bundle — no stylesheet, no framework
          JavaScript, drawn by one 10 KB client. The counter below is the same
          machinery a screen in your app would use.
        </Lede>

        <Counter start={0} />

        <Caption>The component:</Caption>
        <Code source={source.trim()} />

        <Caption>
          {"And everything a client needs to draw it — " +
            wire.length +
            " bytes of JSON, verbatim:"}
        </Caption>
        <Code source={wire} wrap />
      </Section>

      <Section title="Where it is">
        <Lede>
          The compiler, the wire format and the web client are built and
          working. The iOS interpreter is next, and it is those ten functions
          against UIKit.
        </Lede>
        <Note>
          The format is already versioned for the part that matters: kind
          numbers are never reused and slots never reordered, so a client frozen
          inside a binary a user installed last year still reads a bundle built
          today. That is the hard problem in server-driven UI, and it was
          designed for before there was a second client to need it.
        </Note>
      </Section>
    </>
  );
}
