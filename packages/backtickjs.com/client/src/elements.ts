/**
 * The tags this site answers for, beside the ones a document already has.
 *
 * `backtick` is what the schema declares. A tag with no hyphen cannot be a
 * custom element, so what a bundle writes is not what the browser registers —
 * an element name is a target's own vocabulary, and this is where the two meet.
 */
export const elements = {
  backtick: () => document.createElement("backtick-renderer"),
};
