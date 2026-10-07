import { cs } from "@backtickjs/core";
import { Stepper } from "./Stepper.js";

// @ts-expect-error: a client component is a tag in a script, not on your server.
export const onTheServer = <Stepper value={1} onChange={() => {}} />;

export const missingProp = cs`(
  // @ts-expect-error: Property 'onChange' is missing.
  <$Stepper value={1} />
)`;
