import { serve } from "@backtickjs/web-sdk/server/node";
import { TodoList } from "./todos.js";

// One route, one bundle. The list is decided here and everything after — which
// task is done, which the filter shows, what the counter says — is answered on
// the client, so the server hears from a visitor exactly once.
const port = Number(process.env.PORT ?? 5175);

serve({ "/": () => <TodoList /> }, { title: "Backtick — todo list" }).listen(
  port,
  () => {
    console.log(`Preview on http://localhost:${port}`);
  },
);
