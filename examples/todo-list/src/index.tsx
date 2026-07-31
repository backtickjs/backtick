import { serve } from "@backtickjs/web-sdk/server/node";
import { TodoList } from "./todos.js";

const routes = [
  {
    path: "/",
    html: "/index.html",
    render: () => [{ target: "#root", component: <TodoList /> }],
  },
];

const port = Number(process.env.PORT ?? 5175);
const options = { root: new URL("../public", import.meta.url).pathname };

serve(routes, options).listen(port, () => {
  console.log(`Preview on http://localhost:${port}`);
});
