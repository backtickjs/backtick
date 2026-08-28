/**
 * One file the reader can edit, and what is in it.
 *
 * A name as well as the text, because the editor says which file it is showing
 * — and because a playground that only ever holds one file is a playground that
 * cannot show a component being used from the file beside it.
 */
export interface Source {
  readonly name: string;
  readonly source: string;
}
