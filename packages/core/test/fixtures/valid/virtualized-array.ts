import { cs } from "@backtickjs/core";
import type { Client, ClientObject } from "@backtickjs/core/cs-runtime";

// A member holding an array of fragments: the script reaches through it —
// `coins` virtualizes to `number[]`, so `length` reads normally.
class Wallet implements ClientObject {
  readonly "@backtickjs" = "ClientObject";

  readonly coins: Client<number>[];

  constructor(coins: Client<number>[]) {
    this.coins = coins;
  }
}

export default cs`${new Wallet([cs`1`, cs`2`])}.coins.length`;
