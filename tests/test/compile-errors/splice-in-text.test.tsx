import { cs } from "@backtickjs/core";

// A `${…}` inside a string, a template literal or a comment is text the client
// would read, not a host value: it is spliced where an expression goes. Each
// is an expression rather than a name, which formatting would shorten to `$name`.
const inString = (name: string) => cs`"Hello, ${name.trim()}"`;
const inAttribute = (name: string) => cs`<p title="${name.trim()}" />`;
const inComment = (name: string) => cs`{
  // ${name.trim()}
  return 1;
}`;
