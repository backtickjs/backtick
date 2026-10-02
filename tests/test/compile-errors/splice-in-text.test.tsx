import { cs } from "@backtickjs/core";

// A `${…}` inside a string, a template literal or a comment is text the client
// would read, not a host value: it is spliced where an expression goes.
const inString = (name: string) => cs`"Hello, $name"`;
const inAttribute = (name: string) => cs`<p title="$name" />`;
const inComment = (name: string) => cs`{
  // $name
  return 1;
}`;
