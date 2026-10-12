/**
 * A request the server won't carry out, for a reason the person can act on:
 * answered as `{ error: message }` with `status`, and shown on the screen.
 */
export class Refusal extends Error {
  constructor(
    message: string,
    readonly status = 400,
  ) {
    super(message);
  }
}
