import { cs } from "@backtickjs/core";

// What a React Native developer asks first, answered in a sentence or two,
// including what Backtick doesn't do.
const QUESTIONS = [
  {
    question: "Isn't this EAS Update?",
    answer:
      "EAS Update ships your whole JavaScript bundle to everyone on a" +
      " channel. Backtick ships one screen per request, built for that user" +
      " with their data. They work together: EAS Update for the app," +
      " Backtick for its screens.",
  },
  {
    question: "Doesn't Expo Router have server components?",
    answer:
      "It renders on the server, but its client components must already be" +
      " in the installed app. Backtick ships them with the screen, so new" +
      " interactive code needs no release either.",
  },
  {
    question: "Do I have to rewrite my app?",
    answer:
      "No. <Backtick> is one component, under 1 KB: put it where you want a" +
      " server screen or an embedded component. Your navigation, auth and" +
      " native modules stay as they are.",
  },
  {
    question: "Does it work offline?",
    answer:
      "A server screen needs a network. Keep offline-critical screens in" +
      " plain React Native, or fall back to one when the server can't be" +
      " reached.",
  },
  {
    question: "Can a screen use any package?",
    answer:
      "Any package your app already ships. New native code still needs a" +
      " store release, as it does with any over-the-air update.",
  },
  {
    question: "Does it work on the web?",
    answer:
      "Yes. Backtick also has adapters for React and Solid, with the same" +
      " server components and inline client code. This site is built with" +
      " the Solid one.",
  },
  {
    question: "What doesn't it do yet?",
    answer:
      "Screens arrive whole, without streaming. Only plain data crosses to" +
      " the client, not server functions. Bundles aren't signed.",
  },
];

export async function Questions() {
  return cs`(
    <dl class="grid gap-x-12 gap-y-8 md:grid-cols-2">
      {$QUESTIONS.map((item) => (
        <div class="grid content-start gap-1.5">
          <dt class="text-lg font-bold tracking-[-0.01em]">{item.question}</dt>
          <dd class="m-0 text-[15.5px] text-muted">{item.answer}</dd>
        </div>
      ))}
    </dl>
  )`;
}
