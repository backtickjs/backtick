// The reusable language-service layer: proxying a `ts.LanguageService` to
// surface Backtick's own diagnostics and to unmangle the mangled identifiers
// that leak out of the compiled embedded code. Consumed by the TypeScript
// server plugin (editors) and by `backtick-tsc` (command line) alike.
export { decorateLanguageService } from "./decorateLanguageService.js";
export { getBacktickDiagnostics } from "./getBacktickDiagnostics.js";
export { unmangleDiagnostic } from "./unmangleDiagnostics.js";
