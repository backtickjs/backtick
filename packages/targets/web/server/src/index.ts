/**
 * What a program writing a page needs, and nothing a component does.
 *
 * Apart from the schema because of what it costs: putting a bundle into a
 * document means parsing HTML, and that is a DOM written in JavaScript. A
 * component reaches for none of it, and neither does anything running in a
 * browser.
 */
export { insert } from "./insert.js";
