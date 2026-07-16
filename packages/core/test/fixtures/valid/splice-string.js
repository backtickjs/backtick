import { cs } from "@backtickjs/core";
// A runtime string splice inlines as itself — quotes, newlines, and
// backslashes intact.
const value = 'say "hi"\n\\done';
export default cs.create([7, 16, 7, 28], { filePath: "splice-string.ts", fileHash: "3ia4c6zotubna", splices: { $0splice0: value }, captures: [], declarations: [] }, v => v.splice([7, 19, 7, 27], "$0splice0"));
