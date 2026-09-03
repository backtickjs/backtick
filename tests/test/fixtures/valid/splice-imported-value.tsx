import { cs } from "@backtickjs/core";
import { NodeKind } from "@backtickjs/bundler";

// A host value that is imported and never mentioned outside a script.
//
// `NodeKind` appears once, as the `$NodeKind` splice below. That reference is
// written by the transform, and TypeScript decides whether an import is used
// before any transform runs — from the source it was handed, where the only
// mention is inside a template literal. So the import is a candidate for
// elision, and if it is elided the emitted module throws
// `NodeKind is not defined` the moment the script is bundled.
//
// What keeps it is `verbatimModuleSyntax`, which every tsconfig in this repo
// sets (`configs/tsconfig.base.json`, and each example's own). This fixture is
// here so that turning it off anywhere fails a test rather than a page: the
// `.js` snapshot beside it carries the import, and the `.bundle` snapshot
// carries the spliced value.
// A value rather than a function, so the `.value` snapshot beside this is the
// spliced numbers themselves — `Element` is 0 and `ArrayLiteralExpression` is 4.
export default cs`$NodeKind.Element + $NodeKind.ArrayLiteralExpression`;
