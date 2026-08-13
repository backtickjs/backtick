/**
 * What a node may be given when one is built, and what one carries.
 *
 * One key, because it is all any two nodes have in common: what a generator
 * writes a doc comment from, and what JSON Schema already calls it. Declared
 * rather than left off and dug back out of the built node — what a node may
 * carry is a closed list here, so there is nothing to dig for.
 */
export interface TSchemaOptions {
  readonly description?: string;
}
