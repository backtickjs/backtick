import { cs } from "@backtickjs/core";
import { Doom } from "./Doom.js";
import { readLevels } from "./levels.js";
import type { Stats } from "./World.js";

// A server component: the levels and the loadout are read here, on your
// server, at every request, and reach the phone as plain values. The game that
// plays them is a client component, which runs on the phone.
export async function Game() {
  const levels = readLevels();
  const start: Stats = { health: 100, ammo: 24, kills: 0, shots: 0, wounds: 0 };
  return cs`<$Doom levels={$levels} start={$start} />`;
}
