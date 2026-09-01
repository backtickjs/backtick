import type { BacktickValue } from "./BacktickValue.js";
import type { ClientRecord } from "./ClientRecord.js";
import type { ServerRecord } from "./ServerRecord.js";

export interface BacktickRecord extends ClientRecord, ServerRecord {
  readonly [key: string]: BacktickValue;
}
