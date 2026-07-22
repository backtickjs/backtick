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

export default cs.lift(cs.value(cs.receiver(cs.receiver(cs.splice(new Wallet([cs.lift(cs.value(1)), cs.lift(cs.value(2))]))).coins).length));
