import { page } from "@backtickjs/web-sdk/server";
import { serve } from "@backtickjs/web-sdk/server/node";
import { TodoList } from "./todos.js";

// One request, no second trip: the list is drawn into the page that carries it.
const routes = [
  {
    path: "/",
    respond: () => {
      return page(<TodoList />);
    },
  },
];

const port = Number(process.env.PORT ?? 5175);

serve(routes).listen(port, () => {
  console.log(`Preview on http://localhost:${port}`);
});
