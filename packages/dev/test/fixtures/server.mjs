// A server as `backtick-dev` runs one: on `process.env.PORT`, answering what
// `answer.txt` held when it started, so only a restart changes it.
import { readFileSync } from "node:fs";
import { createServer } from "node:http";
import { join } from "node:path";

const answer = readFileSync(join(process.env.DIR, "answer.txt"), "utf8");
if (answer === "fail") {
  console.error("Failed to start.");
  process.exit(1);
}
createServer((request, response) => {
  if (request.url === "/crash") {
    console.error("Crashed.");
    process.exit(1);
  }
  console.log(`Answered ${request.url}.`);
  response.end(`${answer} ${request.headers.host} ${request.url}`);
}).listen(Number(process.env.PORT));
