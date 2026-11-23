// Writes `build/modules.json`, the module map's modules at their versions, for
// `shell/modules`: data for servers that check apps against the phone, which
// can't import `shell/backtick` (deploying it would bundle the phone's packages).
import { writeFileSync } from "node:fs";
import { backtick } from "../build/client/backtick.js";

writeFileSync(
  new URL("../build/modules.json", import.meta.url),
  JSON.stringify(backtick.modules, null, 2) + "\n",
);
