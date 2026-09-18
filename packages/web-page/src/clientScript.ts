/** The `<script>` that loads the client, deferred so it runs after parsing. */
export function clientScript(clientUrl: string): string {
  return `<script defer src="${clientUrl}"></script>`;
}
