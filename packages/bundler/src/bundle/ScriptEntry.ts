import type { ClientScriptBody, SourceLocation } from "@backtickjs/boundary";

/**
 * One `functions` entry: a client script's body, compiled once for every place
 * that references it.
 *
 * The distinction this name carries is the entry against the reference. Two
 * scripts written at one source location are one entry — that is what
 * `entryFor` interns by — while what each place passes it is the reference's,
 * and travels as arguments. An entry is compiled from its own script and
 * nothing else, which is what lets a second call site appearing later in a
 * render leave the first one's compilation alone.
 *
 * `splices` is the hole order, so the entry's parameters and a reference's
 * arguments line up positionally without either side reading the other.
 */
/** One hole, named rather than valued: the entry holds the order, not the arguments. */
export interface EntrySplice {
  readonly key: string;
  readonly params: readonly string[];
}

export interface ScriptEntry {
  readonly loc: SourceLocation;
  readonly fileHash: string;
  readonly splices: readonly EntrySplice[];
  readonly captures: readonly string[];
  readonly body: ClientScriptBody;
}
