// A server as `backtick-dev` runs one: on `process.env.PORT`, answering what
// `answer.txt` held when it started, so only a restart changes it.
import { appendFileSync, readFileSync } from "node:fs";
import { createServer } from "node:http";
import { join } from "node:path";

const answer = readFileSync(join(process.env.DIR, "answer.txt"), "utf8");
// Each run's process, for a test to see none is left running: outside the
// folder watched, which a write would restart it for.
appendFileSync(process.env.PIDS, `${process.pid}\n`);
// Slow to stop, when asked to be: what a test closes `backtick-dev` during.
if (process.env.SLOW_STOP) {
  process.on("SIGTERM", () => {
    appendFileSync(process.env.PIDS, `${process.pid} stopping\n`);
    setTimeout(() => process.exit(0), 300);
  });
}
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
