import type { BacktickRecord } from "./BacktickRecord.js";

/**
 * What is a value on both sides at once: data, and nothing else.
 *
 * It crosses as itself — there is nothing to lower and no form to choose —
 * which is what makes this the one type a server and a client mean the same
 * thing by. Each side's own type adds to it: the client a function, the server
 * a `Client<T>`.
 */
export type BacktickValue =
  | null
  | number
  | boolean
  | string
  | BacktickRecord
  | readonly BacktickValue[];
