/**
 * What a program writing a page needs, and nothing a component does.
 *
 * A bundle becomes a string here, and where that string goes is the page's own
 * business — so nothing in this package reads HTML, and a program that writes a
 * document by any means at all can carry a drawing in it.
 */
export { island } from "./island.js";
