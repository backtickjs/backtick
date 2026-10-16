// A client import is of values the client provides: a type-only one is
// TypeScript's to refuse, as it refuses attributes on any.
// @ts-expect-error: Import attributes cannot be used with type-only imports or exports.
import type { ButtonVariant } from "acme-ui" with { backtick: "client" };

export const variant: ButtonVariant = "ghost";
