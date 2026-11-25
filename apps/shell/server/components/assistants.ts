import { cs } from "@backtickjs/core";

// Each assistant that builds apps with Backtick, by its id, in the order the
// Assistants screen lists them: its name, the word in the name its connector
// registers with (supabase/migrations, assistants_of()), where Connect sends
// the user and the steps there, and a new chat with a prompt written in and
// not yet sent. Claude: a custom connector, as Claude's app asks for it
// (2026-10-24). ChatGPT: Backtick's page in its plugin directory
// (2026-11-24).
// A step to connect: what to do, and a value to copy if there's one.
type Step = { text: string; copy?: string };
const steps = (...all: Step[]): Step[] => all;

const table = {
  claude: {
    name: "Claude",
    registers: "claude",
    connect: "https://claude.ai/settings/connectors",
    chat: "https://claude.ai/new?q=",
    steps: steps(
      { text: "Tap +, then Add custom connector." },
      {
        text: "Name it Backtick and paste this URL:",
        copy: "https://mcp.backtickjs.com",
      },
      { text: "Sign in and allow Backtick." },
    ),
  },
  chatgpt: {
    name: "ChatGPT",
    registers: "chatgpt",
    connect:
      "https://chatgpt.com/plugins/plugin_asdk_app_6af289eab8708191b9d185133a50e7a4",
    chat: "https://chatgpt.com/?q=",
    steps: steps(
      { text: "Tap Install plugin." },
      { text: "Sign in and allow Backtick." },
    ),
  },
} satisfies Record<
  string,
  {
    name: string;
    registers: string;
    connect: string;
    chat: string;
    steps: Step[];
  }
>;

export type Assistant = keyof typeof table;

// Every assistant's id, in order.
export const assistantIds = Object.keys(table) as Assistant[];

// Whether an id from a request names an assistant.
export function isAssistant(id: string): id is Assistant {
  return Object.hasOwn(table, id);
}

// The assistant a connector registered as, by its client name, if any.
export function assistantNamed(clientName: string): Assistant | undefined {
  return assistantIds.find((id) =>
    clientName.toLowerCase().includes(table[id].registers),
  );
}

export const assistants = cs`$table`;
