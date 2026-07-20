import { cs } from "@backtickjs/core";
import type { Client, ClientObject } from "@backtickjs/core";

// A member holding an array of fragments: the script reaches through it —
// `coins` virtualizes to `number[]`, so `length` reads normally.
class Wallet implements ClientObject {
  readonly "@backtickjs" = "ClientObject";

  readonly coins: Client<number>[];

  constructor(coins: Client<number>[]) {
    this.coins = coins;
  }
}

export default cs.liftValue(cs.virtualize(cs.virtualize(cs.splice(new Wallet([cs.liftValue(1), cs.liftValue(2)]))).coins).length);
